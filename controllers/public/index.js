import express from "express";
import bcrypt from "bcrypt";
import { userRegisterValidations, userLoginValidations, errorMiddelware } from "../../middlewares/validations.js";
import userModel from "../../models/users/Users.js"
import authMiddleware from "../../middlewares/isAuthenticated.js";

const router = express();

/*
METHOD : POST
PUBLIC
API Endpoint : /auth/signup
REGISTER    
*/
router.post('/signup', userRegisterValidations(), errorMiddelware, async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        let existingUser = await userModel.findOne({ email });

        if (existingUser) return res.json({ error: "Email already exists" });
        // password hashing
        let hashPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            userName,
            email,
            password: hashPassword
        });
        await newUser.save();
        res.status(201).json({ success: true, message: "User Created Successfully", newUser });
    } catch (error) {
        console.log(error)
        if (error.code === 11000) { res.status(400).json({ msg: "Username already taken" }); }
        else { res.status(500).send(error.message); }
    };
});

/*
METHOD : POST
PUBLIC
API Endpoint : /auth/login
LOGIN
*/
router.post('/login', userLoginValidations(), errorMiddelware, async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userModel.findOne({ email });
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        };

        const isMatch = await bcrypt.compare(password, userData.password);

        if (isMatch) {
            req.session.userId = userData._id;

            console.log(req.session.userId, req.session.id)
            // Set a cookie 
            res.cookie('session_id', req.session.id, { httpOnly: true, secure: false });

            res.status(200).json({ success: true, message: "Login Successful", session_id: req.session.id, userData });
        } else {
            return res.status(401).json({ error: "Password does not match" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
})

/*
METHOD : GET
PRIVATE
API Endpoint : /auth/profile
PROFILE
*/
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.session.userId).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ success: true, message: "User Details", user});
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

/*
METHOD : PUT
PRIVATE
API Endpoint : /auth/profile
PROFILE UPDATE
*/
router.put("/profile", authMiddleware, async (req, res) => {
    try {
        const updates = req.body;
        const allowedUpdates = ["userName", "email", "password"];
        const updateFields = {};

        allowedUpdates.forEach(field => {
            if (updates[field]) {
                updateFields[field] = updates[field];
            }
        });
        if (updateFields.password) {
            updateFields.password = await bcrypt.hash(updateFields.password, 10);
        };
        const updatedUser = await userModel.findByIdAndUpdate(req.session.userId, updateFields, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        };
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

export default router;