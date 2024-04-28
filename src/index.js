const express = require("express");
const path = require("path");
const {collection, collection1} = require("./config");
const bcrypt = require('bcrypt');

const app = express();
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});
app.get("/logint", (req, res) => {
    res.render("logint");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/signupt", (req, res) =>{
    res.render("signupt");
});

// Register student
app.post("/signup", async (req, res) => {

    const data = {
        uname: req.body.username,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        surname: req.body.surname
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ uname: data.uname });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one
        console.log("registring student");
        const userdata = await collection.create(data);
        res.render("home");
        console.log(userdata);
    }

});
//register teacher
app.post("/signupt", async (req, res) => {

    const data = {
        uname: req.body.username,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        surname: req.body.surname
    }

    // Check if the username already exists in the database
    const existingUser = await collection1.findOne({ uname: data.uname });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one
        console.log("registring teacher");
        const userdata = await collection1.create(data);
        res.render("home");
        console.log(userdata);
    }

});
// Login student
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ uname: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.render("home");
        }
    }
    catch {
        res.send("wrong Details");
    }
});
//Login teacher
app.post("/logint", async (req, res) => {
    try {
        const check = await collection1.findOne({ uname: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.render("home");
        }
    }
    catch {
        res.send("wrong Details");
    }
});



// Define Port for Application
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});