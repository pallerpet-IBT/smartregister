document.addEventListener("DOMContentLoaded", function() {
  var links = document.querySelectorAll('a[href^="#"]');

  for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function(e) {
          e.preventDefault();
          var targetId = this.getAttribute('href').substring(1);
          var targetElement = document.getElementById(targetId);
          
          if (targetElement) {
              var navHeight = document.querySelector('nav').offsetHeight;
              var targetOffset = targetElement.offsetTop - navHeight + 30;
              window.scrollTo({
                  top: targetOffset,
                  behavior: 'smooth'
              });
          }
      });
  }
});


// If *navbar-collapse* is not among targets of event, collapse *navbar-collapse*
// $(document).click(function (event) {
//   if (!$(event.target).is('.navbar-collapse *')) {
//     $('.navbar-collapse').collapse('hide');
//   }
// });

//hide video until first click
document.addEventListener("DOMContentLoaded", function() {
  var videoCover = document.getElementById("videoCover");
  var videoIframe = document.getElementById("videoIframe");

  videoCover.addEventListener("click", function() {
      videoIframe.contentWindow.postMessage('{"method":"play"}', '*'); 
      videoCover.style.display = "none"; 
  });
});
