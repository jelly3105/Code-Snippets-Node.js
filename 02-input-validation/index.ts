import express from "express";
import {z as zod} from "zod";

const app = express();
const schema = zod.array(zod.number());

app.use(express.json()); 

app.post("/health-checkup", (req,res) => {
    const kidneys: number[] = req.body.kidneys;
    const response = schema.safeParse(kidneys);

    if(!response.success) {
        return res.status(411).json({"msg":"Invalid input"})
    }

    const kidneyLength = kidneys.length;
    return res.json({"msg":`You have ${kidneyLength} kidneys.`})
})

app.post("/sign-up", (req,res) => {
    // {
    // email : string => must be correct format
    // password: atleast 8 characters
    // country: "IN", "USA"
    // }
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8, { message: "Password must be at least 8 characters long" }),
        country: zod.literal("IN").or(zod.literal("USA"))
    });
    const user = req.body.userDetails;
    const response = schema.safeParse(user);

    if(!response.success) {
        // return res.status(411).json({"msg":"Invalid input"})
        return res.status(411).json({"msg":response})
    }

    return res.json({"msg":`Signed up successfully`})
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})