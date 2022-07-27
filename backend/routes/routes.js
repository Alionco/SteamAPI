const express = require("express");


const router = express.Router();


const controller = require("../controllers/controller");


router.get("/getinfo/:id", controller.getUserInfo);
router.get("/getgames/:id", controller.getUserGames);
router.get("/getmostplayed/:id", controller.getMostPlayedGame);



module.exports = router;