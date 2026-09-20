/**
 * Light Mode Background Engine:
 * - Authentic Electronic & Transistor Circuit Schematics in hand-drafted engineering sketch style:
 *   1. BJT Common Emitter Amplifier (NPN, biasing network, bypass caps, gain equations)
 *   2. CMOS Digital Inverter (Complementary PMOS/NMOS pair, dynamic power equations)
 *   3. BJT Current Mirror (Matched pairs, reference current transfer formula)
 *   4. MOSFET Differential Pair (Tail current source, differential gain & CMRR)
 *   5. Passive Foundations: Voltage Divider, RC Low-Pass Filter, Wheatstone Bridge, LC Resonant Tank
 * - Floating circuit component symbols (BJT, MOSFET, resistors, capacitors, inductors, ground, opamps)
 * - Pure Black & Blueprint Blue subtle sketchy linework with watermark opacity (100% non-interactable)
 * - Highly optimized: stops completely in Dark mode or background tabs, capped DPR, fast stroke paths
 */

export function initLightBackground() {
    const existing = document.getElementById('light-bg-canvas');
    if (existing) existing.remove();

    const canvas = document.createElement('canvas');
    canvas.id = 'light-bg-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // Electronic Circuit Schematics Dataset
    const circuits = [
        {
            type: 'bjt_amplifier',
            baseXRatio: 0.16,
            baseYRatio: 0.22,
            scale: 0.92,
            mobile: true
        },
        {
            type: 'cmos_inverter',
            baseXRatio: 0.84,
            baseYRatio: 0.22,
            scale: 0.92,
            mobile: true
        },
        {
            type: 'voltage_divider',
            baseXRatio: 0.16,
            baseYRatio: 0.52,
            scale: 0.90,
            mobile: false
        },
        {
            type: 'current_mirror',
            baseXRatio: 0.84,
            baseYRatio: 0.52,
            scale: 0.90,
            mobile: true
        },
        {
            type: 'rc_filter',
            baseXRatio: 0.18,
            baseYRatio: 0.82,
            scale: 0.90,
            mobile: true
        },
        {
            type: 'mosfet_diff_pair',
            baseXRatio: 0.82,
            baseYRatio: 0.82,
            scale: 0.88,
            mobile: false
        },
        {
            type: 'wheatstone_bridge',
            baseXRatio: 0.50,
            baseYRatio: 0.10,
            scale: 0.84,
            mobile: false
        },
        {
            type: 'lc_tank',
            baseXRatio: 0.50,
            baseYRatio: 0.92,
            scale: 0.86,
            mobile: false
        }
    ];

    // Floating Circuit Symbols & Components
    const symbols = [];
    const SYMBOL_TYPES = [
        'npn', 'pnp', 'nmos', 'pmos',
        'resistor', 'capacitor', 'inductor',
        'ground', 'diode', 'ohm', 'farad', 'opamp'
    ];

    function initSymbols() {
        symbols.length = 0;
        const count = width < 768 ? 8 : 16;
        for (let i = 0; i < count; i++) {
            symbols.push({
                type: SYMBOL_TYPES[i % SYMBOL_TYPES.length],
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.14,
                vy: (Math.random() - 0.5) * 0.14,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.002,
                scale: Math.random() * 0.25 + 0.75
            });
        }
    }

    // Resize Handler
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

    handleResize();
    window.addEventListener('resize', handleResize);

    // ==============================================================
    // HIGH-PERFORMANCE SKETCH DRAWING HELPERS
    // ==============================================================

    const darkInk = 'rgba(15, 23, 42, 0.44)';
    const boldInk = 'rgba(15, 23, 42, 0.62)';
    const blueInk = 'rgba(37, 99, 235, 0.54)';
    const faintInk = 'rgba(15, 23, 42, 0.22)';

    // Fast sketchy line: single path with slight curve for drafted ink look
    function sketchLine(x1, y1, x2, y2, color = darkInk, lineWidth = 1.4, jitter = 0.8) {
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

    function drawSketchyGround(x, y) {
        sketchLine(x - 12, y, x + 12, y, darkInk, 1.8, 0.3);
        sketchLine(x - 8, y + 4, x + 8, y + 4, darkInk, 1.5, 0.3);
        sketchLine(x - 4, y + 8, x + 4, y + 8, darkInk, 1.3, 0.3);
    }

    function drawSketchyResistor(x1, y1, x2, y2, label) {
        const h = y2 - y1;
        const seg = h / 6;

        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + 7, y1 + seg * 1);
        ctx.lineTo(x1 - 7, y1 + seg * 2);
        ctx.lineTo(x1 + 7, y1 + seg * 3);
        ctx.lineTo(x1 - 7, y1 + seg * 4);
        ctx.lineTo(x1 + 7, y1 + seg * 5);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        if (label) {
            ctx.font = '500 11px "Inter", sans-serif';
            ctx.fillStyle = darkInk;
            ctx.textAlign = 'left';
            ctx.fillText(label, x1 + 12, (y1 + y2) / 2 + 4);
        }
    }

    function drawSketchyHorizontalResistor(x1, x2, y, label) {
        const w = x2 - x1;
        const seg = w / 6;

        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x1 + seg * 1, y - 6);
        ctx.lineTo(x1 + seg * 2, y + 6);
        ctx.lineTo(x1 + seg * 3, y - 6);
        ctx.lineTo(x1 + seg * 4, y + 6);
        ctx.lineTo(x1 + seg * 5, y - 6);
        ctx.lineTo(x2, y);
        ctx.stroke();

        if (label) {
            ctx.font = '500 11px "Inter", sans-serif';
            ctx.fillStyle = darkInk;
            ctx.textAlign = 'center';
            ctx.fillText(label, (x1 + x2) / 2, y - 10);
        }
    }

    function drawSketchyCapacitor(x, y, isVertical = false, label = '') {
        if (isVertical) {
            // Horizontal plates, current vertical
            sketchLine(x - 12, y - 4, x + 12, y - 4, boldInk, 2.0, 0.3);
            sketchLine(x - 12, y + 4, x + 12, y + 4, boldInk, 2.0, 0.3);
            if (label) {
                ctx.font = '500 11px "Inter", sans-serif';
                ctx.fillStyle = darkInk;
                ctx.textAlign = 'left';
                ctx.fillText(label, x + 16, y + 4);
            }
        } else {
            // Vertical plates, current horizontal
            sketchLine(x - 4, y - 12, x - 4, y + 12, boldInk, 2.0, 0.3);
            sketchLine(x + 4, y - 12, x + 4, y + 12, boldInk, 2.0, 0.3);
            if (label) {
                ctx.font = '500 11px "Inter", sans-serif';
                ctx.fillStyle = darkInk;
                ctx.textAlign = 'center';
                ctx.fillText(label, x, y - 16);
            }
        }
    }

    function drawSketchyNPN(x, y, label = 'Q_1') {
        ctx.save();
        ctx.translate(x, y);

        // Base lead & bar
        sketchLine(-24, 0, -8, 0, darkInk, 1.5, 0.2);
        sketchLine(-8, -14, -8, 14, boldInk, 2.4, 0.2);

        // Collector branch (top)
        sketchLine(-8, -6, 12, -18, darkInk, 1.5, 0.2);
        sketchLine(12, -18, 12, -26, darkInk, 1.5, 0.2);

        // Emitter branch (bottom with outward arrow)
        sketchLine(-8, 6, 12, 18, darkInk, 1.5, 0.2);
        sketchLine(12, 18, 12, 26, darkInk, 1.5, 0.2);

        // NPN Outward Arrow on Emitter
        ctx.fillStyle = boldInk;
        ctx.beginPath();
        ctx.moveTo(9, 15);
        ctx.lineTo(13, 19);
        ctx.lineTo(6, 19);
        ctx.closePath();
        ctx.fill();

        // Enclosing circle (faint watermark)
        ctx.strokeStyle = faintInk;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(2, 0, 22, 0, Math.PI * 2);
        ctx.stroke();

        if (label) {
            ctx.font = '600 11px "Inter", sans-serif';
            ctx.fillStyle = blueInk;
            ctx.textAlign = 'left';
            ctx.fillText(label, 26, 4);
        }

        ctx.restore();
    }

    function drawSketchyPNP(x, y, label = 'Q_2') {
        ctx.save();
        ctx.translate(x, y);

        // Base lead & bar
        sketchLine(-24, 0, -8, 0, darkInk, 1.5, 0.2);
        sketchLine(-8, -14, -8, 14, boldInk, 2.4, 0.2);

        // Emitter branch (top with inward arrow)
        sketchLine(-8, -6, 12, -18, darkInk, 1.5, 0.2);
        sketchLine(12, -18, 12, -26, darkInk, 1.5, 0.2);

        // Collector branch (bottom)
        sketchLine(-8, 6, 12, 18, darkInk, 1.5, 0.2);
        sketchLine(12, 18, 12, 26, darkInk, 1.5, 0.2);

        // PNP Inward Arrow on Emitter
        ctx.fillStyle = boldInk;
        ctx.beginPath();
        ctx.moveTo(-1, -11);
        ctx.lineTo(-6, -6);
        ctx.lineTo(-1, -4);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = faintInk;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(2, 0, 22, 0, Math.PI * 2);
        ctx.stroke();

        if (label) {
            ctx.font = '600 11px "Inter", sans-serif';
            ctx.fillStyle = blueInk;
            ctx.textAlign = 'left';
            ctx.fillText(label, 26, 4);
        }

        ctx.restore();
    }

    function drawSketchyNMOS(x, y, label = 'M_N') {
        ctx.save();
        ctx.translate(x, y);

        // Gate lead & plate
        sketchLine(-22, 0, -10, 0, darkInk, 1.5, 0.2);
        sketchLine(-10, -14, -10, 14, boldInk, 2.2, 0.2);

        // Channel plate (separated by dielectric gap)
        sketchLine(-4, -14, -4, 14, darkInk, 2.0, 0.2);

        // Drain (top)
        sketchLine(-4, -9, 12, -9, darkInk, 1.5, 0.2);
        sketchLine(12, -9, 12, -24, darkInk, 1.5, 0.2);

        // Source (bottom)
        sketchLine(-4, 9, 12, 9, darkInk, 1.5, 0.2);
        sketchLine(12, 9, 12, 24, darkInk, 1.5, 0.2);

        // Bulk / Substrate arrow inward
        sketchLine(-4, 0, 4, 0, darkInk, 1.4, 0.2);
        sketchLine(4, 0, 12, 9, darkInk, 1.4, 0.2); // Connected to source

        ctx.fillStyle = boldInk;
        ctx.beginPath();
        ctx.moveTo(2, -3);
        ctx.lineTo(-4, 0);
        ctx.lineTo(2, 3);
        ctx.closePath();
        ctx.fill();

        if (label) {
            ctx.font = '600 11px "Inter", sans-serif';
            ctx.fillStyle = blueInk;
            ctx.textAlign = 'left';
            ctx.fillText(label, 18, 4);
        }

        ctx.restore();
    }

    function drawSketchyPMOS(x, y, label = 'M_P') {
        ctx.save();
        ctx.translate(x, y);

        // Gate lead with inversion bubble
        sketchLine(-22, 0, -14, 0, darkInk, 1.5, 0.2);
        ctx.beginPath();
        ctx.arc(-10, 0, 3, 0, Math.PI * 2);
        ctx.strokeStyle = boldInk;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Gate plate
        sketchLine(-6, -14, -6, 14, boldInk, 2.2, 0.2);
        // Channel plate
        sketchLine(0, -14, 0, 14, darkInk, 2.0, 0.2);

        // Source (top)
        sketchLine(0, -9, 14, -9, darkInk, 1.5, 0.2);
        sketchLine(14, -9, 14, -24, darkInk, 1.5, 0.2);

        // Drain (bottom)
        sketchLine(0, 9, 14, 9, darkInk, 1.5, 0.2);
        sketchLine(14, 9, 14, 24, darkInk, 1.5, 0.2);

        if (label) {
            ctx.font = '600 11px "Inter", sans-serif';
            ctx.fillStyle = blueInk;
            ctx.textAlign = 'left';
            ctx.fillText(label, 20, 4);
        }

        ctx.restore();
    }

    // ==============================================================
    // TRANSISTOR CIRCUIT SCHEMATICS
    // ==============================================================

    /**
     * 1. BJT Common Emitter Amplifier
     * Standard classic amplifier with voltage divider bias and emitter degeneration/bypass
     */
    function drawBJTCommonEmitter(x, y, scale, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // Title & Equations
        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('BJT Common Emitter Amplifier', 0, -100);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('A_v \\approx -g_m \\cdot R_C, \\quad g_m = I_C / V_T, \\quad \\beta = 100', 0, -83);

        // V_CC Power Rail at top
        sketchLine(-60, -65, 50, -65, darkInk, 1.5, 0.3);
        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'center';
        ctx.fillText('V_CC (+12V)', 0, -71);

        // Bias Resistor R_1 (Top left)
        sketchLine(-45, -65, -45, -55, darkInk, 1.5, 0.2);
        drawSketchyResistor(-45, -55, -45, -15, 'R_1');
        sketchLine(-45, -15, -45, 0, darkInk, 1.5, 0.2);

        // Bias Resistor R_2 (Bottom left)
        sketchLine(-45, 0, -45, 10, darkInk, 1.5, 0.2);
        drawSketchyResistor(-45, 10, -45, 50, 'R_2');
        sketchLine(-45, 50, -45, 60, darkInk, 1.5, 0.2);
        drawSketchyGround(-45, 60);

        // Base Junction Node
        ctx.beginPath();
        ctx.arc(-45, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = boldInk;
        ctx.fill();

        // Input Branch: C_in from V_in
        sketchLine(-90, 0, -72, 0, darkInk, 1.5, 0.2);
        drawSketchyCapacitor(-68, 0, false, 'C_in');
        sketchLine(-64, 0, -45, 0, darkInk, 1.5, 0.2);

        // V_in terminal
        ctx.beginPath();
        ctx.arc(-93, 0, 3, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.font = '500 11px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'right';
        ctx.fillText('V_in', -98, 4);

        // Wire from Base node to Transistor Base
        sketchLine(-45, 0, -18, 0, darkInk, 1.5, 0.2);

        // BJT Transistor Q_1 (NPN)
        drawSketchyNPN(6, 0, 'Q_1');

        // Collector branch: R_C up to V_CC
        sketchLine(18, -26, 18, -35, darkInk, 1.5, 0.2);
        drawSketchyResistor(18, -55, 18, -35, 'R_C');
        sketchLine(18, -65, 18, -55, darkInk, 1.5, 0.2);

        // Collector Node & Output Branch
        ctx.beginPath();
        ctx.arc(18, -30, 3, 0, Math.PI * 2);
        ctx.fillStyle = boldInk;
        ctx.fill();

        sketchLine(18, -30, 42, -30, darkInk, 1.5, 0.2);
        drawSketchyCapacitor(46, -30, false, 'C_out');
        sketchLine(50, -30, 75, -30, darkInk, 1.5, 0.2);

        ctx.beginPath();
        ctx.arc(78, -30, 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('V_out', 85, -26);

        // Emitter branch: R_E and C_E to Ground
        sketchLine(18, 26, 18, 35, darkInk, 1.5, 0.2);
        ctx.beginPath();
        ctx.arc(18, 35, 3, 0, Math.PI * 2);
        ctx.fill();

        // R_E path
        drawSketchyResistor(18, 35, 18, 70, 'R_E');
        sketchLine(18, 70, 18, 80, darkInk, 1.5, 0.2);
        drawSketchyGround(18, 80);

        // C_E bypass branch
        sketchLine(18, 35, 42, 35, darkInk, 1.4, 0.2);
        sketchLine(42, 35, 42, 48, darkInk, 1.4, 0.2);
        drawSketchyCapacitor(42, 53, true, 'C_E');
        sketchLine(42, 58, 42, 72, darkInk, 1.4, 0.2);
        sketchLine(42, 72, 18, 72, darkInk, 1.4, 0.2);

        // Subtle dynamic signal pulse
        const pulse = (time * 0.0008) % 1;
        const pulseX = -90 + pulse * 165;
        ctx.fillStyle = blueInk;
        ctx.beginPath();
        ctx.arc(pulseX, pulseX < 18 ? 0 : -30, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    /**
     * 2. CMOS Digital Inverter
     * Complementary PMOS and NMOS transistor pair
     */
    function drawCMOSInverter(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('CMOS Inverter (NOT Gate)', 0, -80);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('V_out = \\overline{V_in}, \\quad P_dyn = \\alpha C_L V_DD^2 f', 0, -63);

        // V_DD Power Rail (Top)
        sketchLine(-20, -50, 45, -50, darkInk, 1.5, 0.2);
        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'center';
        ctx.fillText('V_DD (+3.3V)', 14, -56);

        // Wire from V_DD to PMOS Source
        sketchLine(14, -50, 14, -40, darkInk, 1.5, 0.2);

        // PMOS Transistor (Top)
        drawSketchyPMOS(0, -22, 'M_P');

        // NMOS Transistor (Bottom)
        drawSketchyNMOS(0, 28, 'M_N');

        // Wire from NMOS Source to Ground
        sketchLine(12, 52, 12, 64, darkInk, 1.5, 0.2);
        drawSketchyGround(12, 64);

        // Connected Gates (Input V_in)
        sketchLine(-22, -22, -35, -22, darkInk, 1.5, 0.2);
        sketchLine(-22, 28, -35, 28, darkInk, 1.5, 0.2);
        sketchLine(-35, -22, -35, 28, darkInk, 1.5, 0.2);

        // Input line & node
        sketchLine(-35, 3, -60, 3, darkInk, 1.5, 0.2);
        ctx.beginPath();
        ctx.arc(-63, 3, 3, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = '500 11px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'right';
        ctx.fillText('V_in', -69, 7);

        // Connected Drains (Output V_out)
        sketchLine(14, -13, 14, 3, darkInk, 1.5, 0.2);
        sketchLine(12, 19, 12, 3, darkInk, 1.5, 0.2);
        sketchLine(14, 3, 12, 3, darkInk, 1.5, 0.2);

        ctx.beginPath();
        ctx.arc(13, 3, 3, 0, Math.PI * 2);
        ctx.fillStyle = boldInk;
        ctx.fill();

        sketchLine(13, 3, 50, 3, darkInk, 1.5, 0.2);
        ctx.beginPath();
        ctx.arc(53, 3, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('V_out', 60, 7);

        // Load Capacitor C_L to Ground
        sketchLine(36, 3, 36, 20, darkInk, 1.3, 0.2);
        drawSketchyCapacitor(36, 26, true, 'C_L');
        sketchLine(36, 32, 36, 44, darkInk, 1.3, 0.2);
        drawSketchyGround(36, 44);

        ctx.restore();
    }

    /**
     * 3. BJT Current Mirror
     * Diode-connected reference transistor and matched output branch
     */
    function drawBJTCurrentMirror(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('BJT Current Mirror', 0, -78);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('I_out \\approx I_ref = (V_CC - V_BE) / R_ref', 0, -61);

        // V_CC Power Rail
        sketchLine(-55, -46, 55, -46, darkInk, 1.5, 0.2);
        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'center';
        ctx.fillText('V_CC', 0, -52);

        // R_ref branch (Left)
        sketchLine(-35, -46, -35, -36, darkInk, 1.5, 0.2);
        drawSketchyResistor(-35, -36, -35, -2, 'R_ref');
        sketchLine(-35, -2, -35, 10, darkInk, 1.5, 0.2);

        // Transistor Q_1 (Diode-connected reference)
        drawSketchyNPN(-20, 24, 'Q_1');

        // Short Collector to Base for Diode connection
        sketchLine(-8, -2, -8, 12, darkInk, 1.4, 0.2);
        sketchLine(-8, 12, -44, 12, darkInk, 1.4, 0.2);
        sketchLine(-44, 12, -44, 24, darkInk, 1.4, 0.2);

        // Transistor Q_2 (Output mirror)
        drawSketchyNPN(35, 24, 'Q_2');

        // Shared Base connection between Q_1 and Q_2
        sketchLine(-44, 24, 11, 24, darkInk, 1.5, 0.2);

        // Emitters to Ground
        sketchLine(-8, 50, -8, 62, darkInk, 1.5, 0.2);
        drawSketchyGround(-8, 62);

        sketchLine(47, 50, 47, 62, darkInk, 1.5, 0.2);
        drawSketchyGround(47, 62);

        // I_out arrow and terminal
        sketchLine(47, -2, 47, 10, darkInk, 1.5, 0.2);
        ctx.beginPath();
        ctx.arc(47, -6, 3, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('I_out', 55, -2);

        // Arrow showing I_out direction
        ctx.fillStyle = blueInk;
        ctx.beginPath();
        ctx.moveTo(44, 4);
        ctx.lineTo(47, 10);
        ctx.lineTo(50, 4);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    /**
     * 4. MOSFET Differential Pair (Diff Amp)
     * High common-mode rejection differential amplifier input stage
     */
    function drawMOSFETDifferentialPair(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('MOSFET Differential Pair', 0, -85);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('A_d = g_m \\cdot R_D, \\quad \\text{CMRR} = |A_d / A_cm|', 0, -68);

        // V_DD Top Rail
        sketchLine(-55, -52, 55, -52, darkInk, 1.5, 0.2);
        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'center';
        ctx.fillText('V_DD', 0, -58);

        // Left load resistor R_D1
        sketchLine(-35, -52, -35, -42, darkInk, 1.5, 0.2);
        drawSketchyResistor(-35, -42, -35, -10, 'R_D');
        sketchLine(-35, -10, -35, 0, darkInk, 1.5, 0.2);

        // Right load resistor R_D2
        sketchLine(35, -52, 35, -42, darkInk, 1.5, 0.2);
        drawSketchyResistor(35, -42, 35, -10, 'R_D');
        sketchLine(35, -10, 35, 0, darkInk, 1.5, 0.2);

        // M_1 NMOS Transistor (Left)
        drawSketchyNMOS(-47, 24, 'M_1');

        // M_2 NMOS Transistor (Right)
        drawSketchyNMOS(23, 24, 'M_2');

        // V_in+ and V_in- input terminals
        sketchLine(-69, 24, -85, 24, darkInk, 1.5, 0.2);
        ctx.beginPath();
        ctx.arc(-88, 24, 3, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.font = '600 10px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'right';
        ctx.fillText('V_in^+', -93, 28);

        sketchLine(1, 24, -12, 24, darkInk, 1.5, 0.2);
        ctx.beginPath();
        ctx.arc(-15, 24, 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = '600 10px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'right';
        ctx.fillText('V_in^-', -20, 28);

        // Sources connected together to Tail Current Source I_SS
        sketchLine(-35, 48, 0, 48, darkInk, 1.5, 0.2);
        sketchLine(35, 48, 0, 48, darkInk, 1.5, 0.2);
        sketchLine(0, 48, 0, 58, darkInk, 1.5, 0.2);

        // Tail Current Source symbol (two intersecting circles)
        ctx.beginPath();
        ctx.arc(0, 66, 8, 0, Math.PI * 2);
        ctx.arc(0, 76, 8, 0, Math.PI * 2);
        ctx.strokeStyle = boldInk;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.font = '600 10px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('I_SS', 14, 73);

        sketchLine(0, 84, 0, 92, darkInk, 1.5, 0.2);
        drawSketchyGround(0, 92);

        // Differential output terminals
        ctx.beginPath();
        ctx.arc(-35, -4, 3, 0, Math.PI * 2);
        ctx.arc(35, -4, 3, 0, Math.PI * 2);
        ctx.fillStyle = boldInk;
        ctx.fill();

        ctx.font = '600 10px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('V_out^-', -30, -8);
        ctx.fillText('V_out^+', 40, -8);

        ctx.restore();
    }

    // ==============================================================
    // PASSIVE CIRCUIT SCHEMATICS
    // ==============================================================

    function drawVoltageDivider(x, y, scale, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('Voltage Divider Circuit', 0, -80);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('V_out = V_in \\cdot [ R_2 / (R_1 + R_2) ]', 0, -63);

        // Input Vin
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(-40, -45, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '500 11px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'right';
        ctx.fillText('V_in', -48, -42);

        sketchLine(-37, -45, 0, -45, darkInk, 1.5, 0.3);
        sketchLine(0, -45, 0, -32, darkInk, 1.5, 0.3);

        // Resistor R1
        drawSketchyResistor(0, -32, 0, 0, 'R_1');

        // Middle Node
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = boldInk;
        ctx.fill();

        // Wire to Vout
        sketchLine(0, 0, 42, 0, darkInk, 1.5, 0.3);
        ctx.beginPath();
        ctx.arc(45, 0, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('V_out', 53, 4);

        // Resistor R2
        drawSketchyResistor(0, 0, 0, 32, 'R_2');
        sketchLine(0, 32, 0, 44, darkInk, 1.5, 0.3);
        drawSketchyGround(0, 44);

        // Flowing current pulse dot
        const pulse = (time * 0.0009) % 1;
        const dotY = -45 + pulse * 89;
        ctx.fillStyle = blueInk;
        ctx.beginPath();
        ctx.arc(0, dotY, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    function drawRCFilter(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('RC Low-Pass Filter', 0, -60);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('f_c = 1 / (2\\pi \\cdot R \\cdot C)', 0, -43);

        // Input Vin
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(-60, -18, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '500 11px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'right';
        ctx.fillText('V_in', -67, -15);

        sketchLine(-57, -18, -36, -18, darkInk, 1.5, 0.3);
        drawSketchyHorizontalResistor(-36, 0, -18, 'R');

        // Node
        ctx.beginPath();
        ctx.arc(0, -18, 3, 0, Math.PI * 2);
        ctx.fillStyle = boldInk;
        ctx.fill();

        sketchLine(0, -18, 48, -18, darkInk, 1.5, 0.3);
        ctx.beginPath();
        ctx.arc(51, -18, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('V_out', 59, -15);

        // Capacitor C to ground
        sketchLine(0, -18, 0, -2, darkInk, 1.5, 0.3);
        drawSketchyCapacitor(0, 4, true, 'C');
        sketchLine(0, 10, 0, 24, darkInk, 1.5, 0.3);
        drawSketchyGround(0, 24);

        ctx.restore();
    }

    function drawWheatstoneBridge(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('Wheatstone Bridge', 0, -58);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('R_x = R_3 \\cdot (R_2 / R_1)', 0, -42);

        // Diamond Nodes
        sketchLine(0, -30, -38, 0, darkInk, 1.5, 0.4);
        sketchLine(-38, 0, 0, 30, darkInk, 1.5, 0.4);
        sketchLine(0, 30, 38, 0, darkInk, 1.5, 0.4);
        sketchLine(38, 0, 0, -30, darkInk, 1.5, 0.4);

        ctx.font = '500 10px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('R_1', -26, -16);
        ctx.fillText('R_2', 26, -16);
        ctx.fillText('R_3', -26, 20);
        ctx.fillText('R_x', 26, 20);

        sketchLine(-38, 0, -10, 0, darkInk, 1.4, 0.3);
        sketchLine(10, 0, 38, 0, darkInk, 1.4, 0.3);

        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.font = 'bold 9px "Inter", sans-serif';
        ctx.fillText('G', 0, 3);

        ctx.restore();
    }

    function drawLCTank(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('LC Resonant Circuit', 0, -42);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('f_0 = 1 / (2\\pi\\sqrt{L \\cdot C})', 0, -26);

        sketchLine(-28, -10, 28, -10, darkInk, 1.5, 0.3);
        sketchLine(-28, 28, 28, 28, darkInk, 1.5, 0.3);

        // Branch 1: L
        sketchLine(-18, -10, -18, -2, darkInk, 1.5, 0.3);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(-18, 4, 4.5, -Math.PI / 2, Math.PI / 2, false);
        ctx.arc(-18, 13, 4.5, -Math.PI / 2, Math.PI / 2, false);
        ctx.stroke();
        sketchLine(-18, 18, -18, 28, darkInk, 1.5, 0.3);

        ctx.font = '500 10px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'right';
        ctx.fillText('L', -25, 12);

        // Branch 2: C
        sketchLine(18, -10, 18, 4, darkInk, 1.5, 0.3);
        drawSketchyCapacitor(18, 9, true, 'C');
        sketchLine(18, 14, 18, 28, darkInk, 1.5, 0.3);

        ctx.restore();
    }

    // ==============================================================
    // FLOATING CIRCUIT SYMBOLS
    // ==============================================================

    function drawSymbol(s) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.scale(s.scale, s.scale);

        const symbolInk = 'rgba(15, 23, 42, 0.20)';
        ctx.strokeStyle = symbolInk;
        ctx.fillStyle = symbolInk;
        ctx.lineWidth = 1.3;

        switch (s.type) {
            case 'npn':
                // Tiny BJT symbol
                sketchLine(-8, 0, -3, 0, symbolInk, 1.2, 0.1);
                sketchLine(-3, -7, -3, 7, symbolInk, 1.8, 0.1);
                sketchLine(-3, -3, 6, -9, symbolInk, 1.2, 0.1);
                sketchLine(-3, 3, 6, 9, symbolInk, 1.2, 0.1);
                break;
            case 'pnp':
                sketchLine(-8, 0, -3, 0, symbolInk, 1.2, 0.1);
                sketchLine(-3, -7, -3, 7, symbolInk, 1.8, 0.1);
                sketchLine(-3, -3, 6, -9, symbolInk, 1.2, 0.1);
                sketchLine(-3, 3, 6, 9, symbolInk, 1.2, 0.1);
                break;
            case 'nmos':
            case 'pmos':
                sketchLine(-7, 0, -3, 0, symbolInk, 1.2, 0.1);
                sketchLine(-3, -7, -3, 7, symbolInk, 1.8, 0.1);
                sketchLine(1, -7, 1, 7, symbolInk, 1.5, 0.1);
                sketchLine(1, -4, 7, -4, symbolInk, 1.2, 0.1);
                sketchLine(1, 4, 7, 4, symbolInk, 1.2, 0.1);
                break;
            case 'resistor':
                drawSketchyHorizontalResistor(-12, 12, 0);
                break;
            case 'capacitor':
                sketchLine(-4, -9, -4, 9, symbolInk, 1.6, 0.1);
                sketchLine(4, -9, 4, 9, symbolInk, 1.6, 0.1);
                sketchLine(-12, 0, -4, 0, symbolInk, 1.2, 0.1);
                sketchLine(4, 0, 12, 0, symbolInk, 1.2, 0.1);
                break;
            case 'inductor':
                ctx.beginPath();
                ctx.arc(-5, 0, 4, Math.PI, 0, false);
                ctx.arc(3, 0, 4, Math.PI, 0, false);
                ctx.stroke();
                break;
            case 'ground':
                drawSketchyGround(0, -4);
                break;
            case 'diode':
                ctx.beginPath();
                ctx.moveTo(-8, 0); ctx.lineTo(8, 0);
                ctx.moveTo(-4, -6); ctx.lineTo(-4, 6); ctx.lineTo(4, 0); ctx.closePath();
                ctx.moveTo(4, -6); ctx.lineTo(4, 6);
                ctx.stroke();
                break;
            case 'ohm':
                ctx.font = '15px "Inter", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Ω', 0, 5);
                break;
            case 'farad':
                ctx.font = 'italic 14px "EB Garamond", serif';
                ctx.textAlign = 'center';
                ctx.fillText('µF', 0, 5);
                break;
            case 'opamp':
                ctx.beginPath();
                ctx.moveTo(-10, -10); ctx.lineTo(10, 0); ctx.lineTo(-10, 10); ctx.closePath();
                ctx.stroke();
                break;
        }

        ctx.restore();
    }

    // ==============================================================
    // ANIMATION & LIFECYCLE CONTROLLER (ZERO CPU IN DARK MODE)
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

        // 1. Draw Floating Circuit Component Symbols
        for (let i = 0; i < symbols.length; i++) {
            const s = symbols[i];
            s.x += s.vx;
            s.y += s.vy;
            s.rot += s.rotSpeed;

            if (s.x < -30) s.x = width + 30;
            if (s.x > width + 30) s.x = -30;
            if (s.y < -30) s.y = height + 30;
            if (s.y > height + 30) s.y = -30;

            drawSymbol(s);
        }

        // 2. Draw Transistor & Passive Electronic Circuit Schematics
        for (let i = 0; i < circuits.length; i++) {
            const c = circuits[i];
            if (isMobile && !c.mobile) continue;

            const floatX = width * c.baseXRatio + Math.sin(time * 0.0007 + i * 1.6) * 10;
            const floatY = height * c.baseYRatio + Math.cos(time * 0.0007 + i * 1.6) * 8;
            const scale = isMobile ? c.scale * 0.8 : c.scale;

            switch (c.type) {
                case 'bjt_amplifier':
                    drawBJTCommonEmitter(floatX, floatY, scale, time);
                    break;
                case 'cmos_inverter':
                    drawCMOSInverter(floatX, floatY, scale);
                    break;
                case 'current_mirror':
                    drawBJTCurrentMirror(floatX, floatY, scale);
                    break;
                case 'mosfet_diff_pair':
                    drawMOSFETDifferentialPair(floatX, floatY, scale);
                    break;
                case 'voltage_divider':
                    drawVoltageDivider(floatX, floatY, scale, time);
                    break;
                case 'rc_filter':
                    drawRCFilter(floatX, floatY, scale);
                    break;
                case 'wheatstone_bridge':
                    drawWheatstoneBridge(floatX, floatY, scale);
                    break;
                case 'lc_tank':
                    drawLCTank(floatX, floatY, scale);
                    break;
            }
        }

        animationFrameId = requestAnimationFrame(render);
    }

    function startLoop() {
        if (!isRunning && shouldRun()) {
            isRunning = true;
            canvas.style.display = 'block';
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
    }

    function updateState() {
        if (shouldRun()) {
            startLoop();
        } else {
            stopLoop();
        }
    }

    // Observer for light/dark theme switches
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

    // Page visibility changes (pause when user switches tabs)
    document.addEventListener('visibilitychange', updateState);

    // Initial check
    updateState();

    return () => {
        stopLoop();
        themeObserver.disconnect();
        document.removeEventListener('visibilitychange', updateState);
        window.removeEventListener('resize', handleResize);
        if (canvas) canvas.remove();
    };
}
