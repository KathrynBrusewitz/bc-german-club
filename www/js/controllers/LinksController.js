angular.module('bcgermanclub.controllers')

.controller('LinksController', function($scope, $state) {


	$scope.values=[]; 
		$scope.loadvalues=function()
		{
				
			console.log("called")
			   //create an array to hold each unique test name as we find them
		   

		    //query parse to return TestScore objects
		    var Events = Parse.Object.extend("Links");
		    var query = new Parse.Query(Events);
		    query.limit(10000)  //added this after realizing that the default query limit is only 100 
		   
			    query.find(
			    {
					      success: function(testScore) 
					      {
					          $(testScore).each(function(index, score) 
					          {
					          	 //if the event name is not already in the "uniqueEntries" array, I add it to the array
					                $scope.values.push({'link': score.get("Link"),"caption": score.get("caption"),"description":score.get("Description")})
					          });
					          	
					      }
					      
					      
	  	   		 }); 
		}
		$scope.loadvalues(); 

});
