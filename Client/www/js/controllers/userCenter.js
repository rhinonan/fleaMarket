angular.module('userCenterCtrl',[])
/**
 * 用户个人中心控制器
 */
.controller('userCenterCtrl',function($scope, $state, configuration, userService, bankSession){
  $scope.userinfo = {};
  // $scope.loginState = true;
  $scope.loginState = bankSession.isLogin();
  userService.findUser.findUser({
    userId : bankSession.getUserId()
  }, function (data) {
    $scope.userinfo = data;
    $scope.userinfo.avatars = configuration.apiUrl+'avatars/default.png';
  });
  $scope.postFlea = function () {
    $state.go('tab.postFlae',{});
  };
  $scope.goLogin = function() {
    $state.go('login',{});
  };
  $scope.postStore = function () {
    $state.go('tab.postStoreF', {});
  };
  $scope.shopCart = function () {
    $state.go('tab.shopCart', {});
  };
})

/**
 * 发布二手物品控制器
 */
.controller('postFleaCtrl',function ($scope, configuration, commonService, bankSession, $ionicPopup,$timeout, fleaService, $cordovaImagePicker){

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
  function uploadImg(img) {

    var ft = new FileTransfer();
    ft.upload(img, configuration.apiUrl+'api/image', function(info) {
        var rs = JSON.parse(info.response);
        $scope.flea.imgs.push(rs.data.imgSrc);
      }, function(error) {
          // $ionicLoading.hide();
      }, {});
  }
  $scope.addPic = function () {

    var options = {
      maximumImagesCount: 3,
      width: 320,
      height: 100,
      quality: 80
    };
    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        $scope.imgs = results;
        var ft = new FileTransfer();
        for (var i = results.length - 1; i >= 0; i--) {
          uploadImg(results[i]);
        }
        
      }, function (error) {
      });
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
    console.log($scope.coList);
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

  // 结算订单
  $scope.closing = function () {
    
  };
});