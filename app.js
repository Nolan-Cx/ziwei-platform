/**
 * 紫微斗数 · 国学基础学习平台
 * Main Application Script
 */

// ========================================
// 1. Theme Toggle
// ========================================
class ThemeManager {
    constructor() {
        this.toggleBtn = document.getElementById('themeToggle');
        this.html = document.documentElement;
        this.storageKey = 'ziwei-theme';
        this.init();
    }

    init() {
        // Load saved theme or default to light
        const saved = localStorage.getItem(this.storageKey);
        if (saved === 'dark') {
            this.setDark();
        } else {
            this.setLight();
        }

        this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    toggle() {
        if (this.html.getAttribute('data-theme') === 'dark') {
            this.setLight();
        } else {
            this.setDark();
        }
    }

    setDark() {
        this.html.setAttribute('data-theme', 'dark');
        localStorage.setItem(this.storageKey, 'dark');
    }

    setLight() {
        this.html.removeAttribute('data-theme');
        localStorage.setItem(this.storageKey, 'light');
    }
}

// ========================================
// 2. Mobile Menu
// ========================================
class MobileMenu {
    constructor() {
        this.toggleBtn = document.getElementById('mobileMenuToggle');
        this.nav = document.getElementById('mobileNav');
        this.navLinks = this.nav.querySelectorAll('.nav-link');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.toggleBtn.addEventListener('click', () => this.toggle());

        // Close menu when clicking a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Close on scroll
        window.addEventListener('scroll', () => {
            if (this.isOpen) this.close();
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.nav.classList.toggle('open', this.isOpen);
    }

    close() {
        this.isOpen = false;
        this.nav.classList.remove('open');
    }
}

// ========================================
// 3. Starfield Background Animation
// ========================================
class Starfield {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.connections = [];
        this.constellationStars = [];
        this.time = 0;
        this.isDark = false;

        this.init();
    }

    init() {
        this.resize();
        this.createStars();
        this.createConstellation();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }

    createStars() {
        const count = Math.min(180, Math.floor((this.canvas.width * this.canvas.height) / 10000));
        this.stars = [];
        for (let i = 0; i < count; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.2 + 0.2,
                speed: Math.random() * 0.2 + 0.03,
                opacity: Math.random() * 0.5 + 0.15,
                twinkleSpeed: Math.random() * 0.015 + 0.003,
                twinklePhase: Math.random() * Math.PI * 2
            });
        }
    }

