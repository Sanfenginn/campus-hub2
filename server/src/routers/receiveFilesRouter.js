const express = require("express");
const receiveFilesRouter = express.Router();
const { receiveFiles } = require("../controllers/receiveFilesController");

receiveFilesRouter.post("/", receiveFiles);

module.exports = receiveFilesRouter;
