
describe('formController', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));



	describe('$scope.add', function() {
	it('Checking for length < 23', function() {
	      var $scope = {};
	      var controller = $controller('formController', { $scope: $scope });
	      $scope.count = 19;
	      $scope.add();
	      expect($scope.length).toEqual('short');
	      $scope.count = 29;
	      $scope.add();
	      expect($scope.length).toEqual('short');
    	});

	it('Checking for length > 23', function() {
	      var $scope = {};
	      var controller = $controller('formController', { $scope: $scope });
	      $scope.count = 29;
	      $scope.add();
	      expect($scope.length).toEqual('long');
	      $scope.count = 19;
	      $scope.add();
	      expect($scope.length).toEqual('long');
    		});
	});

	describe('$scope.checkIfEmpty', function() {
		it('If any of the field is empty', function() {
	      var $scope = {};
	      var controller = $controller('formController', { $scope: $scope });

	      $scope.masterObj.fn = "asdas";
	      $scope.checkIfEmpty("fname");
	      expect($scope.toggleFn).toEqual(true);
    	});
    	it('If any of the field is non-empty', function() {
	      var $scope = {};
	      var controller = $controller('formController', { $scope: $scope });

	      $scope.masterObj.fn = "Ahmar";
	      $scope.checkIfEmpty("fname");
	      expect($scope.toggleFn).toEqual(false);

	      $scope.masterObj.fn = "";
	      $scope.checkIfEmpty("fname");
	      expect($scope.toggleFn).toEqual(false);


    	});

	});



	
	
	
});