/*  just a few functions for refreshing the webcams
*   there are three webcams, with the following ids:
*   cam1 = Big Dogs
*   cam2 = Small/Medium Dogs
*   cam3 = Tiny Dogs
*/

// start timer
function unlock(camera) {
  var password = document.getElementById(camera + 'Password').value;
  setInterval(function() { refreshWebCams(camera, password) }, 2000);
}

// call dom elements to refresh
function refreshWebCams(camera, password) {
  updateImageSrc(camera, password);
}

// construct new img src and reload
function updateImageSrc(id, password) {
  var target = document.getElementById(id);
  var src = $(target).attr('data-src');
  var timeNumber = Date.now();
  var splitArray = src.split('&t=');
  if(splitArray.length === 1) {
    src = src + '&t=' + timeNumber;
  }
  else {
    src = splitArray[0] + '&t=' + timeNumber;
  }

  src += '&pwd=' + password;
  console.log(src);
  target.src = src;
}