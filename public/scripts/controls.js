// initialize javascript controls
$(function() {
  // set all datepickers
  $('.datetimepicker').datetimepicker({
    format: 'Y/m/d g:i A',
    formatTime: 'g:i A',
  });

  $('.timepicker').datetimepicker({
    datepicker: false,
    format: 'g:i A',
    formatTime: 'g:i A',
  });

  // set carousel plugin
  $('.carousel').slick({
    autoplay: true,
    autoplaySpeed: 4000,
    lazyLoad: 'ondemand',
    speed: 500
  });
});