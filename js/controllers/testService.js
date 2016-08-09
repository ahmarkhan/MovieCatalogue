(function(angular) {
  'use strict';
// angular.
//  module('movieCatalogue', []).
//   controller('rootController', ['$scope', 'notify', 'test',function($scope, notify) {
//     //$scope.callNotify = function(msg) {
//       //notify(msg);
//     //};
//     $scope.callNotify = function(msg){
//     	test(msg);
//     }
//   }]).
//   factory('test', ['$window', function(win) {
//   	var msg= 'Testing..';
//     return function(msg) {
//         win.alert('test fired !!');
//     };
//   }]);
 // factory('notify', ['$window', function(win) {
 //    var msgs = [];
 //    return function(msg) {
 //      msgs.push(msg);
 //      if (msgs.length === 3) {
 //        win.alert(msgs.join("\n"));
 //        msgs = [];
 //      }
 //    };
 //  }]);

 angular.module('movieCatalogue', [])
.service('getCollDataService','$http' ,function ($http) {
	alert('ahmar up');
	$http({
	 	method: 'GET',
	 	url: 'https://api.themoviedb.org/3/collection/528?api_key=da8aea96f44c043fdf05ac40cc904181'
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    console.log("response");
	    console.log(response);
	    alert('ahmar here');
	    return response;

	 }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	 });

})
.controller('rootController', ['$scope','$http','getCollDataService',function ($scope,$http,myService) {
  // Do something with myService
  $scope.callNotify = myService();
 //  $scope.callNotify = function(){
 //  	 $http({
	//  	method: 'GET',
	//  	url: 'https://api.themoviedb.org/3/collection/528?api_key=da8aea96f44c043fdf05ac40cc904181'
	// }).then(function successCallback(response) {
	//     // this callback will be called asynchronously
	//     // when the response is available
	//     console.log("response");
	//     console.log(response);
	//     alert('ahmar here');
	//     return response;

	//  }, function errorCallback(response) {
	//     // called asynchronously if an error occurs
	//     // or server returns response with an error status.
	//  });
  	
 //  }
}]);


})(window.angular);


