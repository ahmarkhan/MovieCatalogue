myApp.controller('formController', function formController($scope) {

	// just for Testing Purpose - Unit Testing
	$scope.count = 23;
	$scope.length = 'long';

	// Unit Testing using Jasmine Dummy Function
	$scope.add  = function(){
		if ($scope.count > 20) {
      		$scope.length = 'long';
    	}else{
    		$scope.length = 'short';
    	}
	};

	// Creating  DummyData Object where our entire BuddyList Resides
	$scope.masterObj = {};
	$scope.masterObj.dummyData = [{
			"img" : "./imgs/user-black.png"	,	
			"firstname": "asampleuname1",
	        "lastname": "Ahmar",
	        "userName": "samplename1@gmail.com",
	        "password": "Lastname4",
	        "birthday": "1995-12-11T18:30:00.000Z",
	        "emailAddress" : "test@gmail.com",
	        "status" : "Idle"
		},
		{
			"img" : "./imgs/user-black.png"	,
			"firstname": "Zak",
	        "lastname": "zFirstname2",
	        "userName": "samplename2@gmail.com",
	        "password": "Lastname4",
	        "birthday": "1995-12-11T18:30:00.000Z",
	        "emailAddress" : "test@gmail.com",
	        "status" : "Available"
		},
		{
			"img" : "./imgs/user-black.png"	,	
			"firstname": "Random",
	        "lastname": "aFirstname2",
	        "userName": "samplename3@gmail.com",
	        "password": "Lastname4",
	        "birthday": "1995-12-11T18:30:00.000Z",
	        "emailAddress" : "test@gmail.com",
	        "status" : "Idle"
		},
		{
			"img" : "./imgs/user-black.png"	,	
			"firstname": "sampleuname14",
	        "lastname": "Firstname2",
	        "userName": "samplename4@gmail.com",
	        "password": "Lastname4",
	        "birthday": "1995-12-11T18:30:00.000Z",
	        "emailAddress" : "test@gmail.com",
	        "status" : "Idle"
		},
		{
			"img" : "./imgs/user-black.png"	,	
			"firstname": "sampleuname12",
	        "lastname": "Firstname2",
	        "userName": "samplename5@gmail.com",
	        "password": "Lastname4",
	        "birthday": "1995-12-11T18:30:00.000Z",
	        "emailAddress" : "test@gmail.com",
	        "status" : "Offline"
		}];

	


	$scope.masterObj.fn = "";
	$scope.masterObj.ln = "";
	$scope.masterObj.userName = "";
	$scope.masterObj.password = "";
	$scope.masterObj.confPassword = "";
	$scope.masterObj.defStatus = 'Available';
	$scope.masterObj.indexVal = -1;


	// For toggling display between BuddyList and Add Buddy
	$scope.toggleDisplay =false;	

	// For toggling display to show alert / confirmation 
	$scope.toggleAlert =false;	

	// Field Validations
	$scope.numFlg = false;
	$scope.invalidUnFlg = false;
	$scope.invalidPwdFlg = false;
	$scope.invalidConfPwdFlg = false;

	// For toggling Display of Fields Validations
	$scope.toggleFn = false;
	$scope.toggleUn = false;
	$scope.togglePwd = false;
	$scope.toggleConfPwd = false;



	$scope.isFormValid = false;

	//For toggling between AddBuddy and BuddyList
	$scope.isDisabled = true;



	// To check if any of the field is empty
	$scope.checkIfEmpty = function(id){
		console.log('checkIfEmpty');
		if(id == "fname"){
			if($scope.masterObj.fn == '' || $scope.masterObj.fn == undefined ){
				$scope.toggleFn = true;
				return false;
				
			}else{
				$scope.toggleFn = false;
				return true;
			}
		}
		if(id == "username"){
			if($scope.masterObj.userName == '' || $scope.masterObj.userName == undefined ){
				$scope.toggleUn = true;
				
			}else{
				$scope.toggleUn = false;
			}
		}
		if(id == "password"){
			if($scope.masterObj.password == '' || $scope.masterObj.password == undefined ){
				$scope.togglePwd = true;
				
			}else{
				$scope.togglePwd = false;
			}
		}
		if(id == "confPassword"){
			if($scope.masterObj.confPassword == '' || $scope.masterObj.confPassword == undefined ){
				$scope.toggleConfPwd = true;
				
			}else{
				$scope.toggleConfPwd = false;
			}
		}
		$scope.checkForAllFields();
	};


	// Checking all the fields being empty , if yes then set isFormValid as false - Form Invalid
	$scope.checkForAllFields = function(){
		if($scope.masterObj.fn == '' || $scope.masterObj.userName == ''||  $scope.masterObj.password == ''|| $scope.masterObj.confPassword == ''  ){
			$scope.isFormValid = false;
		}else{
			$scope.isFormValid = true;
		}
	};


	// Function to validate Firstname ( or can be extended for other Namechecks) - Must contain only Alphabets ( Case - Insensitive)
	$scope.validateName = function(id){
		var obj = '';
		if(id=='fname'){
			$scope.toggleFn = false;
			obj = $scope.masterObj.fn;
		}
		//We can add as many number of items here

		if(/\d/.test(obj)){
			$scope.numFlg = true;
		}else{
			$scope.numFlg = false;
		}	
		
		
	},


	// Function to validate UserName - Username must be an email address. It cannot be longer than 56 characters
	$scope.validateUserNm = function(){
		var re = /\S+@\S+\.\S+/;
		$scope.toggleUn = false;
		if(re.test($scope.masterObj.userName)){
			$scope.invalidUnFlg = false;
		}else{
			$scope.invalidUnFlg = true;
		}
	};

	// Function to validate Password - Must be at least 6 characters
	$scope.validatePwd = function(){
		$scope.togglePwd = false;
		if($scope.masterObj.password.length < 6){
			$scope.invalidPwdFlg = true;
		}else{
			$scope.invalidPwdFlg = false;
		}
	};

	// Function to validate ConfPassword - Must match the Password previously entered
	$scope.validateConfPwd = function(){
		console.log('validateConfPwd');
		$scope.toggleConfPwd = false;
		if($scope.masterObj.password == $scope.masterObj.confPassword){
			$scope.invalidConfPwdFlg = false;
		}else{
			$scope.invalidConfPwdFlg = true;
		}
	};

	// Validate Form
	$scope.validateForm = function(){
		if($scope.isFormValid){
			if($scope.masterObj.fn == '' || $scope.masterObj.userName == ''||  $scope.masterObj.password == ''|| $scope.masterObj.confPassword == ''  ){
				alert("Pls fill the mandatory Entries! ");
			}
			if( $scope.numFlg || $scope.invalidUnFlg || $scope.invalidPwdFlg || $scope.invalidConfPwdFlg ){
				alert("Pls fill the entries correctly! ");	
			}
			$scope.checkForDuplicacy();
		}else{
			alert("Pls fill the entries correctly");
		}
	};

	// Check if the UserName already exists
	$scope.checkForDuplicacy = function(){
	  	var found = $scope.masterObj.dummyData.filter(
   		   function(data){return data.userName == $scope.masterObj.userName}
 	 	);
  		if(found.length == 0){
  			//update Object
  			$scope.appendBuddy();
  		}else{
  			//Can not add duplicate entries for Usernames
  			console.log('duplicate');
  			alert("Username already exists !");
	  	}
	};

	// Add the New Buddy if Username doesn't exist already
	$scope.appendBuddy = function(){
		console.log('appendBuddy...');
		$scope.masterObj.dummyData.push({
				img : "./imgs/user-black.png"	,
	            firstname: $scope.masterObj.fn,
	            lastname: $scope.masterObj.ln,
	            userName: $scope.masterObj.userName,
	            password: $scope.masterObj.password,
	            birthday: new Date().toISOString(),
	            status : $scope.masterObj.defStatus
	        });
		if(confirm("Buddy added successfully! Click ok to see the Current List Or Cancel to add more Buddies.")){
			$scope.toggleDisplay =true;
			document.getElementById('register').className = '';
			document.getElementById('buddyList').className = 'active';
		}else{
			document.getElementById("loginForm").reset();
		}

	};

	// Simply close the Alert
	$scope.close = function(){
		$scope.toggleAlert = false;
	};

	// Resetting the form
	$scope.clear = function(){
		document.getElementById("loginForm").reset();

	};

	// Switching between Add Buddy and BuddyList
	$scope.activate = function(event){
		console.log(event.target.parentNode.id);
		if(event.target.parentNode.id == "register"){
			$scope.toggleDisplay =false;
			event.target.parentNode.className = 'active';
			document.getElementById('buddyList').className = '';
		}
		if(event.target.parentNode.id  == "buddyList"){
			$scope.toggleDisplay =true;
			event.target.parentNode.className = 'active';
			document.getElementById('register').className = '';
			
		}
	};

	// Selecting or Deselecting Buddy
	$scope.selectRow = function(index){
		console.log(index);
		console.log(document.getElementById(index).className);
		

		if(document.getElementById(index).className=="deselectedRow ng-scope"){
			console.log('deselectedRow');
			//$scope.clearAllSelections();

			document.getElementById(index).className="selectedRow";
			$scope.masterObj.indexVal = index;
		}else{
			console.log('selectRow');
			document.getElementById(index).className="deselectedRow ng-scope";
			$scope.masterObj.indexVal = -1;
		}
	};

	//Clearing All selections ( Multiple Selections not allowed for Removal)
	$scope.clearAllSelections = function(){
		for(var i=0;i<$scope.masterObj.dummyData.length;i++){
			document.getElementById(i).className="deselectedRow ng-scope";
		}
	};

	//Removing Buddy ( Or Multiple as well) after selecting a Buddy
	$scope.removeBuddy = function(){
			var flag = false;		
			if(document.getElementsByClassName('selectedRow').length == 0){
				alert("Select some Buddy before you remove");
			}else{
				var txt ='Buddy';
				if(document.getElementsByClassName('selectedRow').length > 1) txt = 'Buddies';
				if(confirm("Are you sure you want to Remove the "+txt+"?")){
					var elems = document.getElementsByClassName('selectedRow');
					var obj;
					txt='';
					for(var i=0; i < elems.length ; i++){
						txt = elems[i].children[4].innerHTML;

						for(var j=0; j< $scope.masterObj.dummyData.length ;j++){
							if($scope.masterObj.dummyData[j].userName == txt){
								$scope.masterObj.dummyData.splice(j,1);
								break;
							}
						}
					}
				}
			}
	};
});
