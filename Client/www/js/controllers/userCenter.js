angular.module('userCenterCtrl',[])
/**
 * 用户个人中心控制器
 */
.controller('userCenterCtrl',function($scope, $state){
  $scope.postFlea = function () {
    $state.go('tab.postFlae',{});
  };
  $scope.postStore = function () {
    $state.go('tab.postStoreF', {});
  };
})

/**
 * 发布二手物品控制器
 */
.controller('postFleaCtrl',function ($scope, commonService, bankSession, $timeout, fleaService){

  $scope.flea = {};
  $scope.flea.imgs = [''];
  /**
   * 获取学校列表
   * @param  {} 
   * @return {json}  学校列表
   */
  commonService.getSchool.get({}, function (data) {
    $scope.schoolList = data;
  });

  // 添加一张图片
  $scope.addPic = function () {
    $scope.flea.imgs.push('');
  };

  // 发布二手物品
  $scope.postFlea = function () {
    $scope.flea.userId = bankSession.getUserId();
    fleaService.postFlea.post($scope.flea, function (data) {
      if(data){
        console.log(data);
      }
    }, function (err) {
    });
  };
})
/**
 * 购物车控制器
 * @return {[type]}     [description]
 */
.controller('shopCartCtrl',function ($scope,shopCart){
  var sum = 0;
  $scope.amout = 0;
  $scope.$on('shopCartChange', function () {
    $scope.coList = shopCart.AllCo();
    // 如果商品不为空
    if($scope.coList.length !== 0){
      $scope.sum();
    }
  });
  // 商品数量减一
  $scope.minus = function (id) {
    if($scope.coList[id].length > 1){
      $scope.coList[id].length --;
    }else{
      return false;
    }
    $scope.sum();
  };
  // 商品数量加一
  $scope.plus = function (id) {
    if($scope.coList[id].length < $scope.coList[id][0].stock){
      $scope.coList[id].push($scope.coList[id][0]);
    }else{
      // 库存不足
      return false;
    }
    $scope.sum();
  };
  // 计算总金额
  $scope.sum = function () {
    sum = 0;
    for(var key in $scope.coList){
      sum = sum + $scope.coList[key][0].price * $scope.coList[key].length;
    }
    $scope.amout = sum;
  };
});