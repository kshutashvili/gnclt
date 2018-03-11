window.onload = function() {
	var popup = new Popup();

	var play;

	function onYouTubePlayerAPIReady() {
		play = new YT.Player('GNCvideo', {videoId: 'tD_mGEcAi9Q', autoplay: 0});
		document.querySelector('#site-video .popup__close').onclick = function() {
			play.pauseVideo();};
	}

	onYouTubePlayerAPIReady();

	$('.btn-play').on('click', function() {
		popup.open($('.popup #site-video'));
	});

	/*$('#site-video .popup__close').on('click', function(e) {
		console.log(1)
		$('#site-video iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
	});*/
	var countDownDate = new Date("Mar 13, 2018 0:00:00").getTime();

	// Update the count down every 1 second
	var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    

    // Output the result in an element with id="demo"
    function pretty_time_string(num) {
    	return ( num < 10 ? "0" : "" ) + num;
    }
    
    $('#days').text(pretty_time_string(days));
    $('#hours').text(pretty_time_string(hours));
    $('#minutes').text(pretty_time_string(minutes));
    $('#seconds').text(pretty_time_string(seconds));

    // If the count down is over, write some text 
    if (distance < 0) {
    	clearInterval(x);
    }
  }, 1000);
};

function Popup() {
	var popup = $('.popup');
	var self = this;
	var popupFade = 200;
	var contentFade = 200;

	self.open = function(content) {
		self.content = content;
		popup.fadeIn(popupFade);	
		content.fadeIn(contentFade);
	}

	self.close = function(e) {
		var targ = e.target;

		if (!targ.classList.contains('popup') 
			&& !targ.classList.contains('popup__close')) return;
			$('.popup-content').fadeOut(contentFade);
		popup.fadeOut(popupFade);
	}

	self.changeContent = function(changeEl) {
		self.content.fadeOut(contentFade, function() {
			changeEl.fadeIn(contentFade);
		});
	}

	popup.on('click', self.close);
}
