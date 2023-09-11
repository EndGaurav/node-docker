const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const postRouter = require("./routes/postRoutes");
const authRouter = require("./routes/userRoutes");
const session = require("express-session");
const cors = require("cors");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const app = express();
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose
    .connect(MONGO_URL)
    .then(() => console.log(`Database is connected`))
    .catch((err) => {
        console.log(err)
        setTimeout(connectWithRetry, 5000);
    } )
};

connectWithRetry();


const port = process.env.PORT || 3000;


// middlewares
app.use(express.json());
app.use(cors({}))
app.enable("trust proxy");  // In this we are saying to express to trust the nginx whatever the header it is providing. Mostly we use it when we need ip address of the client.
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000
    }
}))
app.get("/api/v1", (req, res) => {
    res.send("<h2>Hello there.</h2>");
    console.log("heello everyone")
})
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", authRouter)

app.listen(port, () => console.log(`The server is running on port ${port}`));