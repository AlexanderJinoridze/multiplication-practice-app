const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    username: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    results: [{ type: Types.ObjectId, ref: "Results" }]
});

module.exports = model("User", schema);