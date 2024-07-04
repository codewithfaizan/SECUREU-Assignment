import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

(async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_SRV);
        console.log("Connected to DB");

    } catch (error){
        console.error(error);
    }
})()