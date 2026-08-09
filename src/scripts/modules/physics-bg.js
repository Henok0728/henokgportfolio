/**
 * Modern Physics Equations Background Engine
 * Renders authentic LaTeX physics equations using KaTeX with:
 * - Genuine LaTeX mathematical formatting (fractions, roots, integrals, matrices, tensors)
 * - LaTeX code display and domain metadata badge on hover
 * - High-contrast black typography in Light Mode and glowing silver/cyan in Dark Mode
 * - Interactive gravitational lensing, particle wave connections & spacetime metric canvas
 */

import katex from 'katex';

export function initPhysicsBackground() {
    // Clean up any existing instances
    const existingCanvas = document.getElementById('physics-bg-canvas');
    if (existingCanvas) existingCanvas.remove();
    const existingLayer = document.getElementById('physics-equations-layer');
    if (existingLayer) existingLayer.remove();

    // 1. Spacetime Metric Canvas (for coordinates, particles, ripples)
    const canvas = document.createElement('canvas');
    canvas.id = 'physics-bg-canvas';
    document.body.prepend(canvas);

    // 2. Floating LaTeX Equations DOM Layer
    const equationsLayer = document.createElement('div');
    equationsLayer.id = 'physics-equations-layer';
    document.body.prepend(equationsLayer);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse & interaction state
    const mouse = {
        x: -2000,
        y: -2000,
        targetX: -2000,
        targetY: -2000,
        radius: 190,
        isHovered: false
    };

    const ripples = [];

    // Modern Physics Equations Dataset with authentic LaTeX formulas
    const EQUATIONS_DATA = [
        {
            latex: 'G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}',
            name: 'Einstein Field Equations',
            field: 'General Relativity'
        },
        {
            latex: 'i\\hbar \\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\hat{H}\\Psi(\\mathbf{r},t)',
            name: 'Schrödinger Wave Equation',
            field: 'Quantum Mechanics'
        },
        {
            latex: '(i\\hbar\\gamma^\\mu \\partial_\\mu - mc)\\psi = 0',
            name: 'Dirac Relativistic Equation',
            field: 'Relativistic Quantum Mechanics'
        },
        {
            latex: '\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}',
            name: 'Heisenberg Uncertainty Principle',
            field: 'Quantum Mechanics'
        },
        {
            latex: 'S_{BH} = \\frac{k_B c^3 A}{4 G \\hbar}',
            name: 'Bekenstein-Hawking Entropy',
            field: 'Black Hole Thermodynamics'
        },
        {
            latex: 'E^2 = (pc)^2 + (m_0 c^2)^2',
            name: 'Relativistic Energy-Momentum',
            field: 'Special Relativity'
        },
        {
            latex: '\\mathcal{Z} = \\int \\mathcal{D}\\phi \\, \\exp\\left(\\frac{i}{\\hbar}S[\\phi]\\right)',
            name: 'Feynman Path Integral',
            field: 'Quantum Field Theory'
        },
        {
            latex: '\\mathcal{L}_{QED} = \\bar{\\psi}(i\\gamma^\\mu D_\\mu - m)\\psi - \\frac{1}{4}F_{\\mu\\nu}F^{\\mu\\nu}',
            name: 'QED Lagrangian',
            field: 'Quantum Electrodynamics'
        },
        {
            latex: '\\partial_\\mu F^{\\mu\\nu} = \\mu_0 J^\\nu',
            name: 'Covariant Maxwell Equations',
            field: 'Classical Electrodynamics'
        },
        {
            latex: '\\left(\\Box + \\frac{m^2 c^2}{\\hbar^2}\\right)\\phi = 0',
            name: 'Klein-Gordon Equation',
            field: 'Quantum Field Theory'
        },
        {
            latex: 'S = k_B \\ln \\Omega',
            name: 'Boltzmann Entropy Formula',
            field: 'Statistical Mechanics'
        },
        {
            latex: '[\\hat{x}_j, \\hat{p}_k] = i\\hbar \\delta_{jk}',
            name: 'Canonical Commutator',
            field: 'Quantum Mechanics'
        },
        {
            latex: '\\lambda = \\frac{h}{p} = \\frac{2\\pi}{k}',
            name: 'de Broglie Wavelength',
            field: 'Wave-Particle Duality'
        },
        {
            latex: '\\alpha = \\frac{e^2}{4\\pi\\varepsilon_0 \\hbar c} \\approx \\frac{1}{137}',
            name: 'Fine-Structure Constant',
            field: 'Quantum Electrodynamics'
        },
        {
            latex: 'ds^2 = -\\left(1 - \\frac{2GM}{rc^2}\\right)c^2 dt^2 + \\left(1 - \\frac{2GM}{rc^2}\\right)^{-1}dr^2 + r^2 d\\Omega^2',
            name: 'Schwarzschild Metric',
            field: 'General Relativity'
        },
        {
            latex: '\\left(\\frac{\\dot{a}}{a}\\right)^2 = \\frac{8\\pi G}{3}\\rho - \\frac{k c^2}{a^2} + \\frac{\\Lambda c^2}{3}',
            name: 'Friedmann Cosmological Equation',
            field: 'Cosmology & Gravitation'
        },
        {
            latex: 'T_H = \\frac{\\hbar c^3}{8\\pi G M k_B}',
            name: 'Hawking Radiation Temperature',
            field: 'Black Hole Physics'
        },
        {
            latex: '\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v} \\times \\mathbf{B})',
            name: 'Lorentz Force Law',
            field: 'Electromagnetism'
        },
        {
            latex: '\\ell_P = \\sqrt{\\frac{\\hbar G}{c^3}}',
            name: 'Planck Length Scale',
            field: 'Quantum Gravity'
        },
        {
            latex: 't_P = \\sqrt{\\frac{\\hbar G}{c^5}}',
            name: 'Planck Time Scale',
            field: 'Quantum Gravity'
        },
        {
            latex: '\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}',
            name: 'Faraday-Maxwell Induction Law',
            field: 'Electrodynamics'
        },
        {
            latex: 'H(X) = -\\sum_{x} P(x) \\log_2 P(x)',
            name: 'Shannon Information Entropy',
            field: 'Information Theory'
        },
        {
            latex: '\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}',
            name: 'Lorentz Contraction Factor',
            field: 'Special Relativity'
        },
        {
            latex: 'E = \\hbar\\omega = h\\nu',
            name: 'Planck-Einstein Energy Relation',
            field: 'Quantum Theory'
        }
    ];

    // Floating Quantum Operator Glyphs
    const QUANTUM_SYMBOLS = [
        'ℏ', 'ψ', 'Ψ', '∇', '∂_μ', '∫𝒟ϕ', '∑', 'γ^μ', 'g_μν', 'c', 
        'G', 'k_B', 'ε₀', 'μ₀', 'α', 'Ω', 'λ_dB', 'σ', 'δ_μν', 'exp(iS/ℏ)', 
        'Ĥ', 'p̂', 'x̂', '⊗', '⟨ψ|ϕ⟩', 'Tr(ρ)', '□'
    ];

    // Theme Color Palette
    function getTheme() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            return {
                isLight: true,
                gridLine: 'rgba(0, 0, 0, 0.045)',
                gridNode: 'rgba(0, 0, 0, 0.14)',
                symbolBase: 'rgba(0, 0, 0, 0.26)',
                symbolHover: '#000000',
                connectionLine: 'rgba(0, 0, 0, 0.08)',
                rippleColor: 'rgba(0, 0, 0, 0.25)',
                lensGlow: 'rgba(0, 0, 0, 0.04)'
            };
        } else {
            return {
                isLight: false,
                gridLine: 'rgba(255, 255, 255, 0.024)',
                gridNode: 'rgba(255, 255, 255, 0.07)',
                symbolBase: 'rgba(148, 163, 184, 0.14)',
                symbolHover: 'rgba(56, 189, 248, 0.85)',
                connectionLine: 'rgba(255, 255, 255, 0.035)',
                rippleColor: 'rgba(56, 189, 248, 0.28)',
                lensGlow: 'rgba(56, 189, 248, 0.06)'
            };
        }
    }

    let equations = [];
    let symbols = [];
    let gridPoints = [];

    // Initialize Equations & Scene Layout
    function initScene() {
        equationsLayer.innerHTML = '';
        equations = [];
        symbols = [];
        gridPoints = [];

        const isMobile = width < 768;
        const eqCount = isMobile ? 6 : Math.min(Math.floor((width * height) / 80000) + 4, EQUATIONS_DATA.length);
        const shuffled = [...EQUATIONS_DATA].sort(() => 0.5 - Math.random());

        // Grid-based initial distribution
        const cols = isMobile ? 2 : 4;
        const rows = Math.ceil(eqCount / cols);
        const cellW = width / cols;
        const cellH = height / rows;

        for (let i = 0; i < eqCount; i++) {
            const data = shuffled[i % shuffled.length];
            const col = i % cols;
            const row = Math.floor(i / cols);

            const x = col * cellW + Math.random() * (cellW * 0.7) + cellW * 0.15;
            const y = row * cellH + Math.random() * (cellH * 0.7) + cellH * 0.15;

            // Render LaTeX via KaTeX
            let renderedLatexHtml = '';
            try {
                renderedLatexHtml = katex.renderToString(data.latex, {
                    displayMode: true,
                    throwOnError: false
                });
            } catch (err) {
                renderedLatexHtml = `<span class="latex-fallback">${data.latex}</span>`;
            }

            // Create DOM Node for LaTeX equation
            const node = document.createElement('div');
            node.className = 'physics-equation-node';
            node.innerHTML = `
                <div class="latex-formula">${renderedLatexHtml}</div>
                <div class="latex-code-badge">\\LaTeX: ${data.latex}</div>
                <div class="equation-meta-badge">[ ${data.field} • ${data.name} ]</div>
            `;
            equationsLayer.appendChild(node);

            equations.push({
                ...data,
                el: node,
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                vx: (Math.random() - 0.5) * 0.16,
                vy: (Math.random() - 0.5) * 0.16,
                hoverProgress: 0,
                pulseOffset: Math.random() * Math.PI * 2,
                floatSpeed: Math.random() * 0.0012 + 0.0008
            });
        }

        // Quantum Operator Symbols
        const symbolCount = isMobile ? 12 : Math.min(Math.floor((width * height) / 42000), 28);
        for (let i = 0; i < symbolCount; i++) {
            const sym = QUANTUM_SYMBOLS[Math.floor(Math.random() * QUANTUM_SYMBOLS.length)];
            const x = Math.random() * width;
            const y = Math.random() * height;
            symbols.push({
                char: sym,
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                size: Math.random() * 8 + 14,
                opacity: Math.random() * 0.5 + 0.5,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.003,
                hoverProgress: 0
            });
        }

        // Spacetime Coordinate Grid Points
        const gridSpacing = isMobile ? 120 : 100;
        for (let gx = 0; gx < width + gridSpacing; gx += gridSpacing) {
            for (let gy = 0; gy < height + gridSpacing; gy += gridSpacing) {
                gridPoints.push({
                    x: gx,
                    y: gy,
                    baseX: gx,
                    baseY: gy
                });
            }
        }
    }

    // Resize Handler
    function handleResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        initScene();
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse / Touch Event Listeners
    const onMouseMove = (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
        mouse.isHovered = true;
    };

    const onMouseLeave = () => {
        mouse.targetX = -2000;
        mouse.targetY = -2000;
        mouse.isHovered = false;
    };

    const onPointerDown = (e) => {
        const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : width / 2);
        const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : height / 2);
        
        ripples.push({
            x: x,
            y: y,
            radius: 10,
            maxRadius: Math.max(width, height) * 0.45,
            opacity: 0.7,
            speed: 4.5
        });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            mouse.targetX = e.touches[0].clientX;
            mouse.targetY = e.touches[0].clientY;
            mouse.isHovered = true;
        }
    }, { passive: true });

    window.addEventListener('touchend', onMouseLeave);

    // Animation Loop
    let animationFrameId = null;
    let lastTime = performance.now();

    function render(currentTime) {
        const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
        lastTime = currentTime;

        // Smooth mouse position damping
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        const theme = getTheme();

        // Clear Canvas
        ctx.clearRect(0, 0, width, height);

        // Draw Spacetime Coordinate Grid with Gravitational Curvature
        ctx.lineWidth = 1;
        ctx.strokeStyle = theme.gridLine;

        // Interactive Gravitational Lensing Glow around Cursor
        if (mouse.isHovered && mouse.x > 0 && mouse.y > 0) {
            const glowGradient = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, mouse.radius * 1.5
            );
            glowGradient.addColorStop(0, theme.lensGlow);
            glowGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, mouse.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw Metric Grid Nodes & Deflected Lattice
        for (let i = 0; i < gridPoints.length; i++) {
            const gp = gridPoints[i];
            const dx = mouse.x - gp.baseX;
            const dy = mouse.y - gp.baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Gravitational distortion of metric lattice near cursor
            if (dist < mouse.radius * 1.3 && dist > 1) {
                const force = (1 - dist / (mouse.radius * 1.3)) * 14;
                gp.x = gp.baseX - (dx / dist) * force;
                gp.y = gp.baseY - (dy / dist) * force;
            } else {
                gp.x += (gp.baseX - gp.x) * 0.08;
                gp.y += (gp.baseY - gp.y) * 0.08;
            }

            // Draw subtle metric node crosshair / dot
            ctx.fillStyle = theme.gridNode;
            ctx.fillRect(gp.x - 1, gp.y - 1, 2, 2);
        }

        // Draw Gravitational Ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.radius += r.speed;
            r.opacity -= 0.012;

            if (r.opacity <= 0 || r.radius >= r.maxRadius) {
                ripples.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.strokeStyle = theme.rippleColor.replace(/[\d\.]+\)$/, `${Math.max(0, r.opacity * 0.5)})`);
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Secondary wave ring
            if (r.radius > 25) {
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius - 20, 0, Math.PI * 2);
                ctx.strokeStyle = theme.rippleColor.replace(/[\d\.]+\)$/, `${Math.max(0, r.opacity * 0.25)})`);
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            ctx.restore();
        }

        // Draw Quantum Symbols & Entanglement Connections
        for (let i = 0; i < symbols.length; i++) {
            const s = symbols[i];

            s.x += s.vx;
            s.y += s.vy;
            s.rot += s.rotSpeed;

            if (s.x < -30) s.x = width + 30;
            if (s.x > width + 30) s.x = -30;
            if (s.y < -30) s.y = height + 30;
            if (s.y > height + 30) s.y = -30;

            const dx = mouse.x - s.x;
            const dy = mouse.y - s.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const isNear = dist < mouse.radius * 0.9;
            s.hoverProgress += ((isNear ? 1 : 0) - s.hoverProgress) * 0.1;

            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.rot);

            ctx.font = `italic ${s.size}px "EB Garamond", "STIX Two Text", "Times New Roman", serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (s.hoverProgress > 0.05) {
                ctx.fillStyle = theme.symbolHover;
                ctx.shadowColor = theme.isLight ? 'rgba(0, 0, 0, 0.25)' : 'rgba(56, 189, 248, 0.7)';
                ctx.shadowBlur = 8 * s.hoverProgress;
            } else {
                ctx.fillStyle = theme.symbolBase;
            }

            ctx.fillText(s.char, 0, 0);
            ctx.restore();

            // Delicate quantum entanglement lines between close symbols
            for (let j = i + 1; j < symbols.length; j++) {
                const s2 = symbols[j];
                const sdx = s.x - s2.x;
                const sdy = s.y - s2.y;
                const sdist = Math.sqrt(sdx * sdx + sdy * sdy);

                if (sdist < 90) {
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(s2.x, s2.y);
                    ctx.strokeStyle = theme.connectionLine;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }

        // Animate & Position LaTeX Equations DOM Nodes
        const time = currentTime * 0.001;
        for (let i = 0; i < equations.length; i++) {
            const eq = equations[i];

            const floatOffsetY = Math.sin(time * eq.floatSpeed * 1000 + eq.pulseOffset) * 6;
            const floatOffsetX = Math.cos(time * eq.floatSpeed * 800 + eq.pulseOffset) * 4;

            eq.x += eq.vx;
            eq.y += eq.vy;

            const pad = 160;
            if (eq.x < -pad) eq.x = width + pad;
            if (eq.x > width + pad) eq.x = -pad;
            if (eq.y < -pad) eq.y = height + pad;
            if (eq.y > height + pad) eq.y = -pad;

            const renderX = eq.x + floatOffsetX;
            const renderY = eq.y + floatOffsetY;

            // Check distance from cursor for gravitational deflection & hover state
            const dx = mouse.x - renderX;
            const dy = mouse.y - renderY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const isTarget = dist < mouse.radius * 1.1;
            eq.hoverProgress += ((isTarget ? 1 : 0) - eq.hoverProgress) * 0.12;

            // Gravitational lens deflection
            let drawX = renderX;
            let drawY = renderY;
            if (dist < mouse.radius * 1.3 && dist > 2) {
                const warp = (1 - dist / (mouse.radius * 1.3)) * 14;
                drawX += (dx / dist) * warp;
                drawY += (dy / dist) * warp;
            }

            // Update DOM Node transform
            if (eq.el) {
                eq.el.style.transform = `translate3d(${drawX}px, ${drawY}px, 0px) translate(-50%, -50%)`;
                if (eq.hoverProgress > 0.05) {
                    eq.el.classList.add('is-hovered');
                } else {
                    eq.el.classList.remove('is-hovered');
                }
            }
        }

        animationFrameId = requestAnimationFrame(render);
    }

    // Start Animation Loop
    animationFrameId = requestAnimationFrame(render);

    // Clean-up on page unload or replacement
    return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeave);
        window.removeEventListener('pointerdown', onPointerDown);
        if (canvas) canvas.remove();
        if (equationsLayer) equationsLayer.remove();
    };
}
