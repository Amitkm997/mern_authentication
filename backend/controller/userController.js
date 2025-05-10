import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(400).send({ message: "please provide name" });
  if (!email) return res.status(400).send({ message: "please provide email" });
  if (!password)
    return res.status(400).send({ message: "please provide password" });
  if (!emailRegex.test(email)) return res.send("please provide valid email");

  const userExist = await User.findOne({ email });
  if (userExist) return res.send("user already exist");

  let hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });
  return res.send(newUser);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: "please provide email" });
  if (!emailRegex.test(email)) return res.send("please provide valid email");
  if (!password)
    return res.status(400).send({ message: "please provide password" });

  let existUser = await User.findOne({ email });
  if (!existUser) return res.send("user not registered");

  let comparedPassword = bcrypt.compare(password, existUser.password);
  if (!comparedPassword) return res.send("password not correct");
  //token generation
  let payload = {
    id: existUser._id,
  };
  let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.send({ token: token });
};
