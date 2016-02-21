angular.module('fleaCtrl', [])
// 二手物品列表控制器
.controller('fleaListCtrl', function(
  $scope,
  fleaService){
  $scope.doRefresh = function () {
    fleaService.getList.get({},function (data) {
      $scope.fleaList = data;
    });
    $scope.$broadcast('scroll.refreshComplete');
  };
  $scope.doRefresh();
})


//二手物品详情控制器
.controller('fleaDetailCtrl', function($scope,$stateParams, $ionicSlideBoxDelegate,$timeout,fleaService, userService, commonService){
  console.log($stateParams.fleaId);
  fleaService.getDetail.get({
    'fleaId': $stateParams.fleaId,
  },function (data) {
    $scope.fleaDetail = data;
    //获取个人信息
    userService.findUser.findUser({
      userId: data.userId
    }).$promise.then(function (data) {
      $scope.userInfo = data;
    });
    // 获取学校名称
    commonService.getSchoolById.get({
      id:data.schoolId
    }).$promise.then(function (data) {
      $scope.schoolName = data.schoolname;
    });
  });



});

