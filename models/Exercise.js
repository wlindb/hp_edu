const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionModel = {
   question: {
      type: [String],
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
   solution: {
      type: [String],
      required: false 
   }
}; 

const questionsSchema = new Schema(questionModel);

const exerciseModel = {
   exercise_id: {
      type: String,
      required: true
   },
   rateCount: {
      type: Number,
      default: 1
   },
   rateValue: {
      type: Number,
      default: 3 // 1 to 5
   },
   category: {
      type: String,
      required: true
   },
   sub_category: {
      type: Array,
      required: true
   },
   img_src: {
      type: [String],
      required: false
   },
   img_description: {
      type: [String],
      required: false
   },
   questions: {
      type: [questionsSchema],
      required: true
   },
   description: {
      description_header: {
         type: String,
         required: false
      },
      description_body: {
         type: [String],
         required: false
      }
   }
};

const exerciseSchema = new Schema(exerciseModel);
module.exports = mongoose.model("exercises", exerciseSchema);