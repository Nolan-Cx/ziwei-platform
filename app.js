/**
 * 紫微斗数 · 国学基础学习平台
 * Main Application Script
 */

// ========================================
// 1. Starfield Background Animation
// ========================================
class Starfield {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.connections = [];
        this.constellationStars = [];
        this.mouse = { x: 0, y: 0 };
        this.time = 0;
        
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
        const count = Math.min(200, Math.floor((this.canvas.width * this.canvas.height) / 8000));
        this.stars = [];
        
        for (let i = 0; i < count; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.3,
                speed: Math.random() * 0.3 + 0.05,
                opacity: Math.random() * 0.6 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinklePhase: Math.random() * Math.PI * 2
            });
        }
    }
    
    createConstellation() {
        // 创建紫微星图的主要星点（模拟北斗七星等）
        this.constellationStars = [
            // 紫微星（中心）
            { x: 0.5, y: 0.35, name: '紫微', brightness: 1.0, size: 3, color: '#c9a84c' },
            // 天机
            { x: 0.42, y: 0.28, name: '天机', brightness: 0.9, size: 2.5, color: '#c9a84c' },
            // 太阳
            { x: 0.58, y: 0.28, name: '太阳', brightness: 0.95, size: 2.8, color: '#e0c878' },
            // 武曲
            { x: 0.38, y: 0.42, name: '武曲', brightness: 0.85, size: 2.3, color: '#c9a84c' },
            // 天同
            { x: 0.62, y: 0.42, name: '天同', brightness: 0.8, size: 2.2, color: '#c9a84c' },
            // 廉贞
            { x: 0.45, y: 0.48, name: '廉贞', brightness: 0.88, size: 2.4, color: '#c44d34' },
            // 天府
            { x: 0.5, y: 0.55, name: '天府', brightness: 0.92, size: 2.6, color: '#c9a84c' },
            // 太阴
            { x: 0.35, y: 0.55, name: '太阴', brightness: 0.82, size: 2.2, color: '#8a9aaa' },
            // 贪狼
            { x: 0.65, y: 0.55, name: '贪狼', brightness: 0.87, size: 2.3, color: '#c9a84c' },
            // 巨门
            { x: 0.4, y: 0.62, name: '巨门', brightness: 0.78, size: 2.0, color: '#8a8a9a' },
            // 天相
            { x: 0.6, y: 0.62, name: '天相', brightness: 0.83, size: 2.1, color: '#c9a84c' },
            // 天梁
            { x: 0.45, y: 0.68, name: '天梁', brightness: 0.81, size: 2.1, color: '#6d8a6d' },
            // 七杀
            { x: 0.55, y: 0.68, name: '七杀', brightness: 0.86, size: 2.3, color: '#c44d34' },
            // 破军
            { x: 0.5, y: 0.75, name: '破军', brightness: 0.84, size: 2.2, color: '#c44d34' },
        ];
        
        // 星连线关系
        this.connections = [
            [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], // 紫微连接到主要星
            [1, 3], [2, 4], [3, 5], [4, 5], // 内部连接
            [0, 6], [6, 7], [6, 8], // 天府系
            [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], // 天府到其他
            [7, 9], [8, 10], [11, 12], [12, 13], // 次级连接
        ];
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createStars();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    drawStarfield() {
        const ctx = this.ctx;
        
        // 清除画布
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制背景星点
        this.stars.forEach(star => {
            const twinkle = Math.sin(this.time * star.twinkleSpeed + star.twinklePhase);
            const opacity = star.opacity * (0.7 + twinkle * 0.3);
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(244, 243, 237, ${opacity})`;
            ctx.fill();
            
            // 微弱光晕
            if (star.size > 1) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(244, 243, 237, ${opacity * 0.1})`;
                ctx.fill();
            }
            
            // 缓慢移动
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
        
        // 绘制星连线
        ctx.strokeStyle = 'rgba(201, 168, 76, 0.12)';
        ctx.lineWidth = 0.5;
        
        this.connections.forEach(([a, b]) => {
            const starA = this.constellationStars[a];
            const starB = this.constellationStars[b];
            
            const x1 = starA.x * w;
            const y1 = starA.y * h;
            const x2 = starB.x * w;
            const y2 = starB.y * h;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        });
        
        // 绘制主星
        this.constellationStars.forEach((star, i) => {
            const x = star.x * w;
            const y = star.y * h;
            const pulse = Math.sin(this.time * 0.02 + i * 0.5) * 0.2 + 0.8;
            
            // 光晕
            ctx.beginPath();
            ctx.arc(x, y, star.size * 4 * pulse, 0, Math.PI * 2);
            const r = parseInt(star.color.slice(1, 3), 16); 
            const g = parseInt(star.color.slice(3, 5), 16);
            const b = parseInt(star.color.slice(5, 7), 16);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.08)`;
            ctx.fill();
            
            // 星体
            ctx.beginPath();
            ctx.arc(x, y, star.size * pulse, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();
            
            // 高光
            ctx.beginPath();
            ctx.arc(x - 0.5, y - 0.5, star.size * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
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
// 2. Interactive ZiWei Chart (SVG)
// ========================================
class ZiWeiChart {
    constructor(svgId) {
        this.svg = document.getElementById(svgId);
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
        const cx = 200, cy = 200;
        const r = 190;
        
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const x2 = cx + r * Math.cos(angle);
            const y2 = cy + r * Math.sin(angle);
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', cx);
            line.setAttribute('y1', cy);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', 'rgba(201, 168, 76, 0.08)');
            line.setAttribute('stroke-width', '1');
            this.palaceLines.appendChild(line);
        }
    }
    
    drawPalaceLabels() {
        const cx = 200, cy = 200;
        const r = 165;
        
        this.palaces.forEach((palace, i) => {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', 'rgba(244, 243, 237, 0.4)');
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
            
            // 星点光晕
            const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            glow.setAttribute('cx', x);
            glow.setAttribute('cy', y);
            glow.setAttribute('r', '8');
            glow.setAttribute('fill', star.color);
            glow.setAttribute('opacity', '0.15');
            glow.setAttribute('class', 'star-glow');
            this.starNodes.appendChild(glow);
            
            // 星点
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', '3');
            circle.setAttribute('fill', star.color);
            circle.setAttribute('class', 'star-node');
            circle.setAttribute('data-name', star.name);
            circle.setAttribute('data-palace', this.palaces[star.palace]);
            circle.style.cursor = 'pointer';
            
            // 交互事件
            circle.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, star);
                glow.setAttribute('opacity', '0.4');
                circle.setAttribute('r', '5');
            });
            
            circle.addEventListener('mouseleave', () => {
                this.hideTooltip();
                glow.setAttribute('opacity', '0.15');
                circle.setAttribute('r', '3');
            });
            
            this.starNodes.appendChild(circle);
            
            // 星名标签
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
    
    showTooltip(e, star) {
        this.tooltip.innerHTML = `
            <strong style="color:${star.color};font-family:Noto Serif SC,serif;">${star.name}</strong><br>
            <span style="color:rgba(244,243,237,0.6);font-size:0.75rem;">${star.palace !== undefined ? '位于：' + this.palaces[star.palace] + '宫' : ''}</span>
        `;
        this.tooltip.classList.add('visible');
    }
    
    hideTooltip() {
        this.tooltip.classList.remove('visible');
    }
}

// ========================================
// 3. Scroll Observer & Interactions
// ========================================
class ScrollManager {
    constructor() {
        this.header = document.getElementById('header');
        this.cards = document.querySelectorAll('.knowledge-card');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        this.init();
    }
    
    init() {
        // 头部滚动效果
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
        
        // 卡片入场动画
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.cards.forEach(card => {
            cardObserver.observe(card);
        });
        
        // 导航高亮
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
            threshold: 0.3
        });
        
        this.sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
}

// ========================================
// 4. Live Clock
// ========================================
function updateClock() {
    const el = document.getElementById('live-time');
    if (!el) return;
    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    el.textContent = `${hours}:${minutes}`;
}

// ========================================
// 5. Smooth Scroll for Nav Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// 6. Marquee Speed Control on Scroll
// ========================================
let lastScrollY = 0;
let scrollSpeed = 1;

window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;
    scrollSpeed = 1 + Math.abs(delta) * 0.01;
    
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        const direction = delta > 0 ? 'normal' : 'reverse';
        marqueeTrack.style.animationDirection = direction;
    }
    
    lastScrollY = currentY;
});

// ========================================
// 7. Palace Ring Interaction
// ========================================
document.querySelectorAll('.ring-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--accent-gold)';
        this.style.color = 'var(--accent-gold)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border-subtle)';
        this.style.color = 'var(--text-secondary)';
    });
});

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // 初始化星空背景
    const starfield = new Starfield('starfield');
    
    // 初始化紫微星盘
    const chart = new ZiWeiChart('ziweiChart');
    
    // 初始化滚动管理器
    const scrollManager = new ScrollManager();
    
    // 启动时钟
    updateClock();
    setInterval(updateClock, 60000);
    
    // 页面加载完成后的淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
