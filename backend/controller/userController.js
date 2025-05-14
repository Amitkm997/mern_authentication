import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name) return res.status(400).json({ message: "Please provide name" });
    if (!email)
      return res.status(400).json({ message: "Please provide email" });
    if (!password)
      return res.status(400).json({ message: "Please provide password" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Please provide a valid email" });

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(409).json({ message: "User already exists" });

    // Hash the password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Success response
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).send({ message: "please provide email" });
    if (!emailRegex.test(email))
      return res.status(400).send({ message: "please provide valid email" });
    if (!password)
      return res.status(400).send({ message: "please provide password" });

    const existUser = await User.findOne({ email });
    if (!existUser)
      return res.status(404).send({ message: "user not registered" });

    const comparedPassword = await bcrypt.compare(password, existUser.password);
    if (!comparedPassword)
      return res.status(401).send({ message: "password not correct" });

    const payload = { id: existUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ message: "Something went wrong on the server." });
  }
};
