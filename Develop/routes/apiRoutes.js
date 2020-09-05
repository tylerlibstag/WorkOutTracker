var WorkoutModel = require("../models/workoutBE")
module.exports = function(app){
    app.get('/api/workouts', function (req, res) {

        WorkoutModel.find({}, function (err, doc) {
          res.json(doc)
        });
      })
      
      app.get("/api/workouts/range", (req, res) => {
        WorkoutModel.find({}).limit(7)
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
      });
      
      
      app.post('/api/workouts',  (req, res) => {
        console.log("this is body", req.body)
        WorkoutModel.create(req.body)
          .then(doc => {
            console.log("this is doc",doc)
            res.json(doc);
          })
          .catch(err => {
            res.json(err);
          });
        // make a new workout
      })
      
      app.put("/api/workouts/:id", (req, res) => {
        console.log("this is req", req.body)
        console.log(req.params.id)
        WorkoutModel.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true })
          .then(workout => {
            res.json(workout);
          })
          .catch(err => {
            res.json(err);
          });
      });
}
