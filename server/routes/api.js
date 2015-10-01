var express = require('express');
var router = express.Router();
var Student = require('../models/student.js');

//get all students
router.get('/students', function(req, res, next) {
  Student.find(function(err, students){
    res.json(students);
  });
});

//get one student
router.get('/student/:id', function(req, res, next) {
  Student.findById(req.params.id, function(err, student){
    res.json(student);
  });
});

//post-add one student
router.post('/students', function(req, res, next) {
  new Student(req.body)
  .save(function(err, student){
    res.json(student);
  });
});

//put-update one student
router.put('/student/:id', function(req, res, next) {
  var query = {'_id':req.params.id};
  var update = req.body;
  var options = {new: true};
  Student.findOneAndUpdate(query, update, options, function(err, student){
    res.json(student);
  });
});

//delete-delete one student
router.delete('/student/:id', function(req, res, next){
  var query = {'_id': req.params.id};
  Student.findOneAndRemove(query, function(error, student){
    res.json(student);
  });
});

module.exports = router;
