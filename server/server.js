const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { USERFRONT_PUBLIC_KEY } = require("./environment");

const app = express();
app.use(cors());

const authenticateToken = async (req, res, next) => {
  // Read the JWT access token from the request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({
      message: 'Bad token',
    });
  }

  // Verify the token using the Userfront public key
  try {
        const auth = await jwt.verify(token, USERFRONT_PUBLIC_KEY);
    req.auth = auth;
    next();
  } catch (error) {
    return res.status(401).json({
        message: 'Bad token',
    });
  }
};

app.get('/data', authenticateToken, (req, res) => {
  return res.json({
    someSecretData: 'Shhhh!',
  });
});

app.listen(3010, () => console.log('App listening on port 3010'));
