const Customer = require("../schemas/customerSchema");

const CustomerService = {
  async listAll(_, res) {
    try {
      const customers = await Customer.find();

      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async create(req, res) {
    const customer = new Customer({
      fullName: req.body.fullName,
      address: req.body.address,
      nationality: req.body.nationality,
      cpf: req.body.cpf,
      phone: req.body.phone,
      email: req.body.email,
    });

    customer.save((error, _) => {
      if (error) {
        return res.status(422).send({
          message: error,
        });
      }

      return res.status(200).send({
        message: "Customer created successfully!",
      });
    });
  },

  async getById(req, res) {
    const id = req.params.id;

    try {
      const customer = await Customer.findOne({ _id: id });
      if (!customer) {
        res.status(404).json({ message: "Customer not found!" });
        return;
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async update(req, res) {
    const id = req.params.id;

    const customer = {
      fullName: req.body.fullName,
      address: req.body.address,
      nationality: req.body.nationality,
      cpf: req.body.cpf,
      phone: req.body.phone,
      email: req.body.email,
    };

    try {
      const updatedCustomer = await Customer.updateOne({ _id: id }, customer);
      if (updatedCustomer.matchedCount === 0) {
        res.status(422).json({ message: "Customer not found!" });
        return;
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async delete(req, res) {
    const id = req.params.id;

    try {
      const customer = await Customer.findOne({ _id: id });
      if (!customer) {
        res.status(422).json({ message: "Customer not found!" });
        return;
      }
      await Customer.deleteOne({ _id: id });
      res.status(200).json({ message: "Customer deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

module.exports.CustomerService = CustomerService;
