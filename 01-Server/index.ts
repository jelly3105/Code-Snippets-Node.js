import express from "express";
const app = express();

app.use(express.json()); // To access request body

app.get("/", (req,res) => {
    res.send("Hello World!")
})

app.post("/conversation", (req,res) => {
    console.log(req.headers)
    console.log(req.body)
    res.send("Request received!")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})