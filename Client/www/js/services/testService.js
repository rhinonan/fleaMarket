angular.module('starter.testService', [])

.factory('testService', function($resource,configuration) {


  return {
    'foo':$resource(configuration.apiUrl+'foo', {}, {
      get: {
        method: 'JSONP',
        params: {
          callback: 'JSON_CALLBACK',
        },
      } 
    }),
    'bar':'123',
  };
});
