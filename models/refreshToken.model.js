const db = require('../config/db.config');
const { v4: uuidv4 } = require('uuid');

const createRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const token = uuidv4();
    const query = 'INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)';
    db.query(query, [userId, token], (err, result) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

const findByToken = (token) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM refresh_tokens WHERE token = ?';
    db.query(query, [token], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deleteByToken = (token) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM refresh_tokens WHERE token = ?';
    db.query(query, [token], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  createRefreshToken,
  findByToken,
  deleteByToken
};
