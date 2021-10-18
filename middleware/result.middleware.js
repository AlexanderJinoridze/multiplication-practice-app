module.exports = (req, res, next) => {

    const resultObject = req.body;

    if(!(typeof resultObject === 'object' && resultObject !== null && !Array.isArray(resultObject))) {
        return res.status(401).json({ message: "Expecting object"});
    }

    let operands = resultObject.operands;
    let ISODateRegex = /\d{4}-[01]\d-[0-3]\d/;

    if(operands.length !== 2 || operands.some(elem => typeof elem !== "number")) {
        return res.status(401).json({ message: "Incorrect operands field, expecting array with 2 numbers"});
    }

    if(typeof resultObject.isCorrect !== "boolean") {
        return res.status(401).json({ message: "Incorrect isCorrect field, expecting value of boolean type"});
    }

    if(typeof resultObject.timeNeeded !== "number") {
        return res.status(401).json({ message: "Incorrect timeNeeded field, expecting value of number type"});
    }

    if(!ISODateRegex.test(resultObject.dateCreated)) {
        return res.status(401).json({ message: "Incorrect dateCreated field, expecting value of date type in ISO standart format"});
    }

    next();
}