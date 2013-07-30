/**
 * Created with JetBrains WebStorm.
 * User: bisikennadi
 * Date: 7/30/13
 * Time: 9:39 AM
 * To change this template use File | Settings | File Templates.
 */

$(function(){

      $('#jslider1').jslide({
          direction: 'vertical',
          prev: '#slideshow1 .prev',
          next: '#slideshow1 .next'
      });

    $('#jslider2').jslide({
          prev: '#slideshow2 .prev',
          next: '#slideshow2 .next'
      });

    $('#jslider3').jslide({
         // direction: 'vertical',
          prev: '#slideshow3 .prev',
          next: '#slideshow3 .next'
      });

});