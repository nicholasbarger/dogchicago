// initialize javascript controls
$(function() {
  $('.datetimepicker').datetimepicker();
  $('.carousel').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: 'ondemand',
    speed: 700
  });
});