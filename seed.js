var mongoose = require('mongoose');
var Student = require('./server/models/student.js');

var studentSeed = [
  {
  "name": "Jimmy Nuetron",
  "gender": "Male",
  "picture": "http://static.comicvine.com/uploads/scale_super/11/110026/2813584-jimmy_neutron.jpg",
  "restrictions": ['none']
  },
  {
  "name" : "Cindy Vortex",
  "gender" : "Female",
  "picture" : "http://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/char_37301.jpg",
  "restrictions" : ["Jimmy Nuetron"]
  },
  {
  "name" : "Libby Folfax",
  "gender" : "Female",
  "picture" : "http://images1.nick.com/nick-assets/shows/images/jimmy-neutron/characters/character_large_332x363_libby.jpg?height=363&width=332&quality=0.75",
  "restrictions" : ["Cindy Vortex"],
  },
  {
  "name" : "Carl Wheezer",
  "gender" : "Male",
  "picture" : "http://vignette2.wikia.nocookie.net/jimmyneutron/images/8/86/CarlWheezer.jpg/revision/latest?cb=20080714175127",
  "restrictions" : ["Jimmy Nuetron"],
  }
];

function databaseSeed() {
  Student.find({}, function(err, documents){
    if(!err && documents.length===0) {
      for (var i = 0; i < studentSeed.length; i++) {
        var newStudent = new Student(studentSeed[i]);
        newStudent.save(function(err, success){
          if(!err) {
            console.log('database object seeded.');
          }
        });
      }
    }
  });
}

module.exports = databaseSeed;

