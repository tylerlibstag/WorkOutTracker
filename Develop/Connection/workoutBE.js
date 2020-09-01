const mongoose = require("mongoose");

const Schema = moongoose.Schema

const fitnessSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "Enter a type of excercise"
    },
    name: {
        type: Number,
        trim: true,
        required: "Enter an excercise name"
    },

    weight: {
        type: Number,
        required: "Enter an excercise name"
    },
    duration: {
        type: Number,
        required: "Enter duration time in minutes"
    },
    sets: {
        type: Number,

    },
    reps: {
        type: Number,

    },
    distances: {
        type: Number,

    },

})

const Workout = mongoose.model("Workout", fitnessSchema);

module.exports = Workout;