// Ribbit Presentation Website Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  // Restore saved theme or default to dark
  const savedTheme = localStorage.getItem('ribbit-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('ribbit-theme', newTheme);
    });
  }

  // 2. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. Gallery Filtering
  const filterTabs = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });

  // 4. Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  let currentGalleryImgs = [];
  let currentImgIndex = -1;

  const updateGalleryList = () => {
    currentGalleryImgs = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]) img, .pub-card img, .scenario-screenshots img, .tier-screenshots-row img, .q-card img'));
  };

  const openLightbox = (imgSrc) => {
    updateGalleryList();
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    currentImgIndex = currentGalleryImgs.findIndex(img => img.src === imgSrc);
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Open lightbox on clicking any previewable image
  document.querySelectorAll('.gallery-item img, .pub-card img, .scenario-screenshots img, .tier-screenshots-row img, .q-card img, .hero-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      if (currentGalleryImgs.length > 0 && currentImgIndex < currentGalleryImgs.length - 1) {
        currentImgIndex++;
        lightboxImg.src = currentGalleryImgs[currentImgIndex].src;
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentGalleryImgs.length > 0 && currentImgIndex > 0) {
        currentImgIndex--;
        lightboxImg.src = currentGalleryImgs[currentImgIndex].src;
      }
    }
  });
});
