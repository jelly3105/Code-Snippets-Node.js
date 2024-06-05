import express from "express";
import { connectToDB } from "./connectToDB";

const app = express();

app.post("/signup", async (req,res) => {
  // 1. Accept user input
  // 2. Validate user input
  // 3. Check if email or username exists, if yes then return.
  // 4. Hash the password
  // 5. Store in db
  // 6. Create JWT and send it back to user
})
app.listen(3000, async () => {
  await connectToDB();
  console.log("Server is running on port 3000");
})