// initialize javascript controls
$(function() {
  // set all datepickers
  $('.datetimepicker').datetimepicker();

  // set carousel plugin
  $('.carousel').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: 'ondemand',
    speed: 500
  });
});