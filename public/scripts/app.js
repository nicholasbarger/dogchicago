// todo: make angular controller for reservations to repeat based on number of guests entered.
var dogchicago = angular.module('dogchicago', []);

dogchicago.controller('contactController', [function() {
  $('#form1').validate();
}]);

dogchicago.controller('newReservationController', ['$scope', function($scope) {
  $scope.numberOfGuests = 1;
  $scope.guests = [];
  $scope.isBoarding = 'true';
  $scope.isRequestingBath = '';

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

    // register any new time pickers
    $('.timepicker').datetimepicker({
      datepicker: false,
      format: 'g:i A',
      formatTime: 'g:i A',
    });
  });

  // form validation init
  $('#form1').validate();
}]);

dogchicago.controller('returningReservationController', ['$scope', function($scope) {
  $scope.numberOfGuests = 1;
  $scope.guests = [];
  $scope.isBoarding = 'true';
  $scope.isRequestingBath = '';

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

    // register any new time pickers
    $('.timepicker').datetimepicker({
      datepicker: false,
      format: 'g:i A',
      formatTime: 'g:i A',
    });
  });

  // form validation init
  $('#form1').validate();
}]);