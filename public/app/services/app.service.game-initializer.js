angular.module('app.service.game-initializer', [])
  .factory('GameInitializer', function($interval, GameStarter, GameFinish, GameSocket) {
    return {
      initValues: function ($scope) {
        $scope.score = 0;
        $scope.timer = 0;
        $scope.moles = [];
        $scope.intervals = [];
        $scope.hasStarted = false;
        $scope.interval = null;
        $scope.gameEnded = false;
        if ($scope.interval) {
          GameFinish.clearGameTimer($scope);
        }
      },
      initMoles: function ($scope) {
        for (let i = 0; i < 9; i++) {
          $scope.moles[i] = {
            id: i,
            color: null,
            visible: (Math.random() > 0.35 ? true : false)
          }
          GameStarter.initMole($scope, i);      
        }
      },
      setCode: function ($scope, selection) {
        var self = this;

        if ('angular' == selection) {
          console.clear();
          console.log('Switched to front-end code.');
          $scope.codeAngularSelection = true;
          if ($scope.intervals.length > 0) {
            $interval.cancel($scope.interval);            
            $scope.intervals.forEach(function (interval, index) {
              GameFinish.clearMoleTimer($scope, index);
            });
          }
          self.initValues($scope);
          self.initMoles($scope);
          GameStarter.startAngular($scope);
          if ($scope.socket) {
            GameSocket.endConnection($scope);
          }
          
          $scope.resetAngular = function () {
            self.initValues($scope);
            self.initMoles($scope);
            GameStarter.startAngular($scope);
          };
        } else if ('node' == selection) {
          console.clear();
          console.log('Switched to back-end code.');
          $scope.codeAngularSelection = false;
          self.initValues($scope);
          GameSocket.initiateConnection($scope);
          GameSocket.startListener($scope);
          GameSocket.init($scope);
          GameStarter.startNode($scope);
          
          $scope.resetNode = function () {
            self.initValues($scope);
            GameSocket.initiateConnection($scope);
            GameSocket.startListener($scope);
            GameSocket.init($scope);
            GameStarter.startNode($scope);
          };
        }
      }
    };
  });