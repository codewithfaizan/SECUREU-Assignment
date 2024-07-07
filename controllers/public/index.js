import express from "express";
import bcrypt from "bcrypt";
import { userRegisterValidations, userLoginValidations, errorMiddelware } from "../../middlewares/validations.js";
import userModel from "../../models/users/Users.js"

const router = express();

/*
METHOD : POST
PUBLIC
API Endpoint : /api/signup
desc : create a new user accoun
*/
router.post('/signup', userRegisterValidations(), errorMiddelware, async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        let emailCheck = await userModel.findOne({ email });

        if (emailCheck) return res.json({ error: "Email already exists" });
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
        console.error(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


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

            console.log( req.session.userId, req.session.id)
            // Set a cookie 
            res.cookie('session_id', req.session.id, { httpOnly: true, secure: false });

            res.status(200).json({ success: true, message: "Login Successful", session_id: req.session.id, userData });
        } else {
            return res.status(401).json({ error: "Password does not match" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
})

//test
router.get('/', (req, res) => {
    res.status(200).send("Get router working")
})
export default router;