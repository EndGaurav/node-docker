const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.get("/", authController.getAllUsers)
router.post("/login", authController.login);
router.delete("/delete/:id", authController.deleteUser);


module.exports = router;