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
    var position = (scrollPosition + distance) * smoothStep(counter / 50);
    window.scrollTo(0, position);
    if (counter >= 50)
      clearInterval(sI);
  }, 10);
}

function scrollToSignUp() {
  var rightArrow = document.getElementById("beta-stays").getElementsByClassName("panel__right-arrow")[0];
  for (var i = 0; i < 3; i++) {
    rightArrow.click();
  }
}

var carousels = document.getElementsByClassName('carousel');
// use forEach to create closures to hold variable state for listeners
[].forEach.call(carousels, function(carouselWrapper) {
  var carousel = carouselWrapper.getElementsByClassName("carousel__content")[0];
  var leftButton = carouselWrapper.getElementsByClassName("panel__left-arrow")[0];
  var rightButton = carouselWrapper.getElementsByClassName("panel__right-arrow")[0];
  var mobileLeftButton = carouselWrapper.getElementsByClassName("mobile-arrows__left-arrow")[0];
  var mobileRightButton = carouselWrapper.getElementsByClassName("mobile-arrows__right-arrow")[0];
  var mobileDotsWrapper = carouselWrapper.getElementsByClassName("mobile-arrows__dots")[0];
  var panelCount = carousel.getElementsByClassName("panel").length;
  var offset = 0;
  var count = 0;
  var maxCount = panelCount - 1;
  var isBrown = !!(mobileLeftButton.className.match(/\barrow--brown\b/));

  for (var i = 0; i < panelCount; i++){
    var navDot = document.createElement("li");
    if (i === 0 && isBrown) {
      navDot.className = 'mobile-arrows__progress-dot --active --brown';
    } else if (i === 0) {
      navDot.className = 'mobile-arrows__progress-dot --active';
    } else {
      navDot.className = 'mobile-arrows__progress-dot';
    }
    mobileDotsWrapper.appendChild(navDot);
  }

  window.addEventListener('resize', function() {
    offset = 0;
    count = 0;
    carousel.style.transform = "translateX(0px)";
    leftButton.style.visibility = "hidden";
    mobileLeftButton.style.visibility = "hidden";
    rightButton.style.visibility = "visible";
    mobileRightButton.style.visibility = "visible";
    moveDot();
  }, true);

  leftButton.addEventListener("click", function() {
    if (count > 0) {
      count--;
      var carouselWidth = carousel.offsetWidth;
      offset = carouselWidth * count;
      carousel.style.transform = "translateX(-" + offset + "px)";
    }
    if (count < maxCount) {
      rightButton.style.visibility = "visible";
    }
    if (count == 0) {
      leftButton.style.visibility = "hidden";
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
      leftButton.style.visibility = "visible";
    }
    if (count == maxCount) {
      rightButton.style.visibility = "hidden";
    }
  })

  mobileLeftButton.addEventListener("click", function() {
    if (count > 0) {
      count--;
      var carouselWidth = carousel.offsetWidth;
      offset = carouselWidth * count;
      carousel.style.transform = "translateX(-" + offset + "px)";
    }
    if (count < maxCount) {
      mobileRightButton.style.visibility = "visible";
    }
    if (count == 0) {
      mobileLeftButton.style.visibility = "hidden";
    }
    moveDot();
  })

  mobileRightButton.addEventListener("click", function() {
    if (count < maxCount) {
      var carouselWidth = carousel.offsetWidth;
      count++;
      offset = carouselWidth * count;
      carousel.style.transform = "translateX(-" + offset + "px)";
    }
    if (count > 0) {
      mobileLeftButton.style.visibility = "visible";
    }
    if (count == maxCount) {
      mobileRightButton.style.visibility = "hidden";
    }
    moveDot();
  })

  function moveDot() {
    var dots = mobileDotsWrapper.querySelectorAll(".mobile-arrows__progress-dot");

    [].forEach.call(dots, function(dot) {
        dot.classList.remove("--active");
        dot.classList.remove("--brown");
    });

    dots[count].classList.add("--active");
    if (isBrown) {
      dots[count].classList.add("--brown");
    }
  }
});

var longForm = document.getElementById("long-form");
longForm.addEventListener("submit", function(e) {
  e.preventDefault();
  var formData = new FormData(this);
  // formData.append("api_key", "9f4b18b2-03ed-4e9a-8298-3e0756ad4102");
  var formDataJSON = {};
  formData.forEach(function(value, key){
      formDataJSON[key] = value;
  });

  fetch('https://app.guesthousecorp.com/memberships/api/beta-stays-registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formDataJSON),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});