/* jshint devel:true */
(function($) {
  'use strict';
  var imgSrc = 'images/swann.jpg';

  var loadCallback = function() {
    setTimeout(function(){
      if ('scroll' in window) {
        window.scroll(0,0);
      }
      $('#bg').css('background-image', 'url('+imgSrc+')');
      $(document.body).addClass('loaded');
    }, 1500);

  };

  var img = new Image();
  img.onload = loadCallback;
  img.src = imgSrc;

  window.jsonFlickrFeed = function(data) {
    if (data && data.items && data.items.length) {
      var $container = $('#galery p:first');

      data.items.forEach(function(item) {
        /*jshint camelcase:false */
        var date = new Date(item.date_taken);
        var dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        if (item.media && item.media.m) {
          $('<figure>').attr({
            'class': 'thumbnail'
          })
            .append($('<div>').attr('style', 'background-image: url(' + item.media.m + ')'))
            .append($('<figcaption>').text(dateString + ' - ' + item.title))
            .appendTo($container)
            .click(function() {
              document.location = item.link;
            });
        }
      });
    }
  };

  $('<script defer src="http://api.flickr.com/services/feeds/photos_public.gne?id=48362780@N00&format=json">').appendTo(document.body);
})(jQuery);
