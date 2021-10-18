const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    dateCreated: { type: String, required: true },
    operands: { type: [Number], require: true },
    isCorrect: { type: Boolean, required: true },
    timeNeeded: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Result", schema);