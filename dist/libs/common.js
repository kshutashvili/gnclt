window.onload = function() {
	var popup = new Popup();

	var play;

	function onYouTubePlayerAPIReady() {
		play = new YT.Player('GNCvideo', {videoId: 'tD_mGEcAi9Q', autoplay: 0});
		$('#videoClose').on('click', function(e) {
			play.pauseVideo();
		});

		$('.popup').on('click', function(e) {
			play.pauseVideo();
		});
	}

	onYouTubePlayerAPIReady();

	$('.btn-play').on('click', function() {
		popup.open($('.popup #site-video'));
	});

	var time = $('.timer').data('time')
	var timer = new Timer(time);

	timer.setDate($('#days'), $('#hours'), $('#minutes'),
		$('#seconds'));

	$('.mobile-btn').on('click', function(e) {
		$(this).toggleClass('active');

		if ($(this).hasClass('active')) {
			$('.mobile-menu').stop(true, true).css({
				display: "flex",
				opacity: 0
			}).animate({
				opacity: 1
			})
		}else {
			$('.mobile-menu').stop(true, true).fadeOut();
		}
		$('.mobile-menu').toggleClass('active');
	});

	$('.mobile-menu__link').on('click', function(e) {
		$('.mobile-btn').removeClass('active');
		$('.mobile-menu').stop(true, true).fadeOut();
	});
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

function Timer(date) {
	var self = this;

	self.countDownDate = new Date(date).getTime();

	self.setDate = function(days, hours, minutes, seconds) {
		var x = setInterval(function() {

			var now = new Date().getTime();

			var distance = self.countDownDate - now;

			var d = Math.floor(distance / (1000 * 60 * 60 * 24));
			var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var s = Math.floor((distance % (1000 * 60)) / 1000);

			function pretty_time_string(num) {
				return ( num < 10 ? "0" : "" ) + num;
			}

			days.text(pretty_time_string(d));
			hours.text(pretty_time_string(h));
			minutes.text(pretty_time_string(m));
			seconds.text(pretty_time_string(s));

			if (distance < 0) {
				clearInterval(x);
				days.html('00');
				hours.html('00');
				minutes.html('00');
				seconds.html('00')
			}
		}, 1000);
	}
}