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
  };
});
