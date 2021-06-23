const express = require("express");
const router = express.Router(); 
const Exercise = require("../../models/Exercise");
const passport = require("passport");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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

router.get('/progress',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { _id } = req.user;
        console.log('user', _id)
        getExerciseProgress(_id)
        res.status(200).json(req.user);
    }
);

const getExerciseProgress = (user_id) => {
    Exercise.aggregate([
                {$lookup: 
                    {
                        from: 'user_exercises',
                        let: {exercise_id: '$_id'},
                        pipeline: [
                            {$match: {$expr: 
                                    {$and:
                                        [
                                        {$eq: [ "$exercise_id",  "$$exercise_id" ]},
                                        {$eq: ["$user_id", ObjectId(user_id)]}
                                        ] 
                                    }
                                }
                            },
                        ],
                        as: 'done_exercises'
                    }
                },
                {$addFields: {user_amount: {$size: '$done_exercises'}}},
                {$project: {done_exercises: 0}},
                {$group: {
                        _id: {category: "$category", user_amount: "$user_amount"}, 
                        sub_category: {$push: "$sub_category" },
                        number_of_category_exercises: {$sum: 1}
                    }
                },
                {$unwind: "$sub_category" },
                {$unwind: "$sub_category" },
                {$group: {
                        _id: {
                            category: "$_id.category",
                            sub_category: "$sub_category",
                            user_amount: "$_id.user_amount"
                        },
                        number_of_category_exercises: {$first: "$number_of_category_exercises"},
                        sub_category_exercises: {$sum: 1}
                    }
                },
                {$group: {
                        _id: "$_id.category",
                        number_of_category_exercises: {$first: "$number_of_category_exercises"},
                        user_amount: {$sum: "$_id.user_amount"},
                        sub_category: {$push: 
                                {
                                    name: "$_id.sub_category", 
                                    amount: "$sub_category_exercises", 
                                    user_amount: "$_id.user_amount" 
                                }
                                }
                    }
                }
            ])
            .then(exercise_list => {
                console.log('exercise_list = ', exercise_list)
                exercise_list[0]['sub_category'].forEach(item => console.log(item))
                exercise_list[1]['sub_category'].forEach(item => console.log(item))
            })
            .catch(err => console.error(err))
};

module.exports = router;