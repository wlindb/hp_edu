const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userExercisesModel = {
   user_id: {
      type: Schema.Types.ObjectId,
      required: true
   },
   exercise_id: {
      type: Schema.Types.ObjectId,
      required: true
   },
   user_difficulty: {
      type: Number,
      min: 1,
      max: 5,
      required: true
   },
};

const UserExercisesSchema = new Schema(userExercisesModel);
module.exports = mongoose.model("user_exercises", UserExercisesSchema);