angular.module('app.service.game-finish', [])
  .factory('GameFinish', function($interval, GameSocket) {
    return {      
      checkGameEnd: function ($scope) {
        var self = this;
        var visibleCount = 0;

        $scope.moles.forEach(function (element) {
          if (element.visible) {
            visibleCount++;
          }
        });
        if ($scope.timer == 60) {
          if ($scope.interval) {
            $interval.cancel($scope.interval);
          }
          $scope.gameEnded = true;
          $scope.intervals.forEach(function (interval, index) {
            self.clearMoleTimer($scope, index);
          });
          console.log('Your score is ' + $scope.score + '.');
          console.log('Game has finished in ' + $scope.timer + 's.');
        }
      },
      clearGameTimer: function ($scope) {
        $interval.cancel($scope.interval);        
      },
      clearMoleTimer: function ($scope, index) {
        clearInterval($scope.intervals[index]);
      }
    };
  });