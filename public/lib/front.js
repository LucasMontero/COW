$(function () {
   // Hamburguer menu
   $('.burger-check').click(function(){
   	if($(this).prop('checked'))
	   $('.burger i').attr("class", "fa fa-times");
	else
	   $('.burger i').attr("class", "fa fa-bars");

	 $( "#responsive-nav-list" ).slideToggle("slow")
   });
   // GO TOP Button
   $(window).scroll(function() {
	  if ($(this).scrollTop() >= 50) {
		  $('#goUp').fadeIn(200);
	  } else {
		  $('#goUp').fadeOut(200);
	  }
   });

   $('#goUp').click(function() {    
					$('body,html').animate({
						scrollTop : 0
				  }, 500);
   });
   //smoothscroll
	$('a').click(function(){
		$('html, body').animate({
			scrollTop: $( $(this).attr('href') ).offset().top - 20
		}, 500);
		return false;
	});
});
