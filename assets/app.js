console.log("HELLO");

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