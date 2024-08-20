// server.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
