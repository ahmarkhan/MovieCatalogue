myApp.controller('rootController', function rootController($scope,$http) {
	$scope.collectionData={};
	$scope.directors=[];
	$scope.writers=[];

	$scope.detailedCollection ={movieDetails : [], credits : []};
	$scope.currentMovieDisp = {movieDetails : []};
	$scope.currentProfile  = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
	$scope.currentActorIndex = 0;
	
	// function to get the entire collection
	$scope.getCollectionData = function(){
		$http({
		 	method: 'GET',
		 	url: 'https://api.themoviedb.org/3/collection/528?api_key=da8aea96f44c043fdf05ac40cc904181'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.collectionData = response;
		    $scope.createMovieDetails(response.data.parts);
		    
		 }, function errorCallback(response) {
		 	//return response;
		 });
	};
	$scope.getCollectionData();


	// function to create Movie Details
	$scope.createMovieDetails = function(movieList){
		var dirName ='';
		var stars=[];
		var writers=[];
		var credits = [];
		var flag =true;
		for(var i=0;i<movieList.length;i++){
			(function(i){
				var url = 'http://api.themoviedb.org/3/movie/'+movieList[i].id+'/credits?api_key=da8aea96f44c043fdf05ac40cc904181';
				$http({
			 		method: 'GET',
			 		url: url,
				}).then(function successCallback(response) {
					flag = true;
					writers = [];
					credits = [];
					stars=[];
					for(var j=0;j<response.data.crew.length;j++){
						if(flag && response.data.crew[j].job == 'Director' ){
							$scope.directors.push(response.data.crew[j].name);
							dirName  = response.data.crew[j].name;
							flag=false;
						}
						if(response.data.crew[j].department == 'Writing'){
							writers.push(response.data.crew[j].name);
						}
					}
					for(var j=0;j<response.data.cast.length;j++){
						stars.push(response.data.cast[j].name);
						credits.push({
							actorName : response.data.cast[j].name,
							characterName : response.data.cast[j].character,
							profile_path  : response.data.cast[j].profile_path,
							focussedImgCls  : "",
							focussedTextCls  : ""

						});
					}

					$scope.detailedCollection.movieDetails.push({
						title         : movieList[i].title, 
						id            : movieList[i].id,
						src           : movieList[i].poster_path,
						overview  	  : movieList[i].overview,
						dirs      	  : dirName,
						writers       : writers,
						credits		  : credits,
						stars		  : stars

					});
					if(i==0){

						$scope.currentMovieDisp = {movieDetails : []};
						$scope.currentMovieDisp.movieDetails.push({
							title         : movieList[i].title,
							id            : movieList[i].id,
							src           : movieList[i].poster_path,
							overview      : movieList[i].overview,
							dirs          : dirName,
							writers       : writers,
							credits		  : credits,
							stars         : stars
							
						});
						$scope.currentMovieDisp.movieDetails[0].credits[0].focussedImgCls="focussedImgCls";
						$scope.currentMovieDisp.movieDetails[0].credits[0].focussedTextCls="focussedTextCls";
						$scope.currentProfile+=credits[0].profile_path;

					}
				},

				function errorCallback(response) {
			 		//return response;
				});


			})(i);

		}

	};

	// function to get a particular clicked Movie data to show in the Panel ( Current Movie Clicked with all its details)
	$scope.getMovieData  = function(id,index){
		$scope.currentMovieDisp = {movieDetails : []};
		$scope.currentProfile ="https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
		var movieDetails = $scope.detailedCollection.movieDetails;
		
		// Clearing all classes
		for(var i =0;i<$scope.detailedCollection.movieDetails[index].credits.length;i++){
			$scope.detailedCollection.movieDetails[index].credits[i].focussedImgCls="";
			$scope.detailedCollection.movieDetails[index].credits[i].focussedTextCls="";
		}
		

		for (i in movieDetails){
			if(movieDetails[i].id == id ){
				$scope.currentMovieDisp.movieDetails.push({
						title         : movieDetails[i].title,
						id            : movieDetails[i].id,
						src           : movieDetails[i].src,
						overview      : movieDetails[i].overview,
						dirs          : movieDetails[i].dirs,
						writers       : movieDetails[i].writers,
						credits		  : movieDetails[i].credits,
						stars		  : movieDetails[i].stars		
				});
				$scope.currentProfile+=movieDetails[i].credits[0].profile_path;
				$scope.currentMovieDisp.movieDetails[0].credits[0].focussedImgCls="focussedImgCls";
				$scope.currentMovieDisp.movieDetails[0].credits[0].focussedTextCls="focussedTextCls";
				$scope.currentActorIndex = 0;
				break;
			}
		}

	};

	// function to update the Current Profile Pic of the Actor being clicked
	$scope.getPersonImg = function(profile_path,par_index,index){
		$scope.currentMovieDisp.movieDetails[par_index].credits[index].focussedImgCls="focussedImgCls";
		$scope.currentMovieDisp.movieDetails[par_index].credits[index].focussedTextCls="focussedTextCls";

		$scope.currentMovieDisp.movieDetails[par_index].credits[$scope.currentActorIndex].focussedImgCls="";
		$scope.currentMovieDisp.movieDetails[par_index].credits[$scope.currentActorIndex].focussedTextCls="";
		$scope.currentActorIndex = index;
		$scope.currentProfile ="https://image.tmdb.org/t/p/w300_and_h450_bestv2/"+profile_path;
	}	
});



