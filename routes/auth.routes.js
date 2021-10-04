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
            .trim()
            .isLength({ min: 1, max: 256 })
            .not().matches(/^$|\s+/),
        check("email", "Invalid email syntax")
            .trim()
            .isLength({ min: 1, max: 320 })
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        check("password", "Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number, password must contain only Latin letters and numbers")
            .trim()
            .isLength({ min: 8, max: 128 })
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        check("confirmPassword")
            .trim()
            .custom(async (confirmPassword, {req}) => {
                const password = req.body.password;

                if(password !== confirmPassword){
                    throw new Error("Passwords must be same")
                }
            }),
        check("terms")
            .custom(async (terms) => {
                if(!terms){
                    throw new Error("You have to accept terms of service and privacy policy to sign up")
                }
            })
    ],
    async (req, res) => {
        try {
            const errors = await validationResult(req);

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