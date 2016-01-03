angular.module('starter.userService', [])

.factory('userService', function($resource,configuration) {


  return {
    'login': $resource(configuration.apiUrl+'users/login', {}, {
      // post: {
      //   method: 'JSONP',
      //   params: {
      //     username: '@username',
      //     password: '@password',
      //     callback: 'JSON_CALLBACK',        }
      // },
      login: {
        method: 'JSONP',
        params: {
          // username: '@username',
          // password: '@password', 
          callback: 'JSON_CALLBACK',
        },

      }
    }),

  };
});
