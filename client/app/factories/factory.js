angular.module('app.factory', [])

.factory('Categories', function($http){

  var getCategories = function() {
    return $http({
      method: 'GET',
      url: '/api/categories'
    })
    .then(function(response){
      return response.data;
    });
  };
  //add belief to existing category
  var addBelief = function (category, belief) {
    return $http({
      method: 'POST',
      url: '/api/addbelief',
      data: {
        name: category,
        belief: belief
      }
    })
    .then(function(response) {
      return response.data
    })
  };

  var getRandomBelief = function(category, itemId) {
    return $http({
      method: 'POST',
      url: '/api/getrandombelief',
      data: {
        name: category
      }
    })
    .then(function(response) {
      console.log("Response.data: ", response.data);
      return response.data;
    })
  };

  var getUserCatsAndBeliefs = function(username) {
    return $http({
      method: 'POST',
      url: 'api/getusercatsandbeliefs',
      data: {
        username: username
      }
    })
    .then(function(response) {
      return response.data;
    })
  };

  return {
    getCategories: getCategories,
    getRandomBelief: getRandomBelief,
    addBelief: addBelief,
    getUserCatsAndBeliefs: getUserCatsAndBeliefs
  }
})

.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server

  ////////////user authentication////////////////////////////////////
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      // console.log("Response from signin: ", resp);
      return resp.data.token;
    })
    .catch(function(error){
      if(error.status === 401){
        return error.status;
      }
      console.error(error);
    })
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
       return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.createaculture');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.createaculture');
    $location.path('/signin');
  };

  var deleteUser = function (user) {
    console.log(user);
    return $http({
      method: 'DELETE',
      url: '/api/users/delete',
      data: user,
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    .success(function(resp) {
      resp.data;
    });
  };

////////////////////////user category requests////////////////////////
  var getUserCategories = function() {
    return $http({
      method: 'GET',
      url: '/api/usercategories'
    })
    .then(function(resp) {
      resp.data;
    })
  };

  var addUserCategories = function(category) {
    return $http({
      method: 'POST',
      url: '/api/addusercategories',
      data: category
    })
    .then(function(response) {
      return response.data;
    })
  };
  //remove a user created category
  var removeUserCategories = function(category) {
    return $http({
      method: 'DELETE',
      url: '/api/removeusercategory',
      data: category,
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    .success(function(reponse) {
      response.data;
    })
  }
  //add belief to existing usercategory
  var addUserBelief = function(category, belief) {
    return $http({
      method: 'POST',
      url: '/api/adduserbelief',
      data: {
        name: category,
        belief: belief
      }
    })
    .then(function(response) {
      return response.data;
    })
  };

  var addBeliefsToUser = function(beliefsArray) {
    var username = $window.localStorage.getItem('user');
    return $http({
      method: 'POST',
      url: '/api/addmainbeliefs',
      data: {
        username: username,
        beliefs: beliefsArray
      }
    })
    .then(function(response){
      return response;
    })
  };

  var addBeliefToUser = function(beliefString) {
    var username = $window.localStorage.getItem('user');
    return $http({
      method: 'POST',
      url: '/api/addmainbelief',
      data: {
        username: username,
        belief: beliefString
      }
    })
    .then(function(response){
      return response;
    })
  };

  var updateAddedBelief = function(index, updated) {
    console.log("Updated: ", updated);
    var username = $window.localStorage.getItem('user');
    return $http({
      method: 'PUT',
      url: '/api/updateaddeduserbelief',
      data: {
        username: username,
        index: index,
        updated: updated
      }
    })
    .then(function(response) {
      console.log("Response.data in updateAddedBelief: ", response.data);
      return response.data;
    })
  };

  var deleteMainBelief = function(belief) {
    console.log("reached factory");
    console.log("belief: ", belief);
    var username = $window.localStorage.getItem('user');
    return $http({
      method: 'POST',
      url: 'api/deletebelief',
      data: {
        username: username,
        belief: belief
      }
    })
    .then(function(response) {
      console.log("Response from updateAddedBelief: ", response);
      return response;
    })
  }

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    deleteUser: deleteUser,
    getUserCategories: getUserCategories,
    removeUserCategories: removeUserCategories,
    addBeliefsToUser: addBeliefsToUser,
    addBeliefToUser: addBeliefToUser,
    updateAddedBelief: updateAddedBelief,
    deleteMainBelief: deleteMainBelief
  }

});
