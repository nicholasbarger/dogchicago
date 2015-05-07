// initialize javascript controls
$(function() {
  $('.datetimepicker').datetimepicker();

  $('.carousel').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: 'ondemand',
    speed: 500
  });

  $.validator.setDefaults({
    submitHandler: function() {
      console.log('form submitted');
      form1.submit();
    }
  });
  $('form').validate();
});