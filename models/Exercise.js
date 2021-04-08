const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionModel = {
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
   difficulty: {
      type: Number,
      default: 1
  },
  solution: {
      type: String,
      required: false 
  }
}; 

const questionsSchema = new Schema(questionModel);

const exerciseModel = {
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
   figure_path: {
      type: String,
      required: false
   },
   questions: {
      type: [questionsSchema],
      required: true
   }
};

const exerciseSchema = new Schema(exerciseModel);
module.exports = mongoose.model("exercises", exerciseSchema);