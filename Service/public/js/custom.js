var baseUrl = 'http://localhost:3332/';
var url;
// function hide(id,foo,type) {
//   if(type){
//     url = baseUrl + type; 
//   }else{
//     url = baseUrl + 'users'; 
//   }
//   $.post(url, {
//     type : 'delete',
//     id : id
//   }, function() {
//     foo.parentElement.parentElement.remove();
//     // location.reload();
//   });
// }
function passStore(id) {
  url = baseUrl + 'store/pass';
  $.post(url, {
    storeId: id
  }, function() {
    location.reload();
  });
}
function nopassStore(id) {
  url = baseUrl + 'store/nopass';
  $.post(url, {
    storeId: id
  }, function() {
    location.reload();
  });
}
function closeStore(id) {
  url = baseUrl + 'store/close';
  $.post(url, {
    storeId: id
  }, function() {
    location.reload();
  });
}
function deleteSchool(id) {
  url = baseUrl + 'school/delete';
  $.post(url, {
    schoolId : id
  }, function() {
    location.reload();
  });
}
function deleteUser(id) {
  url = baseUrl + 'user/delete';
  $.post(url, {
    userId: id
  }, function() {
    location.reload();
  });
}
function deleteCo(id) {
  url = baseUrl + 'co/delete';
  $.post(url, {
    coId: id
  }, function() {
    location.reload();
  });
}
function deleteFlea(id) {
  url = baseUrl + 'flea/delete';
  $.post(url, {
    fleaId: id
  }, function() {
    location.reload();
  });
}