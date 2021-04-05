const express = require("express");
const router = express.Router(); 
const XYZExesercise = require("../../models/XYZExercise");

router.get('/excercise_test', (req, res) => {
    const { id } = req.body;
    XYZExesercise.find({id})
                .then(exercise => {
                    console.log(exercise)
                    return res.json(exercise)
                })
                .catch(err => console.log('error i excersice_test', err))
});

module.exports = router;