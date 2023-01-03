const axios = require("axios");
const { conn } = require("../db.js");
const { Dog, Temperament } = conn.models
const { Sequelize } = require('sequelize');

const {
    MY_API_KEY
} = process.env;

//TODO: PONER ESTO EN UN .env

const DOG_EXT_URL = `https://api.thedogapi.com/v1/breeds`;
const DOG_EXT_URL_SEARCH = `https://api.thedogapi.com/v1/breeds/search`;
const INIT_VALUE = 8000
const IMAGE_DOG_DEFAULT = "https://images.vexels.com/media/users/3/144310/isolated/preview/58053a8a043dfff8f59cec264841f462-perro-silueta-juego-by-vexels.png"
const FILTERS = {
    az: 'az',
    za: 'za',
    uw: 'uw',
    dw: 'dw',
    ed: 'ed',
    md: 'md'
}

const ordersAndFilters = (data, param) => {

    const sumArray = (arr) => {
        return arr.reduce((total, current) => {
            return total + current;
        }, 0);
    }
    console.log(data)
    if (param.includes('temp')) {
        let temps = param.split("=")[1].split(',').map((r) => r.replace(' ', ''))
        return data.filter((dog) => temps
            .map((t) => {
                if (dog.temperament != undefined)
                    return dog.temperament.includes(t)
                else return false
            })
            .filter((t) => t == true).length > 0

        )

    }
    switch (param) {
        case FILTERS.az:
            data.sort((a, b) => (a.name >= b.name) ? 1 : -1)
            return data
        case FILTERS.za:
            data.sort((a, b) => (a.name < b.name) ? 1 : -1)
            return data

        case FILTERS.uw:
            data.sort((a, b) => (sumArray(a.weight.metric.split("-")) < sumArray(b.weight.metric.split("-"))) ? 1 : -1)
            return data

        case FILTERS.dw:
            data.sort((a, b) => (sumArray(a.weight.metric.split("-")) >= sumArray(b.weight.metric.split("-"))) ? 1 : -1)
            return data

        default: return data;
    }
}


const get_dogs = async ({ res, req }) => {
    let name = req.query.name
    let offset = (req.query.offset == undefined) ? "0" : req.query.offset
    let filter = (req.query.filter == undefined) ? FILTERS.az : req.query.filter


    const dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
        }
    })
        .then(dogs => dogs.map((dog => dog.dataValues)))
        .then(dogs => dogs.map((dog) => {

            let temps = dog.temperaments
                .map((temp) => temp.dataValues.name)
            return {
                ...dog,
                temperament: temps.join(','),
                height: { metric: `${dog.minheight} - ${dog.maxheight} ` },
                weight: { metric: `${dog.minweight} - ${dog.maxweight} ` },
                life_span: `${dog.minlife_span} - ${dog.maxlife_span} years `,
                image: { url: IMAGE_DOG_DEFAULT }
            }
        }))
    if (name != undefined) {
        axios.get(`${DOG_EXT_URL_SEARCH}?q=${name}`)
            .then(r => r.data.concat(dogsDB.filter((dog) => dog.name == name)))
            .then(r => r.map((dog) => {
                return {
                    ...dog,
                    image: (dog.reference_image_id == undefined) ? { url: IMAGE_DOG_DEFAULT } :
                        { url: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` }
                }
            })).then(dogs => res.send(dogs))
    } else {
        axios.get(`${DOG_EXT_URL}`)
            .then(r => r.data)
            .then(dogs => {
                switch (filter) {
                    case FILTERS.md:
                        return dogsDB
                    case FILTERS.ed:
                        return dogs
                    default: return dogs.concat(dogsDB)
                }
            })
            .then(r => ordersAndFilters(r, filter))
            .then(dogs => {
                return {
                    dogs: dogs.slice(8 * (parseInt(offset)), (8 * (parseInt(offset) + 1))),
                    metadata: { len: dogs.length }
                };
            })
            .then(data => res.send(data))
    }
}

const get_dog = async ({ id, res }) => {

    const dog = await Dog.findByPk(id, {
        include: {
            model: Temperament,
        }
    })
        .then(r => {


            let dog = null
            if (r != null) {
                dog = r.dataValues
            }
            else {
                return dog
            }
            let temps = dog.temperaments
                .map((temp) => temp.dataValues.name)
            return {
                name: dog.name,
                temperament: temps.join(','),
                height: { metric: `${dog.minheight} - ${dog.maxheight} ` },
                weight: { metric: `${dog.minweight} - ${dog.maxweight} ` },
                life_span: `${dog.minlife_span} - ${dog.maxlife_span} years `,
                image: { url: IMAGE_DOG_DEFAULT }
            }
        })

    console.log(dog)
    if (dog != null) {
        res.send(dog)
    } else {
        axios.get(`${DOG_EXT_URL}/${id}`)
            .then(r => res.send(r.data))

    }

}

const get_temperaments = async (req, res) => {
    const tempsDB = await Temperament.aggregate('name', 'DISTINCT', { plain: false })
        .then((temps) => temps.map((t) => t.DISTINCT))

    axios.get(`${DOG_EXT_URL}`)
        .then(r => r.data)
        .then(dogs => dogs.map((dog) => dog.temperament?.split(',')))
        .then(temperaments => temperaments
            .reduce((arr, a) => arr.concat(a), [])//join array of array
            .filter(n => n)) //filter nulls
        .then(temperaments =>
            temperaments
                .concat(tempsDB)
                .filter(n => n.replace(" ", "")))//filter nulls
        .then(temperaments => res.send({ temperaments: [...new Set(temperaments)] }))
}

const dog = {
    getAll: async (req, res, next) => {
        get_dogs({ res: res, req: req })
    },

    getDogDetail: (req, res, next) => {
        let id = (req.params.id == undefined) ? req.query.name : req.params.id
        get_dog({ id, res })
    },

    createDog: async (req, res) => {
        let dog = req.body
        console.log("ACA ESTA")

        console.log(dog)
        let result = await Dog.max("id")
        if (result === null) {
            dog.id = INIT_VALUE
        } else {
            dog.id = result + 1
        }
        await Dog.create(dog, { include: [Temperament] }).then(r => res.send(r))
    },

    getTemeperaments: async (req, res) => get_temperaments(req, res)


}


module.exports = dog;