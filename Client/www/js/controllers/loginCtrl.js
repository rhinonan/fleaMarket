angular.module('loginCtrl',[])
//登录控制器
.controller('loginCtrl', function($scope, $state, userService, $ionicPopup, bankSession){
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
      if(data._id){
        bankSession.setUserId(data._id);
        $ionicPopup.show({
          template: '<span style="text-align:center;display:block" class="balanced">登陆成功</span>',
          title:'登陆成功' ,
          scope: $scope,
          buttons: [{
            text: '确定',
            type: 'button-balanced',
            onTap: function () {
              $state.go('tab.user', {});
              return true;
            }
          }]
        });
      }
    },function (err) {
      $ionicPopup.show({
        template: '<span style="text-align:center;display:block" class="assertive">用户名或者密码错误</span>',
        title: '登陆失败',
        scope: $scope,
        buttons: [{
          text: '确定',
          type: 'button-balanced',
        }]
      });
    });
  };


  $scope.jump = function () {
    $state.go('register', '/');
  };
})

/**
 * 用户注册控制器
 * @return {null}             
 */
.controller('registerCtrl',function($scope, $state, $location, commonService, $timeout ,$ionicPopup, valideService, userService){
  $scope.user = {};
  /**
   * 获取学校列表
   * @param  {} 
   * @return {json}  学校列表
   */
  commonService.getSchool.get({}, function (data) {
    $scope.schoolList = data;
  });


  /**
   * 路由跳转
   * @param  {string} target 跳转目的（暂未使用）
   * @return {null} 
   */
  $scope.jump = function (target) {
    $state.go('login', {});
  };


  /**
   * 设置高校学请选择
   * @return {null}  
   */
  $timeout(function () {
    $scope.user.school = '请选择';
  },10);

  /**
   * 登陆函数
   * @return {[type]} [description]
   */
  $scope.register = function (user) {
    var result = valideService.valideUser(user);
    if(!result.pass){
      $scope.alertErr(result.msg);
      return false;
    }else{
      userService.register.register($scope.user, function (data) {
        if(data._id){
          $ionicPopup.show({
            template: '<span style="text-align:center;display:block" class="balanced">注册成功</span>',
            title: '注册成功',
            buttons:[{
              text: '确定',
              type: 'button-balanced',
              onTap: function () {
                $state.go('login',{});
                return true;
                // e.preventDefault();
              }
            }]
          });
        }
      }, function (err) {
        if(err){
          $ionicPopup.show({
            template: '<span style="text-align:center;display:block" class="assertive">用户名已经被注册</span>',
            title: '用户注册错误',
            // subTitle: '子标题哇',
            scope: $scope,
            buttons: [{
              text: '确定',
              type: 'button-positive'
            }]
          });
        }
      });
    }
  };
  

  $scope.alertErr = function (errMsg) { 
    $ionicPopup.show({
      template: '<span style="text-align:center;display:block" class="assertive">'+errMsg+'</span>',
      title: '用户注册错误',
      // subTitle: '子标题哇',
      scope: $scope,
      buttons: [{
        text: '确定',
        type: 'button-positive'
      }]
    });
  };

});