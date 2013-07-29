/*
	jAcc: Accordion
	Compatibility: jQuery 1.7.2+
	Author: Bisike Nnadi
*/
(function($){

    $.fn.jacc = function(options){

        var opts = $.extend({}, $.fn.jacc.defaults, options);
        this.each(function(){
            var acc = $(this);
            var headers = acc.children(opts.header);
            var content = acc.children(opts.content);

            content.hide().eq(opts.show).show();
            headers.on('click', function(e){
                var clicked = $(this);
                var block = clicked.next();

                if(!block.is(':animated')){
                   if(opts.multi){
                       block.slideToggle(opts.duration, opts.easing);
                   }else{
                       block
                           .slideDown(opts.duration, opts.easing)
                           .siblings(opts.content)
                           .slideUp(opts.duration, opts.easing);
                   }
                }
                e.preventDefault();
            });
        });
    };
    $.fn.jacc.defaults = {
        header: 'a',
        content: 'div',
        easing: 'swing',
        duration: 400,
        multi: false,
        show: 0
    };

})(jQuery);

