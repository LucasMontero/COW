$(function () {
      $(window).scroll(function() {
	  if ($(this).scrollTop() >= 50) {        
		  $('#goUp').fadeIn(200);    
	  } else {
		  $('#goUp').fadeOut(200);   
	  }
   });
  
   $('#goUp').click(function() {    
	 				console.log("dentro");
					$('body,html').animate({
						scrollTop : 0                     
				  }, 500);
   });
});