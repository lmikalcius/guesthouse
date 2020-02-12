function scrollToPanel(panel) {
  var nav = document.getElementById('nav');
  var scrollPosition = nav.scrollTop;
  var distance = document.getElementById(panel).offsetTop - scrollPosition;
  var counter = 1;

  function smoothStep(n) {
    return n * n * (3 - 2 * n);
  }

  // Smooth scroll
  var sI = setInterval(function () {
    counter++;
    var position = (scrollPosition + distance) * smoothStep(counter / 30);
    window.scrollTo(0, position);
    if (counter >= 30)
      clearInterval(sI);
  }, 10);
}

var carousels = document.getElementsByClassName('carousel');
[].forEach.call(carousels, function(carouselWrapper) {
  // the carousel variable is within the forEach closure and referenced in the listeners
  var carousel = carouselWrapper.getElementsByClassName("carousel__content")[0];
  var leftButton = carouselWrapper.getElementsByClassName("panel__left-arrow")[0];
  var rightButton = carouselWrapper.getElementsByClassName("panel__right-arrow")[0];
  var panelCount = carousel.getElementsByClassName("panel").length;
  var offset = 0;
  var count = 0;
  var maxCount = panelCount - 1;

  window.addEventListener('resize', function() {
    var carouselWidth = carousel.offsetWidth;
    offset = carouselWidth * count;
    carousel.style.transform = "translateX(-" + offset + "px)";
  }, true);

  leftButton.addEventListener("click", function() {
    if (count > 0) {
      count--;
      var carouselWidth = carousel.offsetWidth;
      offset = carouselWidth * count;
      carousel.style.transform = "translateX(-" + offset + "px)";
    }
    if (count < maxCount) {
      rightButton.style.display = "block";
    }
    if (count == 0) {
      leftButton.style.display = "none";
    }
  })

  rightButton.addEventListener("click", function() {
    if (count < maxCount) {
      var carouselWidth = carousel.offsetWidth;
      count++;
      offset = carouselWidth * count;
      carousel.style.transform = "translateX(-" + offset + "px)";
    }
    if (count > 0) {
      leftButton.style.display = "block";
    }
    if (count == maxCount) {
      rightButton.style.display = "none";
    }
  })
});
