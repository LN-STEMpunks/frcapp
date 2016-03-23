// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
.config(function ($ionicConfigProvider) {

    // globally default to "regular" scrollbars instead of mobile-style scrolling
    $ionicConfigProvider.scrolling.jsScrolling(false);
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

   .state('app.teams', {
       url: '/teams',
       views: {
           'menuContent': {
               templateUrl: 'templates/teams.html',
               controller: 'TeamsCtrl'
           }
       }
   })
           .state('app.home', {
               url: '/home',
               views: {
                   'menuContent': {
                       templateUrl: 'templates/home.html',
                       controller: 'HomeCtrl'
                   }
               }
           })

.state('app.team-detail', {
    url: '/team-detail/:key',
    views: {
        'menuContent': {
            templateUrl: 'templates/team-detail.html',
            controller: 'TeamCtrl',

        }
    }
})

.state('app.team-history-events', {
    url: '/team-history-events/:key',
    views: {
        'menuContent': {
            templateUrl: 'templates/team-history-events.html',
            controller: 'TeamHistoryEventsCtrl',

        }
    }
})
           .state('app.events', {
               url: '/events',
               views: {
                   'menuContent': {
                       templateUrl: 'templates/events.html',
                       controller: 'EventsCtrl'
                   }
               }
           })

.state('app.event-detail', {
    url: '/event-detail/:key',
    views: {
        'menuContent': {
            templateUrl: 'templates/event-detail.html',
            controller: 'EventCtrl',

        }
    }
})
      .state('app.matches', {
          url: '/matches',
          views: {
              'menuContent': {
                  templateUrl: 'templates/matches.html',
                  controller: 'MatchesCtrl'
              }
          }
      })

    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
