angular.module('starter.coService', [])
.factory('coService', function($resource,configuration) {
  return {
    'postCo': $resource(configuration.apiUrl+'commodity/api/postCo', {}, {
      'get': {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        }
      }
    }),
    'coList': $resource(configuration.apiUrl+'commodity/api/coList', {}, {
      'get': {
        method:'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        },
        isArray: true,
      }
    }),
    'findCoByCoId': $resource(configuration.apiUrl+'commodity/api/findCo/:coId', {
      'coId': '@coId',
    }, {
      'get': {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        }
      }
    }),
    'findCoByStoreId': $resource(configuration.apiUrl+'commodity/api/findCoByStoreId/:storeId', {
      'storeId': '@storeId'
    }, {
      'get': {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        },
        isArray: true
      }
    })
  };
});
