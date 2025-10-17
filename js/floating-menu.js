// Floating Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuContent = document.getElementById('menuContent');
    const floatingMenu = document.getElementById('floatingMenu');
    
    let isMenuOpen = false;
    
    // Toggle menu function
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            menuContent.classList.add('active');
            menuToggle.classList.add('active');
            floatingMenu.classList.add('expanded');
        } else {
            menuContent.classList.remove('active');
            menuToggle.classList.remove('active');
            floatingMenu.classList.remove('expanded');
        }
    }
    
    // Close menu function
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            menuContent.classList.remove('active');
            menuToggle.classList.remove('active');
            floatingMenu.classList.remove('expanded');
        }
    }
    
    // Event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (floatingMenu && !floatingMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    // Prevent menu from closing when clicking inside menu content
    if (menuContent) {
        menuContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Add smooth scroll behavior for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a small delay to show the click effect
            setTimeout(() => {
                closeMenu();
            }, 150);
        });
    });
    
    // Add hover effects
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Auto-hide menu on scroll (optional)
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            floatingMenu.style.transform = 'translateX(-100%)';
        } else {
            // Scrolling up
            floatingMenu.style.transform = 'translateX(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add animation delays for menu items
    const menuItemElements = document.querySelectorAll('.menu-item');
    menuItemElements.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Add CSS animations and styles for the floating menu
const floatingMenuStyles = `
/* Floating Menu Styles */
.floating-menu {
    position: fixed;
    top: 40px;
    left: 40px;
    z-index: 1000;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-toggle {
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
}

.menu-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.menu-toggle.active {
    background: #DC6B5E;
    transform: scale(1.1) rotate(90deg);
}

.menu-dots {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
}

.dot {
    width: 8px;
    height: 8px;
    background: #36394F;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.menu-toggle.active .dot {
    background: #FFFFFF;
}

.menu-toggle.active .dot:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
}

.menu-toggle.active .dot:nth-child(2) {
    opacity: 0;
}

.menu-toggle.active .dot:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
}

.menu-toggle.active .dot:nth-child(4) {
    opacity: 0;
}

.menu-content {
    position: absolute;
    top: 80px;
    left: 0;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 20px;
    min-width: 220px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(15px);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px) scale(0.9);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-content.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    border-radius: 15px;
    text-decoration: none;
    color: #36394F;
    font-family: "Manjari", Helvetica;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    margin-bottom: 5px;
}

.menu-item:last-child {
    margin-bottom: 0;
}

.menu-item:hover {
    background: rgba(220, 107, 94, 0.1);
    color: #DC6B5E;
    transform: translateX(5px);
}

.menu-item.active {
    background: #DC6B5E;
    color: #FFFFFF;
}

.menu-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    transition: all 0.3s ease;
}

/* Iconos específicos para cada sección */
.home-icon {
    background: #F0E5DB;
    color: #DC6B5E;
}

.home-icon::before {
    content: "🏠";
}

.intro-icon {
    background: #DB7A55;
    color: #FFFFFF;
}

.intro-icon::before {
    content: "📖";
}

.findings-icon {
    background: #6881A4;
    color: #FFFFFF;
}

.findings-icon::before {
    content: "🔍";
}

.ai-icon {
    background: #629B99;
    color: #FFFFFF;
}

.ai-icon::before {
    content: "🤖";
}

.menu-item.active .menu-icon {
    background: rgba(255, 255, 255, 0.2);
    color: #FFFFFF;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .floating-menu {
        top: 20px;
        left: 20px;
    }
    
    .menu-toggle {
        width: 50px;
        height: 50px;
    }
    
    .menu-content {
        min-width: 200px;
        padding: 15px;
    }
    
    .menu-item {
        padding: 12px 15px;
        font-size: 14px;
    }
    
    .menu-icon {
        width: 20px;
        height: 20px;
        font-size: 10px;
    }
}

/* Animation for menu expansion */
.floating-menu.expanded {
    transform: scale(1.02);
}

/* Smooth transitions for all interactive elements */
.floating-menu * {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
`;

// Inject the styles into the document
const styleSheet = document.createElement('style');
styleSheet.textContent = floatingMenuStyles;
document.head.appendChild(styleSheet);
