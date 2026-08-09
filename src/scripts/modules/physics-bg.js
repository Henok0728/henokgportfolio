/**
 * Electromagnetics, Vector Calculus & Electrical Machines Background Engine
 * Dedicated Dark Background Theme (Non-interactable, subtle watermark styling)
 * 
 * Equations Featured:
 * - Double & Triple Integrals (Gauss Divergence Theorem, Stokes' Theorem, Energy Integrals)
 * - Vector Curl Formulations & Identities (\nabla \times E, \nabla \times H, \nabla \times (\nabla \times A))
 * - The Four Maxwell Equations in Differential and Integral Forms
 * - Electrical Machines Equations (Induction Motor Torque-Slip, DC Machine Back-EMF/Torque,
 *   Synchronous Power-Angle, Transformer EMF, Park dq0 Transformation, Co-energy Torque)
 * - KaTeX rendered LaTeX mathematical formulas with subtle watermark opacity (dark mode only)
 */

import katex from 'katex';

export function initPhysicsBackground() {
    // Clean up any existing background instances
    const existingCanvas = document.getElementById('physics-bg-canvas');
    if (existingCanvas) existingCanvas.remove();
    const existingLayer = document.getElementById('physics-equations-layer');
    if (existingLayer) existingLayer.remove();

    // 1. Spacetime / Flux Field Canvas (Dark Mode Only)
    const canvas = document.createElement('canvas');
    canvas.id = 'physics-bg-canvas';
    document.body.prepend(canvas);

    // 2. Floating LaTeX Equations DOM Layer (Dark Mode Only)
    const equationsLayer = document.createElement('div');
    equationsLayer.id = 'physics-equations-layer';
    document.body.prepend(equationsLayer);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Curated Dataset: Maxwell Equations, Vector Curl, Double/Triple Integrals, Electrical Machines
    const EQUATIONS_DATA = [
        // 1. The Four Maxwell Equations (Differential & Integral Forms)
        {
            latex: '\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}',
            name: 'Faraday-Maxwell Induction Law'
        },
        {
            latex: '\\oint_C \\mathbf{E} \\cdot d\\mathbf{l} = -\\frac{d}{dt} \\iint_S \\mathbf{B} \\cdot d\\mathbf{S}',
            name: 'Faraday Law of Induction'
        },
        {
            latex: '\\nabla \\times \\mathbf{H} = \\mathbf{J} + \\frac{\\partial \\mathbf{D}}{\\partial t}',
            name: 'Ampère-Maxwell Circuital Law'
        },
        {
            latex: '\\oint_C \\mathbf{H} \\cdot d\\mathbf{l} = \\iint_S \\mathbf{J} \\cdot d\\mathbf{S} + \\frac{d}{dt} \\iint_S \\mathbf{D} \\cdot d\\mathbf{S}',
            name: 'Ampère-Maxwell Circuital Law'
        },
        {
            latex: '\\nabla \\cdot \\mathbf{D} = \\rho_v \\iff \\oiint_S \\mathbf{D} \\cdot d\\mathbf{S} = \\iiint_V \\rho_v \\, dV',
            name: "Gauss's Law for Electricity"
        },
        {
            latex: '\\nabla \\cdot \\mathbf{B} = 0 \\iff \\oiint_S \\mathbf{B} \\cdot d\\mathbf{S} = 0',
            name: "Gauss's Law for Magnetism"
        },

        // 2. Vector Curl & Double/Triple Integrals
        {
            latex: '\\iint_S (\\nabla \\times \\mathbf{A}) \\cdot d\\mathbf{S} = \\oint_{\\partial S} \\mathbf{A} \\cdot d\\mathbf{r}',
            name: "Stokes' Curl Theorem"
        },
        {
            latex: '\\iiint_V (\\nabla \\cdot \\mathbf{F}) \\, dV = \\oiint_{\\partial V} \\mathbf{F} \\cdot d\\mathbf{S}',
            name: "Gauss's Divergence Theorem"
        },
        {
            latex: '\\nabla \\times (\\nabla \\times \\mathbf{A}) = \\nabla(\\nabla \\cdot \\mathbf{A}) - \\nabla^2 \\mathbf{A}',
            name: 'Vector Laplacian of Curl'
        },
        {
            latex: '\\nabla \\times (\\nabla \\phi) = \\mathbf{0} \\quad \\text{and} \\quad \\nabla \\cdot (\\nabla \\times \\mathbf{A}) = 0',
            name: 'Curl of Gradient & Divergence of Curl'
        },
        {
            latex: 'W_{em} = \\frac{1}{2} \\iiint_V \\left( \\varepsilon_0 |\\mathbf{E}|^2 + \\mu_0 |\\mathbf{H}|^2 \\right) dV',
            name: 'Electromagnetic Field Energy Storage'
        },
        {
            latex: '\\iint_S (\\mathbf{E} \\times \\mathbf{H}) \\cdot d\\mathbf{S} = -\\frac{\\partial}{\\partial t} \\iiint_V u_{em} \\, dV',
            name: "Poynting's Energy Flow Theorem"
        },
        {
            latex: '\\mathbf{B} = \\nabla \\times \\mathbf{A}, \\quad \\mathbf{E} = -\\nabla \\phi - \\frac{\\partial \\mathbf{A}}{\\partial t}',
            name: 'Magnetic & Electric Potentials'
        },

        // 3. Electrical Machines & Electromechanical Energy Conversion
        {
            latex: 'T_e = \\frac{3}{\\omega_s} \\frac{V_{th}^2 \\left(\\frac{R_2\'}{s}\\right)}{\\left(R_{th} + \\frac{R_2\'}{s}\\right)^2 + (X_{th} + X_2\')^2}',
            name: 'Induction Motor Torque-Slip Relation'
        },
        {
            latex: 'T_e = \\left. \\frac{\\partial W_{co}}{\\partial \\theta_m} \\right|_{i=const} = \\frac{1}{2} i^2 \\frac{dL(\\theta)}{d\\theta_m}',
            name: 'Electromagnetic Co-energy Machine Torque'
        },
        {
            latex: 'P_e = \\frac{3 V_t E_f}{X_s} \\sin\\delta + \\frac{3 V_t^2}{2}\\left(\\frac{1}{X_q} - \\frac{1}{X_d}\\right)\\sin(2\\delta)',
            name: 'Synchronous Machine Power-Angle Equation'
        },
        {
            latex: 'E_{rms} = 4.44 f N \\Phi_{max} = \\sqrt{2}\\pi f N \\iint_S B_{max} \\, dS',
            name: 'Transformer Induced EMF Equation'
        },
        {
            latex: 'E_a = \\frac{P \\Phi Z N}{60 A} = k_e \\Phi \\omega_m, \\quad T_e = \\frac{P \\Phi Z I_a}{2\\pi A}',
            name: 'DC Machine Back-EMF & Developed Torque'
        },
        {
            latex: '\\omega_s = \\frac{120 f}{P}, \\quad s = \\frac{\\omega_s - \\omega_r}{\\omega_s}',
            name: 'Synchronous Speed & Rotor Slip'
        },
        {
            latex: '\\mathbf{F}_{em} = \\iiint_V (\\mathbf{J} \\times \\mathbf{B}) \\, dV = I (\\mathbf{L} \\times \\mathbf{B})',
            name: 'Lorentz Force on Machine Conductors'
        },
        {
            latex: '\\lambda_k = N_k \\iint_{S_k} \\mathbf{B} \\cdot d\\mathbf{S} = \\sum_{j} L_{kj} i_j',
            name: 'Flux Linkage Surface Integral'
        },
        {
            latex: '\\begin{bmatrix} v_d \\\\ v_q \\\\ v_0 \\end{bmatrix} = \\sqrt{\\frac{2}{3}}\\begin{bmatrix} \\cos\\theta & \\cos(\\theta-\\frac{2\\pi}{3}) & \\cos(\\theta+\\frac{2\\pi}{3}) \\\\ -\\sin\\theta & -\\sin(\\theta-\\frac{2\\pi}{3}) & -\\sin(\\theta+\\frac{2\\pi}{3}) \\\\ \\frac{1}{\\sqrt{2}} & \\frac{1}{\\sqrt{2}} & \\frac{1}{\\sqrt{2}} \\end{bmatrix}\\begin{bmatrix} v_a \\\\ v_b \\\\ v_c \\end{bmatrix}',
            name: 'Park dq0 Vector Transformation'
        }
    ];

    // Floating LaTeX Math Symbols
    const FLOATING_LATEX_SYMBOLS = [
        '\\iint_S', '\\iiint_V', '\\oiint_S', '\\oint_C',
        '\\nabla \\times \\mathbf{E}', '\\nabla \\times \\mathbf{H}', 
        '\\nabla \\cdot \\mathbf{B}', '\\nabla \\cdot \\mathbf{D}',
        '\\mathbf{F} = I(\\mathbf{L}\\times\\mathbf{B})',
        '\\Phi_B = \\iint \\mathbf{B}\\cdot d\\mathbf{S}',
        'T_e', '\\omega_s', '\\mu_0', '\\varepsilon_0',
        '\\mathbf{J}_f', '\\lambda_{flux}', '\\mathbf{A}', '\\mathcal{E}_{ind}'
    ];

    // Subtle, non-intrusive watermark colors for Dark Mode
    const theme = {
        gridLine: 'rgba(56, 189, 248, 0.022)',
        gridNode: 'rgba(56, 189, 248, 0.06)',
        symbolBase: 'rgba(148, 163, 184, 0.10)',
        connectionLine: 'rgba(56, 189, 248, 0.025)'
    };

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
        const eqCount = isMobile ? 5 : Math.min(Math.floor((width * height) / 90000) + 3, EQUATIONS_DATA.length);
        const shuffled = [...EQUATIONS_DATA].sort(() => 0.5 - Math.random());

        // Grid-based initial distribution to prevent clumping
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

            // Create non-interactable DOM Node for LaTeX equation
            const node = document.createElement('div');
            node.className = 'physics-equation-node';
            node.innerHTML = `<div class="latex-formula">${renderedLatexHtml}</div>`;
            equationsLayer.appendChild(node);

            equations.push({
                ...data,
                el: node,
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                vx: (Math.random() - 0.5) * 0.12,
                vy: (Math.random() - 0.5) * 0.12,
                pulseOffset: Math.random() * Math.PI * 2,
                floatSpeed: Math.random() * 0.0008 + 0.0006
            });
        }

        // Floating LaTeX Symbols (non-interactable background glyphs)
        const symbolCount = isMobile ? 10 : Math.min(Math.floor((width * height) / 48000), 22);
        for (let i = 0; i < symbolCount; i++) {
            const rawSym = FLOATING_LATEX_SYMBOLS[Math.floor(Math.random() * FLOATING_LATEX_SYMBOLS.length)];
            
            let displayChar = rawSym
                .replace('\\iint_S', '∬_S')
                .replace('\\iiint_V', '∭_V')
                .replace('\\oiint_S', '∯_S')
                .replace('\\oint_C', '∮_C')
                .replace('\\nabla \\times \\mathbf{E}', '∇ × E')
                .replace('\\nabla \\times \\mathbf{H}', '∇ × H')
                .replace('\\nabla \\cdot \\mathbf{B}', '∇ · B = 0')
                .replace('\\nabla \\cdot \\mathbf{D}', '∇ · D = ρ')
                .replace('\\mathbf{F} = I(\\mathbf{L}\\times\\mathbf{B})', 'F = I(L × B)')
                .replace('\\Phi_B = \\iint \\mathbf{B}\\cdot d\\mathbf{S}', 'Φ_B = ∬ B·dS')
                .replace('\\mu_0', 'μ₀')
                .replace('\\varepsilon_0', 'ε₀')
                .replace('\\mathbf{J}_f', 'J_f')
                .replace('\\lambda_{flux}', 'λ_flux')
                .replace('\\mathbf{A}', 'A_vec')
                .replace('\\mathcal{E}_{ind}', 'ℰ_ind')
                .replace('\\omega_s', 'ω_s');

            const x = Math.random() * width;
            const y = Math.random() * height;
            symbols.push({
                char: displayChar,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                size: Math.random() * 5 + 13,
                rot: (Math.random() - 0.5) * 0.3,
                rotSpeed: (Math.random() - 0.5) * 0.0015
            });
        }

        // Spacetime & Electromagnetic Coordinate Lattice
        const gridSpacing = isMobile ? 130 : 110;
        for (let gx = 0; gx < width + gridSpacing; gx += gridSpacing) {
            for (let gy = 0; gy < height + gridSpacing; gy += gridSpacing) {
                gridPoints.push({
                    x: gx,
                    y: gy
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

    // Animation Loop
    let animationFrameId = null;
    let lastTime = performance.now();

    function render(currentTime) {
        const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
        lastTime = currentTime;

        // Check theme: If light mode, do NOT render or display background equations
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            ctx.clearRect(0, 0, width, height);
            if (equationsLayer.style.display !== 'none') {
                equationsLayer.style.display = 'none';
            }
            animationFrameId = requestAnimationFrame(render);
            return;
        } else {
            if (equationsLayer.style.display !== 'block') {
                equationsLayer.style.display = 'block';
            }
        }

        // Clear Canvas in Dark Mode
        ctx.clearRect(0, 0, width, height);

        // Draw Spacetime Coordinate Grid (subtle dark watermark)
        ctx.lineWidth = 1;
        ctx.strokeStyle = theme.gridLine;

        // Draw Metric Grid Nodes
        ctx.fillStyle = theme.gridNode;
        for (let i = 0; i < gridPoints.length; i++) {
            const gp = gridPoints[i];
            ctx.fillRect(gp.x - 1, gp.y - 1, 2, 2);
        }

        // Draw Floating LaTeX Symbols & Subtle Entanglement Lines
        for (let i = 0; i < symbols.length; i++) {
            const s = symbols[i];

            s.x += s.vx;
            s.y += s.vy;
            s.rot += s.rotSpeed;

            if (s.x < -30) s.x = width + 30;
            if (s.x > width + 30) s.x = -30;
            if (s.y < -30) s.y = height + 30;
            if (s.y > height + 30) s.y = -30;

            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.rot);

            ctx.font = `italic ${s.size}px "EB Garamond", "STIX Two Text", "KaTeX_Math", "Times New Roman", serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = theme.symbolBase;
            ctx.fillText(s.char, 0, 0);
            ctx.restore();

            // Subtle connections between close symbols
            for (let j = i + 1; j < symbols.length; j++) {
                const s2 = symbols[j];
                const sdx = s.x - s2.x;
                const sdy = s.y - s2.y;
                const sdist = Math.sqrt(sdx * sdx + sdy * sdy);

                if (sdist < 80) {
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(s2.x, s2.y);
                    ctx.strokeStyle = theme.connectionLine;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        // Animate & Position LaTeX Equations DOM Nodes (gentle, smooth drift)
        const time = currentTime * 0.001;
        for (let i = 0; i < equations.length; i++) {
            const eq = equations[i];

            const floatOffsetY = Math.sin(time * eq.floatSpeed * 1000 + eq.pulseOffset) * 5;
            const floatOffsetX = Math.cos(time * eq.floatSpeed * 800 + eq.pulseOffset) * 3;

            eq.x += eq.vx;
            eq.y += eq.vy;

            const pad = 160;
            if (eq.x < -pad) eq.x = width + pad;
            if (eq.x > width + pad) eq.x = -pad;
            if (eq.y < -pad) eq.y = height + pad;
            if (eq.y > height + pad) eq.y = -pad;

            const renderX = eq.x + floatOffsetX;
            const renderY = eq.y + floatOffsetY;

            if (eq.el) {
                eq.el.style.transform = `translate3d(${renderX}px, ${renderY}px, 0px) translate(-50%, -50%)`;
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
        if (canvas) canvas.remove();
        if (equationsLayer) equationsLayer.remove();
    };
}
