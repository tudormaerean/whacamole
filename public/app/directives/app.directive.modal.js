angular.module('app.directive.modal', [])
  .directive('modal', function () {
    return {
      replace: true,
      templateUrl: 'templates/modal.html'
    };
  });