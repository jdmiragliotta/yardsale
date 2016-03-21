angular.module('yardsale')
.controller('yardsaleController', function ($scope, $http){

  $scope.forms = {},
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.forms.username,
      password: $scope.forms.password
    })
    .then(function(user){
      $scope.getLogin();
    });
  }

  $scope.logout = function(){
    $http.get('/logout')
    .then(function(response){
      $scope.user = null;
    });
  }

  $scope.getLogin = function(){
    $http.get('/loginInfo')
    .then(function(response){
      $scope.user = response.data;
    });
  }

  $scope.getItems = function(){
    $http.get('/api/getItems')
    .then(function(response){
      $scope.items = response.data;
      $scope.getLogin();
    });
  }

  $scope.commentText = {};
  $scope.addComment = function(itemName){
    $http.post('/api/addComment', {
      itemName: itemName,
      commentMessage: $scope.commentText.addComment
    })
    then(function(){
      $scope.commentText.addComment = '';
      $scope.getItems();
    });
  }

  $scope.itemText = {};
  $scope.newItem = function(){
    $http.post('/api/newItem', {
      //get all fields
      itemName: $scope.itemText.name,
      itemDescription: $scope.itemText.description,
      itemPrice: $scope.itemText.price
    })
    .then(function(){
       //clear all fields
      $scope.itemText.name = '';
      $scope.itemText.description = '';
      $scope.itemText.price = '';
      $scope.getItems();
    });
  }

  $scope.buyItem = function(itemId, itemPrice){
    $scope.user.money = $scope.user.money - itemPrice;
    $http.put('/api/buyItem', {itemId: itemId, userMoney: $scope.user.money})
    .then(function(){
      $scope.getItems();
    })
  }

});// end controller

$(document).ready(function(){
  $('.modal-trigger').leanModal();
})
