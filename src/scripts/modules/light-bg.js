/**
 * Light Mode Background Engine:
 * - Two Authentic Ethiopian Begenas (በገና - 10-Stringed Sacred Harps) in rough sketchy black ink
 * - Circuit Schematics: Voltage Divider, RC Filter, Wheatstone Bridge, RL Circuit, LC Resonant Tank
 * - Floating circuit symbols & subtle acoustic/current pulse waves
 * - Pure Black sketchy linework, subtle non-intrusive watermark opacity, 100% non-interactable
 * - Strictly active in Light Mode only, optimized 60fps lightweight canvas rendering
 */

export function initLightBackground() {
    const existing = document.getElementById('light-bg-canvas');
    if (existing) existing.remove();

    const canvas = document.createElement('canvas');
    canvas.id = 'light-bg-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Two Ethiopian Begenas (Left & Right Flanks in rough sketchy black ink)
    const begenas = [
        {
            baseXRatio: 0.14,
            baseYRatio: 0.50,
            scale: 0.96,
            swaySpeed: 0.0008,
            swayAmp: 10,
            phase: 0,
            tilt: -0.03
        },
        {
            baseXRatio: 0.86,
            baseYRatio: 0.52,
            scale: 0.92,
            swaySpeed: 0.001,
            swayAmp: 9,
            phase: Math.PI * 0.75,
            tilt: 0.03
        }
    ];

    // Electronic Circuit Schematics Dataset
    const circuits = [
        {
            type: 'voltage_divider',
            baseXRatio: 0.28,
            baseYRatio: 0.24,
            scale: 0.95
        },
        {
            type: 'rc_filter',
            baseXRatio: 0.72,
            baseYRatio: 0.22,
            scale: 0.95
        },
        {
            type: 'wheatstone_bridge',
            baseXRatio: 0.32,
            baseYRatio: 0.78,
            scale: 0.90
        },
        {
            type: 'rl_circuit',
            baseXRatio: 0.68,
            baseYRatio: 0.80,
            scale: 0.92
        },
        {
            type: 'lc_tank',
            baseXRatio: 0.50,
            baseYRatio: 0.92,
            scale: 0.88
        }
    ];

    // Floating Circuit Symbols & Components
    const symbols = [];
    const SYMBOL_TYPES = ['resistor', 'capacitor', 'inductor', 'ground', 'diode', 'ohm', 'farad', 'henry', 'ac_source', 'opamp'];

    function initSymbols() {
        symbols.length = 0;
        const count = width < 768 ? 8 : 18;
        for (let i = 0; i < count; i++) {
            symbols.push({
                type: SYMBOL_TYPES[i % SYMBOL_TYPES.length],
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.16,
                vy: (Math.random() - 0.5) * 0.16,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.002,
                scale: Math.random() * 0.3 + 0.75
            });
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

        initSymbols();
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    // ==============================================================
    // HIGH-PERFORMANCE SKETCH DRAWING HELPERS
    // ==============================================================

    // Fast sketchy line: primary stroke + subtle sketchy second pass
    function sketchLine(x1, y1, x2, y2, color, lineWidth = 1.4, jitter = 1.0) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        const midX = (x1 + x2) * 0.5 + Math.sin(x1 + y2) * jitter;
        const midY = (y1 + y2) * 0.5 + Math.cos(y1 + x2) * jitter;
        ctx.quadraticCurveTo(midX, midY, x2, y2);
        ctx.stroke();

        // Sketch ghost overlay line for genuine hand-drafted look
        ctx.lineWidth = lineWidth * 0.6;
        ctx.beginPath();
        ctx.moveTo(x1 + Math.cos(y1) * jitter * 0.7, y1 + Math.sin(x1) * jitter * 0.7);
        ctx.lineTo(x2 + Math.sin(y2) * jitter * 0.7, y2 + Math.cos(x2) * jitter * 0.7);
        ctx.stroke();
    }

    // ==============================================================
    // AUTHENTIC ROUGH SKETCHY BEGENA (በገና) DRAWING ENGINE
    // ==============================================================

    function drawSketchyBegena(x, y, scale, time, phase, baseTilt = 0) {
        ctx.save();
        ctx.translate(x, y);

        // Gentle breathing sway
        const swayAngle = baseTilt + Math.sin(time * 0.0009 + phase) * 0.03;
        ctx.rotate(swayAngle);
        ctx.scale(scale, scale);

        const darkInk = 'rgba(0, 0, 0, 0.42)';
        const boldInk = 'rgba(0, 0, 0, 0.56)';
        const faintInk = 'rgba(0, 0, 0, 0.20)';

        // 1. SOUNDBOX (Qor / ቆር - Resonator Body)
        const boxTopW = 120;
        const boxBotW = 150;
        const boxTopY = 70;
        const boxH = 95;
        const boxBotY = boxTopY + boxH;

        // Front soundboard trapezoid
        sketchLine(-boxTopW / 2, boxTopY, boxTopW / 2, boxTopY, boldInk, 2.0, 1.0);
        sketchLine(boxTopW / 2, boxTopY, boxBotW / 2, boxBotY, boldInk, 2.0, 1.0);
        sketchLine(boxBotW / 2, boxBotY, -boxBotW / 2, boxBotY, boldInk, 2.2, 1.0);
        sketchLine(-boxBotW / 2, boxBotY, -boxTopW / 2, boxTopY, boldInk, 2.0, 1.0);

        // Soundbox 3D perspective depth rim (right side)
        const depth = 16;
        sketchLine(boxTopW / 2, boxTopY, boxTopW / 2 + depth, boxTopY - 8, darkInk, 1.4, 0.8);
        sketchLine(boxBotW / 2, boxBotY, boxBotW / 2 + depth, boxBotY - 8, darkInk, 1.4, 0.8);
        sketchLine(boxTopW / 2 + depth, boxTopY - 8, boxBotW / 2 + depth, boxBotY - 8, darkInk, 1.4, 0.8);

        // Cross-hatch shading on side depth
        for (let dy = boxTopY - 4; dy < boxBotY - 10; dy += 9) {
            sketchLine(boxTopW / 2 + (dy - boxTopY) * 0.15, dy, boxTopW / 2 + depth, dy - 6, faintInk, 0.9, 0.5);
        }

        // Leather skin perimeter stitching (Qursha)
        for (let lx = -boxTopW / 2 + 10; lx <= boxTopW / 2 - 10; lx += 14) {
            sketchLine(lx - 2, boxTopY + 2, lx + 2, boxTopY + 6, darkInk, 1.2, 0.4);
            sketchLine(lx * 1.15 - 2, boxBotY - 6, lx * 1.15 + 2, boxBotY - 2, darkInk, 1.2, 0.4);
        }

        // Traditional Ethiopian diamond cross soundboard motif
        const diamondCenterY = boxTopY + 32;
        sketchLine(0, diamondCenterY - 14, 12, diamondCenterY, darkInk, 1.5, 0.7);
        sketchLine(12, diamondCenterY, 0, diamondCenterY + 14, darkInk, 1.5, 0.7);
        sketchLine(0, diamondCenterY + 14, -12, diamondCenterY, darkInk, 1.5, 0.7);
        sketchLine(-12, diamondCenterY, 0, diamondCenterY - 14, darkInk, 1.5, 0.7);
        sketchLine(0, diamondCenterY - 10, 0, diamondCenterY + 10, faintInk, 1.0, 0.4);
        sketchLine(-8, diamondCenterY, 8, diamondCenterY, faintInk, 1.0, 0.4);

        // 2. THE BRIDGE (Birkuma / ብርኩማ) & BUZZING DAMPERS (Derek / ድርክ)
        const bridgeY = boxTopY + 54;
        const bridgeW = 74;
        sketchLine(-bridgeW / 2, bridgeY, bridgeW / 2, bridgeY, boldInk, 2.6, 0.9);
        sketchLine(-bridgeW / 2 + 4, bridgeY + 6, bridgeW / 2 - 4, bridgeY + 6, darkInk, 1.8, 0.7);
        sketchLine(-bridgeW / 2, bridgeY, -bridgeW / 2 + 4, bridgeY + 6, darkInk, 1.5, 0.5);
        sketchLine(bridgeW / 2, bridgeY, bridgeW / 2 - 4, bridgeY + 6, darkInk, 1.5, 0.5);

        // 10 Buzzing leather dampers on bridge
        for (let d = 0; d < 10; d++) {
            const dx = -bridgeW / 2 + 6 + d * (bridgeW - 12) / 9;
            sketchLine(dx - 1, bridgeY - 3, dx + 1, bridgeY + 2, boldInk, 1.6, 0.3);
        }

        // Tailpiece / string anchor at bottom (Megtamiya)
        sketchLine(-24, boxBotY - 4, 24, boxBotY - 4, boldInk, 2.5, 0.7);

        // 3. TWO WOODEN UPRIGHT POSTS (Miseso / ምሰሶ)
        const topBarY = -145;
        const topBarW = 175;
        const armWidth = 14;

        // Left Upright Post
        sketchLine(-boxTopW / 2 + 4, boxTopY, -topBarW / 2 + 4, topBarY, boldInk, 2.4, 1.2);
        sketchLine(-boxTopW / 2 + 4 + armWidth, boxTopY, -topBarW / 2 + 4 + armWidth, topBarY, darkInk, 1.8, 1.0);
        
        // Right Upright Post
        sketchLine(boxTopW / 2 - 4, boxTopY, topBarW / 2 - 4, topBarY, boldInk, 2.4, 1.2);
        sketchLine(boxTopW / 2 - 4 - armWidth, boxTopY, topBarW / 2 - 4 - armWidth, topBarY, darkInk, 1.8, 1.0);

        // Ethiopian geometric wood carvings on posts
        for (let cy = topBarY + 25; cy < boxTopY - 20; cy += 28) {
            const lx = -topBarW / 2 + 4 + (cy - topBarY) * 0.12;
            sketchLine(lx + 2, cy - 8, lx + armWidth - 2, cy + 8, faintInk, 1.2, 0.4);
            sketchLine(lx + armWidth - 2, cy - 8, lx + 2, cy + 8, faintInk, 1.2, 0.4);

            const rx = topBarW / 2 - 4 - armWidth - (cy - topBarY) * 0.12;
            sketchLine(rx + 2, cy - 8, rx + armWidth - 2, cy + 8, faintInk, 1.2, 0.4);
            sketchLine(rx + armWidth - 2, cy - 8, rx + 2, cy + 8, faintInk, 1.2, 0.4);
        }

        // 4. UPPER YOKE CROSSBAR (Kenber / ቀንበር) & TUNING THONGS (Qanat / ቃናት)
        const crossbarOverhang = 18;
        sketchLine(-topBarW / 2 - crossbarOverhang, topBarY - 6, topBarW / 2 + crossbarOverhang, topBarY - 6, boldInk, 2.8, 1.2);
        sketchLine(-topBarW / 2 - crossbarOverhang, topBarY + 8, topBarW / 2 + crossbarOverhang, topBarY + 8, boldInk, 2.8, 1.2);
        sketchLine(-topBarW / 2 - crossbarOverhang, topBarY - 6, -topBarW / 2 - crossbarOverhang, topBarY + 8, darkInk, 2.0, 0.6);
        sketchLine(topBarW / 2 + crossbarOverhang, topBarY - 6, topBarW / 2 + crossbarOverhang, topBarY + 8, darkInk, 2.0, 0.6);

        // 5. 10 TAUT GUT STRINGS (Awtar / አውታር)
        const numStrings = 10;
        const pegSpan = topBarW - 36;
        const pegStart = -pegSpan / 2;
        const pegSpacing = pegSpan / (numStrings - 1);

        for (let i = 0; i < numStrings; i++) {
            const pegX = pegStart + i * pegSpacing;

            // Tuning loops/pegs (Qanat)
            sketchLine(pegX - 2, topBarY - 14, pegX + 2, topBarY - 14, boldInk, 2.0, 0.4);
            sketchLine(pegX, topBarY - 14, pegX, topBarY + 8, boldInk, 2.0, 0.5);
            sketchLine(pegX, topBarY - 14, pegX + (i % 2 === 0 ? -4 : 4), topBarY - 24, faintInk, 1.2, 0.6);

            const bridgeX = -bridgeW / 2 + 6 + i * (bridgeW - 12) / (numStrings - 1);
            const anchorX = -20 + i * 40 / (numStrings - 1);

            // Standing harmonic wave vibration
            const waveFreq = 0.0035 + (i * 0.0004);
            const waveAmp = 1.4 + Math.sin(i * 1.3) * 0.6;
            const waveOffset = Math.sin(time * waveFreq + i * 0.9 + phase) * waveAmp;

            const midY = (topBarY + bridgeY) / 2;
            const midX = (pegX + bridgeX) / 2 + waveOffset;

            // Upper string segment
            ctx.strokeStyle = i % 2 === 0 ? boldInk : darkInk;
            ctx.lineWidth = 1.3;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(pegX, topBarY + 8);
            ctx.quadraticCurveTo(midX, midY, bridgeX, bridgeY);
            ctx.stroke();

            // Lower string segment
            ctx.beginPath();
            ctx.moveTo(bridgeX, bridgeY + 6);
            ctx.lineTo(anchorX, boxBotY - 4);
            ctx.stroke();
        }

        // 6. SUBTLE ACOUSTIC RESONANCE RIPPLES (Acoustic Standing Waves)
        const ripplePhase = (time * 0.0005 + phase) % 1;
        ctx.strokeStyle = `rgba(0, 0, 0, ${0.08 * (1 - ripplePhase)})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(0, bridgeY, 45 + ripplePhase * 65, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    // ==============================================================
    // CIRCUIT SCHEMATICS IN ROUGH SKETCHY BLACK INK
    // ==============================================================

    function drawVoltageDivider(x, y, scale, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        const darkInk = 'rgba(0, 0, 0, 0.44)';
        const boldInk = 'rgba(0, 0, 0, 0.58)';
        const blueInk = 'rgba(37, 99, 235, 0.52)';

        // Title & Formula
        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('Voltage Divider Circuit', 0, -85);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('V_out = V_in · [ R_2 / (R_1 + R_2) ]', 0, -68);

        // Input Vin Terminal
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(-40, -50, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '500 11px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'right';
        ctx.fillText('V_in', -48, -47);

        // Wire to R1
        sketchLine(-37, -50, 0, -50, darkInk, 1.5, 0.5);
        sketchLine(0, -50, 0, -35, darkInk, 1.5, 0.5);

        // Resistor R1
        drawSketchyResistor(0, -35, 0, 0, 'R_1');

        // Middle Node
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = boldInk;
        ctx.fill();

        // Wire to Vout
        sketchLine(0, 0, 45, 0, darkInk, 1.5, 0.5);
        ctx.beginPath();
        ctx.arc(48, 0, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('V_out', 56, 4);

        // Resistor R2
        drawSketchyResistor(0, 0, 0, 35, 'R_2');

        // Wire to Ground
        sketchLine(0, 35, 0, 50, darkInk, 1.5, 0.5);
        drawSketchyGround(0, 50);

        // Flowing current pulse dot
        const pulse = (time * 0.0009) % 1;
        const dotY = -50 + pulse * 100;
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

        const darkInk = 'rgba(0, 0, 0, 0.44)';
        const boldInk = 'rgba(0, 0, 0, 0.58)';
        const blueInk = 'rgba(37, 99, 235, 0.52)';

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('RC Low-Pass Filter', 0, -65);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('f_c = 1 / (2π · R · C)', 0, -48);

        // Input Vin
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(-65, -20, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '500 11px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'right';
        ctx.fillText('V_in', -72, -17);

        // Wire to R
        sketchLine(-62, -20, -40, -20, darkInk, 1.5, 0.5);

        // Horizontal Resistor R
        drawSketchyHorizontalResistor(-40, 0, -20, 'R');

        // Node
        ctx.beginPath();
        ctx.arc(0, -20, 3, 0, Math.PI * 2);
        ctx.fillStyle = boldInk;
        ctx.fill();

        // Wire to Output Vout
        sketchLine(0, -20, 55, -20, darkInk, 1.5, 0.5);
        ctx.beginPath();
        ctx.arc(58, -20, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '600 11px "Inter", sans-serif';
        ctx.fillStyle = blueInk;
        ctx.textAlign = 'left';
        ctx.fillText('V_out', 66, -17);

        // Capacitor C to ground
        sketchLine(0, -20, 0, 0, darkInk, 1.5, 0.5);
        sketchLine(-14, 0, 14, 0, boldInk, 2.0, 0.4);
        sketchLine(-14, 8, 14, 8, boldInk, 2.0, 0.4);

        ctx.font = '500 11px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'left';
        ctx.fillText('C', 20, 7);

        sketchLine(0, 8, 0, 24, darkInk, 1.5, 0.5);
        drawSketchyGround(0, 24);

        ctx.restore();
    }

    function drawWheatstoneBridge(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        const darkInk = 'rgba(0, 0, 0, 0.44)';
        const blueInk = 'rgba(37, 99, 235, 0.52)';

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('Wheatstone Bridge', 0, -65);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('R_x = R_3 · (R_2 / R_1)', 0, -48);

        // Diamond Nodes
        sketchLine(0, -35, -45, 0, darkInk, 1.6, 0.6);
        sketchLine(-45, 0, 0, 35, darkInk, 1.6, 0.6);
        sketchLine(0, 35, 45, 0, darkInk, 1.6, 0.6);
        sketchLine(45, 0, 0, -35, darkInk, 1.6, 0.6);

        ctx.font = '500 10px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('R_1', -32, -20);
        ctx.fillText('R_2', 32, -20);
        ctx.fillText('R_3', -32, 24);
        ctx.fillText('R_x', 32, 24);

        // Galvanometer meter
        sketchLine(-45, 0, -12, 0, darkInk, 1.4, 0.4);
        sketchLine(12, 0, 45, 0, darkInk, 1.4, 0.4);

        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = 'bold 10px "Inter", sans-serif';
        ctx.fillText('G', 0, 4);

        ctx.restore();
    }

    function drawRLCircuit(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        const darkInk = 'rgba(0, 0, 0, 0.44)';
        const blueInk = 'rgba(37, 99, 235, 0.52)';

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('RL Transient Circuit', 0, -55);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('τ = L / R,   v_L(t) = L (di/dt)', 0, -38);

        sketchLine(-50, -15, -30, -15, darkInk, 1.5, 0.5);
        drawSketchyHorizontalResistor(-30, 0, -15, 'R');

        // Coiled Inductor L
        const indStartX = 0;
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(indStartX + 8, -15, 7, Math.PI, 0, false);
        ctx.arc(indStartX + 20, -15, 7, Math.PI, 0, false);
        ctx.arc(indStartX + 32, -15, 7, Math.PI, 0, false);
        ctx.stroke();

        ctx.font = '500 11px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('L', indStartX + 20, -30);

        sketchLine(indStartX + 39, -15, indStartX + 55, -15, darkInk, 1.5, 0.5);

        ctx.restore();
    }

    function drawLCTank(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        const darkInk = 'rgba(0, 0, 0, 0.44)';
        const blueInk = 'rgba(37, 99, 235, 0.52)';

        ctx.font = '600 12px "Inter", sans-serif';
        ctx.fillStyle = darkInk;
        ctx.textAlign = 'center';
        ctx.fillText('LC Resonant Circuit', 0, -45);

        ctx.font = 'italic 11px "EB Garamond", "STIX Two Text", serif';
        ctx.fillStyle = blueInk;
        ctx.fillText('f_0 = 1 / (2π√(L · C))', 0, -28);

        sketchLine(-30, -10, 30, -10, darkInk, 1.5, 0.5);
        sketchLine(-30, 30, 30, 30, darkInk, 1.5, 0.5);

        // Branch 1: L
        sketchLine(-20, -10, -20, -2, darkInk, 1.5, 0.5);
        ctx.strokeStyle = darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(-20, 5, 5, -Math.PI / 2, Math.PI / 2, false);
        ctx.arc(-20, 15, 5, -Math.PI / 2, Math.PI / 2, false);
        ctx.stroke();
        sketchLine(-20, 20, -20, 30, darkInk, 1.5, 0.5);

        // Branch 2: C
        sketchLine(20, -10, 20, 6, darkInk, 1.5, 0.5);
        sketchLine(10, 6, 30, 6, darkInk, 2.0, 0.4);
        sketchLine(10, 14, 30, 14, darkInk, 2.0, 0.4);
        sketchLine(20, 14, 20, 30, darkInk, 1.5, 0.5);

        ctx.restore();
    }

    function drawSketchyResistor(x1, y1, x2, y2, label) {
        const darkInk = 'rgba(0, 0, 0, 0.44)';
        const h = y2 - y1;
        const seg = h / 6;
        
        sketchLine(x1, y1, x1 + 8, y1 + seg * 1, darkInk, 1.6, 0.5);
        sketchLine(x1 + 8, y1 + seg * 1, x1 - 8, y1 + seg * 2, darkInk, 1.6, 0.5);
        sketchLine(x1 - 8, y1 + seg * 2, x1 + 8, y1 + seg * 3, darkInk, 1.6, 0.5);
        sketchLine(x1 + 8, y1 + seg * 3, x1 - 8, y1 + seg * 4, darkInk, 1.6, 0.5);
        sketchLine(x1 - 8, y1 + seg * 4, x1 + 8, y1 + seg * 5, darkInk, 1.6, 0.5);
        sketchLine(x1 + 8, y1 + seg * 5, x2, y2, darkInk, 1.6, 0.5);

        if (label) {
            ctx.font = '500 11px "Inter", sans-serif';
            ctx.fillStyle = darkInk;
            ctx.textAlign = 'left';
            ctx.fillText(label, x1 + 14, (y1 + y2) / 2 + 4);
        }
    }

    function drawSketchyHorizontalResistor(x1, x2, y, label) {
        const darkInk = 'rgba(0, 0, 0, 0.44)';
        const w = x2 - x1;
        const seg = w / 6;

        sketchLine(x1, y, x1 + seg * 1, y - 6, darkInk, 1.6, 0.5);
        sketchLine(x1 + seg * 1, y - 6, x1 + seg * 2, y + 6, darkInk, 1.6, 0.5);
        sketchLine(x1 + seg * 2, y + 6, x1 + seg * 3, y - 6, darkInk, 1.6, 0.5);
        sketchLine(x1 + seg * 3, y - 6, x1 + seg * 4, y + 6, darkInk, 1.6, 0.5);
        sketchLine(x1 + seg * 4, y + 6, x1 + seg * 5, y - 6, darkInk, 1.6, 0.5);
        sketchLine(x1 + seg * 5, y - 6, x2, y, darkInk, 1.6, 0.5);

        if (label) {
            ctx.font = '500 11px "Inter", sans-serif';
            ctx.fillStyle = darkInk;
            ctx.textAlign = 'center';
            ctx.fillText(label, (x1 + x2) / 2, y - 12);
        }
    }

    function drawSketchyGround(x, y) {
        const darkInk = 'rgba(0, 0, 0, 0.44)';
        sketchLine(x - 12, y, x + 12, y, darkInk, 1.8, 0.4);
        sketchLine(x - 8, y + 4, x + 8, y + 4, darkInk, 1.5, 0.4);
        sketchLine(x - 4, y + 8, x + 4, y + 8, darkInk, 1.3, 0.4);
    }

    function drawSymbol(s) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.scale(s.scale, s.scale);

        const darkInk = 'rgba(0, 0, 0, 0.22)';

        ctx.strokeStyle = darkInk;
        ctx.fillStyle = darkInk;
        ctx.lineWidth = 1.4;

        switch (s.type) {
            case 'resistor':
                drawSketchyHorizontalResistor(-15, 15, 0);
                break;
            case 'capacitor':
                sketchLine(-10, -10, -10, 10, darkInk, 1.8, 0.3);
                sketchLine(-4, -10, -4, 10, darkInk, 1.8, 0.3);
                sketchLine(-20, 0, -10, 0, darkInk, 1.4, 0.3);
                sketchLine(-4, 0, 10, 0, darkInk, 1.4, 0.3);
                break;
            case 'inductor':
                ctx.beginPath();
                ctx.arc(-6, 0, 5, Math.PI, 0, false);
                ctx.arc(4, 0, 5, Math.PI, 0, false);
                ctx.stroke();
                break;
            case 'ground':
                drawSketchyGround(0, 0);
                break;
            case 'diode':
                ctx.beginPath();
                ctx.moveTo(-10, 0); ctx.lineTo(10, 0);
                ctx.moveTo(-6, -7); ctx.lineTo(-6, 7); ctx.lineTo(4, 0); ctx.closePath();
                ctx.moveTo(4, -7); ctx.lineTo(4, 7);
                ctx.stroke();
                break;
            case 'ohm':
                ctx.font = '16px "Inter", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Ω', 0, 5);
                break;
            case 'farad':
                ctx.font = 'italic 15px "EB Garamond", serif';
                ctx.textAlign = 'center';
                ctx.fillText('µF', 0, 5);
                break;
            case 'henry':
                ctx.font = 'italic 15px "EB Garamond", serif';
                ctx.textAlign = 'center';
                ctx.fillText('mH', 0, 5);
                break;
            case 'ac_source':
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.moveTo(-5, 0);
                ctx.quadraticCurveTo(-2.5, -4, 0, 0);
                ctx.quadraticCurveTo(2.5, 4, 5, 0);
                ctx.stroke();
                break;
            case 'opamp':
                ctx.beginPath();
                ctx.moveTo(-12, -12); ctx.lineTo(12, 0); ctx.lineTo(-12, 12); ctx.closePath();
                ctx.stroke();
                break;
        }

        ctx.restore();
    }

    // ==============================================================
    // ANIMATION LOOP (LIGHT MODE ONLY)
    // ==============================================================
    let animationFrameId = null;

    function render(currentTime) {
        // Only render when theme is light
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (!isLight) {
            ctx.clearRect(0, 0, width, height);
            canvas.style.display = 'none';
            animationFrameId = requestAnimationFrame(render);
            return;
        } else {
            canvas.style.display = 'block';
        }

        ctx.clearRect(0, 0, width, height);

        const time = currentTime;

        // 1. Draw Floating Circuit Component Symbols
        for (let i = 0; i < symbols.length; i++) {
            const s = symbols[i];
            s.x += s.vx;
            s.y += s.vy;
            s.rot += s.rotSpeed;

            if (s.x < -40) s.x = width + 40;
            if (s.x > width + 40) s.x = -40;
            if (s.y < -40) s.y = height + 40;
            if (s.y > height + 40) s.y = -40;

            drawSymbol(s);
        }

        // 2. Draw Moving Circuits with subtle floating drift
        for (let i = 0; i < circuits.length; i++) {
            const c = circuits[i];
            
            const floatX = width * c.baseXRatio + Math.sin(time * 0.0008 + i * 1.5) * 14;
            const floatY = height * c.baseYRatio + Math.cos(time * 0.0008 + i * 1.5) * 10;
            const scale = width < 768 ? c.scale * 0.8 : c.scale;

            switch (c.type) {
                case 'voltage_divider':
                    drawVoltageDivider(floatX, floatY, scale, time);
                    break;
                case 'rc_filter':
                    drawRCFilter(floatX, floatY, scale);
                    break;
                case 'wheatstone_bridge':
                    drawWheatstoneBridge(floatX, floatY, scale);
                    break;
                case 'rl_circuit':
                    drawRLCircuit(floatX, floatY, scale);
                    break;
                case 'lc_tank':
                    drawLCTank(floatX, floatY, scale);
                    break;
            }
        }

        // 3. Draw The Two Moving Rough Sketchy Ethiopian Begenas
        const isMobile = width < 768;

        // Left Begena (in rough black ink, no text label)
        const leftHarpX = isMobile ? width * 0.18 : width * begenas[0].baseXRatio;
        const leftHarpY = height * begenas[0].baseYRatio + Math.sin(time * begenas[0].swaySpeed) * begenas[0].swayAmp;
        const leftScale = isMobile ? 0.65 : begenas[0].scale;
        drawSketchyBegena(leftHarpX, leftHarpY, leftScale, time, begenas[0].phase, begenas[0].tilt);

        // Right Begena (replacing Krar with Begena, in rough black ink, no text label)
        const rightHarpX = isMobile ? width * 0.82 : width * begenas[1].baseXRatio;
        const rightHarpY = height * begenas[1].baseYRatio + Math.cos(time * begenas[1].swaySpeed) * begenas[1].swayAmp;
        const rightScale = isMobile ? 0.65 : begenas[1].scale;
        drawSketchyBegena(rightHarpX, rightHarpY, rightScale, time, begenas[1].phase, begenas[1].tilt);

        animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        if (canvas) canvas.remove();
    };
}
