angular.module('app.directive.header', [])
.directive('header', function () {
  return {
    replace: true,
    templateUrl: 'templates/header.html'
  };
});