const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    minheight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    maxheight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    minweight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    maxweight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    minlife_span: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    maxlife_span: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
    {
      initialAutoIncrement: 2000,
    }
  );
};

