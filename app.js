import express from "express";
import dotenv from "dotenv"; 
import publicRouter from "./controllers/public/index.js"

import "./utils/dbConnect.js"; //db connection
dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.get('/', (req, res)=> {
    res.status(200).json({message : "Server is Running"}); 
});
app.use('/api/auth', publicRouter)
//Error Handling
app.use((req, res, next)=> {
    console.error(error);
    res.status(500).send("Internal Server Error");
});

app.use((req, res)=> {
    res.status(404).send("Not Found - Invalid Route");
});

app.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`);
});