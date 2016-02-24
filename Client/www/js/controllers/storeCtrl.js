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

/**
 * 店铺列表控制器
 * @return {[type]}                    [description]
 */
.controller('storeListCtrl', function ($scope,$timeout,$ionicTabsDelegate, storeService) {
  storeService.storeList.get({}).$promise
  .then(function (data) {
    $scope.storeList = data;
  });
})
/**
 * 店铺详情控制器
 */
.controller('storeDetailCtrl', function($scope, coService, $stateParams){
  coService.findCoByStoreId.get({
    storeId: $stateParams.storeId
  }).$promise
  .then(function (data) {
    $scope.coList = data;
    console.log(data);
  });
})
.controller('storeCoDetailCtrl',function ($scope, $ionicTabsDelegate, $timeout, coService, $stateParams, shopCart, $ionicSlideBoxDelegate){
  // 获取商品详情
  coService.findCoByCoId.get({
    coId: $stateParams.coId
  }, function (data) {
    $scope.co = data;

    $ionicSlideBoxDelegate.$getByHandle('coImg-viewer').update();
  });
  $scope.addToShopCart = function () {
    if($scope.co.stock === 0){
      return false;
    }
    shopCart.addCo($scope.co);
    $scope.co.stock--;
  };
});