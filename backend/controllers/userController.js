import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//Route For User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, msg: "Please provide all the fields" });
        }

        //New User
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, msg: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(err);
        return res.json({ success: false, msg: err.message });
    }
}

//Route For User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Existing User
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, msg: "User Already Exists" });
        }

        //validating email format and strong password

        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "Invalid Email Format" });
        }
        if (password.length < 8) {
            return res.json({ success: false, msg: "Please enter strong password" });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (err) {
        console.log(err);
        return res.json({ success: false, msg: err.message });
    }
}

//Route For Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, msg: "Please provide all the fields" });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        }else{
            return res.json({ success: false, msg: "Invalid Admin Credentials" });
        }
    } catch (error) {
        console.log(err);
        return res.json({ success: false, msg: err.message });  
    }
}


export { loginUser, registerUser, adminLogin };