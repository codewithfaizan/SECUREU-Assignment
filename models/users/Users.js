import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String, required: true, unique: true, maxlength: 15, minlength: 2
        },
        email: {
            type: String, required: true, unique: true
        },
        password: {
            type: String, required: true, minlength: 6
        },
    }, { timestamps: true }
);

export default mongoose.model("Users", userSchema, "Users");