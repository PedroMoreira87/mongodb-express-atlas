const router = require('express').Router();
const {PersonService} = require("../services/personService");

router.post('/', PersonService.create)
router.get('/', PersonService.listAll)
router.get('/:id', PersonService.getById);
router.patch('/:id', PersonService.update);
router.delete('/:id', PersonService.delete);

module.exports = router;
