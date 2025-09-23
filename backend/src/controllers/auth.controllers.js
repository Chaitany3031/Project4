const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { email, fullName:{firstName, lastName}, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      fullName: { firstName, lastName },
      password: hashedPassword
    });

    // Save the user to database
    await newUser.save();

    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);

    res.cookie('token', token);


    return res.status(201).json({
      message: "User registered successfully",
      success: true
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
}

async function loginUser(req, res) { 
const {email,password} = req.body;

// Check if user exists
const existingUser = await User.findOne({email});
if(!existingUser){
  return res.status(400).json({message:"User does not exist"});
}
const isPasswordValid = await bcrypt.compare(password,existingUser.password);
if(!isPasswordValid){
  return res.status(400).json({message:"Invalid credentials"});
}

const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET);

res.cookie('token', token);

return res.status(200).json({
  message:"Login successful",
  success:true
})

}

module.exports = {
  registerUser,
  loginUser
};
