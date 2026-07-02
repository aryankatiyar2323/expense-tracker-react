import express from "express";
import bcrypt from "bcrypt";
import db from "../db/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Insert user
    await db.query(
      `
      INSERT INTO users
      (name, email, password)
      VALUES
      ($1, $2, $3)
      `,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
        console.log(error.response.data);
    }
});

router.post("/login", async (req, res) => {
  try {

    // Get email and password from frontend
    const { email, password } = req.body;

    // Find user by email
    const userExist = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // Email not found
    if (userExist.rowCount === 0) {
      return res.status(400).json({
        message: "Email not found"
      });
    }

    // Get stored hashed password
    const hashedPassword = userExist.rows[0].password;

    // Compare entered password with hash
    const isMatch = await bcrypt.compare(
      password,
      hashedPassword
    );

    // Password incorrect
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }
    // Creating token
    const token = jwt.sign(
      {
        id: userExist.rows[0].id
      },
        process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // Login success
    res.status(200).json({
      message: "Login Successful",
      token
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});


export default router;