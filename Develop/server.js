const express = require("express");
const mongoose = require("mongoose");
let WorkoutModel = require("./models/workoutBE");


const PORT = process.env.PORT || 3000

const app = express();

const path = require('path')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://tyler:12345@cluster0.mou2g.mongodb.net/Cluster0", {
  useNewUrlParser: true,
  useFindAndModify: false
});

//mongodb+srv://cluster0.mou2g.mongodb.net/<dbname
// mongodb+srv://admintyler:12345@cluster0.mou2g.mongodb.net/Cluster0

//const db = require("./models");

// routes
//app.use(require("./routes/api.js"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/exercise', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'exercise.html'))
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});


app.get('/api/workouts', function (req, res) {

  WorkoutModel.find({}, function (err, doc) {
    res.json(doc)
  });
})

app.get("/api/workouts/range", (req, res) => {
  WorkoutModel.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


app.post('/api/workouts', function ({ body }, res) {
  console.log("this is body", body)
  WorkoutModel.create({})
    .then(doc => {
      res.json(doc);
    })
  // make a new workout
})

app.put("/api/workouts/:id", (req, res) => {

  WorkoutModel.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true })
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});