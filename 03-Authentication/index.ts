import express from "express";
import jwt from "jsonwebtoken";
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "anjali@gmail.com",
    password: "1234567",
    name: "Anjali Sherikar",
  },
];

function userExists(username:string, password:string) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  const response = ALL_USERS.find((user) => {
    if(user.username === username && user.password === password){
        return user
    }
  })
  return response ? true : false;
}

app.post("/signin", (req, res) => {
    // Fetch parameters from body.
    const username = req.body.username;
    const password = req.body.password;

    // Validate input

    // Check if user exists
    if (!userExists(username, password)) {
        return res.status(403).json({
        msg: "User doesnt exist in our in memory db",
        });
    }

    // Create jwt
    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = (jwt.verify(token as string, jwtPassword)) as jwt.JwtPayload;
    const username = decoded.username;
    // return a list of users other than this username
    const usersExceptCurrentUser = ALL_USERS.filter(user => user.username !== username);
    return res.json({users: usersExceptCurrentUser});
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)