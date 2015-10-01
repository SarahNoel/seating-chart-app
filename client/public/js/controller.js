
app.controller('MainController',['$scope', '$location', '$http', 'SeatingService', function($scope, $location, $http, SeatingService) {

  $scope.getAll = function(){
     SeatingService.getAll($scope, $http);
  };

  $scope.getOne = function(id){
    SeatingService.getOne($scope, $http, id);
  };

  $scope.addOne = function(){
    SeatingService.addOne($scope, $http);
  };

  $scope.updateOne = function(){
    SeatingService.updateOne($scope, $http, this);
  };

  $scope.deleteOne = function(id){
    SeatingService.deleteOne($scope, $http, id);
  };

  $scope.chartFunction = function(){
    SeatingService.getAllChart($scope, $http);
  };

}]);
