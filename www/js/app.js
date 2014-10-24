// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'geolocation',
  'ngRoute'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider,
                 jwtInterceptorProvider) {

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

      .state('app.home', {
        url: "/home",
        views: {
          'menuContent': {
            templateUrl : 'templates/home.html',
            controller : 'HomeCtrl'
          }
        }
      })
      .state('app.nearyou', {
        url: '/nearyou',
        views: {
          'menuContent': {
            templateUrl: 'templates/nearyou.html',
            controller: 'NearYouCtrl'
          }
        },
        data: {
          // This tells Auth0 that this state requires the user to be logged in.
          // If the user isn't logged in and he tries to access this state
          // he'll be redirected to the login page
          requiresLogin: true
        }
      })

      //.state('login', {
      //  url: '/login',
      //  views: {
      //    'menuContent' :{
      //      templateUrl: "templates/login.html",
      //      controller: 'LoginCtrl'
      //    }
      //  }
      //})
    // Your app states
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        data: {
          // This tells Auth0 that this state requires the user to be logged in.
          // If the user isn't logged in and he tries to access this state
          // he'll be redirected to the login page
          requiresLogin: true
        }
      })

      //.state('app.signup', {
      //  url: '/signup',
      //  views: {
      //    'menuContent': {
      //      templateUrl: 'templates/signup.html',
      //      controller: 'SignUpCtrl'
      //    }
      //  }
      //})

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      },
        data: {
          requiresLogin: true
        }
    })

    .state('app.categories', {
      url: "/categories",
      views: {
        'menuContent' :{
          templateUrl: "templates/categories.html",
          controller: 'CategoriesCtrl'
        }
      },
        data: {
          requiresLogin: true
        }
    })

    .state('app.facilities', {
      url: "/facilities/:categoryId",
      views: {
        'menuContent' :{
          templateUrl: "templates/facilities.html",
          controller: 'FacilitiesCtrl'
        }
      },
        data: {
          requiresLogin: true
        }
    })

      .state('app.facility', {
        url:'/facility/:id',
        views: {
          'menuContent' : {
            templateUrl: 'templates/facility.html',
            controller: 'FacilityCtrl'
          }
        },
        data: {
          requiresLogin: true
        }

      })

      .state('login', {
        template: 'not authorize'
      })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

      authProvider.init({
        domain: 'nghackathon.auth0.com',
        clientID: 'GFXtzOcaPmBPZnHrKuFa3qdgMLGizm0J',
        loginState: 'login'
      });
})

.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
})


.factory('dataService', function($http) {

      function get_categories(){

      }


      return {
        get_categories: get_categories,
        get_equipements: get_equipements,
        get_equipement: get_equipement
      }


});

