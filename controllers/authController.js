const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const { getUserById, updateUser } = require("../models/user");

// Generate 2FA secret and display QR code
exports.get2faSetup = (req, res) => {
  const user = getUserById(1); // Replace with logged-in user's ID

  if (user.twoFactorEnabled) {
    return res.send("2FA is already enabled.");
  }

  // Generate a secret key
  const secret = speakeasy.generateSecret({ length: 20 });

  // Update user's 2FA secret in the database
  updateUser(user.id, { twoFactorSecret: secret.base32 });

  // Generate QR code URL
  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: user.username,
    issuer: "authentication_test",
    encoding: "ascii",
  });

  // Generate QR code to scan with Google Authenticator
  qrcode.toDataURL(otpauthUrl, (err, dataUrl) => {
    if (err) {
      return res.status(500).send("Error generating QR code");
    }

    // Render the view with the QR code
    res.render("2fa", { qrCodeUrl: dataUrl, secret: secret.ascii });
  });
};

// Verify the TOTP token entered by the user
exports.verify2fa = (req, res) => {
  const user = getUserById(1); // Replace with logged-in user's ID
  const { token } = req.body;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
    window: 1, // Accept tokens that are off by +/- 1 time step
  });

  if (verified) {
    // Enable 2FA for the user
    updateUser(user.id, { twoFactorEnabled: true });
    return res.send("2FA successfully enabled!");
  } else {
    return res.send("Invalid token, please try again.");
  }
};

// Verify TOTP for login
exports.verifyLogin2fa = (req, res) => {
  const user = getUserById(1); // Replace with logged-in user's ID
  const { token } = req.body;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
    window: 1, // Accept tokens that are off by +/- 1 time step
  });

  if (verified) {
    return res.send("Login successful!");
  } else {
    return res.send("Invalid 2FA token.");
  }
};
