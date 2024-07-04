const express = require("express");
const addressRouter = express.Router();
const getAddress = require("../controllers/addressController");

addressRouter.get("/", getAddress);

module.exports = addressRouter;
