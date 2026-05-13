const express = require('express');
const router = express.Router();

const PetController = require('../controllers/PetController');

const verifyToken = require('../helpers/verify-token');
const imageUpload = require('../helpers/image-upload');


router.post('/', verifyToken, imageUpload.array('images'), PetController.createPet);


router.get('/', PetController.getAll);


router.get('/mypets', verifyToken, PetController.getAllUserPets);


router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions);


router.get('/:id', PetController.getPetById);


router.put('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet);

router.delete('/:id', verifyToken, PetController.removePetById);


router.post('/:id/schedule', verifyToken, PetController.schedule);


router.post('/:id/conclude', verifyToken, PetController.concludeAdoption);

module.exports = router;
