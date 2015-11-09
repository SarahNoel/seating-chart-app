app.factory('SeatingService', [ '$http','$q', function($http, $q){
  var SeatingService = {};

  SeatingService.getAll = function($http){
    var deferred = $q.defer();
    $http.get('/api/v1/students')
    .then(function(data) {
      deferred.resolve(data);
    });
    return deferred.promise;
  };


  SeatingService.getOne= function($http, id){
    var deferred = $q.defer();
    $http.get('/api/v1/student/' + id)
    .then(function(data) {
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  SeatingService.addOne = function($http, payload){
    var deferred = $q.defer();
    $http.post('/api/v1/students/', payload)
    .then(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  SeatingService.updateOne= function($http, id, payload){
    var deferred = $q.defer();
    $http.put('/api/v1/student/'+id, payload)
    .then(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  SeatingService.deleteOne = function($http, id){
    var deferred = $q.defer();
    $http.delete('/api/v1/student/'+id)
    .then(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  SeatingService.getAllChart = function($http){
    var deferred = $q.defer();
    var shuffled = false;
    var current;
    var studentInput;
    var students = [];
    var movesMade = 0;
    var attempts = 0;

    $http.get('/api/v1/students')
    .then(function(data) {
      studentInput = data.data;
      // shuffles given array
      while(studentInput.length > 0) {
        var index = Math.floor(Math.random() * (studentInput.length));
        students.push(studentInput[index]);
        studentInput.splice(index, 1);
      }
      // checks for restrictions
      while (shuffled === false){
        for (var i = 0; i < students.length; i++) {
          current = students[i];
          attempts++;
          if(i === 0){
            if(students[1].restrictions[0].indexOf(current.name) != -1 || current.restrictions[0].indexOf(students[1].name) != -1) {
              movesMade++;
              students.splice(i, 1);
              students.push(current);
            }
          }
          else if(i === students.length-1){
            if(students[i-1].restrictions[0].indexOf(current.name) != -1 || current.restrictions[0].indexOf(students[i-1].name) != -1){
              movesMade++;
              students.splice(i, 1);
              students.splice(0, 0, current);
            }
          }
          else if(students[i+1].restrictions[0].indexOf(current.name) != -1 || students[i-1].restrictions[0].indexOf(current.name) != -1 || current.restrictions[0].indexOf(students[i+1].name) != -1 || current.restrictions[0].indexOf(students[i-1].name) != -1) {
              movesMade++;
              students.splice(i, 1);
              students.push(current);
          }
        }
        if(movesMade === 0){
          shuffled = true;
        }
        if(attempts > 4000){
          deferred.resolve({students:students, message:"This is as shuffled as we can get it in a reasonable time.  Click to try again!"});
          return deferred.promise;
        }
        else{
          movesMade = 0;
        }
      }
      deferred.resolve({students:students, message:null});
    });
  return deferred.promise;
  };

return SeatingService;
}]);
