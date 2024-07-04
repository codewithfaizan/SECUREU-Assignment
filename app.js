import express from "express";
import dotenv from "dotenv"; 

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.get('/', (req, res)=> {
    const data = {name: "Server is Running"};
    res.status(200).json(data); 
});

//Error Handling
app.use((req, res, next)=> {
    console.error(error);
    res.status(500).send("Internal Server Error");
});

app.use((req, res)=> {
    res.status(404).send("Not Found - Invalid Route");
});

// Invoke the app's listen
app.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`);
});