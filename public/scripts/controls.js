// initialize javascript controls
$(function() {
  // set all datepickers
  $('.datetimepicker').datetimepicker();

  // set carousel plugin
  $('.carousel').slick({
    autoplay: true,
    autoplaySpeed: 4000,
    lazyLoad: 'ondemand',
    speed: 500
  });
});