const mongoose = require("mongoose");

const Schema = mongoose.Schema

const excerciseSchema = new Schema({

    type: {
        type: String,
        required: "Enter a type of excercise"
    },
    name: {
        type: String,
        trim: true,
        required: "Enter an excercise name"
    },
    weight: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    distance: {
        type: Number,
    },
      
});

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [excerciseSchema] 
}, {
    toJSON: {
        virtuals: true
}});

workoutSchema.virtual("totalDuration").get(function () {

    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;