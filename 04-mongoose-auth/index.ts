import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { connectToDB } from "./database/connectToDB";
import { findUserByEmail, saveUser } from "./database/user";
import { signUpSchema } from "./validations/types";
import { UserType } from "./types";
import { generateHashedPassword } from "./auth/generateHashedPassword";

dotenv.config();
const jwtPassword = process.env.jwtPassword as string;

const app = express();
app.use(express.json());

app.post("/signup", async (req,res) => {
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
    mobileNumber: mobileNumber,
    dateOfBirth: dateOfBirth
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
    user: savedUser
  })
})
app.listen(3000, async () => {
  await connectToDB();
  console.log("Server is running on port 3000");
})