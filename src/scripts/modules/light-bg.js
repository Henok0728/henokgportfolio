/**
 * Light Mode Background Engine:
 * - Simple, Elegant & Universally Recognizable Electronic & Logic Circuits:
 *   1. Voltage Divider (Fundamental circuit, R1 & R2)
 *   2. AND Logic Gate (Standard D-shape, A · B)
 *   3. Simple BJT Transistor Switch (NPN BJT, Base/Collector/Emitter)
 *   4. OR Logic Gate (Standard curved shield, A + B)
 *   5. Simple MOSFET Switch (NMOS Transistor, Gate/Drain/Source)
 *   6. NOT Gate / Inverter (Logic Inversion, Y = A#)
 *   7. Ground Reference Symbol (0V Potential)
 * - KaTeX Typography: Formulas rendered via KaTeX in dedicated DOM layer
 * - Clean, minimalistic hand-drafted blueprint ink styling
 * - Optimized: 0 CPU in Dark mode or background tabs, capped DPR
 */

import katex from 'katex';

export function initLightBackground() {
    // 1. Clean up existing instances
    const existingCanvas = document.getElementById('light-bg-canvas');
    if (existingCanvas) existingCanvas.remove();
    const existingLayer = document.getElementById('light-equations-layer');
    if (existingLayer) existingLayer.remove();

    // 2. Blueprint Schematic Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'light-bg-canvas';
    document.body.prepend(canvas);

    // 3. KaTeX Equations DOM Layer
    const equationsLayer = document.createElement('div');
    equationsLayer.id = 'light-equations-layer';
    document.body.prepend(equationsLayer);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // ==============================================================
    // SIMPLE, INTUITIVE CIRCUITS DATASET
    // ==============================================================
    const CIRCUITS_DATA = [
        {
            id: 'voltage_divider',
            title: 'Voltage Divider',
            latex: 'V_{\\text{out}} = V_{\\text{in}} \\cdot \\frac{R_2}{R_1 + R_2}',
            baseXRatio: 0.10,
            baseYRatio: 0.24,
            scale: 0.95,
            formulaOffset: -105,
            mobile: true
        },
        {
            id: 'and_gate',
            title: 'AND Logic Gate',
            latex: 'Y = A \\cdot B',
            baseXRatio: 0.90,
            baseYRatio: 0.24,
            scale: 0.95,
            formulaOffset: -85,
            mobile: true
        },
        {
            id: 'bjt_switch',
            title: 'BJT Transistor',
            latex: 'I_C = \\beta \\cdot I_B',
            baseXRatio: 0.10,
            baseYRatio: 0.58,
            scale: 0.92,
            formulaOffset: -110,
            mobile: true
        },
        {
            id: 'or_gate',
            title: 'OR Logic Gate',
            latex: 'Y = A + B',
            baseXRatio: 0.90,
            baseYRatio: 0.58,
            scale: 0.95,
            formulaOffset: -85,
            mobile: true
        },
        {
            id: 'mosfet_switch',
            title: 'MOSFET Switch',
            latex: 'V_{GS} > V_{\\text{th}} \\implies \\text{ON}',
            baseXRatio: 0.11,
            baseYRatio: 0.88,
            scale: 0.92,
            formulaOffset: -110,
            mobile: false
        },
        {
            id: 'not_gate',
            title: 'NOT Gate (Inverter)',
            latex: 'Y = \\overline{A}',
            baseXRatio: 0.89,
            baseYRatio: 0.88,
            scale: 0.95,
            formulaOffset: -85,
            mobile: false
        },
        {
            id: 'ground_symbol',
            title: 'Ground Reference',
            latex: 'V_{\\text{GND}} = 0\\,\\text{V}',
            baseXRatio: 0.50,
            baseYRatio: 0.93,
            scale: 0.95,
            formulaOffset: -75,
            mobile: false
        }
    ];

    // ==============================================================
    // FLOATING CIRCUIT COMPONENT SYMBOLS
    // ==============================================================
    const SYMBOL_TYPES = [
        'and', 'or', 'not', 'resistor',
        'ground', 'transistor', 'mosfet', 'capacitor'
    ];
    const symbols = [];

    function initSymbols() {
        symbols.length = 0;
        const count = width < 768 ? 6 : 14;
        for (let i = 0; i < count; i++) {
            symbols.push({
                type: SYMBOL_TYPES[i % SYMBOL_TYPES.length],
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.12,
                vy: (Math.random() - 0.5) * 0.12,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.0018,
                scale: Math.random() * 0.25 + 0.8
            });
        }
    }

    const activeCircuits = [];

    function initCircuitDOMNodes() {
        equationsLayer.innerHTML = '';
        activeCircuits.length = 0;

        for (let i = 0; i < CIRCUITS_DATA.length; i++) {
            const c = CIRCUITS_DATA[i];

            let renderedKatex = '';
            try {
                renderedKatex = katex.renderToString(c.latex, {
                    displayMode: true,
                    throwOnError: false
                });
            } catch (err) {
                renderedKatex = `<span class="latex-fallback">${c.latex}</span>`;
            }

            const node = document.createElement('div');
            node.className = 'light-equation-node';
            node.innerHTML = `
                <div class="circuit-title-badge">${c.title}</div>
                <div class="latex-formula">${renderedKatex}</div>
            `;
            equationsLayer.appendChild(node);

            activeCircuits.push({
                ...c,
                domNode: node,
                floatOffset: i * 1.57
            });
        }
    }

    function handleResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        initSymbols();
    }

    initCircuitDOMNodes();
    handleResize();
    window.addEventListener('resize', handleResize);

    // ==============================================================
    // DRAWING HELPERS
    // ==============================================================
    const darkInk = 'rgba(15, 23, 42, 0.44)';
    const boldInk = 'rgba(15, 23, 42, 0.64)';
    const blueInk = 'rgba(30, 64, 175, 0.55)';
    const cyanInk = 'rgba(14, 116, 144, 0.58)';

    function sketchLine(x1, y1, x2, y2, color = darkInk, lineWidth = 1.4, jitter = 0.4) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const midX = (x1 + x2) * 0.5 + (jitter !== 0 ? (x1 % 3 - 1) * jitter : 0);
        const midY = (y1 + y2) * 0.5 + (jitter !== 0 ? (y1 % 3 - 1) * jitter : 0);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(midX, midY, x2, y2);
        ctx.stroke();
    }

    function drawDotNode(x, y, color = boldInk, radius = 2.5) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function drawGround(x, y) {
        sketchLine(x - 12, y, x + 12, y, darkInk, 1.8, 0.2);
        sketchLine(x - 8, y + 4, x + 8, y + 4, darkInk, 1.5, 0.2);
        sketchLine(x - 4, y + 8, x + 4, y + 8, darkInk, 1.2, 0.2);
    }

    function drawResistor(x1, y1, x2, y2, label = '') {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        ctx.save();
        ctx.translate(x1, y1);
        ctx.rotate(angle);

        const lead = (len - 28) / 2;
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(lead, 0);

        const seg = 28 / 6;
        ctx.lineTo(lead + seg * 0.5, -5);
        ctx.lineTo(lead + seg * 1.5, 5);
        ctx.lineTo(lead + seg * 2.5, -5);
        ctx.lineTo(lead + seg * 3.5, 5);
        ctx.lineTo(lead + seg * 4.5, -5);
        ctx.lineTo(lead + seg * 5.5, 5);
        ctx.lineTo(lead + 28, 0);
        ctx.lineTo(len, 0);
        ctx.stroke();

        if (label) {
            ctx.font = '500 10.5px "Inter", sans-serif';
            ctx.fillStyle = darkInk;
            ctx.textAlign = 'center';
            ctx.fillText(label, len / 2, -8);
        }

        ctx.restore();
    }

    // ==============================================================
    // 7 SIMPLE & CLEAN CIRCUITS
    // ==============================================================

    /**
     * 1. Voltage Divider
     * Classic textbook 2-resistor voltage divider (R1 & R2)
     */
    function drawVoltageDivider(x, y, scale, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // Vin terminal
        ctx.beginPath();
        ctx.arc(0, -55, 3, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'center';
        ctx.fillText('V_in (+5V)', 0, -63);

        sketchLine(0, -52, 0, -42, darkInk, 1.5, 0.1);

        // Resistor R1
        drawResistor(0, -42, 0, -5, 'R_1 (10kΩ)');

        // Midpoint Node
        sketchLine(0, -5, 0, 5, darkInk, 1.5, 0.1);
        drawDotNode(0, 0);

        // Vout Branch
        sketchLine(0, 0, 42, 0, darkInk, 1.5, 0.1);
        ctx.beginPath();
        ctx.arc(45, 0, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('V_out', 52, 4);

        // Resistor R2
        drawResistor(0, 5, 0, 42, 'R_2 (10kΩ)');

        // Ground at bottom
        sketchLine(0, 42, 0, 52, darkInk, 1.5, 0.1);
        drawGround(0, 53);

        // Simple current pulse dot
        const pulse = (time * 0.0009) % 1;
        const dotY = -52 + pulse * 104;
        ctx.fillStyle = blueInk;
        ctx.beginPath();
        ctx.arc(0, dotY, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    /**
     * 2. AND Logic Gate
     * Clean ANSI D-shaped AND gate with inputs A, B and output Y
     */
    function drawANDGate(x, y, scale, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // Input A lead & terminal
        sketchLine(-55, -12, -22, -12, darkInk, 1.5, 0.1);
        ctx.beginPath();
        ctx.arc(-58, -12, 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.fillStyle = cyanInk;
        ctx.textAlign = 'right';
        ctx.fillText('A', -64, -8);

        // Input B lead & terminal
        sketchLine(-55, 12, -22, 12, darkInk, 1.5, 0.1);
        ctx.beginPath();
        ctx.arc(-58, 12, 2.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.fillStyle = cyanInk;
        ctx.textAlign = 'right';
        ctx.fillText('B', -64, 16);

        // AND Gate Body (D-shape)
        ctx.beginPath();
        ctx.moveTo(-22, -24);
        ctx.lineTo(2, -24);
        ctx.arc(2, 0, 24, -Math.PI / 2, Math.PI / 2, false);
        ctx.lineTo(-22, 24);
        ctx.closePath();
        ctx.strokeStyle = boldInk;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Gate Symbol Text
        ctx.font = '700 10.5px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('AND', -3, 4);

        // Output Y lead & terminal
        sketchLine(26, 0, 55, 0, darkInk, 1.5, 0.1);
        ctx.beginPath();
        ctx.arc(58, 0, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('Y', 65, 4);

        // Flowing signal pulses
        const pulse = (time * 0.0012) % 1;
        const pulseX = -55 + pulse * 110;
        ctx.fillStyle = blueInk;
        ctx.beginPath();
        if (pulseX < 26) {
            ctx.arc(pulseX, -12, 2.0, 0, Math.PI * 2);
            ctx.arc(pulseX, 12, 2.0, 0, Math.PI * 2);
        } else {
            ctx.arc(pulseX, 0, 2.2, 0, Math.PI * 2);
        }
        ctx.fill();

        ctx.restore();
    }

    /**
     * 3. Simple BJT Transistor Switch
     * Standard NPN BJT with base resistor RB and collector resistor RC
     */
    function drawBJTTransistor(x, y, scale, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // VCC Power Rail
        sketchLine(-15, -60, 45, -60, darkInk, 1.5, 0.1);
        ctx.font = '600 10.5px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'center';
        ctx.fillText('V_CC (+5V)', 15, -66);

        // Collector Resistor RC
        sketchLine(15, -60, 15, -50, darkInk, 1.4, 0.1);
        drawResistor(15, -50, 15, -20, 'R_C');
        sketchLine(15, -20, 15, -12, darkInk, 1.4, 0.1);
        drawDotNode(15, -16);

        // Vout Terminal from Collector
        sketchLine(15, -16, 42, -16, darkInk, 1.4, 0.1);
        ctx.beginPath();
        ctx.arc(45, -16, 2.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 10.5px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('V_out', 51, -12);

        // Base Input with RB
        ctx.beginPath();
        ctx.arc(-55, 6, 2.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 10.5px "Inter", sans-serif';
        ctx.fillStyle = cyanInk;
        ctx.textAlign = 'right';
        ctx.fillText('V_in', -61, 10);

        sketchLine(-52, 6, -42, 6, darkInk, 1.4, 0.1);
        drawResistor(-42, 6, -14, 6, 'R_B');
        sketchLine(-14, 6, -5, 6, darkInk, 1.4, 0.1);

        // NPN Transistor Core
        // Base bar
        sketchLine(-5, -6, -5, 18, boldInk, 2.4, 0.1);

        // Collector branch (top)
        sketchLine(-5, 0, 15, -12, darkInk, 1.5, 0.1);

        // Emitter branch (bottom with arrow)
        sketchLine(-5, 12, 15, 24, darkInk, 1.5, 0.1);

        // Emitter outward arrow
        ctx.fillStyle = boldInk;
        ctx.beginPath();
        ctx.moveTo(11, 21);
        ctx.lineTo(16, 25);
        ctx.lineTo(10, 26);
        ctx.closePath();
        ctx.fill();

        // Transistor circle
        ctx.beginPath();
        ctx.arc(5, 6, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.22)';
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.font = '600 10.5px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('Q_1 (NPN)', 28, 12);

        // Emitter to Ground
        sketchLine(15, 24, 15, 42, darkInk, 1.4, 0.1);
        drawGround(15, 43);

        ctx.restore();
    }

    /**
     * 4. OR Logic Gate
     * Clean ANSI curved shield OR gate with inputs A, B and output Y
     */
    function drawORGate(x, y, scale, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // Input A lead & terminal
        sketchLine(-55, -12, -18, -12, darkInk, 1.5, 0.1);
        ctx.beginPath();
        ctx.arc(-58, -12, 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.fillStyle = cyanInk;
        ctx.textAlign = 'right';
        ctx.fillText('A', -64, -8);

        // Input B lead & terminal
        sketchLine(-55, 12, -18, 12, darkInk, 1.5, 0.1);
        ctx.beginPath();
        ctx.arc(-58, 12, 2.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.fillStyle = cyanInk;
        ctx.textAlign = 'right';
        ctx.fillText('B', -64, 16);

        // OR Gate Body (Curved Shield Shape)
        ctx.beginPath();
        // Back concave curve
        ctx.moveTo(-22, -24);
        ctx.quadraticCurveTo(-10, 0, -22, 24);
        // Bottom curve to point
        ctx.quadraticCurveTo(8, 24, 28, 0);
        // Top curve from point to top left
        ctx.quadraticCurveTo(8, -24, -22, -24);
        ctx.closePath();
        ctx.strokeStyle = boldInk;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Gate Symbol Text
        ctx.font = '700 10.5px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('OR', -3, 4);

        // Output Y lead & terminal
        sketchLine(28, 0, 55, 0, darkInk, 1.5, 0.1);
        ctx.beginPath();
        ctx.arc(58, 0, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('Y', 65, 4);

        // Flowing signal pulses
        const pulse = (time * 0.0012) % 1;
        const pulseX = -55 + pulse * 110;
        ctx.fillStyle = blueInk;
        ctx.beginPath();
        if (pulseX < 28) {
            ctx.arc(pulseX, -12, 2.0, 0, Math.PI * 2);
            ctx.arc(pulseX, 12, 2.0, 0, Math.PI * 2);
        } else {
            ctx.arc(pulseX, 0, 2.2, 0, Math.PI * 2);
        }
        ctx.fill();

        ctx.restore();
    }

    /**
     * 5. Simple MOSFET Switch
     * Clean NMOS transistor with Gate, Drain (RD pull-up), and Source to Ground
     */
    function drawMOSFETSwitch(x, y, scale, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // VDD Power Rail
        sketchLine(-15, -60, 45, -60, darkInk, 1.5, 0.1);
        ctx.font = '600 10.5px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'center';
        ctx.fillText('V_DD (+3.3V)', 15, -66);

        // Drain Resistor RD
        sketchLine(15, -60, 15, -50, darkInk, 1.4, 0.1);
        drawResistor(15, -50, 15, -20, 'R_D');
        sketchLine(15, -20, 15, -12, darkInk, 1.4, 0.1);
        drawDotNode(15, -16);

        // Vout Terminal from Drain
        sketchLine(15, -16, 42, -16, darkInk, 1.4, 0.1);
        ctx.beginPath();
        ctx.arc(45, -16, 2.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 10.5px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('V_out', 51, -12);

        // Gate Input with RG
        ctx.beginPath();
        ctx.arc(-55, 6, 2.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 10.5px "Inter", sans-serif';
        ctx.fillStyle = cyanInk;
        ctx.textAlign = 'right';
        ctx.fillText('V_in (Gate)', -61, 10);

        sketchLine(-52, 6, -38, 6, darkInk, 1.4, 0.1);
        drawResistor(-38, 6, -12, 6, 'R_G');
        sketchLine(-12, 6, -6, 6, darkInk, 1.4, 0.1);

        // MOSFET Core (NMOS)
        // Gate plate
        sketchLine(-6, -6, -6, 18, boldInk, 2.2, 0.1);

        // Dielectric gap & Channel plate
        sketchLine(0, -6, 0, 18, darkInk, 2.0, 0.1);

        // Drain lead (top)
        sketchLine(0, -1, 15, -1, darkInk, 1.4, 0.1);
        sketchLine(15, -1, 15, -12, darkInk, 1.4, 0.1);

        // Source lead (bottom)
        sketchLine(0, 13, 15, 13, darkInk, 1.4, 0.1);
        sketchLine(15, 13, 15, 38, darkInk, 1.4, 0.1);

        // Substrate arrow inward
        sketchLine(0, 6, 8, 6, darkInk, 1.3, 0.1);
        sketchLine(8, 6, 15, 13, darkInk, 1.3, 0.1);
        ctx.fillStyle = boldInk;
        ctx.beginPath();
        ctx.moveTo(6, 3);
        ctx.lineTo(1, 6);
        ctx.lineTo(6, 9);
        ctx.closePath();
        ctx.fill();

        ctx.font = '600 10.5px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('M_1 (NMOS)', 28, 12);

        // Source to Ground
        drawGround(15, 39);

        ctx.restore();
    }

    /**
     * 6. NOT Gate (Inverter)
     * Triangle buffer with inversion bubble
     */
    function drawNOTGate(x, y, scale, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // Input A lead & terminal
        sketchLine(-50, 0, -18, 0, darkInk, 1.5, 0.1);
        ctx.beginPath();
        ctx.arc(-53, 0, 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.fillStyle = cyanInk;
        ctx.textAlign = 'right';
        ctx.fillText('A', -59, 4);

        // Triangle body
        ctx.beginPath();
        ctx.moveTo(-18, -18);
        ctx.lineTo(12, 0);
        ctx.lineTo(-18, 18);
        ctx.closePath();
        ctx.strokeStyle = boldInk;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Inversion Bubble
        ctx.beginPath();
        ctx.arc(16, 0, 3.5, 0, Math.PI * 2);
        ctx.strokeStyle = boldInk;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        ctx.font = '700 10px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('NOT', -5, 4);

        // Output Y lead & terminal
        sketchLine(20, 0, 50, 0, darkInk, 1.5, 0.1);
        ctx.beginPath();
        ctx.arc(53, 0, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('Y', 60, 4);

        // Flowing signal pulse
        const pulse = (time * 0.0014) % 1;
        const pulseX = -50 + pulse * 100;
        ctx.fillStyle = blueInk;
        ctx.beginPath();
        ctx.arc(pulseX, 0, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    /**
     * 7. Ground Reference Symbol
     * Standard Earth & Signal ground schematic study with 0V reference potential
     */
    function drawGroundReference(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // Test Point Node at top
        ctx.beginPath();
        ctx.arc(0, -32, 3, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'center';
        ctx.fillText('GND Node', 0, -40);

        sketchLine(0, -29, 0, 0, boldInk, 2.0, 0.1);

        // Ground tiered bars
        sketchLine(-20, 0, 20, 0, boldInk, 2.4, 0.1);
        sketchLine(-14, 6, 14, 6, boldInk, 1.8, 0.1);
        sketchLine(-8, 12, 8, 12, boldInk, 1.5, 0.1);
        sketchLine(-3, 18, 3, 18, boldInk, 1.2, 0.1);

        ctx.font = '700 10.5px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('0V REF', 0, 32);

        ctx.restore();
    }

    // ==============================================================
    // FLOATING CIRCUIT SYMBOLS
    // ==============================================================
    function drawFloatingSymbol(s) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.scale(s.scale, s.scale);

        const symbolInk = 'rgba(15, 23, 42, 0.22)';
        ctx.strokeStyle = symbolInk;
        ctx.fillStyle = symbolInk;
        ctx.lineWidth = 1.3;

        switch (s.type) {
            case 'and':
                ctx.beginPath();
                ctx.moveTo(-8, -10);
                ctx.lineTo(0, -10);
                ctx.arc(0, 0, 10, -Math.PI / 2, Math.PI / 2);
                ctx.lineTo(-8, 10);
                ctx.closePath();
                ctx.stroke();
                break;
            case 'or':
                ctx.beginPath();
                ctx.moveTo(-9, -10);
                ctx.quadraticCurveTo(-3, 0, -9, 10);
                ctx.quadraticCurveTo(4, 10, 11, 0);
                ctx.quadraticCurveTo(4, -10, -9, -10);
                ctx.closePath();
                ctx.stroke();
                break;
            case 'not':
                ctx.beginPath();
                ctx.moveTo(-8, -8);
                ctx.lineTo(6, 0);
                ctx.lineTo(-8, 8);
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(8, 0, 2, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 'resistor':
                ctx.beginPath();
                ctx.moveTo(-10, 0);
                ctx.lineTo(-6, -4); ctx.lineTo(-2, 4);
                ctx.lineTo(2, -4); ctx.lineTo(6, 4);
                ctx.lineTo(10, 0);
                ctx.stroke();
                break;
            case 'ground':
                drawGround(0, -4);
                break;
            case 'transistor':
                sketchLine(-6, -8, -6, 8, symbolInk, 1.8, 0.1);
                sketchLine(-10, 0, -6, 0, symbolInk, 1.2, 0.1);
                sketchLine(-6, -3, 6, -8, symbolInk, 1.2, 0.1);
                sketchLine(-6, 3, 6, 8, symbolInk, 1.2, 0.1);
                break;
            case 'mosfet':
                sketchLine(-6, -8, -6, 8, symbolInk, 1.8, 0.1);
                sketchLine(-1, -8, -1, 8, symbolInk, 1.5, 0.1);
                sketchLine(-10, 0, -6, 0, symbolInk, 1.2, 0.1);
                sketchLine(-1, -4, 6, -4, symbolInk, 1.2, 0.1);
                sketchLine(-1, 4, 6, 4, symbolInk, 1.2, 0.1);
                break;
            case 'capacitor':
                sketchLine(-3, -8, -3, 8, symbolInk, 1.6, 0.1);
                sketchLine(3, -8, 3, 8, symbolInk, 1.6, 0.1);
                sketchLine(-8, 0, -3, 0, symbolInk, 1.2, 0.1);
                sketchLine(3, 0, 8, 0, symbolInk, 1.2, 0.1);
                break;
        }

        ctx.restore();
    }

    // ==============================================================
    // ANIMATION & LIFECYCLE CONTROLLER
    // ==============================================================
    let animationFrameId = null;
    let isRunning = false;

    function shouldRun() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const isVisible = !document.hidden;
        return isLight && isVisible;
    }

    function render(currentTime) {
        if (!shouldRun()) {
            stopLoop();
            return;
        }

        ctx.clearRect(0, 0, width, height);

        const time = currentTime;
        const isMobile = width < 768;

        // 1. Draw Floating Simple Symbols
        for (let i = 0; i < symbols.length; i++) {
            const s = symbols[i];
            s.x += s.vx;
            s.y += s.vy;
            s.rot += s.rotSpeed;

            if (s.x < -30) s.x = width + 30;
            if (s.x > width + 30) s.x = -30;
            if (s.y < -30) s.y = height + 30;
            if (s.y > height + 30) s.y = -30;

            drawFloatingSymbol(s);
        }

        // 2. Draw Simple Circuits & Synchronize KaTeX DOM Node Positions
        for (let i = 0; i < activeCircuits.length; i++) {
            const c = activeCircuits[i];

            if (isMobile && !c.mobile) {
                if (c.domNode) c.domNode.style.display = 'none';
                continue;
            } else if (c.domNode && c.domNode.style.display === 'none') {
                c.domNode.style.display = 'flex';
            }

            const floatX = width * c.baseXRatio + Math.sin(time * 0.0006 + c.floatOffset) * 8;
            const floatY = height * c.baseYRatio + Math.cos(time * 0.0006 + c.floatOffset) * 6;
            const scale = isMobile ? c.scale * 0.82 : c.scale;

            if (c.domNode) {
                const badgeY = floatY + (c.formulaOffset * scale);
                c.domNode.style.transform = `translate3d(${floatX}px, ${badgeY}px, 0px) translate(-50%, -50%)`;
            }

            switch (c.id) {
                case 'voltage_divider':
                    drawVoltageDivider(floatX, floatY, scale, time);
                    break;
                case 'and_gate':
                    drawANDGate(floatX, floatY, scale, time);
                    break;
                case 'bjt_switch':
                    drawBJTTransistor(floatX, floatY, scale, time);
                    break;
                case 'or_gate':
                    drawORGate(floatX, floatY, scale, time);
                    break;
                case 'mosfet_switch':
                    drawMOSFETSwitch(floatX, floatY, scale, time);
                    break;
                case 'not_gate':
                    drawNOTGate(floatX, floatY, scale, time);
                    break;
                case 'ground_symbol':
                    drawGroundReference(floatX, floatY, scale);
                    break;
            }
        }

        animationFrameId = requestAnimationFrame(render);
    }

    function startLoop() {
        if (!isRunning && shouldRun()) {
            isRunning = true;
            canvas.style.display = 'block';
            equationsLayer.style.display = 'block';
            animationFrameId = requestAnimationFrame(render);
        }
    }

    function stopLoop() {
        isRunning = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        ctx.clearRect(0, 0, width, height);
        canvas.style.display = 'none';
        equationsLayer.style.display = 'none';
    }

    function updateState() {
        if (shouldRun()) {
            startLoop();
        } else {
            stopLoop();
        }
    }

    const themeObserver = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.attributeName === 'data-theme') {
                updateState();
                break;
            }
        }
    });
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    document.addEventListener('visibilitychange', updateState);

    updateState();

    return () => {
        stopLoop();
        themeObserver.disconnect();
        document.removeEventListener('visibilitychange', updateState);
        window.removeEventListener('resize', handleResize);
        if (canvas) canvas.remove();
        if (equationsLayer) equationsLayer.remove();
    };
}
