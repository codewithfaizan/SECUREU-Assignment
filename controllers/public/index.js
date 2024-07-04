import express from "express";
import bcrypt from "bcrypt";
import userModel from "../../models/users/Users.js"

const router = express();

/*
METHOD : POST
PUBLIC
API Endpoint : /api/signup
desc : create a new user accoun
*/
router.post('/signup', async (req, res) => {
    try {
        const userData = new userModel(req.body);
        let emailCheck = await userModel.findOne({ email: userData.email });

        if (emailCheck) return res.json({ error: "User exists" });
        // password hashing
        let hashPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashPassword;

        await userData.save();
        return res.status(201).json({ success: true, message: "User Created Successfully", userData });
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userModel.findOne({ email });
        console.log(password, userData.password)
        if (userData) {
            let emailFound = await bcrypt.compare(password, userData.password);
  
            if (emailFound) {
                let payload = { user_id: userData._id, email: userData.email }

                return res.status(200).json({ success: true, message: "Login Successful" });
            } else {
                return res.status(401).json({ error: "Password does not match" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

//test
router.get('/', (req, res) => {
    res.status(200).send("Get router working")
})
export default router;