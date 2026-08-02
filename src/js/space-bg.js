/**
 * Moon-Focused Space Science Background Engine
 * Strict Black & White / Monochromatic Theme
 * Features: Detailed Monochromatic Hero Moon with Craters, Selenographic Grid & Shadow Terminator,
 * Lunar Reconnaissance Satellite, Regolith Stardust Aura, Constellations, Shooting Stars, and Gravitational Wave Ripples.
 */

export function initSpaceBackground() {
    // Prevent duplicate canvas instances
    if (document.getElementById('space-science-bg')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'space-science-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-2';
    canvas.style.pointerEvents = 'none';
    
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Mouse tracking for gravitational lensing & interactive ripples
    const mouse = {
        x: -1000,
        y: -1000,
        targetX: -1000,
        targetY: -1000,
        radius: 150
    };

    const ripples = [];

    // Resize Canvas dynamically
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        
        initStars();
        initRegolithParticles();
    }

    // Theme Color Scheme Generator (Black & White Monochromatic)
    function getThemeColors() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            return {
                bg: '248, 250, 252',
                star: '15, 23, 42',           // Dark charcoal (#0f172a)
                line: '15, 23, 42',
                moonCore: '240, 243, 246',
                moonLine: '15, 23, 42',
                grid: 'rgba(15, 23, 42, 0.05)',
                text: 'rgba(15, 23, 42, 0.35)'
            };
        } else {
            return {
                bg: '0, 0, 0',
                star: '255, 255, 255',       // Pure white (#ffffff)
                line: '255, 255, 255',
                moonCore: '12, 12, 14',
                moonLine: '255, 255, 255',
                grid: 'rgba(255, 255, 255, 0.05)',
                text: 'rgba(255, 255, 255, 0.35)'
            };
        }
    }

    // 1. Starfield Setup
    let stars = [];
    function initStars() {
        const starCount = Math.floor((width * height) / 4200);
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                baseX: Math.random() * width,
                baseY: Math.random() * height,
                z: Math.random() * 2 + 0.5,
                radius: Math.random() * 1.5 + 0.4,
                alpha: Math.random() * 0.75 + 0.25,
                twinkleSpeed: Math.random() * 0.03 + 0.005,
                twinklePhase: Math.random() * Math.PI * 2,
                vx: (Math.random() - 0.5) * 0.12,
                vy: (Math.random() - 0.5) * 0.12
            });
        }
    }

    // 2. Hero Moon System Properties
    const heroMoon = {
        relX: 0.82, // Positioned at upper right (82% width)
        relY: 0.26, // Upper section (26% height)
        baseRadius: 85,
        rotation: 0,
        phaseAngle: 0,
        orbitAngle: 0
    };

    // Orbiting Regolith Dust Particles around Moon
    let regolith = [];
    function initRegolithParticles() {
        regolith = [];
        for (let i = 0; i < 40; i++) {
            regolith.push({
                distance: Math.random() * 90 + 95,
                angle: Math.random() * Math.PI * 2,
                speed: (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
                size: Math.random() * 1.6 + 0.5,
                alpha: Math.random() * 0.6 + 0.2
            });
        }
    }

    // Render Heroic Monochromatic Moon with Detailed Selenographic Geometry
    function drawHeroMoon(colors) {
        const mx = width > 768 ? width * heroMoon.relX : width * 0.85;
        const my = height * heroMoon.relY;
        const r = Math.min(width, height) < 600 ? 55 : heroMoon.baseRadius;

        heroMoon.rotation += 0.0008;
        heroMoon.phaseAngle += 0.0012;
        heroMoon.orbitAngle += 0.004;

        ctx.save();
        ctx.translate(mx, my);

        // A. Outer Gravitational Aura Ring & Glow
        ctx.strokeStyle = `rgba(${colors.moonLine}, 0.15)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, r + 15, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(${colors.moonLine}, 0.08)`;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.arc(0, 0, r + 30, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // B. Moon Base Disk Fill
        ctx.fillStyle = `rgb(${colors.moonCore})`;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        // C. Outer Moon Limb Perimeter
        ctx.strokeStyle = `rgba(${colors.moonLine}, 0.65)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        // D. Selenographic Longitude & Latitude Coordinates Grid
        ctx.strokeStyle = `rgba(${colors.moonLine}, 0.16)`;
        ctx.lineWidth = 1;

        // Latitude circles
        for (let i = -3; i <= 3; i++) {
            ctx.beginPath();
            const yOff = (r / 4) * i;
            const rx = Math.sqrt(Math.max(0, r * r - yOff * yOff));
            ctx.ellipse(0, yOff, rx, r * 0.18, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Central Longitude Meridian (slow rotation)
        const rotOffset = Math.sin(heroMoon.rotation) * (r * 0.4);
        ctx.beginPath();
        ctx.ellipse(rotOffset, 0, r * 0.4, r * 0.98, 0, 0, Math.PI * 2);
        ctx.stroke();

        // E. Famous Lunar Wireframe Craters & Maria Formations
        ctx.strokeStyle = `rgba(${colors.moonLine}, 0.3)`;

        // 1. Tycho Crater (South, with radiating impact rays)
        const tychoX = r * 0.15;
        const tychoY = r * 0.52;
        ctx.beginPath();
        ctx.arc(tychoX, tychoY, r * 0.09, 0, Math.PI * 2);
        ctx.stroke();

        // Tycho Impact Ray Lines
        ctx.setLineDash([2, 4]);
        ctx.strokeStyle = `rgba(${colors.moonLine}, 0.2)`;
        ctx.beginPath();
        ctx.moveTo(tychoX, tychoY);
        ctx.lineTo(tychoX - r * 0.4, tychoY - r * 0.5);
        ctx.moveTo(tychoX, tychoY);
        ctx.lineTo(tychoX + r * 0.5, tychoY - r * 0.3);
        ctx.moveTo(tychoX, tychoY);
        ctx.lineTo(tychoX - r * 0.3, tychoY + r * 0.3);
        ctx.stroke();
        ctx.setLineDash([]);

        // 2. Copernicus Crater (North-West)
        const copX = -r * 0.32;
        const copY = -r * 0.2;
        ctx.strokeStyle = `rgba(${colors.moonLine}, 0.32)`;
        ctx.beginPath();
        ctx.arc(copX, copY, r * 0.12, 0, Math.PI * 2);
        ctx.arc(copX, copY, r * 0.05, 0, Math.PI * 2);
        ctx.stroke();

        // 3. Mare Tranquillitatis (Sea of Tranquillity outline)
        const mareX = r * 0.3;
        const mareY = -r * 0.15;
        ctx.strokeStyle = `rgba(${colors.moonLine}, 0.22)`;
        ctx.beginPath();
        ctx.ellipse(mareX, mareY, r * 0.25, r * 0.18, 0.3, 0, Math.PI * 2);
        ctx.stroke();

        // F. Dynamic Moon Shadow Terminator Line (Waxing / Waning Phase Arc)
        const shadowTerminatorX = Math.sin(heroMoon.phaseAngle) * r;
        ctx.fillStyle = `rgba(${colors.bg}, 0.55)`;
        ctx.beginPath();
        ctx.arc(0, 0, r, Math.PI * 0.5, Math.PI * 1.5, false);
        ctx.ellipse(0, 0, Math.abs(shadowTerminatorX), r, 0, Math.PI * 1.5, Math.PI * 0.5, shadowTerminatorX < 0);
        ctx.fill();

        // G. Low Lunar Orbit Spacecraft (Lunar Reconnaissance Orbiter / LRO)
        const lroRadiusX = r * 1.85;
        const lroRadiusY = r * 0.65;
        const lroAngle = heroMoon.orbitAngle;

        ctx.strokeStyle = `rgba(${colors.moonLine}, 0.25)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, lroRadiusX, lroRadiusY, -0.2, 0, Math.PI * 2);
        ctx.stroke();

        // LRO Orbiter Node
        const lroX = Math.cos(lroAngle) * lroRadiusX;
        const lroY = Math.sin(lroAngle) * lroRadiusY;
        const rotLroX = lroX * Math.cos(-0.2) - lroY * Math.sin(-0.2);
        const rotLroY = lroX * Math.sin(-0.2) + lroY * Math.cos(-0.2);

        ctx.fillStyle = `rgba(${colors.moonLine}, 0.9)`;
        ctx.beginPath();
        ctx.arc(rotLroX, rotLroY, 3, 0, Math.PI * 2);
        ctx.fill();

        // LRO Antenna Direction Line
        ctx.strokeStyle = `rgba(${colors.moonLine}, 0.4)`;
        ctx.beginPath();
        ctx.moveTo(rotLroX, rotLroY);
        ctx.lineTo(rotLroX * 1.12, rotLroY * 1.12);
        ctx.stroke();

        ctx.restore();

        // H. Draw Orbiting Regolith Dust Particles
        for (let p of regolith) {
            p.angle += p.speed;
            const px = mx + Math.cos(p.angle) * p.distance;
            const py = my + Math.sin(p.angle) * (p.distance * 0.6);
            ctx.fillStyle = `rgba(${colors.star}, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 3. Secondary Lunar Phase Map Diagram (Bottom Left)
    const secondaryDiagram = {
        relX: 0.12,
        relY: 0.8,
        angle: 0
    };

    function drawLunarPhaseDiagram(colors) {
        const dx = width * secondaryDiagram.relX;
        const dy = height * secondaryDiagram.relY;
        secondaryDiagram.angle += 0.005;

        ctx.save();
        ctx.translate(dx, dy);

        ctx.strokeStyle = `rgba(${colors.line}, 0.15)`;
        ctx.lineWidth = 1;

        // Concentric lunar radar circles
        ctx.beginPath();
        ctx.arc(0, 0, 45, 0, Math.PI * 2);
        ctx.arc(0, 0, 80, 0, Math.PI * 2);
        ctx.stroke();

        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, 115, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Crosshair axes
        ctx.beginPath();
        ctx.moveTo(-125, 0);
        ctx.lineTo(125, 0);
        ctx.moveTo(0, -125);
        ctx.lineTo(0, 125);
        ctx.stroke();

        // 8 Moon Phase dots around diagram
        for (let i = 0; i < 8; i++) {
            const a = (i * Math.PI) / 4;
            const px = Math.cos(a) * 80;
            const py = Math.sin(a) * 80;

            ctx.strokeStyle = `rgba(${colors.line}, 0.4)`;
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.stroke();

            // Phase crescent shadow fill
            ctx.fillStyle = `rgba(${colors.star}, 0.8)`;
            ctx.beginPath();
            ctx.arc(px, py, 6, a - Math.PI / 2, a + Math.PI / 2, false);
            ctx.fill();
        }

        ctx.restore();
    }

    // 4. Drifting Space Probe / Lander Wireframe
    const probe = {
        x: -100,
        y: 180,
        vx: 0.22,
        vy: 0.06
    };

    function drawSpaceProbe(colors) {
        probe.x += probe.vx;
        probe.y += probe.vy;

        if (probe.x > width + 100 || probe.y > height + 100) {
            probe.x = -80;
            probe.y = Math.random() * (height * 0.4);
        }

        ctx.save();
        ctx.translate(probe.x, probe.y);
        ctx.rotate(0.25);

        ctx.strokeStyle = `rgba(${colors.line}, 0.3)`;
        ctx.lineWidth = 1;

        // Lunar Lander octagonal body
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const a = (i * Math.PI) / 4;
            const px = Math.cos(a) * 11;
            const py = Math.sin(a) * 11;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Lander Legs
        ctx.beginPath();
        ctx.moveTo(-11, 11);
        ctx.lineTo(-20, 22);
        ctx.moveTo(11, 11);
        ctx.lineTo(20, 22);
        ctx.stroke();

        // High gain antenna dish
        ctx.beginPath();
        ctx.moveTo(0, -11);
        ctx.lineTo(0, -20);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -20, 6, Math.PI * 0.2, Math.PI * 0.8, true);
        ctx.stroke();

        ctx.restore();
    }

    // 5. Shooting Stars / Meteor Trails
    let shootingStar = null;
    function spawnShootingStar() {
        if (shootingStar) return;
        shootingStar = {
            x: Math.random() * (width * 0.8),
            y: Math.random() * (height * 0.4),
            length: Math.random() * 90 + 70,
            speed: Math.random() * 8 + 6,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
            life: 0,
            maxLife: 45
        };
    }

    function updateAndDrawShootingStar(colors) {
        if (!shootingStar) {
            if (Math.random() < 0.008) spawnShootingStar();
            return;
        }

        const s = shootingStar;
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        const alpha = Math.sin((s.life / s.maxLife) * Math.PI);
        grad.addColorStop(0, `rgba(${colors.star}, ${alpha * 0.95})`);
        grad.addColorStop(1, `rgba(${colors.star}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        if (s.life >= s.maxLife) {
            shootingStar = null;
        }
    }

    // 6. Selenographic Coordinate Grid & Lunar Observatory UI Metadata Text
    function drawCelestialGrid(colors) {
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 1;

        // RA (vertical lines)
        const stepX = 160;
        for (let x = stepX; x < width; x += stepX) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // DEC (horizontal lines)
        const stepY = 160;
        for (let y = stepY; y < height; y += stepY) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Lunar Metadata Labels (Monochrome typography)
        ctx.font = '10px "Inter", monospace';
        ctx.fillStyle = colors.text;

        // Top Left: Lunar Observatory Telemetry
        ctx.fillText('LUNAR OBSERVATORY // SELENOGRAPHIC GRID [0.68° N, 23.47° E]', 24, 30);

        // Bottom Right: Distance to Moon & Gravity
        ctx.textAlign = 'right';
        ctx.fillText('DISTANCE: 384,400 KM | LUNAR GRAVITY: 1.62 m/s² | MONOCHROME SPACE', width - 24, height - 24);
        ctx.textAlign = 'left';
    }

    // 7. Interactive Gravitational Wave Ripples on Click
    function updateAndDrawRipples(colors) {
        for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.radius += r.speed;
            r.alpha -= 0.014;

            if (r.alpha <= 0) {
                ripples.splice(i, 1);
                continue;
            }

            ctx.strokeStyle = `rgba(${colors.line}, ${r.alpha * 0.45})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.stroke();

            // Inner echo ring
            if (r.radius > 20) {
                ctx.strokeStyle = `rgba(${colors.line}, ${r.alpha * 0.25})`;
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius - 16, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    }

    // Mouse Listeners
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
    });

    window.addEventListener('click', (e) => {
        ripples.push({
            x: e.clientX,
            y: e.clientY,
            radius: 5,
            speed: 3.5,
            alpha: 1
        });
    });

    // Main Render Loop
    function render() {
        // Smooth mouse position easing
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        const colors = getThemeColors();

        ctx.clearRect(0, 0, width, height);

        // 1. Selenographic Coordinate Grid
        drawCelestialGrid(colors);

        // 2. Starfield & Constellation Network
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];

            // Gravitational lens displacement near mouse
            const dx = mouse.x - s.baseX;
            const dy = mouse.y - s.baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < mouse.radius) {
                const force = (1 - dist / mouse.radius) * 14;
                const angle = Math.atan2(dy, dx);
                s.x = s.baseX - Math.cos(angle) * force;
                s.y = s.baseY - Math.sin(angle) * force;
            } else {
                s.x += (s.baseX - s.x) * 0.05;
                s.y += (s.baseY - s.y) * 0.05;
            }

            // Drift movement
            s.baseX += s.vx;
            s.baseY += s.vy;

            if (s.baseX < 0) s.baseX = width;
            if (s.baseX > width) s.baseX = 0;
            if (s.baseY < 0) s.baseY = height;
            if (s.baseY > height) s.baseY = 0;

            // Twinkle brightness
            s.twinklePhase += s.twinkleSpeed;
            const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));

            // Draw star
            ctx.fillStyle = `rgba(${colors.star}, ${currentAlpha})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fill();

            // Draw Constellation Lines between close stars
            for (let j = i + 1; j < stars.length; j++) {
                const s2 = stars[j];
                const lineDx = s.x - s2.x;
                const lineDy = s.y - s2.y;
                const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

                if (lineDist < 95) {
                    const lineAlpha = (1 - lineDist / 95) * 0.16;
                    ctx.strokeStyle = `rgba(${colors.line}, ${lineAlpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(s2.x, s2.y);
                    ctx.stroke();
                }
            }
        }

        // 3. Render Heroic Monochromatic Moon & Regolith System
        drawHeroMoon(colors);

        // 4. Render Lunar Phase Diagram Radar
        drawLunarPhaseDiagram(colors);

        // 5. Render Space Probe / Lander
        drawSpaceProbe(colors);

        // 6. Shooting Stars / Meteors
        updateAndDrawShootingStar(colors);

        // 7. Interactive Gravitational Wave Ripples
        updateAndDrawRipples(colors);

        requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    resize();
    render();
}
