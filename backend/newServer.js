const express = require("express");
const session = require("express-session");
const cors = require("cors")

const app = express()

const PORT = process.env.PORT || 8000;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'session',
        cookies: {
            maxAge: 1000 * 60 * 60,
            sameSite: "none",
            secure: false,
        },
    })
);

//routes
app.post('/new', async (req, res) => {
    try {
        const name = req.body.name;
        req.session.name = name
        res.send({ message: 'saves' }).status(201);
    } catch (error) {
        console.log(error)

    }
});

//decode sent cookies
app.get('/name', async (req, res) => {
    try {
        console.log(req.session.name)
        res.send({ message: req.session.name })
    } catch (error) {
        console.log(error)
    }
})



app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
