angular.module('userCenterCtrl',[])
/**
 * 用户个人中心控制器
 */
.controller('userCenterCtrl',function($scope, $state){
  $scope.postFlea = function () {
    $state.go('tab.postFlae',{});
  };
})

/**
 * 发布二手物品控制器
 */
.controller('postFleaCtrl',function($scope, commonService, bankSession, $timeout){



  $scope.flea = {};
  $scope.flea.imgs = [];
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

  $scope.postFlea = function () {
    
  };
});