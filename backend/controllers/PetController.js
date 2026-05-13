const Pet = require('../models/Pet');
const mongoose = require('mongoose');
const getToken = require('../helpers/get-tokens');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class PetController {
  static async createPet(req, res) {
    const { name, age, weight, color } = req.body;
    const images = req.files;
    const available = true;

    if (!name || !age || !weight || !color) {
      res.status(422).json({ message: 'Todos os campos são obrigatórios!' });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({
        message: 'Pet cadastrado com sucesso!',
        newPet,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }

  }

  static async getAll(req, res) {

  }

  static async getAllUserPets(req, res) {

  }

  static async getAllUserAdoptions(req, res) {
 
  }

  static async getPetById(req, res) {
  
  }

  static async removePetById(req, res) {
    
  }
 

  static async updatePet(req, res) {


  }

  static async schedule(req, res) {
   
  }

  static async concludeAdoption(req, res) {
    
  }
}; 

    