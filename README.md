# Node.js Two-Factor Authentication (2FA) with Google Authenticator

This is a Node.js application that demonstrates how to implement Two-Factor Authentication (2FA) using Google Authenticator. The project is structured in an MVC pattern and uses `speakeasy` to generate TOTP (Time-based One-Time Passwords) and `qrcode` to generate a QR code that users can scan with Google Authenticator.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Security Considerations](#security-considerations)
- [License](#license)

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for routing and middleware.
- **EJS**: Templating engine for rendering views.
- **Speakeasy**: Library to generate and verify TOTP for 2FA.
- **QRCode**: Library to generate QR codes.
- **Body-parser**: Middleware to parse HTTP request body data.

## Features

- Generate a unique secret key for each user.
- Generate a QR code for users to scan with the Google Authenticator app.
- Verify TOTP tokens entered by users.
- Enable and enforce Two-Factor Authentication during login.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- Google Authenticator app (available for iOS and Android).

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```

   The app will start on `http://localhost:3000`.

### Environment Variables

You can add environment-specific configurations, such as app name (issuer), in a `.env` file. However, no environment variables are required for basic functionality.

## Project Structure

```bash
project-folder/
│
├── controllers/            # Contains the controller logic
│   └── authController.js    # Authentication controller handling 2FA
├── models/                 # Contains the user model
│   └── user.js              # Simple mock user model
├── views/                  # Contains view templates (EJS)
│   └── 2fa.ejs              # Page to display QR code and accept TOTP
├── app.js                  # Main app file
├── routes.js               # Routes definition
├── package.json            # Project dependencies and scripts
└── README.md               # Documentation
```

### Key Files:

- **`app.js`**: The main entry point of the application, sets up Express server and routes.
- **`controllers/authController.js`**: Contains logic for 2FA setup, QR code generation, and TOTP verification.
- **`models/user.js`**: Mock user data and methods to retrieve/update user info.
- **`views/2fa.ejs`**: Displays the QR code and allows users to input TOTP.
- **`routes.js`**: Defines the application routes related to 2FA.

## Usage

1. **Setting Up 2FA**:

   - Go to `/2fa/setup` to generate a QR code for the user.
   - Scan the QR code using the Google Authenticator app.
   - Enter the TOTP code displayed in the Google Authenticator app to verify and enable 2FA.

2. **Verifying 2FA Token**:

   - After 2FA is enabled, users will need to enter the TOTP during login. This can be tested by posting the TOTP to `/login/2fa`.

## Security Considerations

- **Store Secrets Securely**: In this example, the `twoFactorSecret` is stored in the mock user model. In production, ensure secrets are securely stored (preferably encrypted).
- **Rate Limiting**: Implement rate-limiting on sensitive routes like `/2fa/verify` and `/login/2fa` to prevent brute-force attacks.
- **Password Hashing**: If this project were expanded, ensure user passwords are hashed before storing in the database.