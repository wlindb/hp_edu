const express = require("express");
require("dotenv").config(); // for loading environment variables
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const users = require("./routes/api/user");
const publicPath = path.join(__dirname, 'client', 'build');
const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db configuration
const MONGO_URI = process.env.MONGO_URI;

mongoose
   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("Mongo Connection successful"))
   .catch(err => console.log("err in mongoose connection"));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use("/api/users", users);

// Serve client
if (process.env.NODE_ENV === "production") {
    app.use(express.static(publicPath));
    app.get("*", (req, res) => {
        // res.send('hello world');
       res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));