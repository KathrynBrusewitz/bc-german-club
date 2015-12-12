Parse.initialize(***REMOVED***, ***REMOVED***);

var bcgc = angular.module('bcgc', []);

bcgc.controller('controller', function($scope) {
  $scope.eventEntries = [];

  $scope.loadEvents = function() {
    var Event = Parse.Object.extend("Event");
    var query = new Parse.Query(Event);
    
    query.ascending("date");

    query.find({
      success: function(list) {
        for (i = 0; i < list.length; i++) {
          var name = list[i].get("name").toString();
          var details = list[i].get("details").toString();
          var place = list[i].get("place").toString();
          var date = list[i].get("date").toString();
          var startTime = list[i].get("startTime").toString();
          $scope.eventEntries.push({
            "name": name,
            "details": details,
            "place": place,
            "date": $scope.removeTime(date),
            "startTime": startTime
          }); 
          // scope.apply updates UI 
          // http://stackoverflow.com/questions/16066170/angularjs-directives-change-scope-not-reflected-in-ui
          $scope.$apply(); 
        }
      }
    });
    
  }
  
  $scope.removeTime = function(date) {
    return date.slice(0, 15);
  };

  $scope.loadEvents();
});
