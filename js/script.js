document.addEventListener('DOMContentLoaded', function() {

// Remover el overlay después de la animación
setTimeout(() => {
    const overlay = document.getElementById('openingOverlay');
    if (overlay) overlay.remove();
}, 6000);

// Efecto typewriter para el título
function typewriterTitle() {
    const titleText = 'Narrar lo que somos';
    const titleElement = document.querySelector('.div');
    if (!titleElement) return;

    let currentTitleText = '';
    let titleIndex = 0;

    function typeNextTitleCharacter() {
        if (titleIndex < titleText.length) {
            currentTitleText += titleText[titleIndex];
            titleElement.textContent = currentTitleText;
            titleIndex++;
            const delay = Math.random() * 100 + 80;
            setTimeout(typeNextTitleCharacter, delay);
        } else {
            setTimeout(typewriterParagraph, 500);
        }
    }

    setTimeout(() => {
        titleElement.style.opacity = '1';
        titleElement.textContent = '';
        typeNextTitleCharacter();
    }, 6500);
}

// Efecto typewriter para el párrafo principal
function typewriterParagraph() {
    const text = 'Este especial es el resultado de una búsqueda: la de entender, a través de los datos y de la lectura sensible, qué están escribiendo los estudiantes y revela lo que motiva, emociona y transforma a quienes están narrando el país desde sus historias.';
    const highlightWords = ['búsqueda', 'datos', 'lectura sensible', 'escribiendo', 'estudiantes', 'motiva', 'emociona', 'transforma', 'narrando', 'país', 'historias'];
    const typewriterElement = document.getElementById('typewriter-paragraph');
    if (!typewriterElement) return;

    let currentText = '';
    let currentIndex = 0;

    function addHighlights(text) {
        let highlightedText = text;
        highlightWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            highlightedText = highlightedText.replace(regex, `<span class="highlight">${word}</span>`);
        });
        return highlightedText;
    }

    function typeNextCharacter() {
        if (currentIndex < text.length) {
            currentText += text[currentIndex];
            typewriterElement.innerHTML = addHighlights(currentText);
            currentIndex++;
            const delay = Math.random() * 50 + 30;
            setTimeout(typeNextCharacter, delay);
        } else {
            setTimeout(() => {
                typewriterElement.style.borderRight = 'none';
            }, 3000);
        }
    }

    typewriterElement.style.borderRight = '2px solid #DC6B5E';
    typeNextCharacter();
}

typewriterTitle();

// Inicializar GSAP y ScrollTrigger
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Animaciones verticales ya existentes...
const mainContainers = document.querySelectorAll('.animate-fade-in-up');
mainContainers.forEach(container => {
    gsap.fromTo(container, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1.2, ease: "ease-in-out",
        scrollTrigger: {
            trigger: container,
            start: "top 65%",
            end: "bottom 15%",
            toggleActions: "play none none none",
            markers: false
        }
    });
});

// Efectos de interacción
const interactiveElements = document.querySelectorAll('a, button, [class*="rectangle"], [class*="group"]');
interactiveElements.forEach(element => {
    if (!element.classList.contains('interactive-element')) {
        element.classList.add('hover-scale');
    }
});

setTimeout(() => {
    const importantElements = document.querySelectorAll('[class*="text-wrapper-2"], [class*="text-wrapper-119"]');
    importantElements.forEach(element => element.classList.add('animate-wiggle'));
}, 2000);

// Animar números
function animateNumbers() {
    const numberElements = document.querySelectorAll('[class*="text-wrapper-43"], [class*="text-wrapper-76"], [class*="text-wrapper-77"]');
    numberElements.forEach(element => {
        const finalNumber = parseInt(element.textContent);
        if (!isNaN(finalNumber) && finalNumber > 0) {
            let currentNumber = 0;
            const increment = finalNumber / 50;
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    element.textContent = finalNumber;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(currentNumber);
                }
            }, 50);
        }
    });
}
setTimeout(animateNumbers, 1000);
});

// Efectos de sonido e interacción
function addSoundEffects() {
const clickableElements = document.querySelectorAll('a, button, .interactive-element');
clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.filter = 'brightness(1.1)';
    });
    element.addEventListener('mouseleave', () => {
        element.style.filter = 'brightness(1)';
    });
    element.addEventListener('click', () => {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    });
});
}
addSoundEffects();

// Partículas flotantes
function createFloatingParticles() {
const particleContainer = document.createElement('div');
Object.assign(particleContainer.style, {
    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '-1'
});
document.body.appendChild(particleContainer);

for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    Object.assign(particle.style, {
        position: 'absolute', width: '4px', height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
        animationDelay: Math.random() * 5 + 's'
    });
    particleContainer.appendChild(particle);
}
}
createFloatingParticles();

