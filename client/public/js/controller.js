
app.controller('MainController',['$scope', '$location', '$http', 'SeatingService', function($scope, $location, $http, SeatingService) {

  $scope.getAll = function(){
    $scope.showStudents = true;
    $scope.showOneStudent =  $scope.showChart = false;
    SeatingService.getAll($http)
    .then(function(data){
        $scope.studentData = data.data;
    });
  };

  $scope.getOne = function(id){
    $scope.showOneStudent = $scope.update =  true;
    $scope.showStudents = $scope.showChart = false;
    SeatingService.getOne($http, id)
    .then(function(data){
      var student = data.data;
      var restrict = stringMaker(student.restrictions);
      $scope.name = student.name;
      $scope.gender = student.gender;
      $scope.picture = student.picture;
      $scope.restrictions = restrict;
      $scope.id = student._id;
    });
  };

  $scope.addOne = function(){
    $scope.showOneStudent = true;
    $scope.showStudents = $scope.showChart = false;
    var restrict = arrayMaker($scope.restrictions);
    var payload = {
      name: $scope.name,
      gender: $scope.gender,
      picture: $scope.picture,
      restrictions: restrict,
    };
    SeatingService.addOne($http, payload)
    .then(function(data){
    $scope.getAll();
    $scope.showOneStudent = $scope.showChart = false;
    $scope.showStudents = true;
    });
  };

  $scope.updateOne = function(){
    var restrict = arrayMaker($scope.restrictions);
    var payload = {
      name: $scope.name,
      gender: $scope.gender,
      picture: $scope.picture,
      restrictions: restrict,
    };
    SeatingService.updateOne($http, this.id, payload)
    .then(function(data){
      $scope.name = $scope.gender = $scope.picture = $scope.restrictions = ('');
      $scope.getAll();
    });
  };

  $scope.deleteOne = function(id){
    SeatingService.deleteOne($http, id)
    .then(function(data){
      $scope.getAll();
    });
  };

  $scope.chartFunction = function(){
    $scope.message = '';
    $scope.randoChart = $scope.showChart = true;
    $scope.showStudents = $scope.showOneStudent = $scope.addNew = $scope.cancel = $scope.firstChart = false;
    SeatingService.getAllChart($http)
    .then(function(data){
      $scope.studentChartData = data.students;
      $scope.message = data.message;
    });
  };

  function arrayMaker(str){
    var arr = str.split(',');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    }
    return arr;
  }

  function stringMaker(array){
    array = array.join().replace(/,/g, ', ');
    return array;
  }

 $scope.getAll();
}]);











