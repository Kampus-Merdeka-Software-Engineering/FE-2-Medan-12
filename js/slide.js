const inti = () => {
    setTimeout(() => {
      loaders.style.pointerEvent = 'none';
      loaders.style.opacity = 0;
      setTimeout(() => (loaders.style.zIndex = 0), 1000);
    }, 3000);
  };
  
  inti();
  
  const slider = document.querySelector('.slider__container');
  const slides = Array.from(slider.children);
  const slideSize = slides[0].getBoundingClientRect().width;
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  let auto = true;
  let slideTime = 7000;
  let slideInterval;
  
  const reset = () => {
    slides.forEach((slide, index) => {
      slide.style.left = `${slideSize * index}px`;
    });
  
    slides[0];
  };
  
  reset();
  
  const moveSlide = () => {
    slider.style.transform = `translateX(-${currentSlide * slideSize}px)`;
  };
  
  const nextSlide = () => {
    currentSlide++;  
    if (currentSlide > slides.length - 1) {
      currentSlide = 0;
    }
  
    if (auto) {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, slideTime);
    }
  
    moveSlide();
  };
  
  const prevSlide = () => {
    currentSlide--;  
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
  
    if (auto) {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, slideTime);
    }
  
    moveSlide();
  };
  
  if (auto) {
    slideInterval = setInterval(nextSlide, slideTime);
  }
  
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  