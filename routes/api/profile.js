const express = require("express");
const router = express.Router();
const passport = require("passport");
const SECRET = process.env.SECRET;

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        //verify the JWT token generated for the user
        res.status(200).json(req.user.user_name);
    }
);

module.exports = router;
