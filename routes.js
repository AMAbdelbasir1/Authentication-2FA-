const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");

// Route to display QR code for setting up 2FA
router.get("/2fa/setup", authController.get2faSetup);

// Route to verify the 2FA token and enable 2FA
router.post("/2fa/verify", authController.verify2fa);

// Route to verify 2FA token during login
router.post("/login/2fa", authController.verifyLogin2fa);

module.exports = router;
