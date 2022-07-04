var express = require('express');
var router = express.Router();
var controller = require('../controllers/employeController')

router.get('/', controller.getData)
router.post('/createData', controller.createData)
router.get('/:id', controller.getId)
router.put('/', controller.update)
router.delete('/:id', controller.delete)

module.exports = router;