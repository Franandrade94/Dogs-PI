const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require("./dog.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", dogRouter.getAll);
router.get("/dogs/:id", dogRouter.getDogDetail);
router.options("/dogs", dogRouter.createDog);
router.post("/dogs", dogRouter.createDog);
router.get("/temperaments", dogRouter.getTemeperaments)

module.exports = router;
