const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/result", require("./routes/result.routes"));

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || config.get("port") || 5000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        if(process.env.NODE_ENV === "production"){
            app.use(express.static("client/build"));
        }

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch(e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();