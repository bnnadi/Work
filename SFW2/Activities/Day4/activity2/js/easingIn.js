/**
 * Created with JetBrains WebStorm.
 * User: bisikennadi
 * Date: 7/16/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){

    var box = $('.box');

    box.on('click', function(e){
        $(this)
        .css({position: 'relative'})
        .animate({top: '-=25'},300)
        .animate(
            { top: '+=125',
            opacity: 0},
            1000);

        $(this).hide(1000, 'easeOutBounce');
    })


});
