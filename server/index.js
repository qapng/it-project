const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

// Handle all uncaught exceptions.
process.on('uncaughtException', err => {
  console.log(err.name, ':', err.message);
  console.log(err);
  console.log('UNCAUGHT EXCEPTIONS! 💥 Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const DB = process.env.DB.replace(
  '<USERNAME>:<PASSWORD>',
  `${username}:${password}`
);

// Connect to Database.
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected 🔸'));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

// Handle all unhandled rejections.
process.on('unhandledRejection', err => {
  console.log(err.name, ':', err.message);
  console.log(err);
  console.log('UNHANDLED REJECTIONS! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
