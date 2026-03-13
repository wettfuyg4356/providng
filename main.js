
        window.addEventListener('scroll', function() {
            const elements = document.querySelectorAll('.feature-box');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight - 100) {
                    element.style.opacity = '1';
                }
            });
        });

 
        document.querySelector('.cta-button').addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        }); 

       
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const tabs = document.querySelectorAll('.tab-btn');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function updateSlider() {

    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'exit');
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index < currentSlide) {
            slide.classList.add('exit');
        }
    });
    
  
    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}


tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

let touchStartX = 0;
let touchEndX = 0;

const sliderContent = document.querySelector('.slider-content');

if (sliderContent) {
    sliderContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    sliderContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        changeSlide(-1);
    }
}

const solutionsSection = document.querySelector('.solutions-section');
if (solutionsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(solutionsSection);
}