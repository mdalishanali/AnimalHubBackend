const express = require("express");
const {
  createAlert,
  getAllAlert,
  deleteAlert,
  findAndUpdate,
  getOneAlert,
} = require("../controllers/alert.conroller");
const router = express.Router();
const Authenticate = require("../middlewares/auth.middleware");

router.post("/", Authenticate, createAlert);
router.get("/", Authenticate, getAllAlert);
router.get("/:id", Authenticate, getOneAlert);
router.delete("/:id", Authenticate, deleteAlert);
router.put("/:id", Authenticate, findAndUpdate);

module.exports = router;
