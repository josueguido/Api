var express = require('express');
const { pedirTodas, pedir } = require('../db/pedidos');
var router = express.Router();
const { body, validationResult } = require('express-validator');

let metas = [
  {
    "id":"1",
    "detalles":"Correr por 30 minutos",
    "periodos":"dia",
    "eventos":1,
    "icono":"🏃‍♂️",
    "meta":365,
    "plazo":"2030/01/01",
    "completado":100
},
{
    "id":"2",
    "detalles":"Leer un libro",
    "periodo":"año",
    "eventos":6,
    "icono":"📚",
    "meta":12,
    "plazo":"2030/01/01",
    "completado":0
},
{
    "id":"3",
    "detalles":"Viajar a parques nacionales",
    "plazo":"mes",
    "frecuencia":1,
    "icono":"⛰️",
    "meta":60,
    "fecha_limite":"2030/01/01",
    "completado":5
}
];

/* GET Lista de Metas */
router.get('/', function(req, res, next) {
  pedirTodas('metas', (err, metas) => {
    if (err) {
      return next(err);
    }
    console.log(metas)
    res.send(metas);
  });
});
 
/* GET Meta con id */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  pedir('metas', id, (err, meta) => {
    if (err) {
      return next(err);
    }
    if (!meta.lenght) {
       return res.sendStatus(404);
    }
  res.send(meta[0]);
});
});

/* POST Crear meta */
router.post('/',
body('detalles').isLength({ min: 5}),
body('periodo').not().isEmpty(),
function(req, res, next) {
  const  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 const nuevaMeta = req.body;
 crear('metas', nuevaMeta, (err, meta) => {
  if (err) {
    return next(err);
  }
  res.send(meta);
 })
});

/* PUT Actualizar meta */
router.put('/:id', function(req, res, next) {
 
  const meta = req.body;
  const id = req.params.id;
  if (meta.id !== id)  {
    return res.sendStatus(409);
  }
  const indice = metas.findIndex(item => item.id === id);
  if (indice === -1) {
    return res.sendStatus(404);
  }
  metas[indice] = meta;
  res.send(meta);
});

/* DELETE Borrar meta */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  const indice = metas.findIndex(item => item.id === id);
  if (indice === -1) {
    return res.sendStatus(404);
  }
   metas.splice(indice, 1);
   res.sendStatus(204);
});



module.exports = router;
