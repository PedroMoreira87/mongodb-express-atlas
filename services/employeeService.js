const Employee = require("../schemas/employeeSchema");

const EmployeeService = {
  async listAll(_, res) {
    try {
      const employees = await Employee.find();

      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async create(req, res) {
    const employee = new Employee({
      cpf: req.body.cpf,
      fullName: req.body.fullName,
      address: req.body.address,
      position: req.body.position,
    });

    employee.save((error, _) => {
      if (error) {
        return res.status(422).send({
          message: error,
        });
      }

      return res.status(200).send({
        message: "Employee created successfully!",
      });
    });
  },

  async getById(req, res) {
    const id = req.params.id;

    try {
      const employee = await Employee.findOne({ _id: id });
      if (!employee) {
        res.status(422).json({ message: "Employee not found!" });
        return;
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async update(req, res) {
    const id = req.params.id;

    const employee = {
      cpf: req.body.cpf,
      fullName: req.body.fullName,
      address: req.body.address,
      position: req.body.position,
    };

    try {
      const updatedEmployee = await Employee.updateOne({ _id: id }, employee);
      if (updatedEmployee.matchedCount === 0) {
        res.status(422).json({ message: "Employee not found!" });
        return;
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async delete(req, res) {
    const id = req.params.id;

    try {
      const employee = await Employee.findOne({ _id: id });
      if (!employee) {
        res.status(422).json({ message: "Employee not found!" });
        return;
      }
      await Employee.deleteOne({ _id: id });
      res.status(200).json({ message: "Employee deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

module.exports.EmployeeService = EmployeeService;
