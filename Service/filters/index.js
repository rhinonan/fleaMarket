var filters = require('jade').filters;
filters.striptags = function (html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
};
filters.foo = function(input) {
  return 'jajajaja'
};