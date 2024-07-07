import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import publicRouter from "./controllers/public/index.js"
import notesRouter from "./controllers/notes/index.js"
// import authMiddleware from "./middlewares/isAuthenticated.js";
import dbConnect from "./utils/dbConnect.js";//db connection
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
dbConnect();

app.use(session({
    secret: 'lmnopqrs',
    resave: false,
    saveUninitialized: false,
    cookie : {secure : false, maxAge : 1000*60*60*24 },
    store : MongoStore.create({
        mongoUrl : process.env.MONGODB_SRV,
        collectionName : 'sessions'
    })
}));


app.get('/', (req, res) => {
      res.status(200).send("SaaS application backend - Notes App");
});

app.use('/auth', publicRouter);
app.use('/api', notesRouter);

//Error Handling
app.use((req, res) => {
    res.status(404).send("Not Found - Invalid Route");
});

app.use((req, res, next) => {
    console.error(error);
    res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});