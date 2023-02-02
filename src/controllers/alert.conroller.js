const Alert = require("../models/alert.model");

const createAlert = async (req, res) => {
  try {
    const data = req.body;
    const alertData = await Alert.create(data);
    res.send(alertData).status(400);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllAlert = async (req, res) => {
  try {
    const page = req.query.page;
    const size = req.query.pageSize;

    const alerts = await Alert.find()
      .skip((page - 1) * size)
      .limit(size)
      .lean()
      .exec();

    const totalPages = Math.ceil((await Alert.countDocuments()) / size);
    const counts = await Alert.countDocuments();

    return res.send({ alerts, totalPages, counts });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const deleteAlert = async (req, res) => {
  try {
    const data = req.params.id;
    const alertData = await Alert.findByIdAndDelete(data);
    res.send(alertData).status(400);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneAlert = async (req, res) => {
  try {
    const data = req.params.id;
    const alertData = await Alert.findById(data);
    res.send(alertData).status(400);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const findAndUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const alertData = await Alert.findByIdAndUpdate(id, update, { new: true });
    res.send(alertData).status(400);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createAlert,
  getAllAlert,
  deleteAlert,
  getOneAlert,
  findAndUpdate,
};
