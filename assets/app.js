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


var apiKey = "9f4b18b2-03ed-4e9a-8298-3e0756ad4102";
var successMessage = '<h1 class="panel__text" style="width: 200px;">You&#39;re all set!</h1>';
$("#long-form").submit(function(e) {
  e.preventDefault();
  var formData = new FormData(this);
  formData.append("api_key", apiKey);

  $.ajax({
    url: "https://app.guesthousecorp.com/memberships/api/beta-stays-registration",
    type: "post",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log("Success:", data);
      $("#long-form input").hide();
      $("#long-form").append(successMessage);
    },
    error: function (data) {
      console.log("An error occurred:", data);
    }
  });
});

$("#short-form-one").submit(function(e) {
  e.preventDefault();
  var formData = new FormData(this);
  formData.append("api_key", apiKey);

  $.ajax({
    url: "https://app.guesthousecorp.com/memberships/api/newsletter-registration",
    type: "post",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log("Success:", data);
      $("#short-form-one input").hide();
      $("#short-form-one").append(successMessage);
    },
    error: function (data) {
      console.log("An error occurred:", data);
    }
  });
});

$("#short-form-two").submit(function(e) {
  e.preventDefault();
  var formData = new FormData(this);
  formData.append("api_key", apiKey);

  $.ajax({
    url: "https://app.guesthousecorp.com/memberships/api/newsletter-registration",
    type: "post",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log("Success:", data);
      $("#short-form-two input").hide();
      $("#short-form-two").append(successMessage);
    },
    error: function (data) {
      console.log("An error occurred:", data);
    }
  });
});

var currentPanel = 0;
var panels = $(".container");
var recentScroll = false;


function scrollThere(targetElement, speed) {
  $('html, body').stop().animate( { scrollTop: targetElement.offset().top }, speed);
}

var lastScrollTop = 0;
$(window).scroll(function(event){
  var st = $(this).scrollTop();
  if (!recentScroll && st > lastScrollTop){
    recentScroll = true;
    window.setTimeout(() => { recentScroll = false; }, 550);
    if (currentPanel < panels.length - 1) {
      currentPanel++;
      scrollThere(panels.eq(currentPanel), 500);
    }
  } else {
    if (!recentScroll && currentPanel > 0) {
      recentScroll = true;
      window.setTimeout(() => { recentScroll = false; }, 550);
      currentPanel--;
      scrollThere(panels.eq(currentPanel), 500);
    }
  }
  lastScrollTop = st;
});

$(".nav__item").click(function (e) {
  e.preventDefault();
  var ind = $('.nav__item').index(this);
  currentPanel = ind + 1;
  recentScroll = true;
  window.setTimeout(() => { recentScroll = false; }, 550);
  scrollThere(panels.eq(currentPanel), 500);
});

$(".mobile-menu .panel__text").click(function (e) {
  e.preventDefault();
  var ind = $('.mobile-menu .panel__text').index(this);
  currentPanel = ind + 1;
  recentScroll = true;
  window.setTimeout(() => { recentScroll = false; }, 550);
  $(".mobile-nav__inner").toggleClass("--active");
  $(".mobile-menu").toggleClass("--active");
  $("body").toggleClass("--active");
  scrollThere(panels.eq(currentPanel), 500);
});

$(".panel__arrow--down").click(function (e) {
  e.preventDefault();
  currentPanel = 1;
  recentScroll = true;
  window.setTimeout(() => { recentScroll = false; }, 550);
  scrollThere(panels.eq(currentPanel), 500);
});

$(".mobile-nav__inner").on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass("--active");
    $(".mobile-menu").toggleClass("--active");
    $("body").toggleClass("--active");
});