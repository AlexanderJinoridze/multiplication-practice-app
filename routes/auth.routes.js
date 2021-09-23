const { Router } = reuqire("express");
const bcrypt = reuqire("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post("/register",
    [
        check("email", "Invalid email")
            .isEmail(),
        check("password", "Password should have at least 6 characters")
            .isLength({ min: 6 })
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
            const candidate = await User.findOne({ email });

            if(candidate) {
                return res.status(400).json({ message: "User with this Email already exists" });
            }

            const hashedPassword = bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: "User created" });

        } catch(e) {
            res.status(500).json({ message: "Something went wrong, try next time" });
        }
    }
);

// /api/auth/login
router.post("/login", async (req, res) => {

});

module.exports = router;