const container = document.querySelector(".horizontal-scroll-container");
const slides = gsap.utils.toArray(".horizontal-slide");
let currentSlide = 0;
let isAnimating = false;
let isScrollEnabled = false;

// Ajuste dinámico: se adapta al número de slides
const slideWidth = 100 / slides.length;
gsap.set(container, { display: "flex", width: `${slides.length * 100}%` });
gsap.set(slides, { width: `${slideWidth}%`, flexShrink: 0 });

// Función para manejar las teclas del teclado - NO SE USA (solo mouse)
function handleKeydown(e) {
  // Esta función queda para referencia pero no se activa
  // Todo funciona únicamente con el scroll del mouse
}

// Función mejorada para manejar el scroll
function handleScroll(e) {
  e.preventDefault();
  if (isAnimating) return;

  const section = document.querySelector(".horizontal-scroll-section");
  const navigation = document.querySelector(".navigation");

  // Si estamos en el último slide y la navegación está visible, solo permitir retroceder
  if (navigation && navigation.classList.contains('nav--lowered') && currentSlide === slides.length - 1) {
    // Solo permitir retroceder cuando estamos en el último slide con navegación visible
    if (e.deltaY < 0) {
      currentSlide--;
      goToSlide(currentSlide);
    }
    return;
  }

  // Si estamos en el primer slide y hacemos scroll hacia arriba, salir de la sección
  if (currentSlide === 0 && e.deltaY < 0) {
    window.removeEventListener("wheel", handleScroll);
    ScrollTrigger.disable(trigger);

    // Animar suavemente para salir
    gsap.to(window, {
      scrollTo: {
        y: section,
        offsetY: -window.innerHeight
      },
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        ScrollTrigger.enable(trigger);
      }
    });
    return;
  }

  // Scroll hacia abajo - avanzar slides (solo si no estamos en el último)
  if (e.deltaY > 0 && currentSlide < slides.length - 1) {
    currentSlide++;
    goToSlide(currentSlide);
  }
  // Scroll hacia arriba - retroceder slides
  else if (e.deltaY < 0 && currentSlide > 0) {
    currentSlide--;
    goToSlide(currentSlide);
  }
}

function goToSlide(index) {
  isAnimating = true;

  // Siempre ocultar navegación primero
  hideNavigation();

  gsap.to(container, {
    xPercent: -slideWidth * index,
    duration: 1.2,
    ease: "power3.inOut",
    onComplete: () => {
      isAnimating = false;
      // Si llegamos al último slide, mostrar navegación después de un delay
      if (index === slides.length - 1) {
        setTimeout(() => {
          showNavigation();
        }, 300);
      }
    }
  });
}

function showNavigation() {
  const navigation = document.querySelector(".navigation");
  if (navigation) {
    navigation.classList.add('nav--lowered');
  }
}

function hideNavigation() {
  const navigation = document.querySelector(".navigation");
  if (navigation) {
    navigation.classList.remove('nav--lowered');
  }
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Crear ScrollTrigger mejorado
const trigger = ScrollTrigger.create({
  trigger: ".horizontal-scroll-section",
  start: "top top",
  end: () => {
    // Calcular altura total considerando que cada slide ocupa 100vh
    // pero necesitamos espacio adicional para la navegación
    const slideHeight = window.innerHeight * slides.length;
    const navigationHeight = document.querySelector(".navigation")?.offsetHeight || 100;
    return "+=" + (slideHeight + navigationHeight + 100); // +100 para padding extra
  },
  pin: true,
  anticipatePin: 1,
  scrub: false, // Desactivamos scrub porque usamos eventos personalizados del mouse
  onEnter: () => {
    isScrollEnabled = true;
    hideNavigation();
    window.addEventListener("wheel", handleScroll, { passive: false });
    // Solo usar eventos del mouse, no teclado
  },
  onEnterBack: () => {
    isScrollEnabled = true;
    hideNavigation();
    currentSlide = 0;
    goToSlide(0);
    window.addEventListener("wheel", handleScroll, { passive: false });
    // Solo usar eventos del mouse, no teclado
  },
  onLeave: () => {
    isScrollEnabled = false;
    showNavigation();
    window.removeEventListener("wheel", handleScroll);
    // Solo usar eventos del mouse, no teclado
  },
  onLeaveBack: () => {
    isScrollEnabled = false;
    hideNavigation();
    window.removeEventListener("wheel", handleScroll);
    // Solo usar eventos del mouse, no teclado
  }
});

// Función para resetear el scroll al inicio cuando se recarga la página
function resetScrollPosition() {
  if (container) {
    gsap.set(container, { xPercent: 0 });
    currentSlide = 0;
    hideNavigation(); // Asegurarnos de que la navegación esté oculta al inicio
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', resetScrollPosition);
