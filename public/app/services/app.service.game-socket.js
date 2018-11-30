angular.module('app.service.game-socket', [])
.factory('GameSocket', function() {  
  return {
    initiateConnection: function ($scope) {
      $scope.socket = io.connect('http://localhost:3002');
      console.log('Connection from client initiated.');
    },
    init: function ($scope) {
      $scope.socket.emit('init');
    },
    sendMoleEvent: function ($scope, index) {
      $scope.socket.emit('click', index);
      console.log('Mole index sent.');
    },
    startListener: function ($scope) {
      var self = this;

      $scope.socket.on('echo', function (data) {
        console.log('Server sent: ', data);
      });

      $scope.socket.on('init', function (moles) {
        console.log('Moles: ', moles);
        $scope.moles = angular.copy(moles);
        $scope.$digest();
      });

      $scope.socket.on('moleInterval', function (index) {
        $scope.moles[index].visible = !$scope.moles[index].visible;        
        console.log('Mole event: ' + index);
        $scope.$digest();
      });

      $scope.socket.on('point', function () {
        $scope.score++;
        $scope.$digest();
      });

      $scope.socket.on('ticker', function () {
        $scope.timer++;
        $scope.$digest();
      });

      $scope.socket.on('end', function (score) {
        $scope.gameEnded = true;
        $scope.score = score;
        $scope.$digest();
        self.endConnection($scope);
      });
    },
    endConnection: function ($scope) {
      $scope.socket.emit('close');
      $scope.socket.disconnect();
      $scope.socket = null;
      console.log('Client socket closed.');
    }
  };
});