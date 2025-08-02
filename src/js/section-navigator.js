// SECTION NAVIGATION CONTROLLER
class SectionNavigator {
    constructor() {
        this.sections = ['home', 'portfolio', 'skills', 'certificates'];
        this.sectionNames = ['Home', 'Portfolio', 'Skills', 'Certificates'];
        this.currentSection = 0;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.bindEvents();
        this.disableScroll();
        this.showInitialSection();
    }
    
    setupElements() {
        this.navigatorBtn = document.getElementById('section-navigator');
        this.indicator = document.getElementById('section-indicator');
        this.dots = document.querySelectorAll('.section-dot');
        this.sectionElements = this.sections.map(id => document.getElementById(id));
    }
    
    bindEvents() {
        // Botón navegador principal
        this.navigatorBtn.addEventListener('click', () => {
            this.nextSection();
        });
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSection(index);
            });
        });
        
        // Navigation menu links integration
        this.bindMenuNavigation();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault();
                this.nextSection();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.previousSection();
            }
        });
        
        // Wheel navigation (opcional - descomenta si quieres navegación con rueda del mouse)
        /*
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    this.nextSection();
                } else {
                    this.previousSection();
                }
            }, 150);
        }, { passive: false });
        */
    }
    
    bindMenuNavigation() {
        // Integrar navegación del menú lateral
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Obtener el href del enlace (ej: #home, #portfolio, etc.)
                const href = link.getAttribute('href');
                const sectionId = href.replace('#', '');
                
                // Encontrar el índice de la sección
                const sectionIndex = this.sections.indexOf(sectionId);
                
                if (sectionIndex !== -1) {
                    // Ir a la sección
                    this.goToSection(sectionIndex);
                    
                    // Cerrar el menú
                    const main = document.getElementById('main');
                    main.classList.remove('show-menu');
                    
                    // Actualizar el estado activo del menú
                    this.updateMenuActiveState(sectionId);
                }
            });
        });
    }
    
    updateMenuActiveState(activeSectionId) {
        // Actualizar el estado activo en el menú lateral
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const sectionId = href.replace('#', '');
            
            if (sectionId === activeSectionId) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }
    
    disableScroll() {
        // Desactivar scroll normal
        document.body.classList.add('no-scroll');
        
        // Prevenir scroll con teclas
        document.addEventListener('keydown', (e) => {
            const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
            if (scrollKeys.includes(e.key) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
                    e.preventDefault();
                }
            }
        });
    }
    
    showInitialSection() {
        // Ocultar todas las secciones excepto la primera
        this.sectionElements.forEach((section, index) => {
            if (index === 0) {
                section.style.display = 'block';
                section.style.opacity = '1';
            } else {
                section.style.display = 'none';
                section.style.opacity = '0';
            }
        });
        
        this.updateIndicator();
        this.updateDots();
        this.updateMenuActiveState(this.sections[0]);
    }
    
    nextSection() {
        if (this.isTransitioning) return;
        
        const nextIndex = (this.currentSection + 1) % this.sections.length;
        this.goToSection(nextIndex);
    }
    
    previousSection() {
        if (this.isTransitioning) return;
        
        const prevIndex = (this.currentSection - 1 + this.sections.length) % this.sections.length;
        this.goToSection(prevIndex);
    }
    
    goToSection(index) {
        if (this.isTransitioning || index === this.currentSection) return;
        
        this.isTransitioning = true;
        
        const currentElement = this.sectionElements[this.currentSection];
        const nextElement = this.sectionElements[index];
        
        // Animación de salida
        currentElement.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        currentElement.style.opacity = '0';
        currentElement.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            // Ocultar sección actual
            currentElement.style.display = 'none';
            currentElement.style.transform = 'translateY(0)';
            
            // Mostrar nueva sección
            nextElement.style.display = 'block';
            nextElement.style.opacity = '0';
            nextElement.style.transform = 'translateY(20px)';
            nextElement.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
            
            // Forzar reflow
            nextElement.offsetHeight;
            
            // Animación de entrada
            nextElement.style.opacity = '1';
            nextElement.style.transform = 'translateY(0)';
            
            this.currentSection = index;
            this.updateIndicator();
            this.updateDots();
            this.updateNavigatorIcon();
            this.updateMenuActiveState(this.sections[index]);
            
            setTimeout(() => {
                this.isTransitioning = false;
                // Limpiar transiciones
                currentElement.style.transition = '';
                nextElement.style.transition = '';
            }, 300);
            
        }, 300);
    }
    
    updateIndicator() {
        this.indicator.textContent = this.sectionNames[this.currentSection];
        this.indicator.classList.add('show');
        
        // Ocultar después de 2 segundos
        setTimeout(() => {
            this.indicator.classList.remove('show');
        }, 2000);
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    updateNavigatorIcon() {
        const icon = this.navigatorBtn.querySelector('i');
        
        // Animación del icono
        icon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            icon.style.transform = 'rotate(0deg)';
        }, 150);
        
        // Cambiar icono en la última sección
        if (this.currentSection === this.sections.length - 1) {
            icon.className = 'bx bx-chevron-up';
        } else {
            icon.className = 'bx bx-chevron-down';
        }
    }
    
    // Método para habilitar scroll normal (si se necesita)
    enableScroll() {
        document.body.classList.remove('no-scroll');
    }
    
    // Método para deshabilitar navegación por secciones (si se necesita)
    destroy() {
        this.enableScroll();
        this.navigatorBtn.remove();
        this.indicator.remove();
        document.getElementById('section-dots').remove();
        
        // Mostrar todas las secciones
        this.sectionElements.forEach(section => {
            section.style.display = 'block';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }
}

// Función para inicializar el navegador de secciones
export function initSectionNavigator() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new SectionNavigator();
        });
    } else {
        new SectionNavigator();
    }
}

// Auto-inicializar si el archivo se carga directamente
if (typeof window !== 'undefined') {
    initSectionNavigator();
}
