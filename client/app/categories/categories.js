angular.module('app.categories', ['app.checklist-model'])

.service('dataService', function () {
  this.choices = [];
  this.primary = [];
  this.sevenBeliefs = [];
})

.controller('categoriesController', function($scope, $location, dataService, Categories, Auth) {
  $scope.data;
// $scope is the intermediary between what the user sees and the
// factory. $scope methods grab from the factory and display it
// via html
  $scope.workable = [];

  $scope.getAll = function() {
    Categories.getCategories().then(function(data){
      $scope.data = data;
      for(var i = 0; i < data.length; i ++){
        $scope.workable.push(data[i].name);
      }
      for(var i = 0; i < $scope.workable.length; i ++) {
        $scope.obj[$scope.workable[i]] = data[i].beliefs;
      }
    }).catch(function(err) {
      console.log(err);
    })
  };

  $scope.showchoices = function() {
    console.log("chocies: ", $scope.choices);
  }

  $scope.getAll();
  $scope.obj = {};

  $scope.beliefDiv7 = true;
  $scope.beliefDiv8 = true;
  $scope.beliefDiv9 = true;

  $scope.sevenBeliefs = dataService.sevenBeliefs;

  $scope.choices = dataService.choices;
  $scope.primary = dataService.primary;

  $scope.addBeliefsToUser = function(beliefsArray) {
    Auth.addBeliefsToUser(beliefsArray);
  }

  $scope.addBeliefToUser = function(beliefString) {
    Auth.addBeliefToUser(beliefString);
  }

  $scope.grabResponseAndShowQuestionTwo = function() {
    $location.path('/finalthree');
    // $scope.questionOneDiv = false;
    // $scope.questionTwoDiv = true;
  }

  $scope.getRandomBelief = function(itemId) {
    if(itemId <= 3){
      var newbie = Categories.getRandomBelief($scope.choices[0], itemId)
      .then(function(data) {
        $scope.sevenBeliefs[itemId] = data;
      }).catch(function(err) {
        console.log(err);
      })
    };
    if(itemId === 4 || itemId === 5) {
      var newbie = Categories.getRandomBelief($scope.choices[1], itemId)
      .then(function(data) {
        $scope.sevenBeliefs[itemId] = data;
      }).catch(function(err) {
        console.log(err);
      })
    };
    if(itemId === 6) {
      // $scope.beliefDiv6 = true;
      var newbie = Categories.getRandomBelief($scope.choices[2], itemId)
      .then(function(data) {
        $scope.sevenBeliefs[itemId] = data;
      }).catch(function(err) {
        console.log(err);
      })
    };
    if(itemId === 7) {
      $scope.beliefDiv7 = true;
    }
    if(itemId === 8) {
      $scope.beliefDiv8 = true;
    }
    if(itemId === 9) {
      $scope.beliefDiv9 = true;
    }
    return newbie;
  }

  $scope.beliefDiv7 = false;
  $scope.beliefDiv8 = false;
  $scope.beliefDiv9 = false;

  $scope.updateAddedBelief = function(index, updatedBelief) {
    $scope.sevenBeliefs[index] = updatedBelief;
    Auth.updateAddedBelief(index, updatedBelief)
    .then(function(success) {
      $scope.updatedBelief = null;
      console.log(success);
    }).catch(function(err) {
      console.log(err);
    })
  }

  $scope.grabResponseAndShowBeliefs = function() {
    $location.path('/chosenseven');
    var index = $scope.choices.indexOf($scope.primary[0]);
    console.log(index);
    $scope.choices.unshift(($scope.choices.splice(index, 1))[0]);

    while ($scope.sevenBeliefs.length < 4) {
      var arr = $scope.obj[$scope.choices[0]];
      var temp = arr[Math.floor(Math.random()*arr.length)];
      if(!$scope.sevenBeliefs.includes(temp)) {
        $scope.sevenBeliefs.push(temp);
      }
    }
    while ($scope.sevenBeliefs.length < 6) {
      var arr = $scope.obj[$scope.choices[1]];
      var temp = arr[Math.floor(Math.random()*arr.length)];
      if(!$scope.sevenBeliefs.includes(temp)) {
        $scope.sevenBeliefs.push(temp);
      }
    }
    while ($scope.sevenBeliefs.length < 7) {
      var arr = $scope.obj[$scope.choices[2]];
      var temp = arr[Math.floor(Math.random()*arr.length)];
      if(!$scope.sevenBeliefs.includes(temp)) {
        console.log($scope.sevenBeliefs)
        $scope.sevenBeliefs.push(temp);
      }
    }

    $scope.sevenBeliefs.forEach(function(belief, index){
      $scope.beliefText += (index + 1) + ".  " + belief + "\r\n";
    });

    $scope.addBeliefsToUser($scope.sevenBeliefs);
  };

  $scope.beliefText = '';

  $scope.grabResponseAndAddToSevenBeliefs = function() {
    $scope.sevenBeliefs.push($scope.addedBelief);
    $scope.addBeliefToUser($scope.addedBelief);
    $scope.addedBelief = null;
  };

  $scope.removeCategory = function(list, item) {
      if(list.indexOf(item) !== -1) {
        var answer = list.splice(list.indexOf(item), 1);
        Categories.removeCategory(item);
      }

  }

  $scope.makeImage = function() {
    $location.path('/create');
  }

  $scope.myCanvas = function() {

  // $location.path('/fabric');

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var img = document.getElementById("scream");
    // console.log(img.src);
    ctx.drawImage(img,120,50);

    ctx.font = "15px Arial";
    ctx.fillText($scope.sevenBeliefs[0],110,370,280);
    ctx.fillText($scope.sevenBeliefs[1],110,390,280);
    ctx.fillText($scope.sevenBeliefs[2],110,410,280);
    ctx.fillText($scope.sevenBeliefs[3],110,430,280);
    ctx.fillText($scope.sevenBeliefs[4],110,450,280);
    ctx.fillText($scope.sevenBeliefs[5],110,470,280);
    ctx.fillText($scope.sevenBeliefs[6],110,490,280);
    // if($scope.sevenBeliefs[7]){
    ctx.fillText($scope.sevenBeliefs[7],110,510,280);
    // }
      // ctx.fillText($scope.sevenBeliefs[8],110,530,280);

  }

})