    createConstellation() {
        this.constellationStars = [
            { x: 0.5, y: 0.35, name: '紫微', brightness: 1.0, size: 2.8, color: '#c9a84c' },
            { x: 0.42, y: 0.28, name: '天机', brightness: 0.9, size: 2.2, color: '#c9a84c' },
            { x: 0.58, y: 0.28, name: '太阳', brightness: 0.95, size: 2.5, color: '#e0c878' },
            { x: 0.38, y: 0.42, name: '武曲', brightness: 0.85, size: 2.0, color: '#c9a84c' },
            { x: 0.62, y: 0.42, name: '天同', brightness: 0.8, size: 1.9, color: '#c9a84c' },
            { x: 0.45, y: 0.48, name: '廉贞', brightness: 0.88, size: 2.1, color: '#c44d34' },
            { x: 0.5, y: 0.55, name: '天府', brightness: 0.92, size: 2.4, color: '#c9a84c' },
            { x: 0.35, y: 0.55, name: '太阴', brightness: 0.82, size: 1.9, color: '#8a9aaa' },
            { x: 0.65, y: 0.55, name: '贪狼', brightness: 0.87, size: 2.0, color: '#c9a84c' },
            { x: 0.4, y: 0.62, name: '巨门', brightness: 0.78, size: 1.7, color: '#8a8a9a' },
            { x: 0.6, y: 0.62, name: '天相', brightness: 0.83, size: 1.8, color: '#c9a84c' },
            { x: 0.45, y: 0.68, name: '天梁', brightness: 0.81, size: 1.8, color: '#6d8a6d' },
            { x: 0.55, y: 0.68, name: '七杀', brightness: 0.86, size: 2.0, color: '#c44d34' },
            { x: 0.5, y: 0.75, name: '破军', brightness: 0.84, size: 1.9, color: '#c44d34' },
        ];
        this.connections = [
            [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
            [1, 3], [2, 4], [3, 5], [4, 5],
            [0, 6], [6, 7], [6, 8],
            [6, 9], [6, 10], [6, 11], [6, 12], [6, 13],
            [7, 9], [8, 10], [11, 12], [12, 13],
        ];
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createStars();
        });
    }

    updateTheme() {
        this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    }

    drawStarfield() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateTheme();

        const starColor = this.isDark ? '244, 243, 237' : '100, 90, 70';

        this.stars.forEach(star => {
            const twinkle = Math.sin(this.time * star.twinkleSpeed + star.twinklePhase);
            const opacity = star.opacity * (0.7 + twinkle * 0.3);

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${starColor}, ${opacity})`;
            ctx.fill();

            if (star.size > 0.8) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${starColor}, ${opacity * 0.08})`;
                ctx.fill();
            }

            star.y -= star.speed;
            if (star.y < 0) {
                star.y = this.canvas.height;
                star.x = Math.random() * this.canvas.width;
            }
        });
    }

    drawConstellation() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.strokeStyle = this.isDark
            ? 'rgba(201, 168, 76, 0.12)'
            : 'rgba(184, 149, 78, 0.1)';
        ctx.lineWidth = 0.5;

        this.connections.forEach(([a, b]) => {
            const starA = this.constellationStars[a];
            const starB = this.constellationStars[b];
            ctx.beginPath();
            ctx.moveTo(starA.x * w, starA.y * h);
            ctx.lineTo(starB.x * w, starB.y * h);
            ctx.stroke();
        });

        this.constellationStars.forEach((star, i) => {
            const x = star.x * w;
            const y = star.y * h;
            const pulse = Math.sin(this.time * 0.02 + i * 0.5) * 0.2 + 0.8;

            const r = parseInt(star.color.slice(1, 3), 16);
            const g = parseInt(star.color.slice(3, 5), 16);
            const bVal = parseInt(star.color.slice(5, 7), 16);

            ctx.beginPath();
            ctx.arc(x, y, star.size * 4 * pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${bVal}, 0.08)`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, star.size * pulse, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x - 0.5, y - 0.5, star.size * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        });
    }

    animate() {
        this.time++;
        this.drawStarfield();
        this.drawConstellation();
        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// 4. Interactive ZiWei Chart (SVG)
// ========================================
class ZiWeiChart {
    constructor(svgId) {
        this.svg = document.getElementById(svgId);
        if (!this.svg) return;
        this.palaceLines = document.getElementById('palaceLines');
        this.palaceLabels = document.getElementById('palaceLabels');
        this.starNodes = document.getElementById('starNodes');
        this.tooltip = document.getElementById('chartTooltip');

        this.palaces = [
            '命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄',
            '迁移', '交友', '官禄', '田宅', '福德', '父母'
        ];

        this.stars = [
            { name: '紫微', palace: 0, color: '#c9a84c' },
            { name: '天机', palace: 1, color: '#c9a84c' },
            { name: '太阳', palace: 2, color: '#e0c878' },
            { name: '武曲', palace: 3, color: '#c9a84c' },
            { name: '天同', palace: 4, color: '#c9a84c' },
            { name: '廉贞', palace: 5, color: '#c44d34' },
            { name: '天府', palace: 6, color: '#c9a84c' },
            { name: '太阴', palace: 7, color: '#8a9aaa' },
            { name: '贪狼', palace: 8, color: '#c9a84c' },
            { name: '巨门', palace: 9, color: '#8a8a9a' },
            { name: '天相', palace: 10, color: '#c9a84c' },
            { name: '天梁', palace: 11, color: '#6d8a6d' },
            { name: '七杀', palace: 0, color: '#c44d34' },
            { name: '破军', palace: 6, color: '#c44d34' },
        ];

        this.init();
    }

    init() {
        this.drawPalaceLines();
        this.drawPalaceLabels();
        this.drawStarNodes();
    }

    drawPalaceLines() {
        const cx = 200, cy = 200, r = 190;
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', cx);
            line.setAttribute('y1', cy);
            line.setAttribute('x2', cx + r * Math.cos(angle));
            line.setAttribute('y2', cy + r * Math.sin(angle));
            line.setAttribute('stroke', 'rgba(184, 149, 78, 0.1)');
            line.setAttribute('stroke-width', '1');
            this.palaceLines.appendChild(line);
        }
    }

    drawPalaceLabels() {
        const cx = 200, cy = 200, r = 165;
        this.palaces.forEach((palace, i) => {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', cx + r * Math.cos(angle));
            text.setAttribute('y', cy + r * Math.sin(angle));
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', 'rgba(128, 120, 100, 0.5)');
            text.setAttribute('font-size', '10');
            text.setAttribute('font-family', 'Noto Sans SC, sans-serif');
            text.setAttribute('letter-spacing', '1');
            text.textContent = palace;
            this.palaceLabels.appendChild(text);
        });
    }

    drawStarNodes() {
        const cx = 200, cy = 200;
        this.stars.forEach((star, i) => {
            const angle = (star.palace * 30 - 75 + (i % 3 - 1) * 10) * Math.PI / 180;
            const r = 80 + (i % 2) * 40;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);

            const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            glow.setAttribute('cx', x);
            glow.setAttribute('cy', y);
            glow.setAttribute('r', '8');
            glow.setAttribute('fill', star.color);
            glow.setAttribute('opacity', '0.15');
            this.starNodes.appendChild(glow);

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', '3');
            circle.setAttribute('fill', star.color);
            circle.setAttribute('class', 'star-node');
            circle.setAttribute('data-name', star.name);
            circle.setAttribute('data-palace', this.palaces[star.palace]);
            circle.style.cursor = 'pointer';

            circle.addEventListener('mouseenter', () => {
                this.showTooltip(star);
                glow.setAttribute('opacity', '0.4');
                circle.setAttribute('r', '5');
            });

            circle.addEventListener('mouseleave', () => {
                this.hideTooltip();
                glow.setAttribute('opacity', '0.15');
                circle.setAttribute('r', '3');
            });

            this.starNodes.appendChild(circle);

            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x);
            label.setAttribute('y', y - 8);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('fill', star.color);
            label.setAttribute('font-size', '8');
            label.setAttribute('font-family', 'Noto Serif SC, serif');
            label.setAttribute('opacity', '0.6');
            label.textContent = star.name;
            this.starNodes.appendChild(label);
        });
    }

    showTooltip(star) {
        this.tooltip.innerHTML = `
            <strong style="color:${star.color};font-family:Noto Serif SC,serif;">${star.name}</strong><br>
            <span style="color:var(--text-secondary);font-size:0.75rem;">${star.palace !== undefined ? '位于：' + this.palaces[star.palace] + '宫' : ''}</span>
        `;
        this.tooltip.classList.add('visible');
    }

    hideTooltip() {
        this.tooltip.classList.remove('visible');
    }
}

// ========================================
// 5. Scroll Observer & Interactions
// ========================================
class ScrollManager {
    constructor() {
        this.header = document.getElementById('header');
        this.cards = document.querySelectorAll('.knowledge-card');
        this.navLinks = document.querySelectorAll('.header-nav .nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });

        // Card entrance animation
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        this.cards.forEach(card => {
            if (!card.style.opacity) {
                cardObserver.observe(card);
            }
        });

        // Nav highlight
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.2
        });

        this.sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
}

// ========================================
// 6. Live Clock
// ========================================
function updateClock() {
    const el = document.getElementById('live-time');
    if (!el) return;
    const now = new Date();
    el.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

// ========================================
// 7. Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// 8. Marquee Direction on Scroll
// ========================================
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        marqueeTrack.style.animationDirection = delta > 0 ? 'normal' : 'reverse';
    }
    lastScrollY = currentY;
});

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    const mobileMenu = new MobileMenu();
    const starfield = new Starfield('starfield');
    const chart = new ZiWeiChart('ziweiChart');
    const scrollManager = new ScrollManager();

    updateClock();
    setInterval(updateClock, 60000);

    // Page fade-in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-out';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
