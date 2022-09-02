var express = require('express');
var mongoose = require('mongoose');
var app = express();
var database = require('./config/database');
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var port = process.env.PORT || 8000;
var User = require('./model/user');
var cors = require('cors')

app.use(cors())


app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());  // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

mongoose.connect(database.url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function (error) {
    console.log(error)
})
mongoose.connection.on("open", function () {
    console.log("Connected to MongoDB database.")
})

const userService = require('./service/userService');
const authenticationService = require('./service/authenticationService');


app.post("/api/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { userId: user._id, email },
                "secret",
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});


app.post("/api/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});


app.put('/api/updateUser/:email', async (req, res) => {
    var email = req.params.email;
    var userObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    var result = userService.updateUser(email, userObj);
    console.log(result)
    if (result) {
        res.send("Updated")
    } else {
        res.send("failed")
    }
});

app.delete('/api/deleteUser/:email', async (req, res) => {
    var result = userService.deleteUser(req.params.email);
    console.log(result)
    if (result) {
        res.send("Deleted")
    } else {
        res.send("failed")
    }
});

app.get('/api/users/:id', async (req, res) => {
    console.log(req.params.id);
    const result = await User.findOne({ '_id': req.params.id });
    if (result) {
        console.log(result);
        res.send(result);
    } else {
        res.send("failed")
    }
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    if (users) {
        res.send(users);
    } else {
        res.send("failed")
    }
});


app.listen(port);
console.log("App listening on port : " + port);