const express = require("express");
const mainController = require("../controllers/main");
const router = express.Router();

router.get("/",mainController.index);

router.get("/about",mainController.about);

router.get("/game",mainController.game);

router.get("/area",mainController.area);

module.exports = router;