import express from "express";
import { connectToDB } from "./connectToDB";
import { signUpSchema } from "./types";

const app = express();
app.use(express.json());

app.post("/signup", async (req,res) => {
  // 1. Accept user input
  // 2. Validate user input
  const validationResponse = signUpSchema.safeParse(req.body);
  if(!validationResponse.success) {
    return res.status(400).json({"msg" : "Validation failed"})
  }
  // 3. Check if email or username exists, if yes then return.
  // 4. Hash the password
  // 5. Store in db
  // 6. Create JWT and send it back to user
  return res.json({"msg": "User saved successfully"})
})
app.listen(3000, async () => {
  await connectToDB();
  console.log("Server is running on port 3000");
})