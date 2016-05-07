angular.module('starter.userService', [])

/**
 * 用户登录注册
 * @return {[type]}                                                             [description]
 */
.factory('userService', function($resource,configuration) {
  return {
    'login': $resource(configuration.apiUrl+'users/login', {}, {
      login: {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        },
      },
    }),
    'register':$resource(configuration.apiUrl+'users/register', {}, {
      register:{
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        },
      }
    }),
    'findUser': $resource(configuration.apiUrl+'users/findUser', {}, {
      findUser: {
        method: 'JSONP',
        params : {
          callback: 'JSON_CALLBACK',
        }
      }
    })
  };
})

/**
 * 用户注册验证
 * @return {}  
 */ 
.factory('valideService',function(){
  var result = {
    pass: false,
    msg: '验证通过',
  };
  var emailReg = /^[0-9a-zA-Z]{0,20}@[0-9a-zA-Z]{1,6}\.[a-zA-Z]{0,3}$/;
  return {
    'valideUser': function (user) {
      console.log(user);
      if(!user.username || user.username.length <=0){
        result.msg = '未填写用户名';
        return result;
      }
      if(user.username.length <= 5){
        result.msg = '用户名长度必须大于6位';
        return result;
      }
      if(!user.username || user.password === undefined){
        result.msg = '没有填写密码';
        return result;
      }
      if(user.password !== user.confirmPassword){
        result.msg = '重复密码错误';
        return result;
      }
      if(!user.tel){
        result.msg = '未填写手机号';
        return result;
      }
      if(user.tel.length !== 11){
        result.msg = '手机号码为11位';
        return result;
      }
      if(!emailReg.test(user.email)){
        result.msg = '邮箱格式不正确';
        return result;
      }
      if(user.school === '请选择'){
        result.msg = '请选择所在学校';
        return result;
      }
      result.pass = true;
      return result;
    }
  };
})
/**
 * 用户登录状态记录
 * @return {[type]}
 */
.factory('bankSession', function ($window) {
  return {
    'setUserId': function (userId) {
      $window.sessionStorage.setItem('userId', userId);
    },
    'getUserId': function () {
      return $window.sessionStorage.getItem('userId');
    },
    clear: function () {
      return $window.sessionStorage.clear();
    }
  };
})
/**
 * 根据id查找用户
 */
.factory('findUser', function($resource, configuration){
  return {
    findUser: $resource(configuration.apiUrl+'users/findUser', {}, {
      get: {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        }
      }
    })
  };
})
/**
 * 店铺相关接口
 * @return {[type]}     [description]
 */
.factory('storeService', function($resource,configuration){

  return {
    'postStore': $resource(configuration.apiUrl+'store/api/postStore', {}, {
      get: {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        }
      }
    }),
    'storeList': $resource(configuration.apiUrl+'store/api/storeList', {}, {
      get: {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        },
        isArray: true,
      }
    }),
    'findStoreByUserId': $resource(configuration.apiUrl+'store/api/findStore/:userId', {
      'userId': '@userId'
    }, {
      get: {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        }
      }
    })
  };
});
