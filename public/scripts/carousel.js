document.addEventListener("DOMContentLoaded", () => {
  let clicked = false;
  let carouselEnded = false;
  console.log("Dom stuff has been loaded");
  const track = document.querySelector(".carousel__track");
  const slides = Array.from(track.children);
  const slideWidth = slides[0].getBoundingClientRect().width;

  function hideButton(inputButton) {
    const button = inputButton;
    button.style.display = "none";
  }

  function showButton(inputButton) {
    const button = inputButton;
    button.style.display = "inline-block";
  }

  function setButtons(currentIndex) {
    if (currentIndex === 0) {
      hideButton(leftButton);
    }
    if (currentIndex !== indicators.length - 1) {
      showButton(rightButton);
    }
    if (currentIndex !== 0) {
      showButton(leftButton);
    }
    if (currentIndex === indicators.length - 1) {
      hideButton(rightButton);
    }
  }

  function resetIndicators(indicators, index) {
    indicators.forEach((indicator) => {
      if (indicator.classList.contains("active")) {
        indicator.classList.remove("active");
      }
      indicators[index].classList.add("active");
    });
  }

  function setSlidesPosition(slideArray) {
    for (let i = 0; i < slideArray.length; i++) {
      slideArray[i].style.left = `${i * slideWidth}px`;
    }
  }

  function moveTrack(targetSlide) {
    const pxToMove = targetSlide.style.left;
    track.style.transform = `translateX(-${pxToMove})`;
  }

  function setCurrentSlideClass(currentSlide, targetSlide) {
    currentSlide.classList.remove("current--slide");
    targetSlide.classList.add("current--slide");
  }

  function setTextContent(currentIndex) {
    const text = document.querySelector(".carousel__mobile-textbox .home-screen-hero-text-body");
    const textbox = document.querySelector(".carousel__mobile-textbox");
    console.log("setTextContent activated", `currentIndex: ${currentIndex}`, text);
    if (currentIndex === 0) {
      text.innerText = "A drop-off play studio, designed for young minds aged 18 months to 6 years.";
      text.style.color = "aliceblue";
      textbox.style.display = "block";
    }
    if (currentIndex === 1) {
      text.innerText = "Curated with care, to inspire creativity and curiousity.";
      text.style.color = "lightyellow";
      textbox.style.display = "block";
    }
    if (currentIndex === 2) {
      text.innerText = "Where there are always new worlds for the little ones to explore.";
      text.style.color = "whitesmoke";
      textbox.style.display = "block";
    }
    if (currentIndex === 3) {
      text.innerText = "And there's always someone to help them find their way.";
      text.style.color = "lightyellow";
      textbox.style.display = "block";
    }
    if (currentIndex === 4) {
      text.innerText = "Filled with new friends to make.";
      text.style.color = "floralwhite";
      textbox.style.display = "block";
    }
    if (currentIndex === 5) {
      text.innerText = "And endless adventures to take.";
      text.style.color = "floralwhite";
      textbox.style.display = "block";
    }
    if (currentIndex === 6) {
      textbox.style.display = "none";
    }
  }

  setSlidesPosition(slides);

  let currentIndex = 0;
  //initializing first position on carousel

  const leftButton = document.querySelector(".carousel__button--left");
  const rightButton = document.querySelector(".carousel__button--right");
  const indicators = document.querySelectorAll(".carousel__indicator");
  const indicatorsArray = Array.from(indicators);

  leftButton.style.display = "none";

  function scroll(direction) {
    let currentSlide = document.querySelector(".current--slide");
    let targetSlide = currentSlide;

    if (direction === "left") {
      currentIndex -= 1;
      targetSlide = currentSlide.previousElementSibling;
    }
    if (direction === "right") {
      currentIndex += 1;
      targetSlide = currentSlide.nextElementSibling;
    }
    moveTrack(targetSlide);
    setButtons(currentIndex);
    setCurrentSlideClass(currentSlide, targetSlide);
    resetIndicators(indicators, currentIndex);
    setTextContent(currentIndex);
  }

  leftButton.addEventListener("click", function scrollLeft() {
    clicked = true;
    scroll("left");
  });
  rightButton.addEventListener("click", function scrollRight() {
    clicked = true;
    scroll("right");
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", function clickIndicator() {
      clicked = true;
      let currentSlide = document.querySelector(".current--slide");
      let targetSlide = slides[indicatorsArray.indexOf(indicator)];
      currentIndex = indicatorsArray.indexOf(indicator);
      moveTrack(targetSlide);
      setCurrentSlideClass(currentSlide, targetSlide);
      setButtons(currentIndex);
      resetIndicators(indicators, currentIndex);
      setTextContent(currentIndex);
    });
  });

  //set an interval so that the image changes every second
  function moveCarousel() {
    if (currentIndex !== indicators.length - 1 && carouselEnded === false && clicked === false) {
      scroll("right");
    } else {
      carouselEnded = true;
    }
  }
  setInterval(moveCarousel, 3000);
});
