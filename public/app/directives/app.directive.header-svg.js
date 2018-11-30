angular.module('app.directive.header-svg', [])
  .directive('headerSvg', function () {
    return {
      replace: true,
      templateUrl: 'templates/header-svg.html'
    };
  });