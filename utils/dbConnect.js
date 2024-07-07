import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_SRV);
        console.log("Connected to DB");

    } catch (error) {
        console.error(error).log("DB Error" );
    }
}

export default dbConnect;