Parse.initialize(***REMOVED***, ***REMOVED***);

var bcgc = angular.module('bcgc', []);

bcgc.controller('eventsCtrl', function($scope) {
  $scope.eventEntries = [];

  $scope.loadEvents = function() {
    var Event = Parse.Object.extend("Event");
    var query = new Parse.Query(Event);
    
    query.ascending("date");

    query.find({
      success: function(list) {
        $(list).each(function(index, item) {
          $scope.eventEntries.push({
            name: item.get("name"),
            details: item.get("details"),
            place: item.get("place"),
            date: $scope.convertDate(String(item.get("date")))
          });
        });
        $scope.eventEntries.reverse(); 
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
