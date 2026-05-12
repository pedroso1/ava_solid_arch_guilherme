const Pet = require('../models/Pet');
const mongoose = require('mongoose');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class PetController {
  static async createPet(req, res) {
    const { name, age, weight, color } = req.body

    if (!name) {
      res.status(422).json({ message: 'O nome do pet é obrigatório' })
      return
    }

    if (!age) {
      res.status(422).json({ message: 'A idade do pet é obrigatória' })
      return
    }

    if (!weight) {
      res.status(422).json({ message: 'O peso do pet é obrigatório' })
      return
    }

    if (!color) {
      res.status(422).json({ message: 'A cor do pet é obrigatória' })
      return
    }

    if (!req.files || req.files.length === 0) {
      res.status(422).json({ message: 'A imagem do pet é obrigatória' })
      return
    }

    const images = req.files.map((file) => file.filename)

    const token = getToken(req)
    const user = await getUserByToken(token)

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' })
      return
    }

    user.password = undefined

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      image: images,
      available: true,
      user,
    })

    try {
      const newPet = await pet.save()
      res.status(201).json({ message: 'Pet cadastrado com sucesso', data: newPet })
    } catch (error) {
      res.status(500).json({ message: error.message })
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

    