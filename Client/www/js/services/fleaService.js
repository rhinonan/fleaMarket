angular.module('starter.fleaService', [])

.factory('fleaService', function($resource,configuration) {


  return {
    'getList':$resource(configuration.apiUrl+'flea/list', {}, {
      get: {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        },
        isArray: true,
      } 
    }),
    'getDetail': $resource(configuration.apiUrl+'flea/detail/:fleaId', {
      'fleaId': '@fleaId'
    }, {
      get: {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        }
      }
    }),
    'postFlea': $resource(configuration.apiUrl+'flea/postFlea', {}, {
      post: {
        method: 'JSONP',
        params:{
          callback: 'JSON_CALLBACK',
        }
      }
    })
  };
});
