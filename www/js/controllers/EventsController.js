angular.module('bcgermanclub.controllers')

.controller('EventsController', function($scope, $state) 
{ 
	$scope.uniqueEntries=[]; 
		$scope.loadvalues=function()
		{
				
			console.log("called")
			   //create an array to hold each unique test name as we find them
		   

		    //query parse to return TestScore objects
		    var Events = Parse.Object.extend("Events");
		    var query = new Parse.Query(Events);
		    query.limit(10000)  //added this after realizing that the default query limit is only 100 
		    query.ascending("eventdate");
		    query.find(
		    {
				      success: function(testScore) 
				      {
				          $(testScore).each(function(index, score) 
				          {
				          	 //if the event name is not already in the "uniqueEntries" array, I add it to the array
				                $scope.uniqueEntries.push({'event': score.get("Events"),"eventdate": $scope.dateconverter(String(score.get("eventdate")))})
				          });
				          	 $scope.uniqueEntries.reverse(); 
				      }
				      
  	    	});  
		      
      	}		
		      	$scope.dateconverter=function(inputvalue)
		      	{

			      var time=$scope.GetTime(inputvalue)
			      //this will put the date for the event and then also the time. in 12 hour time 
			      	return inputvalue.slice(0, 15)+" "+time; 
				}

				



				$scope.GetTime=function(date) 
				{
				        var currentTime = (new Date(date))
				        var hours = currentTime.getHours()
				        //Note: before converting into 12 hour format
				        var suffix = '';
				        if (hours > 11) 
				        {
				            suffix += "PM";
				        } else {
				            suffix += "AM";
				        }
				        var minutes = currentTime.getMinutes()
				        if (minutes < 10) 
				        {
				            minutes = "0" + minutes
				        }
				        if (hours > 12) 
				        {
				            hours -= 12;
				        } else if (hours === 0) 
				        {
				            hours = 12;
				        }
				        var time = hours + ":" + minutes + " " + suffix;
				        return time;
	    		}
		$scope.loadvalues();
});




