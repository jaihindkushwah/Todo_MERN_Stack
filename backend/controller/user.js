const generateHashPassword = require("../utils/generateHashPassword");
const matchHashPassword = require("../utils/matchHashPassword");
const User = require("../models/user");
const { generateJwtToken} = require("../utils/JwtHandle");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await generateHashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    newUser.token = generateJwtToken(newUser._id);
    await newUser.save();
    const data = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: newUser.token,
        avatar: newUser.avatar,
      };
    res
      .status(201)
      .json({ message: "User created successfully", user: data });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = matchHashPassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    user.token = generateJwtToken(user._id);
    await user.save();

    const data = {
      id: user._id,
      name: user.name,
      email: user.email,
      token: user.token,
      avatar: user.avatar,
    };

    res.status(200).json({ message: "Login successful", user: data });
  } catch (error) {
    res.status(500).json({ message: "Failed to login user" });
  }
};

module.exports = { registerUser, loginUser };
