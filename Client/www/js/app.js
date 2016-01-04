// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngResource', 
  'starter.controllers', 
  'starter.services',
  'starter.config',
  'fleaCtrl',
  'loginCtrl',
  'starter.fleaService',
  'starter.commonService',
  'starter.userService'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  // 用户个人中心
  .state('tab.user', {
    url:'/userCenter',
    views: {
      'tab-userCenter':{
        templateUrl: 'templates/userCenter/userCenter.html',

      }
    }
  })
  // 商品列表
  .state('tab.commodity', {
    url: '/commodityList',
    views: {
      'commodityList': {
        templateUrl: 'templates/commodity/commodityList.html'
      }
    }
  })
  // 二手物品
  .state('tab.flea', {
    url: '/flea',
    views: {
      'flea':{
        templateUrl: 'templates/flea/fleaList.html',
        controller: 'fleaListCtrl',
      }
    }
  })
  .state('tab.flea-detail', {
    url:'/flea/:fleaId',
    views:{
      'flea': {
        templateUrl: 'templates/flea/fleaDetail.html',
        controller: 'fleaDetailCtrl',
      }
    }
  })
  // 店铺中心
  .state('tab.store', {
    url: '/storeList',
    views: {
      'storeList':{
        templateUrl: 'templates/store/storeList.html'
      }
    }
  })
  .state('register',{
    url: '/register',
    abstract: false,
    templateUrl: 'templates/login/register.html',
    controller: 'registerCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login/login.html',
    controller: 'loginCtrl',
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/commodityList');

});
