angular.module('app.auth', [])

.controller('AuthController', function ($scope, $window, $location, dataService, Categories, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        // console.log("token in scope.signin: ", token);
        if(token === 401) {
          $location.path('/signup');
        } else {
          console.log("in signin, $scope.user.username: ", $scope.user.username);
          $window.localStorage.setItem('com.createaculture', token);
          $window.localStorage.setItem('user', $scope.user.username);        
          Categories.getUserCatsAndBeliefs($scope.user.username)
            .then(function(data) {
              dataService.mainBeliefs = data.mainBeliefs;
              dataService.returningUserCategories = data.categories;
            });
          $location.path('/homebase');
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };

  $scope.signup = function () {
    console.log("$scope.user: ", $scope.user);
    Auth.signup($scope.user)
      .then(function (resp) {
        console.log("resp.data: ", resp);
        $window.localStorage.setItem('com.createaculture', resp.token);
        $window.localStorage.setItem('user', resp.user);        
        $location.path('/');
        console.log("New user signed up!")
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signout = function () {
    Auth.signout($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.createaculture', token);
        $location.path('/signin');
        console.log('user has signed out!')
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.facebook = {
    username : "",
    email : ""
  };

  $scope.onFBLogin = function() {
    FB.login(function(response) {
      if(response.authResponse) {
        FB.api('/me', 'GET', {fields: 'email, first_name, name, id, picture'}, function(response) {
          $scope.$apply(function() {
              $scope.facebook.username = response.name;
              $scope.facebook.email = response.email;
              $scope.fb_image = response.picture.data.url;

              console.log(response);
            });
        })
      } else {
        console.log('not authorized by facebook');
      }
    }, {
        scope: 'email, user_likes',
        return_scopes: true
    });
    setTimeout(function(){ $location.path('/'); }, 3000);

  };

  $scope.deleteUser = function(){
     Auth.deleteUser($scope.user)
       .then(function (token) {
          $window.localStorage.removeItem('com.createaculture', token);
          $location.path('/signup');
          console.log('user has been deleted!')
        })
        .catch(function (error) {
          console.log(error);
        });
    $location.path('/');  
  };


});