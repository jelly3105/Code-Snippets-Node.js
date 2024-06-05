import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { connectToDB } from "./database/connectToDB";
import { findUserByEmail, saveUser } from "./database/user";
import { logInSchema, signUpSchema } from "./validations/types";
import { UserType } from "./types";
import { generateHashedPassword } from "./auth/generateHashedPassword";

dotenv.config();
const jwtPassword = process.env.jwtPassword as string;

const app = express();
app.use(express.json());

app.post("/signup", async (req,res) => {
  try {
    // 1. Accept user input
    // 2. Validate user input
    const validationResponse = signUpSchema.safeParse(req.body);
    if(!validationResponse.success) {
      return res.status(400).json({"msg" : "Validation failed"})
    }

    const {email, password, name, mobileNumber, dateOfBirth} = req.body;
    const userData: UserType = {
      email: email,
      password: password,
      name: name,
      mobilenumber: mobileNumber,
      dateofbirth: dateOfBirth
    };

    // 3. Check if email or username exists, if yes then return.
    const user = await findUserByEmail(userData.email);
    if(user) {
      return res.status(400).json({"msg" : "User already exists,Please login!"})
    }

    // 4. Hash the password
    userData.password = await generateHashedPassword(userData.password);

    // 5. Store in db
    const savedUser = await saveUser(userData);
    if(!savedUser) {
      return res.status(500).json({"msg" : "Server is down, please try again!"})
    }
    
    // 6. Create JWT and send it back to user
    const token = jwt.sign({ email: userData.email }, jwtPassword);
    return res.json({
      "token": token,
      user: savedUser._id
    })
  }catch(e) {
    return res.status(500).json({"msg" : "Server is down, please try again!"})
  }
})

app.post("/login", async (req, res) => {
  try {
    // 1. Validate input
    const validationResponse = logInSchema.safeParse(req.body);
    if(!validationResponse.success) {
      return res.status(400).json({"msg" : "Validation failed"})
    }

    const {email, password} = req.body;
    // 2. Check if email exists
    const user = await findUserByEmail(email);
    if(!user) {
      return res.status(400).json({"msg" : "User doesn't exist, please sign up!"})
    }

    // 3. Verify password
    const match = await bcrypt.compare(password, user.password);
    if(!match){
      return res.status(400).json({"msg" : "Password is incorrect!"})
    }

    // 4. Create jwt 
    const token = jwt.sign({ email: email }, jwtPassword);
    return res.json({
      "token": token,
      user: user._id
    })
  }catch(e) {
    return res.status(500).json({"msg" : "Server is down, please try again!"})
  }
})

app.listen(3000, async () => {
  await connectToDB();
  console.log("Server is running on port 3000");
})