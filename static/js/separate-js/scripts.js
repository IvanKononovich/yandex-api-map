'use strict';

$(function() {

    /*
    |--------------------------------------------------------------------------
    | Range Slider
    |--------------------------------------------------------------------------
    */

    let entryForm = $('.entry__form'),
        rangeButton = $('.range-slider__range-button'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value'),
        fill = $('.range-slider__fill-strip'),
        flagPressing = false;

    function splitValueText(str) {
        str = str.replace(/[a-zA-Z]/g, ' ');
        str = str.split('');
        str = str.filter(x => x !== ' ');
        if(str.length > 4) {
            str[str.length-3] = ' ' + str[str.length-3];
            str = str.join('');
            value.text(str + ' KZT');
        }
    }
    function start(){
        rangeButton.addClass('-active');
        flagPressing = true;
    }
    function end(){
        rangeButton.removeClass('-active');
        flagPressing = false;
    }
    function move(e,isMobile){
        if(flagPressing) {
            let cursorPositionLeft = isMobile ? e.originalEvent.touches[0].pageX : e.pageX,
                moveLeft = cursorPositionLeft - entryForm.offset().left - parseInt(entryForm.css('padding-left')) - parseInt(rangeButton.css('width'))/2;
            rangeButton.css('left', moveLeft + 'px');

            let percent = Math.floor(parseInt(rangeButton.css('left'))/parseInt(range.css('width'))*range.data('max'));
            splitValueText(String(percent));

            let conditionExcess = parseInt(rangeButton.css('left')) > parseInt(range.css('width')) - parseInt(rangeButton.css('width')),
                conditionDerogation  = parseInt(rangeButton.css('left')) <  parseInt(range.css('left'));

            if(conditionExcess) {
                rangeButton.css('left', parseInt(range.css('width')) - parseInt(rangeButton.css('width')) + 'px');
                value.text(range.data('max') + ' KZT');
                splitValueText(value.text());
            }
            if(conditionDerogation) {
                rangeButton.css('left', range.css('left'));
                value.text(range.data('min') + ' KZT');
                splitValueText(value.text());
            }

            let calculateFillWidth = parseInt(rangeButton.css('left')) + parseInt(rangeButton.css('width'))/2;
            fill.css('width', calculateFillWidth + 'px');
        }
    }

    $(window).resize(() => {
        rangeButton.css('left', range.css('left'));
        value.text(0);
        fill.css('width', 0 + 'px');
    })
    rangeButton.on('touchstart', start);
    rangeButton.on('mousedown', start);
    $('body').on('touchend', end);
    $('body').on('mouseup', end);
    $('body').on('touchmove', (e) => {
        move(e,true);
    });
    $('body').on('mousemove', (e) => {
        move(e,false);
    });

    /*
    |--------------------------------------------------------------------------
    | Mobile menu
    |--------------------------------------------------------------------------
    */

    $('.burger').click(function() {
        $(this).toggleClass('-open');
        $('.m-menu').toggleClass('-show');
        if ($(this).hasClass('-open')) {
            $('body').css({"overflow": "hidden"});
        } else {
            $('body').css({"overflow": ""});
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Spoiler Text
    |--------------------------------------------------------------------------
    */

    let containerHeight = document.querySelectorAll(".spoiler__inner");
    let uncoverLink = document.querySelectorAll(".jsSpoilerMore");

    for(let i = 0; i < containerHeight.length; i++){
        let openData = uncoverLink[i].dataset.open;
        let closeData = uncoverLink[i].dataset.close;
        let curHeight = containerHeight[i].dataset.height;

        uncoverLink[i].innerHTML = openData;
        containerHeight[i].style.maxHeight = curHeight + "px";

        uncoverLink[i].addEventListener("click", function(){
            if(containerHeight[i].classList.contains("-open")){

                containerHeight[i].classList.remove("-open");

                uncoverLink[i].innerHTML = openData;

                containerHeight[i].style.maxHeight = curHeight + "px";

            } else {
                containerHeight[i].removeAttribute("style");

                containerHeight[i].classList.add("-open");

                uncoverLink[i].innerHTML = closeData;

            }
        });
    }

    /*
    |--------------------------------------------------------------------------
    | jQuery MMenu
    |--------------------------------------------------------------------------
    */

	$(function() {

		$('nav#menu').mmenu({
			extensions: [ 'effect-slide-menu', 'shadow-page', 'shadow-panels' ],
			counters	: true,
			"offCanvas": {
				"position": "left",
				"zposition": "front"
			},
			navbar: {
				title: ''
			},
			navbars: [
				{
					position	: 'top',
					content		: [
						'prev',
						'title',
						'close'
					]
				}
			]
		});

	});

    /*
    |--------------------------------------------------------------------------
    | Sticky Kit
    |--------------------------------------------------------------------------
    */

	$(".sticky").stick_in_parent({
		offset_top: 0,
	});

    /*
    |--------------------------------------------------------------------------
    | Header
    |--------------------------------------------------------------------------
    */

    let header = $('.header.-transparent');

    function stickyHeader() {
        if($(this).scrollTop() > 88) { /*height in pixels when the navbar becomes non opaque*/
            header.removeClass('-transparent');
        } else {
            header.addClass('-transparent');
        }
    }

    $(window).scroll(stickyHeader);
    stickyHeader();

    /*
    |--------------------------------------------------------------------------
    | Swiper Slider
    |--------------------------------------------------------------------------
    */

	let swiperSlider = new Swiper('.jsSwiperSlider', {
		speed: 600,
		mousewheel: false,
		loop: true,
		autoplay: {
			delay: 1000,
			disableOnInteraction: false,
		},
		spaceBetween: 30,
		navigation: {
			nextEl: '.jsSwiperNext',
			prevEl: '.jsSwiperPrev',
		},
		slidesPerView: 4,
		breakpoints: {
			1024: {
				slidesPerView: 4,
			},
			768: {
				slidesPerView: 3,
			},
			640: {
				slidesPerView: 2,
			},
			320: {
				slidesPerView: 1,
			}
		}
	});

    /*
    |--------------------------------------------------------------------------
    | Light Gallery
    |--------------------------------------------------------------------------
    */

	$('.lightGallery').lightGallery({
		selector: ".gallery-item",
	});

    /*
    |--------------------------------------------------------------------------
    | Nice Select
    |--------------------------------------------------------------------------
    */

	$('.niceSelect').niceSelect();

    /*
    |--------------------------------------------------------------------------
    | Stop Youtube video after closing modal window
    |--------------------------------------------------------------------------
    */

    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var src = $('.jsModalIframe').attr('data-iframe-src');

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $('.modal-video, .modal-big-video').on('show.bs.modal', function (e) {
        $('.jsModalIframe').attr('src', src);
    });

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $('.modal-video, .modal-big-video').on('hide.bs.modal', function (e) {
        $('.jsModalIframe').attr('src', '');
    });

});
