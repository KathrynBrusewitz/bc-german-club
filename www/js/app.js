Parse.initialize(***REMOVED***, ***REMOVED***);
angular.module('bcgermanclub', ['ionic', 'bcgermanclub.controllers'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // Abstract Tabs
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Events Tab
  .state('tab.events', {
    url: '/events',
    views: {
      'tab-events': {
        templateUrl: 'templates/tab-events.html',
        controller: 'EventsController'
      }
    }
  })

  // Suggestions Tab
  .state('tab.suggestions', {
      url: '/suggestions',
      views: {
        'tab-suggestions': {
          templateUrl: 'templates/tab-suggestions.html',
          controller: 'SuggestionsController'
        }
      }
    })

  // Links Tab
  .state('tab.links', {
    url: '/links',
    views: {
      'tab-links': {
        templateUrl: 'templates/tab-links.html',
        controller: 'LinksController'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/events');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the keyboard accessory bar by default
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

// Set up individual controllers
angular.module('bcgermanclub.controllers', []);
