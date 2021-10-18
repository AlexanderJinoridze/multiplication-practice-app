const { Router } = require("express");
const Result = require("../models/Result");
const auth = require("../middleware/auth.middleware");
const result = require("../middleware/result.middleware");
const router = Router();

router.get("/:id", auth, async (req, res) => {
    try {
        const results = await Result.find({ user: req.params.id });
        res.json(results);
    } catch(e) {
        res.status(500).json({ message: "Something went wrong"});
    }
});

router.post("/add", [auth, result], async (req, res) => {
    try {
        const resultEntity = new Result({ ...req.body });
        await resultEntity.save();
        res.status(201).json({ message: "New result added successfully" });
    } catch(e) {
        res.status(500).json({ message: "Something went wrong"});
    }
});

module.exports = router;