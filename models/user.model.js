const db = require("../config/db.config");

const createUser = async ({
  username,
  password,
  firstName,
  lastName,
  gender,
  email,
}) => {
  const count = await getCount();
  const newCode = Number(count[0].count) + 1;
  const userCode = "C000" + newCode;

  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users_mst (username, firstname, lastname, gender, email, userCode, password)
       VALUES(?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      query,
      [username, firstName, lastName, gender, email, userCode, password],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const findByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users_mst WHERE username = ?";
    db.query(query, [username], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, username, firstname, lastname, gender, email, UserType, userCode, isActive 
    FROM users_mst WHERE id = ?`;
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getCount = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT count(*) as count FROM users_mst";
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products`;
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const productReview = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM reviews where productId = ?`;
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  createUser,
  findByUsername,
  findById,
  getCount,
  getAllProducts,
  productReview,
};
