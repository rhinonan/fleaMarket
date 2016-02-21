/**
 * 公用过滤器
 */
angular.module('starter.filter', [])
.filter('news_rate', function(){
  return function(input){
      switch(Number(input)){
        case 10:
          return '全新';
        case 9:
          return '九成新' ;
        case 8:
          return '7-8成新';
        case 6:
          return '5-6成新';
        case 5:
          return '5成以下';
        // return array;
      }
    };
});

          // <option selected>请选择</option>
          // <option value="10">全新</option>
          // <option value="9">9成新</option>
          // <option value="8">7-8成新 </option>
          // <option value="6">5-6成新</option>
          // <option value="5">5成以下</option>