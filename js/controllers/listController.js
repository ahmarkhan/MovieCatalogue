myApp.controller('listController', function formController($scope, $filter) {
	  var orderBy = $filter('orderBy');


	 // Popover for showing Info in Popover onclick of his Name 
	 $scope.popOverData = {
	 	'emailAddress' : 'test',
	 	'birthDate' : '',

	 }; 
	 $scope.predicate = '';
	 $scope.reverse = false;
	 $scope.searchText = '';  // Ng-Model used for binding with the string during Search
	 


	 // Sorting the Table by clicking on its Header
	$scope.sortList = function(col){
		 $scope.predicate = col;
		 $scope.reverse = ($scope.predicate === col) ? !$scope.reverse : false;
		 console.log($scope.masterObj.dummyData);
		 $scope.masterObj.dummyData = orderBy($scope.masterObj.dummyData, col, $scope.reverse);
		 console.log($scope.masterObj.dummyData);

	};

	// By default list will appear in sort by Ascending Order
	  $scope.sortList('firstname', false);

	 
	 // Set data in the Buddy Info Popover onclick dynamically 
	 $scope.setData = function(data){
	 	console.log(data);
	 	$scope.popOverData.emailAddress = data.emailAddress;
	 	$scope.popOverData.birthDate = data.birthday;

	 };

});