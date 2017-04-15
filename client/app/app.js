angular.module('app', [
  'app.factory',
  'app.auth',
  'app.categories',
  //'app.modalService',
  // 'app.fabric',
  'ngRoute'

  ])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: './app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: './app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/facebook', {
      templateUrl: './app/auth/facebook.html',
      controller: 'AuthController'
    })
    .when('/signout', {
      templateUrl: './app/auth/signout.html',
      controller: 'AuthController'
    })
    .when('/deleteUser', {
      templateUrl: './app/auth/deleteUser.html',
      controller: 'AuthController'
    })
    .when('/', {
      templateUrl: './app/categories/main.html',
      controller: 'categoriesController',
      controller: 'AuthController',
      //controller: 'modalController'
      // controller: 'fabricController'
    })
    .when('/firstseven', {
      templateUrl: './app/categories/firstseven.html',
      controller: 'categoriesController'
    })
    .when('/finalthree', {
      templateUrl: './app/categories/finalthree.html',
      controller: 'categoriesController'
    })
    .when('/chosenseven', {
      templateUrl: './app/categories/chosenseven.html',
      controller: 'categoriesController'
    })
    .when('/create', {
      templateUrl: './app/categories/create.html',
      controller: 'categoriesController'
    })
    // .when('index.html', {
    //   templateUrl: './index.html',
    //   controller: 'modalController'
    // })
    // .when('/fabric', {
    //   templateUrl: './app/fabric/fabric.html',
    //   controller: 'fabricController'
    // })
    .otherwise({
      redirectTo: '/signin'
    });
  $httpProvider.interceptors.push('AttachTokens');
})
// We add our $httpInterceptor into the array
// of interceptors. Think of it like middleware for your ajax calls
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  //here we look at the token in localstorage to see if the user exists by sending to the server for validation
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});