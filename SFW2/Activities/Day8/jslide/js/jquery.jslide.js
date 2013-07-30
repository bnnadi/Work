/*
	jSlide Plugin
	Version: 2.0
	Framework: jQuery 1.8+
	Author: Fullsail Javascript/jQuery Development Team
	===================++++++=================
	USAGE
	--------------
	<div id="carousel">
		<ul>
			<li>Item</li>
		</ul>
	</div>
	
	$('#carousel').jslide();
	
	OPTIONS
	--------------
	
*/

(function($){

    $.fn.jslide = function(options){

        var opts = $.extend({}, $.fn.jslide.defaults, options);

        return this.each(function(){
            var carousel = $(this);
            var slider = carousel.children('ul');
            var items = slider.children('li');
            var carouselW = carousel.width();
            var carouselH = carousel.height();
            var itemW = items.outerWidth(true);
            var itemH = items.outerHeight(true);

            var isHor = opts.direction.toLowerCase() === 'horizontal';
            var sliderW = isHor ? items.length * itemW : itemW;
            var sliderH = isHor ? itemH: items.length * itemH;
            var page = 0;
            var perSlide = isHor ? Math.floor(carouselW / itemW) : Math.floor(carouselH /itemH);
            var max = items.length - perSlide;
            var prevBtn = $(opts.prev);
            var nextBtn = $(opts.next);

            ////PLUGIN INIT
            carousel.css({
                overflow: 'hidden',
                position: (carousel.css('position') !== "static" ? carousel.css('position') : 'relative')
            });

            slider.css({
               position: 'absolute',
                margin: 0,
                padding: 0,
                listStyle: 'none',
                top: 0,
                left: 0,
                width: sliderW,
                height: sliderH
            });

            items.css('float', 'left')

            ///ANIMATION
            var anim = function(){
                if(isHor){
                slider.stop(true).animate({
                    left: -(page = itemW)
                }, opts.duration, opts.easing);
                }else{
                    slider.stop(true).animate({
                        top: -(page * itemH)
                    }, opts.duration, opts.easing)
                };
            };

            ///EVENTS

            var prevfn = function(e){
                page--;

                if(page < 0){
                    if(opts.loop === true){
                        page = max;
                    }else{
                        page = 0;
                    }
                }

                anim();

                if(e){
                    e.preventDefault();
                }
            };

            var nextfn = function(e){
                page++;
                if(page > max){
                    if(opts.loop === true){
                        page = 0;
                    }else{
                        page = max;
                    }
                }

                anim();

                if(e){
                    e.preventDefault();
                }

            };

            prevBtn.on('click', prevfn);
            nextBtn.on('click', nextfn);
        });
    };

    $.fn.jslide.defaults = {
        direction: 'horizontal',
        duration: 400,
        easing: 'swing',
        loop: true
    }

})(jQuery); // end wrapper