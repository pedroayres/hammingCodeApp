// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular
  .module('hammingCodeApp', [
      'ionic'
  ])

  .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if(window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);

          }
          if(window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
          }
      });
  })

  .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: 'app/menu/menu.html',
              controller: 'MenuCtrl'
          })
          .state('app.hammingTransmission', {
              url: '/hammingTransmission',
              views: {
                  'menuContent': {
                      templateUrl: 'app/hamming/hamming-transmission.html',
                      controller: 'HammingCtrl',
                      controllerAs: 'hamming'
                  }
              }
          })
          .state('app.hammingVerify', {
              url: '/hammingVerify',
              views: {
                  'menuContent': {
                      templateUrl: 'app/hamming/hamming-verify.html',
                      controller: 'HammingCtrl',
                      controllerAs: 'hamming'
                  }
              }
          })
          .state('app.welcome', {
              url: '/welcome',
              views: {
                  'menuContent': {
                      templateUrl: 'app/welcome/welcome.html',
                      controller: 'WelcomeCtrl',
                      controllerAs: 'welcome'
                  }
              }
          })
          .state('app.oquee', {
              url: '/oquee',
              views: {
                  'menuContent': {
                      templateUrl: 'app/history/o-que-e.html'
                  }
              }
          })
          .state('app.comofunciona', {
              url: '/comofunciona',
              views: {
                  'menuContent': {
                      templateUrl: 'app/history/comofunciona.html'
                  }
              }
          })
          // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/welcome');
  });