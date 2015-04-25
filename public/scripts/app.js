// todo: make angular controller for reservations to repeat based on number of guests entered.
var dogchicago = angular.module('dogchicago', []);

dogchicago.controller('newReservationController', ['$scope', function($scope) {
  $scope.numberOfGuests = 1;
  $scope.guests = [];

  $scope.$watch('numberOfGuests', function(newValue, oldValue) {
    if(newValue < oldValue) {
      while(newValue < $scope.guests.length) {
        $scope.guests.pop();
      }
    }
    else {
      while(newValue > $scope.guests.length) {
        $scope.guests.push({})
      }
    }
  });
}]);

dogchicago.controller('returningReservationController', ['$scope', function($scope) {
  $scope.numberOfGuests = 1;
  $scope.guests = [];

  $scope.$watch('numberOfGuests', function(newValue, oldValue) {
    if(newValue < oldValue) {
      while(newValue < $scope.guests.length) {
        $scope.guests.pop();
      }
    }
    else {
      while(newValue > $scope.guests.length) {
        $scope.guests.push({})
      }
    }
  });
}]);