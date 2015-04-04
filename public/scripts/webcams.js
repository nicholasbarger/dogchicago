/*  just a few functions for refreshing the webcams
*   there are three webcams, with the following ids:
*   cam1 = Big Dogs
*   cam2 = Small/Medium Dogs
*   cam3 = Tiny Dogs
*/

// start timer
setInterval(refreshWebCams, 2000);

// call dom elements to refresh
function refreshWebCams() {
  updateImageSrc('cam1');
  updateImageSrc('cam2');
  updateImageSrc('cam3');
}

// construct new img src and reload
function updateImageSrc(id) {
  var target = document.getElementById(id);
  var src = target.src;
  var timeNumber = Date.now();
  var splitArray = src.split('&t=');
  if(splitArray.length === 1) {
    target.src = src + '&t=' + timeNumber;
  }
  else {
    target.src = splitArray[0] + '&t=' + timeNumber;
  }
}