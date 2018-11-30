angular.module('app.controller', [])
  .controller('GameController', function ($scope, GameInitializer, GameStarter, GameFinish, GameSocket) {
    $scope.score = null;
    $scope.moles = [];
    $scope.timer = null;
    $scope.hasStarted = false;
    $scope.interval = null;
    $scope.intervals = [];
    $scope.gameEnded = false;
    $scope.baseIntervalLength = 1500;
    $scope.baseDecayLength = 100;

    GameInitializer.setCode($scope, 'angular');
    
    $scope.setCodeSelection = function (selection) {
      GameInitializer.setCode($scope, selection);
    };
  });