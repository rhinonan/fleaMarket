angular.module('loginCtrl',[])
//登录控制器
.controller('loginCtrl', function($scope, $state, userService){
  $scope.user = {};
  /**
   * 用户登录
   * @return {[type]} [description]
   */
  $scope.login = function () {
    if(!($scope.user)){
      return false;
    }
    userService.login.login({
      username: $scope.user.username,
      password: $scope.user.password,
    },function (data) {
      console.log(data);
      if(data.userName){
        $state.go('tab.user', {});
      }
    },function (err) {
      console.log(err);
      $scope.loginErr = true;
      $scope.errMsg = err.msg;
    });
  };
});