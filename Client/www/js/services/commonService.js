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
});
