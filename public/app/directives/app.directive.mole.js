angular.module('app.directive.mole', [])
  .directive('mole', function () {
    return {
      replace: true,
      templateUrl: 'templates/mole.html'
    };
  });