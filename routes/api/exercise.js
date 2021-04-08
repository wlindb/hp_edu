const express = require("express");
const router = express.Router(); 
const Exercise = require("../../models/Exercise");

router.get('/excercise_test', (req, res) => {
    const { id } = req.body;
    Exercise.find({id})
                .then(exercise => {
                    console.log(exercise)
                    return res.json(exercise)
                })
                .catch(err => console.log('error i excersice_test', err))
});

router.post("/insert", (req, res) => {
    const { exercise } = req.body;
    console.log(exercise);
    const exercise_id = exercise.exercise_id;
    console.log(exercise_id);
    Exercise.findOne({ exercise_id })
            .then(potential_exercise => {
                if(potential_exercise) {
                    return res.status(400).json({error: "Övningen finns redan"});
                } else {
                    const newExercise = new Exercise(exercise);
                    newExercise.save()
                            .then(exercise => res.json(exercise))
                            .catch(err => console.log(err));
                }
            }) 
});

module.exports = router;