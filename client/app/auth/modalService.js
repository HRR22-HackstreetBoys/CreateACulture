angular.module('app.modalService', ['ngDialog'])

.controller('modalController', function($scope, ngDialog) {

    $scope.userDeleted = function() {
        ngDialog,open({
            templateUrl: 'deleteUser.html',
            controller: "AuthController"
        }).then(function(modal) {

            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

// app.controller('ModalController', function($scope, close) {

//  $scope.close = function(result) {
//   close(result, 500); // close, but give 500ms for bootstrap to animate
//  };

// });