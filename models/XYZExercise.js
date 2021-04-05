const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const xyzExerciseModel = {
   exercise_id: {
      type: String,
      required: true
   },
   category: {
      type: String,
      required: true
   },
   sub_category: {
      type: Array,
      required: true
   },
   question: {
      type: String,
      required: true
   },
   answer_options: {
      type: Array,
      required: true
   },
   correct_answer: {
      type: Number,
      required: true
   },
   figure_path: {
       type: String,
       required: false
   },
   difficulty: {
       type: Number,
       default: 1
   }
};

const xyzExerciseSchema = new Schema(xyzExerciseModel);
module.exports = mongoose.model("exercises", xyzExerciseSchema);