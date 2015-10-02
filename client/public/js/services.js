app.factory('SeatingService', function(){
  var SeatingService = {};

  SeatingService.getAll = function($scope, $http){
    $scope.showStudents = true;
    $scope.showOneStudent =  $scope.showChart = false;
    $http.get('/api/v1/students')
    .then(function(data) {
      $scope.studentData = data.data;
    });
  };


  SeatingService.getOne= function($scope, $http, id){
    $scope.showOneStudent = $scope.update =  true;
    $scope.showStudents = $scope.showChart = false;
    $http.get('/api/v1/student/' + id)
    .then(function(data) {
      var student = data.data;
      $scope.name = student.name;
      $scope.gender = student.gender;
      $scope.picture = student.picture;
      $scope.restrictions = student.restrictions;
      $scope.id = student._id;
    });
  };

  SeatingService.addOne = function($scope, $http){
    $scope.showOneStudent = true;
    $scope.showStudents = $scope.showChart = false;
    var payload = {
      name: $scope.name,
      gender: $scope.gender,
      picture: $scope.picture,
      restrictions: $scope.restrictions,
    };
    $http.post('/api/v1/students/', payload)
    .then(function(data) {
    });
    $scope.getAll($scope, $http);
    $scope.showOneStudent = $scope.showChart = false;
    $scope.showStudents = true;
  };

  SeatingService.updateOne= function($scope, $http, place){
     var payload = {
      name: $scope.name,
      gender: $scope.gender,
      picture: $scope.picture,
      restrictions: $scope.restrictions,
    };
    $http.put('/api/v1/student/'+place.id, payload)
    .then(function(data){
      $scope.name = $scope.gender = $scope.picture = $scope.restrictions = ('');
      $scope.getAll($scope, $http);
    });
  };

  SeatingService.deleteOne = function($scope, $http, id){
    $http.delete('/api/v1/student/'+id)
    .then(function(data){
    $scope.getAll($scope, $http);
    });
  };

  SeatingService.getAllChart = function($scope, $http){
    $scope.randoChart = $scope.showChart = true;
    $scope.showStudents = $scope.showOneStudent = $scope.addNew = $scope.cancel = $scope.firstChart = false;
    var shuffled = false;
    var current;
    var studentInput;
    var students = [];
    var movesMade = 0;
    var move;
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
      while (shuffled ===false){
        for (var i = 0; i < students.length; i++) {
          current = students[i];
          if(i === 0){
            if(current.name === students[1].restrictions[0] || current.restrictions[0] === students[1].name){
              if(current.name != students[students.length-1].restrictions[0] && current.restrictions[0] != students[students.length-1].name){
              movesMade++;
              students.splice(i, 1);
              students.push(current);
              }
              else{
              movesMade++;
              move = Math.floor(Math.random() * students.length);
              students.splice(i, 1);
              students.push(move, 0, current);
              }
            }
          }
          else if(i === students.length-1){
            if(current.name === students[i-1].restrictions[0] || current.restrictions[0] === students[i-1].name){
              if(current.name != students[0].restrictions[0] && current.restrictions[0] != students[0].name){
              movesMade++;
              students.splice(i, 1);
              students.splice(0, 0, current);
              }
              else{
                movesMade++;
                move = Math.floor(Math.random() * students.length);
                students.splice(i, 1);
                students.push(move, 0, current);
              }
            }
          }
          else if(current.name === students[i+1].restrictions[0] || current.name === students[i-1].restrictions[0] || current.restrictions[0] === students[i+1].name || current.restrictions[0] === students[i-1].name){
            movesMade++;
            if(current.name != students[students.length-1].restrictions[0] && current.restrictions[0] != students[students.length-1].name){
              movesMade++;
              students.splice(i, 1);
              students.push(current);
            }
            else{
              movesMade++;
              move = Math.floor(Math.random() * students.length);
              students.splice(i, 1);
              students.push(move, 0, current);
            }
          }
        }
        if(movesMade === 0){
          shuffled = true;
        }
        else{
          movesMade = 0;
        }
      }
      $scope.studentChartData = students;
    });
  };



  //     studentInput = data.data;

  //     // while(shuffled === false){
  //     //   for (var i = 0; i < studentInput.length; i++) {
  //     //     current = studentInput[i];
  //     //     if(current.restrictions[0] != studentInput[i+1].restrictions[0]){
  //     //       console.log('wooo');
  //     //     }
  //     //   }



  //     // shuffled = true;
  //     // }
  //   $scope.studentChartData = studentInput;
  //   });
  // };



  //     // studentInput = data.data;
  //     while(studentInput.length > 0 ){
  //       for (var i = 0; i < studentInput.length; i++) {
  //         var index = Math.floor(Math.random() * studentInput.length);

  //         if(students.length === 0){
  //           students.push(studentInput[index]);
  //           studentInput.splice(index, 1);
  //         }
  //         else{
  //           if(studentInput[index].name != students[students.length-1].restrictions[0]){
  //           students.push(studentInput[index]);
  //           studentInput.splice(index, 1);
  //           }
  //           else{
  //             for (var j = 0; j < students.length; j++) {
  //               if(studentInput[index].name != students[j].restrictions[0] && studentInput[index].name != students[j-1].restrictions[0]){
  //                 students.splice(students[j], 0, studentInput[index]);
  //                 studentInput.splice(index, 1);
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   $scope.studentChartData = students;
  //   });
  // };



return SeatingService;
});
