angular.module('fleaCtrl', [])
// 二手物品列表控制器
.controller('fleaListCtrl', function(
  $scope,
  fleaService){
  fleaService.getList.get({},function (data) {
    $scope.fleaList = data;
  });
})
//二手物品详情控制器
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

