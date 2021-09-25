const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
    "/register",
    [
        check("username", "Invalid username")
            .not().isEmpty(),
        check("email", "Invalid email")
            .isEmail(),
        check("password", "Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number, password must contain only Latin letters and numbers")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Some data of registration form is invalid"
                })
            }

            const { username, email, password } = req.body;
            const candidate = await User.findOne({ email });

            if(candidate) {
                return res.status(400).json({ message: "User with this Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ username, email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: "User created" });

        } catch(e) {
            res.status(500).json({ message: `Something went wrong, try next time ${e.message}` });
        }
    }
);

// /api/auth/login
router.post(
    "/login",
    [
        check("email", "Enter correct email").normalizeEmail().isEmail(),
        check("password", "Enter password").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Some data is invalid"
                })
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if(!user) {
                return res.status(400).json({ message: "No user with such email or password" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({ message: "Wrong password, try again" });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get("jwtSecret"),
                { expiresIn: "1h" }
            );

            res.json({ token, userId: user.id });

        } catch(e) {
            res.status(500).json({ message: "Something went wrong, try next time" });
        }
    }
);

module.exports = router;