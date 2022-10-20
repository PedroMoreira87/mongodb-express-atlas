const {Person} = require("../models/personModel");

const PersonService = {
  async listAll(req, res) {
    try {
      const people = await Person.find();
      res.status(200).json(people);
    } catch (error) {
      res.status(500).json({error: error});
    }
  },

  async create(req, res) {
    const {name, salary, approved} = req.body;

    if (!name) {
      res.status(422).json({error: 'Name is required!'})
      return;
    }

    const person = {
      name,
      salary,
      approved
    }

    try {
      await Person.create(person);
      res.status(201).json({message: 'Person added successfully!'});
    } catch (error) {
      res.status(500).json({error: error});
    }
  },

  async getById(req, res) {
    const id = req.params.id;

    try {
      const person = await Person.findOne({_id: id});
      if (!person) {
        res.status(422).json({message: 'User not found!'})
        return;
      }
      res.status(200).json(person);
    } catch (error) {
      res.status(500).json({error: error});
    }
  },

  async update(req, res) {
    const id = req.params.id;
    const {name, salary, approved} = req.body;

    const person = {
      name,
      salary,
      approved
    }

    try {
      const updatedPerson = await Person.updateOne({_id: id}, person);
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({message: 'User not found!'})
        return;
      }
      res.status(200).json(person);
    } catch (error) {
      res.status(500).json({error: error});
    }
  },

  async delete(req, res) {
    const id = req.params.id;

    try {
      const person = await Person.findOne({_id: id});
      if (!person) {
        res.status(422).json({message: 'User not found!'})
        return;
      }
      await Person.deleteOne({_id: id})
      res.status(200).json({message: 'User deleted successfully!'});
    } catch (error) {
      res.status(500).json({error: error});
    }
  }
}

module.exports.PersonService = PersonService;
