angular.module('app.service.game-starter', [])
  .factory('GameStarter', function($interval, $http, GameSocket, GameFinish) {
    function callPowElement (index) {
      var images = ['pow', 'wham', 'zap', 'boink', 'zoing', 'pow', 'wham', 'zap', 'boink', 'zoing'];
      var moleElement = angular.element('#mole' + index);
      var powElement = '<img class="mole-zap" src="/assets/img/' + images[Math.floor((Math.random() * 10))] + '.svg" />';
      moleElement.append(powElement);
    }

    function randomize (multiplier) {
      return Math.random() * multiplier;
    }

    return {      
      startAngular: function ($scope) {
        var self = this;

        $scope.click = function (index) {
          callPowElement(index);
          if (!$scope.hasStarted) {
            $scope.hasStarted = true;
            GameFinish.clearGameTimer($scope);
            self.startGameTimer($scope);
            $scope.moles.forEach(function (mole, index) {
              GameFinish.clearMoleTimer($scope, index);
              self.startMoleTimer($scope, index);
            });
          }
          GameFinish.clearMoleTimer($scope, index);
          self.startMoleTimer($scope, index);
          $scope.score++;
          $scope.moles[index].visible = false;
        };
      },
      startNode: function ($scope) {
        var self = this;
        
        $scope.click = function (index) {
          $scope.moles[index].visible = !$scope.moles[index].visible;          
          callPowElement(index);
          GameSocket.sendMoleEvent($scope, index);
        };
      },
      initMole: function ($scope, index) {        
        $http({
          method: 'POST',
          url: '/api/mole-generator',
          contentType: 'application/json',
          data: JSON.stringify($scope.moles[index]),
          processData: false
        })
        .then(function (response) {
          $scope.moles[index].color = response.data.color;
        })
        .catch(function (xhr, ajaxOptions, thrownError) {
          console.log("Error: " + xhr + "\n" + xhr.responseText + "\n" + JSON.stringify(thrownError));
        });
      },
      startGameTimer: function ($scope) {
        $scope.interval = $interval(function () {
          GameFinish.checkGameEnd($scope);
          $scope.timer += 1;
        }, 1000);
      },
      startMoleTimer: function ($scope, index) {
        var self = this;

        $scope.intervals[index] = setInterval(function () {
          $scope.moles[index].visible = !$scope.moles[index].visible;
          self.initMole($scope, index);
        }, $scope.baseIntervalLength - randomize(500) - $scope.baseDecayLength);
      }
    };
  });