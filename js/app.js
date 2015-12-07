Parse.initialize(***REMOVED***, ***REMOVED***);

angular.module('bcgermanclub', [])
.controller('clubevents', function($scope) {
  $scope.eventEntries = [];
    // Query parse to return event objects
    var events = Parse.Object.extend("Event");
    var query = new Parse.Query(events);

    query.ascending("date");
    query.find({
      success: function(events) {
        $(events).each(function(index, eventThing) {
          // Add event name if it isn't in "eventEntries" array
          $scope.eventEntries.push({
            "name": eventThing.get("name"),
            "details": eventThing.get("details"),
            "place": eventThing.get("place"),
            "date": $scope.dateconverter(String(eventThing.get("date")))
          })
        });
        $scope.eventEntries.reverse();
      }
    });

  $scope.dateconverter = function(inputvalue) {
    var time = $scope.GetTime(inputvalue);
    // Convert date and time to 12 hour clock
    return inputvalue.slice(0, 15) + " " + time;
  }

  $scope.GetTime = function(date) {
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
  }

  $scope.loadvalues();
});
