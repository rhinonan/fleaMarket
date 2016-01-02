angular.module('fleaCtrl', [])
.controller('fleaListCtrl', function(
  $scope,
  fleaService,
  testService){
  fleaService.getList.get({},function (data) {
    $scope.fleaList = data;
  });
})
.controller('fleaDetailCtrl', function($scope,$stateParams, $ionicSlideBoxDelegate,$timeout,fleaService){
  console.log($stateParams.fleaId);
  fleaService.getDetail.get({
    'fleaId': $stateParams.fleaId,
  },function (data) {
    $scope.fleaDetail = data;
    console.log(data);
  });
  $timeout(function () {
    $ionicSlideBoxDelegate.next();
  },1000);

});

// .controller('DashCtrl', function($scope,testService) {
//   // console.log(testService.bar);
//   // function init () {
      
//   // }
//   // init();
//   // testService.foo.get({})
//   // .then(function (data) {
//   //   console.log(data);
//   // });
// })

// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   $scope.$on('$ionicView.enter', function(e) {
//   });

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });
