import { body, validationResult } from "express-validator";

const userRegisterValidations = () => {
    return [
        // body("fullName", "Full Name is Required").notEmpty().isLength({ min: 2, max: 25 }).withMessage("Length shuld be >2, <25 letters"),
        body("userName").notEmpty().isLength({ min: 2, max: 25 }).withMessage("UserName is Required"),

        body("email", "Should be a Valid Email").isEmail(),
        // body("phone").isMobilePhone().withMessage("Should be a Valid Phone Number"),

        body("password").notEmpty().isLength({ min: 4, max: 16 }).withMessage("Minimun 6 characters required"),

        body("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password did Not Match")
            }
            return true
        })
    ]
};

// userName: {
//     type: String, required: true, unique : true, maxlength: 15, minlength: 2 },
// email: {
//     type: String, required: true, unique: true},
// password: {
//     type: String, required: true, minlength: 6},
// notes: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "Note" } ]


const userLoginValidations = () => {
    return [
        body("email", "Should be a Valid Email").isEmail(),
        body("password").notEmpty().isLength({ min: 6, max: 16 }).withMessage("Minimun 6 characters required")
    ]
};

function errorMiddelware(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors["errors"] })
    }
    return next();
;}

export { userRegisterValidations, userLoginValidations, errorMiddelware }