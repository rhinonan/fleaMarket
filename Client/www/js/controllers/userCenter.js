angular.module('userCenterCtrl',[])

/**
 * 用户个人中心控制器
 */
.controller('userCenterCtrl',function($scope, $state){
  $scope.postFlea = function () {
    $state.go('tab.postFlae',{});
  };
});