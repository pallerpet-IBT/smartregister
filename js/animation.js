$(document).ready(function () {
  // Function to check if element is in viewport
  function isInViewport(element) {
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  // Apply animations on scroll
  $(window).on("scroll", function () {
    $(".advantages-info").each(function (index) {
      if (isInViewport(this)) {
        if (index % 2 === 0) {
          // Check if the index is even
          $(this).addClass("slide-in-right");
        } else {
          $(this).addClass("slide-in-left");
        }
      }
    });
  });
});
