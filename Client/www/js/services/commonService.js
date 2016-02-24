angular.module('starter.commonService', [])
.factory('commonService', function($resource,configuration) {
  return {
    'getSchool': $resource(configuration.apiUrl+'school', {}, {
      get: {
        method: 'JSONP',
        params:{
          callback: 'JSON_CALLBACK',
        },
        isArray: true
      }
    }),
    'getSchoolById': $resource(configuration.apiUrl+'school/:id', {
      'id': '@id'
      }, {
      get: {        
        method: 'JSONP',
        params:{
          callback: 'JSON_CALLBACK',
        },
      }
    })
  };
})
// 购物车
.factory('shopCart', function (){
  var shopCart = {};
  var resolve = {};
  resolve.addCo = function (co) {
    if(!shopCart[co._id]){
      shopCart[co._id] = [];
    }
    shopCart[co._id].push(co);
    console.log(shopCart);
  };
  resolve.AllCo = function () {
    return shopCart;
  };
  return resolve;
});
