

function hideButton(inputButton) {
  const button = inputButton;
  button.style.display = "none";
}
function showButton(inputButton) {
  const button = inputButton;
  button.style.display = "inline-block";
}
function setButtons(currentIndex, indicators, leftButton, rightButton) {
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
function setSlidesPosition(slideArray, slideWidth) {
  for (let i = 0; i < slideArray.length; i++) {
    slideArray[i].style.left = `${i * slideWidth}px`;
  }
}
function moveTrack(targetSlide, track) {
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
function scroll(direction, currentIndex, track, indicators, leftButton, rightButton) {
  let currentSlide = document.querySelector(".current--slide");
  console.log(currentSlide);
  console.log("scroll happening");
  console.log(currentIndex);
  let targetSlide = currentSlide;
  if (direction === "left") {
    targetSlide = currentSlide.previousElementSibling;
  }
  if (direction === "right") {
    targetSlide = currentSlide.nextElementSibling;
  }
  console.log(targetSlide);
  moveTrack(targetSlide, track);
  setButtons(currentIndex, indicators, leftButton, rightButton);
  setCurrentSlideClass(currentSlide, targetSlide);
  resetIndicators(indicators, currentIndex);
  setTextContent(currentIndex);
}
function resetSlides() {
  const track = document.querySelector(".carousel__track");
  const slides = Array.from(track.children);
  const slideWidth = slides[0].getBoundingClientRect().width;
  setSlidesPosition(slides, slideWidth);
  return {track, slides};
}
function getButtonsAndIndicators() {
  const leftButton = document.querySelector(".carousel__button--left");
  const rightButton = document.querySelector(".carousel__button--right");
  const indicators = document.querySelectorAll(".carousel__indicator");
  const indicatorsArray = Array.from(indicators);
  return {leftButton, rightButton, indicators, indicatorsArray};
}

function moveToSlide(slides, indexOfSlide, track, leftButton, rightButton, indicators) {
  let currentSlide = document.querySelector(".current--slide");
  let targetSlide = slides[indexOfSlide];
  const currentIndex = indexOfSlide;
  moveTrack(targetSlide, track);
  setCurrentSlideClass(currentSlide, targetSlide);
  setButtons(currentIndex, indicators, leftButton, rightButton);
  resetIndicators(indicators, currentIndex);
  setTextContent(currentIndex);
  return currentIndex;
}

function setupCarousel() {
  let clicked = false;
  let carouselEnded = false;
  const {track, slides} = resetSlides(); 
  let currentIndex = 0;
  console.log(currentIndex);
  //initializing first position on carousel
  const {leftButton, rightButton, indicators, indicatorsArray} = getButtonsAndIndicators();
  leftButton.style.display = "none";
  leftButton.addEventListener("click", function scrollLeft() {
    clicked = true;
    currentIndex -= 1;
    scroll("left", currentIndex, track, indicators, leftButton, rightButton);
  });
  rightButton.addEventListener("click", function scrollRight() {
    clicked = true;
    currentIndex += 1;
    scroll("right", currentIndex, track, indicators, leftButton, rightButton);
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", function clickIndicator() {
      clicked = true;
      const indexOfSlide = indicatorsArray.indexOf(indicator)
      currentIndex = moveToSlide(slides, indexOfSlide, track, leftButton, rightButton, indicators)
    });
  });

  function moveCarousel() {
    if (currentIndex !== indicators.length - 1 && carouselEnded === false && clicked === false) {
      currentIndex += 1;
      scroll("right", currentIndex, track, indicators, leftButton, rightButton);
      
    } else {
      carouselEnded = true;
    }
  }
  setInterval(moveCarousel, 3000);

  window.addEventListener('resize', () => {
    console.log('window resized');
    resetSlides();
    clicked = false;
    carouselEnded = false;
    currentIndex = moveToSlide(slides, 0, track, leftButton, rightButton, indicators);
    // const {leftButton, rightButton, indicators, indicatorsArray} = getButtonsAndIndicators();
    })
};
document.addEventListener("DOMContentLoaded", () => {
  setupCarousel();
});


  //move slide back to first slide 
  //reset index
  //reset active slide
  //reset textcontent




