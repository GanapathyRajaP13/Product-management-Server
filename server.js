require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const dashRoutes = require('./routes/dashboard.roues');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dash', dashRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Validate environment variables
const PORT = process.env.PORT || 3000;
if (!process.env.JWT_SECRET || !process.env.JWT_ACCESS_EXPIRATION) {
  throw new Error('Missing required environment variables.');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
