angular.module('bcgermanclub.controllers')

.controller('LinksController', function($scope, $state) {

	$scope.linkEntries = [];
	$scope.loadvalues = function() {

		// Query parse to return TestScore objects
		var Links = Parse.Object.extend("Links");
		var query = new Parse.Query(Links);
		query.limit(10000);  // Default query limit is only 100

		query.find({
			success: function(links) {
				$(links).each(function(index, link) {
					// If link name is not already in the "uniqueEntries" array, add it to array
					$scope.linkEntries.push({
						"link": link.get("link"),
						"title": link.get("title"),
						"description": link.get("description")
					})
				});
			}
		});
	}

	$scope.loadvalues();

});
