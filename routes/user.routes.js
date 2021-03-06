const { Router } = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.get("/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch(e) {
        res.status(500).json({ message: "Something went wrong"});
    }
});

router.delete("/delete/:id", auth, async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ message: "User deleted"});
    } catch(e) {
        res.status(500).json({ message: "Something went wrong"});
    }
});

module.exports = router;