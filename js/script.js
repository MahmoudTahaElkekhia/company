document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const NavBtn = document.getElementById("NavBtn");
  const navLinks = document.querySelector(".nav-links");

  const handleScrollAndResize = () => {
    if (window.scrollY > 50 || window.innerWidth < 961) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  handleScrollAndResize();
  window.addEventListener("scroll", handleScrollAndResize);
  window.addEventListener("resize", handleScrollAndResize);

  NavBtn.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
    NavBtn.classList.toggle("toggle");
  });

  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");

  let currentIndex = 0;
  let isDragging = false;
  let startPosX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  // Automatic sliding
  setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds (5000ms)

  // Manual dragging
  slider.addEventListener("mousedown", (event) => {
    isDragging = true;
    startPosX = event.clientX;
    animationID = requestAnimationFrame(animation);
    slider.style.cursor = "grabbing";
  });

  slider.addEventListener("mouseup", () => {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const moveAmount = currentTranslate - prevTranslate;
    if (moveAmount < -40 && currentIndex < slides.length - 1) {
      currentIndex += 1;
      if (currentIndex == slides.length) {
        currentIndex = 0;
      }
    }
    if (moveAmount > 40 && currentIndex > 0) {
      currentIndex -= 1;
      if (currentIndex == 0) {
        currentIndex = slides.length - 1;
      }
    }
    setPositionByIndex();
    slider.style.cursor = "grab";
  });

  slider.addEventListener("mouseleave", () => {
    isDragging = false;
    cancelAnimationFrame(animationID);
    slider.style.cursor = "grab";
  });

  slider.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const currentPositionX = event.clientX;
      const translateAmount = currentPositionX - startPosX;
      currentTranslate = prevTranslate + translateAmount;
      slider.style.transform = `translateX(${currentTranslate}px)`;
    }
  });

  function nextSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
    setPositionByIndex();
  }

  function setPositionByIndex() {
    currentTranslate = -currentIndex * slider.offsetWidth;
    prevTranslate = currentTranslate;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  const services = document.querySelectorAll(".service");
  const serviceSlider = document.querySelector(".service-slider");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  let curIndex = 0;

  function updateButtons() {
    let servicesPerScreen = Math.floor(
      serviceSlider.offsetWidth / (services[0].offsetWidth + 10)
    );

    prevButton.classList.toggle("disabled", curIndex === 0);
    nextButton.classList.toggle(
      "disabled",
      curIndex === services.length - servicesPerScreen
    );
  }

  function moveService() {
    const serviceWidth = services[0].offsetWidth + 10;
    const newPosition = -curIndex * serviceWidth;
    serviceSlider.style.transform = `translateX(${newPosition}px)`;
    updateButtons();
  }

  function nextService() {
    let servicesPerScreen = Math.floor(
      serviceSlider.offsetWidth / (services[0].offsetWidth + 10)
    );
    if (curIndex < services.length - servicesPerScreen) {
      curIndex++;
      moveService();
    }
  }

  function prevService() {
    if (curIndex > 0) {
      curIndex--;
      moveService();
    }
  }

  function resetService() {
    curIndex = 0;
    moveService();
  }

  nextButton.addEventListener("click", nextService);
  prevButton.addEventListener("click", prevService);

  window.addEventListener("resize", resetService); // Adjust slider position on window resize

  // Initial setup
  updateButtons();
});
