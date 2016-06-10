angular.module('commodityCtrl', [])
/**
 * 商品列表控制器
 * @param  {[type]} $scope               ){  console.log('123');} [description]
 * @return {[type]}        [description]
 */
.controller('commdityListCtrl', function (
  $scope,
  coService,
  $timeout,
  $ionicTabsDelegate,
  $stateParams
  ){
    coService.coList.get({}, function (data) {
      $scope.coList = data;
    });
})
// 商品详情控制器
.controller('coDetailCtrl',function ($scope,$timeout, $ionicTabsDelegate, $timeout, coService, $stateParams, shopCart, $ionicSlideBoxDelegate){
  // 获取商品详情
  coService.findCoByCoId.get({
    coId: $stateParams.coId
  }, function (data) {
    $scope.co = data;
    $timeout(function() {
      $ionicSlideBoxDelegate.$getByHandle('coImg-viewer').update();
      console.log(1111111111);
    }, 1000);
  });
  $scope.addToShopCart = function () {
    if($scope.co.stock === 0){
      return false;
    }
    shopCart.addCo($scope.co);
    $scope.co.stock--;
  };
})
// 根控制器
.controller('indexCtrl',function ($ionicTabsDelegate, $timeout, $rootScope){

  $ionicTabsDelegate.showBar(false);
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams, options){    switch(toState.name){
      case 'tab.coDetail':
        $ionicTabsDelegate.showBar(false);
        break;
      case 'tab.flea-detail':
        $ionicTabsDelegate.showBar(true);
        break;
      case 'tab.shopCart':
        $rootScope.$broadcast('shopCartChange');
        break;
      default:
        $ionicTabsDelegate.showBar(true);
    }
    if(fromState.name =='tab.store-detail'){
      $ionicTabsDelegate.showBar(true);
    }
  });

})
/**
 * 发布商品控制器
 * @return {[type]}               [description]
 */
.controller('postCoCtrl', function ($scope, commonService, bankSession, storeService, coService, $ionicPopup, $state) {
  $scope.co = {};
  // 获取学校列表
  console.log(123);
  commonService.getSchool.get({}, function (data) {
    $scope.schoolList = data;
  });
  var userId = bankSession.getUserId();
  // 通过用户id获取店铺id
  storeService.findStoreByUserId.get({
    'userId' : userId
  }, function (data) {
    $scope.co.storeId = data._id;
  });
  $scope.postCo = function  () {
    coService.postCo.get($scope.co, function (data) {
      // if(data._id){
      $ionicPopup.show({
        template: '<span style="text-align:center;display:block" class="balanced">发布成功</span>',
        title: '商品发布成功',
        buttons:[{
          text: '确定',
          type: 'button-balanced',
          onTap: function () {
            $state.go('tab.commodity',{});
            return true;
            // e.preventDefault();
          }
        }]
      });
      // }
    });
  };
});


