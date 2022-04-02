const express = require("express");
const router = express.Router(); 
const Exercise = require("../../models/Exercise");
const UserExercises = require("../../models/UserExercises");
const passport = require("passport");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.use(passport.authenticate("jwt", { session: false }))

router.get('/excercise_test', (req, res) => {
    const { id } = req.body;
    Exercise.find({id})
                .then(exercise => {
                    console.log(exercise)
                    return res.json(exercise)
                })
                .catch(err => console.log('error i excersice_test', err))
});

router.post("/insert", async (req, res) => {
    const { exercise } = req.body;
    const user = req.user;
    console.log(exercise);
    console.log(user);
    const exercise_id = exercise.exercise_id;
    if(!(user.isAdmin === true)) {
        res.sendStatus(403);
    }
    try {
        const newExercise = new Exercise(exercise);
        await Exercise.findOneAndUpdate({ exercise_id: exercise_id} , newExercise, {
            new: true,
            upsert: true // Create if doesnt exist
        });
        res.json(exercise);
    } catch (err) {
        res.status(500).json({error: "Couldn't create exercise"});
    }
});

router.get('/progress', async (req, res) => {
        const { _id } = req.user;
        try {
            const user_exercise_progress = await getExerciseProgress(_id)
            res.status(200).json(user_exercise_progress);
        } catch (error) {
            res.status(500).json({error: 'Error geting the user progress'});
        }
    }
);

const getExerciseProgress = async (user_id) => {
    return Exercise.aggregate(
        [
            {$lookup: {
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
            {$project: {
                    _id: 1,
                    category: 1,
                    sub_category: 1,
                    user_has_done_exercise: {$size: '$done_exercises'}
                   }
            },
            {$group: {
                    _id: {category: '$category'},
                    user_amount: {$sum: '$user_has_done_exercise'}, 
                    sub_category: {$push: { sub_category: '$sub_category', user_amount: {$sum: '$user_has_done_exercise' }}},
                    number_of_category_exercises: {$sum: 1}
                }
            },
            {$unwind: "$sub_category" },
            {$unwind: "$sub_category.sub_category" },
            {$group: {
                    _id: {
                        category: "$_id.category",
                        sub_category: "$sub_category.sub_category"
                    },
                    user_amount: {$first: '$user_amount'},
                    user_sub_category_amount: {$sum: "$sub_category.user_amount"},
                    number_of_category_exercises: {$first: "$number_of_category_exercises"},
                    sub_category_exercises: {$sum: 1}
                }
            },
            {$group: {
                    _id: "$_id.category",
                    number_of_category_exercises: {$first: "$number_of_category_exercises"},
                    user_amount: {$first: '$user_amount'},
                    sub_category: {$push: 
                            {
                                name: "$_id.sub_category", 
                                amount: "$sub_category_exercises", 
                                user_amount: "$user_sub_category_amount" 
                            }
                            }
                 }
            }
        ]
    );
};

router.get('/:category/:sub_category', async (req, res) => {
    const { _id } = req.user;
    const { category, sub_category } = req.params;
    try {
        const sub_category_exercises = await getSubCategoryExercises(category, sub_category, _id);
        console.log('sub_category_exercises : ', sub_category_exercises)
        res.status(200).json(sub_category_exercises);
    } catch (error) {
        res.status(500).json({error: 'Error fetching the exercises'});
    }
});

router.post('/completed', async (req, res) => {
    const { _id } = req.user;
    const { exercise_id, user_difficulty } = req.body;
    console.log(exercise_id, user_difficulty, _id );
    try {
        const addedDoc = await updateUserExercises(_id, exercise_id, user_difficulty);
        const avgScore = await getAvgExerciseScore(exercise_id);
        const updatedExercise = await updateExerciseDifficulty(exercise_id, avgScore[0].difficulty);
        console.log("==========================");
        console.log(updatedExercise)
        // console.log(avgScore[0].difficulty);
        console.log("==========================");
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    // res.status(200)
    // TODO:
    // Create new entry in schema for number of user's done the exercise
    // create or update user_exercises

    // Update exercise with new average score
});

const updateUserExercises = async (user_id, exercise_id, user_difficulty) => {
    return UserExercises.updateOne({ exercise_id: exercise_id, user_id: user_id }, { user_difficulty: user_difficulty }, {upsert: true, setDefaultsOnInsert: true});
}

const getAvgExerciseScore = async (exercise_id) => {
    return UserExercises.aggregate([
        { "$match": { "exercise_id" : ObjectId(exercise_id) } },
        { "$group":
             { 
                 _id: "$exercise_id", 
                 difficulty: { $avg: "$user_difficulty" }
          } 
        }
    ]);
}

const updateExerciseDifficulty = async ( _id, difficulty) => {
    return Exercise.findOneAndUpdate({_id: ObjectId(_id)}, {difficulty: difficulty});
};

router.put('/updateScore', async (req, res) => {
    const { _id } = req.user;
    const { exercise_id, difficulty } = req.body;
    // TODO:
    // Create new entry in schema for number of user's done the exercise
    // create or update user_exercises

    // Update exercise with new average score
});

const getSubCategoryExercises = (category, sub_category, user_id) => {
    return Exercise.aggregate(
        [
            {$match: {category: category, sub_category: sub_category}},
            {$lookup: {
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
            {$addFields: {user_has_done_exercise: {$cond: [{$gt: [{$size: "$done_exercises"}, 0]}, true, false]}}}
        ]
    )
};

module.exports = router;