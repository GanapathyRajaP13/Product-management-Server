const db = require("../config/db.config");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const otps = {};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

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
    const query = `SELECT id, username, firstname, lastname, gender, email, UserType, userCode, isActive, password 
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
    const query = `SELECT * FROM products ORDER BY id DESC`;
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

const editProfileinfo = (info) => {
  const { id, firstName, lastName, gender, email } = info;
  const userName = `${firstName} ${lastName}`;
  return new Promise((resolve, reject) => {
    const query = `UPDATE users_mst
      SET username = ?, firstname = ?, lastname = ?, gender = ?, email = ?
      WHERE id = ?;`;
    db.query(
      query,
      [userName, firstName, lastName, gender, email, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const passwordChange = async (info) => {
  const { id, currentPassword, newPassword } = info;
  const users = await findById(id);
  if (users.length === 0) return { success: false, message: "User not found." };

  const user = users[0];
  const passwordIsValid = bcrypt.compareSync(currentPassword, user.password);
  if (!passwordIsValid)
    return {
      success: false,
      message: "Invalid Current Password!",
      pass: user.password,
    };

  const hashedPassword = bcrypt.hashSync(newPassword, 8);

  return new Promise((resolve, reject) => {
    const query = `UPDATE users_mst SET password = ? WHERE id = ?`;
    db.query(query, [hashedPassword, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const sendOTPmail = async (email, firstname, lastname) => {
  const otp = generateOtp();
  const normalizedEmail = email.toLowerCase().trim();
  otps[normalizedEmail] = otp;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailContent = `Dear ${firstname} ${lastname},

      You have requested a new OTP to edit your profile or change your password in the Product Management Application.
        
      Please enter the following OTP to proceed:

      Your OTP code is: ${otp}

  If you did not request this, please ignore this email.`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP for Product Management",
    text: mailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to send OTP", error };
  }
};

const verifyOtp = (email, otp) => {
  try {
    const normalizedEmail = email.toLowerCase().trim();

    if (otps[normalizedEmail] && otps[normalizedEmail] === otp.otp) {
      delete otps[normalizedEmail];
      return { success: true, message: "OTP verified successfully!" };
    }

    return { success: false, message: "OTP not valid!" };
  } catch (error) {
    return { success: false, message: "Error verifying OTP.", error };
  }
};

module.exports = {
  createUser,
  findByUsername,
  findById,
  getCount,
  getAllProducts,
  productReview,
  editProfileinfo,
  sendOTPmail,
  verifyOtp,
  passwordChange,
};
