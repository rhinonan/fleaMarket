angular.module('StoreCtrl',[])
/**
 * 店铺发布前  控制器
 */
.controller('postStoreFCtrl',function($scope, $state){
  $scope.open = function () {
    $state.go('tab.postStore',{});
  };
})
/**
 * 店铺发布控制器
 * @return {[type]}                [description]
 */
.controller('postStoreCtrl',function($scope, $state, commonService,storeService,bankSession,$ionicPopup){
  $scope.store = {};
  // 获取学校列表
  commonService.getSchool.get({}, function (data) {
    $scope.schoolList = data;
  });

  $scope.post = function () {
    // 获取用户id
    $scope.store.userId = bankSession.getUserId();
    storeService.postStore.get($scope.store).$promise
    .then(function (data) {
      console.log(data);
      $ionicPopup.show({
        template: '<span style="text-align:center;display:block" class="balacend">申请成功，请等待审核通过</span>',
        title: '申请成功',
        // subTitle: '子标题哇',
        scope: $scope,
        buttons: [{
          text: '确定',
          type: 'button-positive'
        }]
      });
    });
  };
})

.controller('storeListCtrl', function ($scope,$timeout,$ionicTabsDelegate, storeService) {
  storeService.storeList.get({}).$promise
  .then(function (data) {
    $scope.storeList = data;
    // console.log(data);
  });
  // $timeout(function () {
  //   console.log(1213123);
  //   $ionicTabsDelegate.showBar(false);
  // }, 1);
});