Parse.initialize(***REMOVED***, ***REMOVED***);

var bcgc = angular.module('bcgc', []);

bcgc.controller('eventsCtrl', function($scope) {
  $scope.eventEntries = [];

  

  $scope.loadEvents = function() {
    var Event = Parse.Object.extend("Event");
    var query = new Parse.Query(Event);
    
    query.ascending("date");

    query.find({
      success: function(list)
       {
        $scope.tempents=[]; 
        for(i=0; i<list.length; i++)
        {
         var name=list[i].get("name").toString()
         var details= list[i].get("details").toString()
         var place=  list[i].get("place").toString()
         var date=   list[i].get("date").toString()
        $scope.eventEntries.push({"name":name,"details":details,"place":place,"date":date}); 
        //used scope.appply updates ui. 
        //http://stackoverflow.com/questions/16066170/angularjs-directives-change-scope-not-reflected-in-ui
        $scope.$apply(); 
        }
        
      }
    });
    
  };
  
  $scope.convertDate = function(date) {
    var time = $scope.getTime(date);
    // Convert date and time to 12 hour clock
    return date.slice(0, 15) + " " + time;
  };

  $scope.getTime = function(date) {
    var currentTime = (new Date(date));
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var suffix = '';

    if (hours > 11) {
      suffix += "PM";
    } else {
      suffix += "AM";
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    return hours + ":" + minutes + " " + suffix;
  };

  $scope.loadEvents();
});
