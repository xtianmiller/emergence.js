
(function() {
  'use strict';

  var root = document.documentElement;
  var fullscreen = document.querySelector('.fullscreen');
  var eventTimeout;

  // DETECT IF USER HAS BEGAN SCROLLING
  var hasScrolled = function() {
    var totalScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (totalScroll > fullscreen.clientHeight) {
      if (!classie.has(root, 'scrolled')) {
        classie.add(root, 'scrolled');
      }
    } else {
      classie.remove(root, 'scrolled');
    }
  };

  // SCROLL HANDLER
  var scrollFunctions = function() {
    requestAnimationFrame(hasScrolled);
  };

  // RESIZE HANDLER
  var resizeHandler = function() {
    requestAnimationFrame(hasScrolled);
  };

  // THROTTLE RESIZE
  var throttleResize = function () {
    if (!eventTimeout) {
      eventTimeout = setTimeout(function() {
        eventTimeout = null;
        resizeHandler();
      }, 100);
    }
  };

  // EVENT LISTENERS
  if (window.addEventListener) {
    window.addEventListener('scroll', scrollFunctions, false);
    window.addEventListener('resize', throttleResize, false);
  } else {
    window.attachEvent('onscroll', scrollFunctions);
    window.attachEvent('onresize', throttleResize);
  }

})();
