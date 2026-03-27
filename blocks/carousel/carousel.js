const AUTOPLAY_INTERVAL = 5000;
const SWIPE_THRESHOLD = 50;

function getSlideData(row) {
  const cells = [...row.children];
  if (cells.length < 5) return null;

  const [imageCell, eyebrowCell, titleCell, descriptionCell, linkCell] = cells;

  if (imageCell.textContent.trim().toLowerCase() === 'imagem') return null;

  return {
    imageCell,
    eyebrow: eyebrowCell.textContent.trim(),
    title: titleCell.textContent.trim(),
    description: descriptionCell.innerHTML,
    link: linkCell.querySelector('a'),
  };
}

function setActiveSlide(block, index) {
  const slides = [...block.querySelectorAll('.carousel-slide')];
  const dots = [...block.querySelectorAll('.carousel-dot')];

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === index;
    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    dot.setAttribute('tabindex', isActive ? '0' : '-1');
  });

  block.dataset.activeSlide = index;
}

function showRelativeSlide(block, offset, slidesCount) {
  const activeIndex = Number(block.dataset.activeSlide || 0);
  const nextIndex = (activeIndex + offset + slidesCount) % slidesCount;
  setActiveSlide(block, nextIndex);
}

function stopAutoplay(block) {
  if (block.carouselAutoplay) {
    window.clearInterval(block.carouselAutoplay);
    block.carouselAutoplay = null;
  }
}

function startAutoplay(block, slidesCount) {
  if (!block.classList.contains('autoplay') || slidesCount < 2) return;

  stopAutoplay(block);
  block.carouselAutoplay = window.setInterval(() => {
    showRelativeSlide(block, 1, slidesCount);
  }, AUTOPLAY_INTERVAL);
}

function bindSwipe(viewport, onPrevious, onNext) {
  let startX = 0;
  let isPointerDown = false;

  viewport.addEventListener('pointerdown', (event) => {
    isPointerDown = true;
    startX = event.clientX;
  });

  viewport.addEventListener('pointerup', (event) => {
    if (!isPointerDown) return;

    const deltaX = event.clientX - startX;
    isPointerDown = false;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX > 0) onPrevious();
    else onNext();
  });

  viewport.addEventListener('pointerleave', () => {
    isPointerDown = false;
  });

  viewport.addEventListener('pointercancel', () => {
    isPointerDown = false;
  });
}

function createArrowButton(direction, label) {
  const button = document.createElement('button');
  button.className = `carousel-arrow carousel-arrow-${direction}`;
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.innerHTML = '<span class="carousel-arrow-icon" aria-hidden="true"></span>';
  return button;
}

export default function decorate(block) {
  const rows = [...block.children];
  const slidesData = rows.map(getSlideData).filter(Boolean);

  if (!slidesData.length) return;

  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  slidesData.forEach((slideData) => {
    const slide = document.createElement('article');
    slide.className = 'carousel-slide';
    slide.setAttribute('aria-hidden', 'true');

    const media = document.createElement('div');
    media.className = 'carousel-slide-media';
    while (slideData.imageCell.firstElementChild) {
      media.append(slideData.imageCell.firstElementChild);
    }

    const content = document.createElement('div');
    content.className = 'carousel-slide-content';

    if (slideData.eyebrow) {
      const eyebrow = document.createElement('p');
      eyebrow.className = 'carousel-slide-eyebrow';
      eyebrow.textContent = slideData.eyebrow;
      content.append(eyebrow);
    }

    if (slideData.title) {
      const title = document.createElement('h2');
      title.className = 'carousel-slide-title';
      title.textContent = slideData.title;
      content.append(title);
    }

    if (slideData.description) {
      const description = document.createElement('div');
      description.className = 'carousel-slide-description';
      description.innerHTML = slideData.description;
      content.append(description);
    }

    if (slideData.link) {
      const linkWrapper = document.createElement('p');
      linkWrapper.className = 'carousel-slide-link';
      slideData.link.classList.add('button', 'primary');
      linkWrapper.append(slideData.link);
      content.append(linkWrapper);
    }

    slide.append(media, content);
    track.append(slide);
  });

  const previousButton = createArrowButton('prev', 'Slide anterior');
  const nextButton = createArrowButton('next', 'Proximo slide');

  const showPrevious = () => {
    showRelativeSlide(block, -1, slidesData.length);
  };

  const showNext = () => {
    showRelativeSlide(block, 1, slidesData.length);
  };

  previousButton.addEventListener('click', showPrevious);
  nextButton.addEventListener('click', showNext);

  viewport.append(previousButton, track, nextButton);

  const controls = document.createElement('div');
  controls.className = 'carousel-controls';

  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  dots.setAttribute('role', 'tablist');
  dots.setAttribute('aria-label', 'Seletor de slides');

  slidesData.forEach((slideData, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ir para slide ${index + 1}: ${slideData.title}`);
    dot.addEventListener('click', () => setActiveSlide(block, index));
    dots.append(dot);
  });

  controls.append(dots);
  block.replaceChildren(viewport, controls);
  setActiveSlide(block, 0);

  bindSwipe(viewport, showPrevious, showNext);

  if (block.classList.contains('autoplay')) {
    const pauseAutoplay = () => stopAutoplay(block);
    const resumeAutoplay = () => startAutoplay(block, slidesData.length);

    block.addEventListener('mouseenter', pauseAutoplay);
    block.addEventListener('mouseleave', resumeAutoplay);
    block.addEventListener('focusin', pauseAutoplay);
    block.addEventListener('focusout', resumeAutoplay);
    startAutoplay(block, slidesData.length);
  }
}
