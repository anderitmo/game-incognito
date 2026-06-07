const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const characterSelect = document.getElementById("characterSelect");
const termsModal = document.getElementById("terms-modal");
const termsAcceptButton = document.getElementById("termsAcceptButton");
const termsRejectLink = document.getElementById("termsRejectLink");
const glossaryButton = document.getElementById("glossaryButton");
const inGameGlossaryButton = document.getElementById("inGameGlossaryButton");
const fullscreenButton = document.getElementById("fullscreenButton");
const mobileControls = document.getElementById("mobileControls");
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");
const btnJump = document.getElementById("btnJump");
const glossaryModal = document.getElementById("glossary-modal");
const glossaryContent = document.getElementById("glossaryContent");
const glossaryCloseButton = document.getElementById("glossaryCloseButton");
const victoryOverlay = document.getElementById("victoryOverlay");
const defeatOverlay = document.getElementById("defeatOverlay");
const defeatTitle = document.getElementById("defeatTitle");
const nextPhaseButton = document.getElementById("nextPhaseButton");
const retryButton = document.getElementById("retryButton");
const victoryQuoteText = document.getElementById("victoryQuoteText");
const victoryQuoteAuthor = document.getElementById("victoryQuoteAuthor");
const defeatQuoteText = document.getElementById("defeatQuoteText");
const defeatQuoteAuthor = document.getElementById("defeatQuoteAuthor");
const cutsceneUI = document.getElementById("cutscene-ui");
const cutsceneCanvas = document.getElementById("cutsceneCanvas");
const cutsceneCtx = cutsceneCanvas.getContext("2d");
const cutsceneSpeaker = document.getElementById("cutsceneSpeaker");
const cutsceneText = document.getElementById("cutsceneText");
const cutsceneNextButton = document.getElementById("cutsceneNextButton");
const studentSelectionScreen = document.getElementById("student-selection-screen");
const studentSelectionTitle = document.getElementById("studentSelectionTitle");
const studentInstructionText = document.querySelector(".student-copy");
const graduationScreen = document.getElementById("graduation-screen");
const graduationText = document.getElementById("graduationText");
const journeyRestartButton = document.getElementById("journeyRestartButton");
const creditsButton = document.getElementById("creditsButton");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Bordoes do Prof. Emerson. Adicione novos bordoes do Emerson aqui.
const bordoesEmerson = [
  "Nossa, como e mesmo o nome daquele livro?",
  "Do que eu estava falando mesmo?"
];

// Bordoes da Prof. Juliana. Adicione novos bordoes da Juliana aqui.
const bordoesJuliana = [
  "Como eu sou geografa, vou puxar para o meu lado..."
];

// Bordoes da Prof. Celi. Adicione novos bordoes da Celi aqui.
const bordoesCeli = [
  "Pergunte ao seu orientador!"
];

// Bordoes do Prof. Giordano. Adicione novos bordoes do Giordano aqui.
const bordoesGiordano = [
  "Se eu estiver na sua banca eu vou perguntar!"
];

const quotesDefeat = [
  {
    text: "O capitalismo de vigilancia transforma a experiencia humana em materia-prima para dados comportamentais.",
    author: "Shoshana Zuboff"
  },
  {
    text: "Quando a experiencia privada vira insumo gratuito, a autonomia perde terreno para a predicao.",
    author: "Shoshana Zuboff"
  },
  {
    text: "A extracao de dados prospera quando nossas escolhas sao monitoradas antes mesmo de serem compreendidas por nos.",
    author: "Shoshana Zuboff"
  },
  {
    text: "A perda de privacidade enfraquece o direito ao futuro, pois converte comportamento em produto de mercado.",
    author: "Shoshana Zuboff"
  }
];

const quotesVictory = [
  {
    text: "A resistencia comeca quando recusamos que a experiencia humana seja tratada como recurso disponivel.",
    author: "Shoshana Zuboff"
  },
  {
    text: "Defender a privacidade e defender o espaco necessario para pensar, escolher e agir com autonomia.",
    author: "Shoshana Zuboff"
  },
  {
    text: "A emancipacao digital exige limites democraticos para sistemas que procuram prever e modificar condutas.",
    author: "Shoshana Zuboff"
  },
  {
    text: "Recuperar o direito ao futuro significa resistir a mercados que transformam comportamento em certeza vendavel.",
    author: "Shoshana Zuboff"
  }
];

const referenciasData = [
  {
    id: 1,
    autor: "SAVIANI, Demerval",
    titulo: "Trabalho e educa\u00e7\u00e3o: fundamentos ontol\u00f3gicos e hist\u00f3ricos."
  },
  {
    id: 2,
    autor: "NOSELLA, Paolo",
    titulo: "A educa\u00e7\u00e3o no S\u00e9culo XXI: integrar trabalho e tempo livre."
  },
  {
    id: 3,
    autor: "MANFREDI, S.M.",
    titulo: "Educa\u00e7\u00e3o profissional no Brasil: atores e cen\u00e1rios."
  },
  {
    id: 4,
    autor: "DELEUZE, Gilles",
    titulo: "Post-scriptum sobre as sociedades de controle."
  },
  {
    id: 5,
    autor: "FOUCAULT, Michel",
    titulo: "Nascimento da Biopol\u00edtica."
  },
  {
    id: 6,
    autor: "CHAMAYOU, Gr\u00e9goire",
    titulo: "A sociedade ingovern\u00e1vel."
  },
  {
    id: 7,
    autor: "LAVAL, Christian",
    titulo: "A Escola n\u00e3o \u00e9 uma empresa."
  },
  {
    id: 8,
    autor: "ALYS, Francis",
    titulo: "Paradoja de la praxis."
  },
  {
    id: 9,
    autor: "FREIRE, Emerson",
    titulo: "'Faltam-nos poetas t\u00e9cnicos': em dire\u00e7\u00e3o a uma forma\u00e7\u00e3o tecnoest\u00e9tica."
  }
];

const referenciasDataLegacy = [
  {
    id: 1,
    titulo: "Fundamentos Ontológicos",
    autor: "Demerval Saviani",
    texto: "O trabalho não é apenas emprego, mas a base ontológica da existência humana. A educação nasce da necessidade de transmitir o processo de trabalho ao longo da história."
  },
  {
    id: 2,
    titulo: "Sociedade de Controle",
    autor: "Gilles Deleuze",
    texto: "Não estamos mais na disciplina das fábricas, mas no controle contínuo ao ar livre. A vigilância tornou-se fluida e constante."
  },
  {
    id: 3,
    titulo: "O Novo Gerencialismo",
    autor: "Christian Laval",
    texto: "A escola passa a ser gerida como uma empresa, onde a educação é reduzida a um serviço e o aluno a um capital humano focado apenas na utilidade mercadológica."
  },
  {
    id: 4,
    titulo: "Tecnoestética",
    autor: "Emerson Freire",
    texto: "A tecnologia não deve ser separada da sensibilidade. Precisamos de poetas técnicos para construir uma formação que una a utilidade à experiência estética e cultural."
  }
];

class AudioManager {
  constructor() {
    this.context = null;
    this.masterGain = null;
    this.bgmOscillator = null;
    this.bgmLfo = null;
    this.bgmLfoGain = null;
    this.bgmGain = null;
    this.bossOscillators = [];
    this.bossGain = null;
    this.bossIntervalId = null;
    this.bossStep = 0;
  }

  init() {
    if (this.context) {
      if (this.context.state === "suspended") {
        this.context.resume();
      }
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    this.context = new AudioContextClass();
    this.masterGain = this.context.createGain();
    this.masterGain.gain.setValueAtTime(0.65, this.context.currentTime);
    this.masterGain.connect(this.context.destination);
  }

  ensureReady() {
    if (!this.context) {
      return false;
    }

    if (this.context.state === "suspended") {
      this.context.resume();
    }

    return true;
  }

  playCollision() {
    if (!this.ensureReady()) {
      return;
    }

    const now = this.context.currentTime;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(220, now);
    oscillator.frequency.exponentialRampToValueAtTime(72, now + 0.2);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    oscillator.connect(gain);
    gain.connect(this.masterGain);
    oscillator.start(now);
    oscillator.stop(now + 0.22);
  }

  playWin() {
    if (!this.ensureReady()) {
      return;
    }

    [261.63, 329.63, 392].forEach((frequency, index) => {
      const start = this.context.currentTime + index * 0.09;
      this.playTone(frequency, start, 0.18, "triangle", 0.16);
    });
  }

  playSonar() {
    if (!this.ensureReady()) {
      return;
    }

    const now = this.context.currentTime;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1240, now);
    oscillator.frequency.exponentialRampToValueAtTime(1680, now + 0.08);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.11, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);

    oscillator.connect(gain);
    gain.connect(this.masterGain);
    oscillator.start(now);
    oscillator.stop(now + 0.36);
  }

  playBGM() {
    if (!this.ensureReady()) {
      return;
    }

    this.stopBossBGM();

    if (this.bgmIntervalId) {
      return;
    }

    // A fun, bouncy, major pentatonic melody
    const melody = [261.63, 329.63, 392.00, 329.63, 261.63, 392.00, 440.00, 392.00];
    let step = 0;

    this.bgmIntervalId = setInterval(() => {
      if (!this.context) return;
      const tickTime = this.context.currentTime;
      const freq = melody[step % melody.length];

      // Play main melody
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, tickTime);
      gain.gain.setValueAtTime(0.001, tickTime);
      gain.gain.exponentialRampToValueAtTime(0.02, tickTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, tickTime + 0.15);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(tickTime);
      osc.stop(tickTime + 0.2);

      // Bouncy bass on alternating steps
      if (step % 2 === 0) {
        const bass = this.context.createOscillator();
        const bassGain = this.context.createGain();
        bass.type = "sine";
        bass.frequency.setValueAtTime(130.81, tickTime); // Low C
        bassGain.gain.setValueAtTime(0.001, tickTime);
        bassGain.gain.exponentialRampToValueAtTime(0.025, tickTime + 0.02);
        bassGain.gain.exponentialRampToValueAtTime(0.001, tickTime + 0.15);
        bass.connect(bassGain);
        bassGain.connect(this.masterGain);
        bass.start(tickTime);
        bass.stop(tickTime + 0.2);
      }

      step++;
    }, 180);
  }

  stopBGM() {
    this.stopBossBGM();

    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }

  playBossBGM() {
    if (!this.ensureReady()) {
      return;
    }

    if (this.bossGain) {
      return;
    }

    if (this.bgmOscillator) {
      const now = this.context.currentTime;
      this.bgmGain.gain.setTargetAtTime(0.001, now, 0.05);
      this.bgmOscillator.stop(now + 0.15);
      this.bgmLfo.stop(now + 0.15);
      this.bgmOscillator = null;
      this.bgmLfo = null;
      this.bgmLfoGain = null;
      this.bgmGain = null;
    }

    const now = this.context.currentTime;
    this.bossGain = this.context.createGain();
    this.bossGain.gain.setValueAtTime(0.055, now);
    this.bossGain.connect(this.masterGain);

    const bass = this.context.createOscillator();
    bass.type = "square";
    bass.frequency.setValueAtTime(82.41, now);
    bass.connect(this.bossGain);
    bass.start(now);
    this.bossOscillators.push(bass);

    this.bossIntervalId = setInterval(() => {
      if (!this.context || !this.bossGain) {
        return;
      }

      const tickTime = this.context.currentTime;
      const bassNote = this.bossStep % 2 === 0 ? 82.41 : 98;
      bass.frequency.setValueAtTime(bassNote, tickTime);

      const beep = this.context.createOscillator();
      const beepGain = this.context.createGain();
      beep.type = "square";
      beep.frequency.setValueAtTime(620 + Math.random() * 820, tickTime);
      beepGain.gain.setValueAtTime(0.001, tickTime);
      beepGain.gain.exponentialRampToValueAtTime(0.045, tickTime + 0.01);
      beepGain.gain.exponentialRampToValueAtTime(0.001, tickTime + 0.09);
      beep.connect(beepGain);
      beepGain.connect(this.masterGain);
      beep.start(tickTime);
      beep.stop(tickTime + 0.1);

      this.bossStep += 1;
    }, 170);
  }

  stopBossBGM() {
    if (this.bossIntervalId) {
      clearInterval(this.bossIntervalId);
      this.bossIntervalId = null;
    }

    if (!this.context || !this.bossGain) {
      this.bossOscillators = [];
      this.bossGain = null;
      return;
    }

    const now = this.context.currentTime;
    this.bossGain.gain.setTargetAtTime(0.001, now, 0.06);

    for (const oscillator of this.bossOscillators) {
      oscillator.stop(now + 0.15);
    }

    this.bossOscillators = [];
    this.bossGain = null;
    this.bossStep = 0;
  }

  playTone(frequency, start, duration, type, volume) {
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);

    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

    oscillator.connect(gain);
    gain.connect(this.masterGain);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }
}

const audioManager = new AudioManager();

const CHARACTERS = {
  emerson: {
    name: "Prof. Emerson",
    color: "#2f80ed",
    accent: "#9cc7ff"
  },
  juliana: {
    name: "Prof. Juliana",
    color: "#27ae60",
    accent: "#9be7b3"
  },
  anderson: {
    name: "Anderson",
    color: "#111111",
    accent: "#f0c48a"
  },
  rafael: {
    name: "Rafael",
    color: "#cccccc",
    accent: "#ff3030"
  },
  viviane: {
    name: "Viviane",
    color: "#6b7280",
    accent: "#f2c6a0"
  },
  rodrigo: {
    name: "Rodrigo",
    color: "#3d6ea8",
    accent: "#d59a6f"
  },
  myllena: {
    name: "Myllena",
    color: "#202632",
    accent: "#f0b7a4"
  }
};

function normalizeCharacterName(characterName = "") {
  return characterName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function drawCharacter(context, x, y, width, height, characterName) {
  const normalizedName = normalizeCharacterName(characterName);
  const isEmerson = normalizedName.includes("emerson");
  const isJuliana = normalizedName.includes("juliana");
  const isCeli = normalizedName.includes("celi");
  const isGiordano = normalizedName.includes("giordano");
  const isAnderson = normalizedName.includes("anderson");
  const isRafael = normalizedName.includes("rafael");
  const isViviane = normalizedName.includes("viviane");
  const isRodrigo = normalizedName.includes("rodrigo");
  const isMyllena = normalizedName.includes("myllena");

  // Pastel & Sophisticated Palette (Google Doodle Style)
  const palette = isJuliana
    ? { skin: "#fcd6a9", outfit: "#63c78a", outfitDark: "#3a8b5c", detail: "#e8f7ec", shoe: "#2a3b32" }
    : isCeli
    ? { skin: "#ffdfc4", outfit: "#b48eed", outfitDark: "#7d5aa6", detail: "#f4edfc", shoe: "#3a2a4f" }
    : isGiordano
    ? { skin: "#ffe5d4", outfit: "#7cbbe8", outfitDark: "#4a7c9e", detail: "#ffce7a", shoe: "#2a3b4c" }
    : isAnderson
    ? { skin: "#f2cfa5", outfit: "#2d2d2d", outfitDark: "#1a1a1a", detail: "#8b5a2b", shoe: "#1a1a1a" }
    : isViviane
    ? { skin: "#e8c39e", outfit: "#e0d4c1", outfitDark: "#9c8e7e", detail: "#8c6b51", shoe: "#4a443e" }
    : isRodrigo
    ? { skin: "#cfa684", outfit: "#6c8ebf", outfitDark: "#405b82", detail: "#f0f4f8", shoe: "#2d3745" }
    : isMyllena
    ? { skin: "#f5d0bd", outfit: "#363d4a", outfitDark: "#222730", detail: "#f2ebd9", shoe: "#1f242b" }
    : { skin: "#ffd6c2", outfit: "#6fa6f2", outfitDark: "#3b69a6", detail: "#e3effc", shoe: "#2b3440" }; // Emerson

  // Bouncy Animation (Idle Breathing)
  const time = Date.now();
  const bounceSlow = Math.sin(time / 250);
  
  // Rafael is a robot, mechanical bounce
  const stretchY = isRafael ? 1 + (Math.sin(time / 100) * 0.02) : 1 + (bounceSlow * 0.04);
  const stretchX = isRafael ? 1 - (Math.sin(time / 100) * 0.01) : 1 - (bounceSlow * 0.02);
  const bounceOffset = isRafael ? 0 : bounceSlow * 2;

  context.save();
  context.translate(x + width / 2, y + height); // move to bottom center

  // Shadow (Flat Design, rounded, stays on ground)
  context.fillStyle = "rgba(0, 0, 0, 0.15)";
  context.beginPath();
  context.ellipse(0, 4, width * 0.45 * stretchX, height * 0.08, 0, 0, Math.PI * 2);
  context.fill();

  // Apply Bouncy Scaling
  context.scale(stretchX, stretchY);
  context.translate(-width / 2, -height + bounceOffset); // move back up to top-left of local drawing box

  const centerX = width / 2;
  const headY = height * 0.25;
  const bodyTop = height * 0.45;
  const bodyBottom = height * 0.9;
  const headRadius = Math.min(width * 0.35, height * 0.22);
  const hairColor = isJuliana
    ? "#f1c94f"
    : isCeli
    ? "#f7f9ff"
    : palette.shoe;

  // Helper for Native roundRect with fallback
  const drawRoundedRect = (cx, cy, cw, ch, r) => {
    context.beginPath();
    if(context.roundRect) {
       context.roundRect(cx, cy, cw, ch, r);
    } else if (typeof roundRect === 'function') {
       roundRect(context, cx, cy, cw, ch, r); // use game's custom if native missing
    } else {
       context.rect(cx, cy, cw, ch);
    }
  };

  if (isRafael) {
    // Rafael: Robot! Grey square body, red glowing eyes, antenna.
    context.strokeStyle = "#888";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(centerX, height * 0.1);
    context.lineTo(centerX, -height * 0.08);
    context.stroke();
    context.fillStyle = "#ff5555";
    context.beginPath();
    context.arc(centerX, -height * 0.08, width * 0.06, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#e0e0e0";
    drawRoundedRect(width * 0.15, bodyTop, width * 0.7, height * 0.45, width * 0.1);
    context.fill();

    context.fillStyle = "#cccccc";
    drawRoundedRect(width * 0.2, height * 0.1, width * 0.6, height * 0.35, width * 0.1);
    context.fill();

    context.shadowColor = "#ff3030";
    context.shadowBlur = 12;
    context.fillStyle = "#ff3030";
    context.beginPath();
    context.arc(centerX - width * 0.15, height * 0.25, width * 0.07, 0, Math.PI * 2);
    context.arc(centerX + width * 0.15, height * 0.25, width * 0.07, 0, Math.PI * 2);
    context.fill();
    context.shadowBlur = 0;

    context.fillStyle = "#8fe8ff";
    drawRoundedRect(width * 0.25, bodyTop + height * 0.1, width * 0.5, height * 0.15, width * 0.05);
    context.fill();

    context.fillStyle = "#333";
    drawRoundedRect(width * 0.2, bodyBottom, width * 0.2, height * 0.1, width * 0.05);
    drawRoundedRect(width * 0.6, bodyBottom, width * 0.2, height * 0.1, width * 0.05);
    context.fill();

    context.restore();
    return;
  }

  // --- Normal Characters ---
  context.fillStyle = palette.shoe;
  drawRoundedRect(width * 0.25, bodyBottom - height * 0.05, width * 0.18, height * 0.15, width * 0.08);
  context.fill();
  drawRoundedRect(width * 0.57, bodyBottom - height * 0.05, width * 0.18, height * 0.15, width * 0.08);
  context.fill();

  context.fillStyle = palette.outfit;
  if (isJuliana || isCeli || isViviane || isMyllena) {
    if (isMyllena) {
      context.fillStyle = palette.outfitDark;
      drawRoundedRect(width * 0.25, bodyTop + height * 0.2, width * 0.5, height * 0.25, width * 0.05);
      context.fill();
      context.fillStyle = palette.outfit;
      drawRoundedRect(width * 0.2, bodyTop, width * 0.6, height * 0.28, width * 0.12);
      context.fill();
      context.fillStyle = palette.detail;
      context.beginPath();
      context.moveTo(centerX, bodyTop + height * 0.2);
      context.lineTo(centerX - width * 0.1, bodyTop);
      context.lineTo(centerX + width * 0.1, bodyTop);
      context.fill();
    } else if (isViviane) {
      context.fillStyle = palette.outfitDark;
      drawRoundedRect(width * 0.2, bodyTop + height * 0.2, width * 0.6, height * 0.28, width * 0.05);
      context.fill();
      context.fillStyle = palette.outfit;
      drawRoundedRect(width * 0.18, bodyTop, width * 0.64, height * 0.25, width * 0.1);
      context.fill();
    } else {
      context.beginPath();
      context.moveTo(centerX, bodyTop - height * 0.05);
      context.quadraticCurveTo(width * 0.8, bodyTop + height * 0.2, width * 0.85, bodyBottom);
      context.lineTo(width * 0.15, bodyBottom);
      context.quadraticCurveTo(width * 0.2, bodyTop + height * 0.2, centerX, bodyTop - height * 0.05);
      context.fill();
      context.fillStyle = palette.outfitDark;
      drawRoundedRect(width * 0.25, bodyTop + height * 0.15, width * 0.5, height * 0.06, width * 0.03);
      context.fill();
    }
  } else {
    const torsoW = width * 0.6;
    const torsoH = height * 0.45;
    const torsoX = centerX - torsoW / 2;
    
    context.fillStyle = palette.outfit;
    drawRoundedRect(torsoX, bodyTop, torsoW, torsoH, width * 0.1);
    context.fill();

    if (isEmerson) {
      context.save();
      context.beginPath();
      if(context.roundRect) {
         context.roundRect(torsoX, bodyTop, torsoW, torsoH, width * 0.1);
      } else {
         context.rect(torsoX, bodyTop, torsoW, torsoH);
      }
      context.clip();

      const stripeH = height * 0.06;
      for (let i = 0; i < 8; i++) {
        context.fillStyle = i % 2 === 0 ? "#ffffff" : "#1a2b4c";
        context.fillRect(torsoX, bodyTop + i * stripeH, torsoW, stripeH);
      }
      context.restore();

      context.fillStyle = "#e63946";
      drawRoundedRect(width * 0.3, bodyTop - height * 0.05, width * 0.4, height * 0.15, width * 0.08);
      context.fill();
      drawRoundedRect(width * 0.5, bodyTop, width * 0.15, height * 0.25, width * 0.08);
      context.fill();
    }

    if (isAnderson) {
      context.save();
      context.translate(centerX, bodyTop + height * 0.2);
      context.rotate(-Math.PI / 4);
      context.fillStyle = "#5c3a21";
      drawRoundedRect(-width * 0.4, -height * 0.05, width * 0.9, height * 0.1, width * 0.02);
      context.fill();
      context.fillStyle = "#cccccc";
      for(let i=0; i<4; i++) {
         context.fillRect(-width * 0.3 + i * width * 0.15, -height * 0.05, width * 0.02, height * 0.1);
      }
      context.restore();
    }

    if (isRodrigo) {
      context.fillStyle = palette.detail;
      drawRoundedRect(width * 0.35, bodyTop, width * 0.3, height * 0.1, width * 0.05);
      context.fill();
    }
  }

  context.fillStyle = palette.skin;
  context.beginPath();
  context.arc(centerX, headY, headRadius, 0, Math.PI * 2);
  context.fill();

  if (isRodrigo) {
    const beardColor = "#4a2f22";

    context.fillStyle = beardColor;
    context.beginPath();
    context.moveTo(centerX - headRadius * 0.76, headY + headRadius * 0.16);
    context.quadraticCurveTo(centerX - headRadius * 0.98, headY + headRadius * 0.72, centerX - headRadius * 0.5, headY + headRadius * 1.14);
    context.quadraticCurveTo(centerX - headRadius * 0.24, headY + headRadius * 1.48, centerX, headY + headRadius * 1.62);
    context.quadraticCurveTo(centerX + headRadius * 0.24, headY + headRadius * 1.48, centerX + headRadius * 0.5, headY + headRadius * 1.14);
    context.quadraticCurveTo(centerX + headRadius * 0.98, headY + headRadius * 0.72, centerX + headRadius * 0.76, headY + headRadius * 0.16);
    context.quadraticCurveTo(centerX + headRadius * 0.34, headY + headRadius * 0.44, centerX, headY + headRadius * 0.48);
    context.quadraticCurveTo(centerX - headRadius * 0.34, headY + headRadius * 0.44, centerX - headRadius * 0.76, headY + headRadius * 0.16);
    context.fill();

    context.fillStyle = palette.skin;
    context.beginPath();
    context.ellipse(centerX, headY + headRadius * 0.18, headRadius * 0.36, headRadius * 0.16, 0, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = "#2b2b2b";
  const eyeOffset = width * 0.12;
  const eyeRadius = Math.max(2, width * 0.05);
  const isBlinking = Math.sin(time / 150) > 0.96;
  if (isBlinking) {
    context.beginPath();
    context.moveTo(centerX - eyeOffset - eyeRadius, headY);
    context.lineTo(centerX - eyeOffset + eyeRadius, headY);
    context.moveTo(centerX + eyeOffset - eyeRadius, headY);
    context.lineTo(centerX + eyeOffset + eyeRadius, headY);
    context.lineWidth = 2;
    context.strokeStyle = "#2b2b2b";
    context.stroke();
  } else {
    context.beginPath();
    context.arc(centerX - eyeOffset, headY, eyeRadius, 0, Math.PI * 2);
    context.arc(centerX + eyeOffset, headY, eyeRadius, 0, Math.PI * 2);
    context.fill();
  }

  if (isEmerson) {
    context.fillStyle = "#1a2b4c";
    context.beginPath();
    context.ellipse(centerX + width * 0.05, headY - headRadius * 0.7, width * 0.4, height * 0.12, Math.PI / 12, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(centerX + width * 0.2, headY - headRadius * 1.1, width * 0.05, 0, Math.PI * 2);
    context.fill();
  } else if (!isRodrigo) {
    context.fillStyle = hairColor;
    context.beginPath();
    context.arc(centerX, headY - headRadius * 0.2, headRadius + 2, Math.PI * 0.9, Math.PI * 2.1);
    context.fill();

    if (isCeli) {
      context.strokeStyle = "#d4dbe6";
      context.lineWidth = Math.max(1, width * 0.035);
      context.beginPath();
      context.arc(centerX, headY - headRadius * 0.23, headRadius + 1, Math.PI * 1.02, Math.PI * 1.98);
      context.stroke();
    }

    if (isJuliana || isMyllena || isViviane || isCeli) {
      drawRoundedRect(centerX - headRadius - 2, headY - height * 0.05, width * 0.15, height * 0.3, width * 0.05);
      context.fill();
      drawRoundedRect(centerX + headRadius - width * 0.15 + 2, headY - height * 0.05, width * 0.15, height * 0.3, width * 0.05);
      context.fill();
    }
  }

  context.restore();
}

function renderPreviews() {
  const previews = [
    { id: "preview-emerson", name: "Prof. Emerson" },
    { id: "preview-juliana", name: "Prof. Juliana" }
  ];

  previews.forEach(({ id, name }) => {
    const previewCanvas = document.getElementById(id);
    const previewContext = previewCanvas?.getContext("2d");

    if (!previewContext) {
      return;
    }

    previewContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    drawCharacter(previewContext, 3, 0, 34, 42, name);
  });
}

function renderStudentPreviews() {
  const previews = [
    { id: "student-preview-anderson", name: "Anderson" },
    { id: "student-preview-rafael", name: "Rafael" },
    { id: "student-preview-viviane", name: "Viviane" },
    { id: "student-preview-rodrigo", name: "Rodrigo" },
    { id: "student-preview-myllena", name: "Myllena" }
  ];

  previews.forEach(({ id, name }) => {
    const previewCanvas = document.getElementById(id);
    const previewContext = previewCanvas?.getContext("2d");

    if (!previewContext) {
      return;
    }

    previewContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    drawCharacter(previewContext, 3, 0, 34, 42, name);
  });
}

function addCollectibleScroll(itemId, x, y) {
  const existsInReferences = referenciasData.some((entry) => entry.id === itemId);
  const alreadyPlaced = collectibleScrolls.some((scroll) => scroll.itemId === itemId);

  if (!existsInReferences || unlockedScrolls.includes(itemId) || alreadyPlaced) {
    return;
  }

  collectibleScrolls.push(new CollectibleScroll(x, y, itemId));
}

function addReferenceScrollForLevel(level) {
  const positions = {
    1: { x: 502, y: 140 },
    2: { x: 830, y: 162 },
    3: { x: 568, y: 164 },
    4: { x: 842, y: 180 },
    5: { x: 838, y: 170 },
    6: { x: 468, y: 310 },
    7: { x: 540, y: 198 },
    8: { x: 158, y: 450 },
    9: { x: 612, y: 206 }
  };
  const position = positions[level];

  if (!position) {
    return;
  }

  addCollectibleScroll(level, position.x, position.y);
}

function unlockScroll(itemId) {
  if (!unlockedScrolls.includes(itemId)) {
    unlockedScrolls.push(itemId);
  }
}

function renderGlossary() {
  glossaryContent.innerHTML = "";

  referenciasData.forEach((entry) => {
    const article = document.createElement("article");
    const isUnlocked = unlockedScrolls.includes(entry.id);
    article.className = `glossary-entry${isUnlocked ? "" : " is-locked"}`;

    const title = document.createElement("h3");

    if (isUnlocked) {
      const author = document.createElement("p");
      title.textContent = entry.titulo;
      author.className = "glossary-author";
      author.textContent = entry.autor;
      article.append(title, author);
    } else {
      title.textContent = `Refer\u00eancia Bloqueada - Explore a Fase ${entry.id}`;
      article.append(title);
    }

    glossaryContent.appendChild(article);
  });
}

function openGlossary(fromGame = false) {
  if (fromGame && (!gameStarted || gameEnded || cutsceneActive)) {
    return;
  }

  glossaryOpenedInGame = fromGame;

  if (fromGame) {
    clearAllInput(true);
    setMobileControlsVisible(false);
    pauseGameLoop();
  }

  renderGlossary();
  glossaryModal.style.display = "flex";
  glossaryCloseButton.focus();
}

function closeGlossary() {
  glossaryModal.style.display = "none";

  if (glossaryOpenedInGame) {
    glossaryOpenedInGame = false;
    canvas.focus();
    lastTime = performance.now();
    startGameLoop();
    return;
  }

  glossaryButton.focus();
}

function pauseGameLoop() {
  setMobileControlsVisible(false);

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function setInGameGlossaryVisible(visible) {
  inGameGlossaryButton.classList.toggle("is-visible", visible);
}

function setTouchButtonPressed(control, pressed) {
  const button = touchButtons[control];

  if (!button) {
    return;
  }

  button.classList.toggle("is-active", pressed);
  button.setAttribute("aria-pressed", String(pressed));
}

function updateTouchButtonState(control) {
  setTouchButtonPressed(control, touchInput[control].size > 0);
}

function cutPlayerJump() {
  if (player && player.vy < -180) {
    player.vy *= 0.5;
  }
}

function clearTouchInput() {
  touchInput.left.clear();
  touchInput.right.clear();
  touchInput.jump.clear();
  touchJumpRequestUntil = 0;
  updateTouchButtonState("left");
  updateTouchButtonState("right");
  updateTouchButtonState("jump");
}

function clearAllInput(cutJump = false) {
  const hadKeyboardJump = keys.has("arrowup") || keys.has("w") || keys.has(" ");

  keys.clear();
  clearTouchInput();

  if (cutJump && hadKeyboardJump) {
    cutPlayerJump();
  }
}

function canShowMobileControlsInViewport() {
  return (
    window.matchMedia("(pointer: coarse) and (orientation: landscape)").matches ||
    window.matchMedia("(orientation: landscape) and (max-width: 1024px) and (max-height: 500px)").matches
  );
}

function setMobileControlsVisible(visible) {
  if (!mobileControls) {
    return;
  }

  const shouldShow = visible && canShowMobileControlsInViewport();

  mobileControls.classList.toggle("is-visible", shouldShow);
  mobileControls.setAttribute("aria-hidden", String(!shouldShow));

  if (!shouldShow) {
    clearTouchInput();
  }
}

function refreshMobileControlsVisibility() {
  const gameplaySurfaceActive = (
    gameStarted &&
    !gameEnded &&
    !cutsceneActive &&
    glossaryModal.style.display !== "flex" &&
    termsModal.style.display !== "flex" &&
    studentSelectionScreen.style.display !== "flex" &&
    victoryOverlay.style.display !== "flex" &&
    defeatOverlay.style.display !== "flex" &&
    graduationScreen.style.display !== "flex"
  );

  setMobileControlsVisible(gameplaySurfaceActive);
}

const PHYSICS = {
  gravity: 2200,
  moveAcceleration: 5200,
  maxSpeed: 320,
  groundFriction: 4200,
  airFriction: 900,
  jumpVelocity: -760,
  coyoteTime: 0.08,
  jumpBuffer: 0.1
};

const COOKIE_TRACKING_VALUE = 15;
const DRONE_TRACKING_VALUE = 30;
const SMART_SPEAKER_DRAIN_PER_SECOND = 24;
const PLAYER_INVULNERABLE_TIME = 1.4;
const DRONE_KNOCKBACK_X = 440;
const DRONE_KNOCKBACK_Y = -360;
const IDLE_QUOTE_DELAY = 4;
const IDLE_QUOTE_DURATION = 3.5;
const TOUCH_JUMP_REQUEST_MS = 180;
const QUALIFICATION_STUDENT_TEXT = "O momento mais temido chegou: A Banca de Qualifica\u00e7\u00e3o! Cada professor exige um conceito espec\u00edfico. Navegue pela sala, encontre as teorias corretas e entregue-as aos avaliadores correspondentes. Cuidado para n\u00e3o errar o autor na frente da banca!";
const FINAL_DEFENSE_STUDENT_TEXT = "A Defesa Final! A banca est\u00e1 implac\u00e1vel. Sobreviva \u00e0s cr\u00edticas, navegue pelo racioc\u00ednio inst\u00e1vel e entregue os 4 cap\u00edtulos finais da sua pesquisa!";

const keys = new Set();
const touchInput = {
  left: new Set(),
  right: new Set(),
  jump: new Set()
};
let touchJumpRequestUntil = 0;
const touchButtons = {
  left: btnLeft,
  right: btnRight,
  jump: btnJump
};
let player = null;
let currentLevel = 1;
let gameStarted = false;
let gameEnded = false;
let animationFrameId = null;
let currentCharacter = null;
let currentCharacterKey = "emerson";
let pendingCharacter = null;
let pendingCharacterKey = "emerson";
let pendingStudentLevel = 7;
let glossaryOpenedInGame = false;
let skipBossCutsceneForTest = false;
let lastGameResult = null;
let lastTime = 0;
let elapsed = 0;
let nivelDeRastreamento = 0;
let privacy = 100;
let unlockedScrolls = [];
let statusMessage = "";
let statusTimer = 0;
let idleTimer = 0;
let idleQuoteTimer = 0;
let currentIdleQuote = "";
let levelTitle = "VALE DO FEED";
let playerStart = { x: 36, y: 438 };
let platforms = [];
let cookies = [];
let collectibleScrolls = [];
let conceptItems = [];
let professorNPCs = [];
let iceBlock = null;
let critiqueProjectiles = [];
let thesisChapters = [];
let researchDesk = null;
let masterDiploma = null;
let drones = [];
let vacuums = [];
let smartSpeakers = [];
let books = [];
let allyNPC = null;
let exitDoor = null;
let digitalRain = null;
let bossCamera = null;
let cutsceneActive = false;
let cutsceneIndex = 0;
let cutsceneDialogues = [];

class DigitalRain {
  constructor(width, height, fontSize = 16) {
    this.width = width;
    this.height = height;
    this.fontSize = fontSize;
    this.characters = "01";
    this.columns = Math.ceil(width / fontSize);
    this.drops = Array.from({ length: this.columns }, () => Math.random() * -height);
  }

  reset() {
    this.drops = Array.from({ length: this.columns }, () => Math.random() * -this.height);
  }

  draw(context) {
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, this.width, this.height);

    context.font = `${this.fontSize}px Consolas, monospace`;
    context.fillStyle = "#39ff14";
    context.shadowColor = "rgba(57, 255, 20, 0.65)";
    context.shadowBlur = 8;

    for (let index = 0; index < this.columns; index += 1) {
      const character = this.characters[Math.floor(Math.random() * this.characters.length)];
      const x = index * this.fontSize;
      const y = this.drops[index];

      context.fillText(character, x, y);
      this.drops[index] += this.fontSize;

      if (this.drops[index] > this.height + Math.random() * 900) {
        this.drops[index] = 0;
      }
    }

    context.shadowBlur = 0;
  }
}

class Plataforma {
  constructor(x, y, width, height, variant = "floating") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.variant = variant;
  }

  isSolid() {
    return true;
  }

  draw(context) {
    const isTechno = this.variant === "techno" || this.variant === "techno-safe";
    const isFurniture = this.variant === "furniture";
    const isGround = this.variant === "ground";

    // Pastel / Google Doodle palettes for environments
    const baseColor = isGround
      ? "#f4ead7" // pastel sand
      : isTechno
        ? "#ffdca3" // warm pastel techno
        : isFurniture
        ? "#d9c5b2" // soft wood
        : "#c4d8e2"; // soft pastel blueish

    const shadowColor = isGround
      ? "#e0cdaf"
      : isTechno
        ? "#e6b981"
        : isFurniture
        ? "#ba9e83"
        : "#a3bcc9";

    context.save();
    
    // Add soft drop shadow for floating elements
    if (!isGround) {
      context.shadowColor = "rgba(0, 0, 0, 0.12)";
      context.shadowBlur = 12;
      context.shadowOffsetY = 6;
    }

    // Draw main body with rounded corners
    context.fillStyle = baseColor;
    context.beginPath();
    if (typeof roundRect === 'function') {
      roundRect(context, this.x, this.y, this.width, this.height, isGround ? 0 : 12);
    } else {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    context.fill();

    // Reset shadow for details
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetY = 0;

    // Draw bottom edge to give a slight 3D Flat thickness
    context.fillStyle = shadowColor;
    context.beginPath();
    if (typeof roundRect === 'function' && !isGround) {
      // Small trick: we can just draw a rounded rect at the bottom and the top overlaps it, 
      // but since we draw on top it's easier to just clip or overlap. Here we just draw a small rect at the bottom.
      roundRect(context, this.x, this.y + this.height - 8, this.width, 8, 8);
    } else {
      context.fillRect(this.x, this.y + this.height - 8, this.width, 8);
    }
    context.fill();
    
    // Top highlight line for "juice" and depth
    context.fillStyle = "rgba(255, 255, 255, 0.4)";
    context.fillRect(this.x + (isGround ? 0 : 10), this.y + 2, this.width - (isGround ? 0 : 20), 4);

    // Cute glowing dots for techno platforms
    if (isTechno) {
      context.fillStyle = "#ffcf4a";
      for (let i = 15; i < this.width - 15; i += 30) {
        context.beginPath();
        context.arc(this.x + i, this.y + this.height / 2 - 2, 4, 0, Math.PI * 2);
        context.fill();
      }
    }

    context.restore();
  }
}

class MovingPlatform extends Plataforma {
  constructor(x, y, width, height, options = {}) {
    super(x, y, width, height, options.variant || "techno-safe");
    this.startX = x;
    this.startY = y;
    this.rangeX = options.rangeX || 0;
    this.rangeY = options.rangeY || 0;
    this.speed = options.speed || 1;
    this.phase = options.phase || 0;
    this.timer = 0;
    this.moveX = 0;
    this.moveY = 0;
  }

  update(deltaTime) {
    const previousX = this.x;
    const previousY = this.y;
    this.timer += deltaTime * this.speed;
    this.x = this.startX + Math.sin(this.timer + this.phase) * this.rangeX;
    this.y = this.startY + Math.sin(this.timer + this.phase) * this.rangeY;
    this.moveX = this.x - previousX;
    this.moveY = this.y - previousY;
  }

  draw(context) {
    super.draw(context);
    context.save();
    context.strokeStyle = "rgba(173, 216, 230, 0.75)";
    context.lineWidth = 2;
    context.setLineDash([8, 6]);
    context.strokeRect(this.startX - this.rangeX, this.startY - this.rangeY, this.width + this.rangeX * 2, this.height + this.rangeY * 2);
    context.setLineDash([]);
    context.restore();
  }
}

class GlitchPlatform extends Plataforma {
  constructor(x, y, width, height, activeDuration = 2, inactiveDuration = 1, phase = 0) {
    super(x, y, width, height, "glitch");
    this.activeDuration = activeDuration;
    this.inactiveDuration = inactiveDuration;
    this.cycleDuration = activeDuration + inactiveDuration;
    this.timer = phase;
  }

  get isActive() {
    return this.timer % this.cycleDuration < this.activeDuration;
  }

  isSolid() {
    return this.isActive;
  }

  update(deltaTime) {
    this.timer += deltaTime;
  }

  draw(context) {
    const active = this.isActive;
    const alpha = active ? 1 : 0.18;
    const jitter = active ? Math.sin(this.timer * 30) * 1.4 : 0;

    context.save();
    context.globalAlpha = alpha;
    context.shadowColor = "lime";
    context.shadowBlur = active ? 18 : 6;
    context.strokeStyle = active ? "#39ff14" : "rgba(57, 255, 20, 0.45)";
    context.lineWidth = 2;
    context.fillStyle = active ? "rgba(8, 30, 18, 0.82)" : "rgba(8, 30, 18, 0.28)";
    context.fillRect(this.x + jitter, this.y, this.width, this.height);
    context.strokeRect(this.x + jitter, this.y, this.width, this.height);

    if (active) {
      context.fillStyle = "rgba(57, 255, 20, 0.32)";
      context.fillRect(this.x + 4 - jitter, this.y + 4, this.width - 8, 2);
      context.fillRect(this.x + this.width * 0.45, this.y + this.height - 5, this.width * 0.35, 2);
    }

    context.restore();
  }
}

class FlickeringPlatform extends Plataforma {
  constructor(x, y, width, height, activeDuration = 2.4, inactiveDuration = 1.15, phase = 0) {
    super(x, y, width, height, "techno-safe");
    this.activeDuration = activeDuration;
    this.inactiveDuration = inactiveDuration;
    this.cycleDuration = activeDuration + inactiveDuration;
    this.timer = phase;
  }

  get isActive() {
    return this.timer % this.cycleDuration < this.activeDuration;
  }

  isSolid() {
    return this.isActive;
  }

  update(deltaTime) {
    this.timer += deltaTime;
  }

  draw(context) {
    context.save();
    context.globalAlpha = this.isActive ? 1 : 0.18;
    context.shadowColor = this.isActive ? "rgba(255, 207, 74, 0.82)" : "rgba(255, 207, 74, 0.22)";
    context.shadowBlur = this.isActive ? 16 : 4;
    context.fillStyle = this.isActive ? "rgba(255, 207, 74, 0.24)" : "rgba(255, 255, 255, 0.08)";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.strokeStyle = this.isActive ? "#ffcf4a" : "rgba(255, 207, 74, 0.32)";
    context.lineWidth = 2;
    context.strokeRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}

class Cookie {
  constructor(x, y, radius = 12) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.collected = false;
    this.disabled = false;
    this.disableTimeoutId = null;
    this.pulse = Math.random() * Math.PI * 2;
  }

  get bounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }

  update(deltaTime) {
    this.pulse += deltaTime * 5;
  }

  draw(context) {
    if (this.collected) {
      return;
    }

    const glow = 0.55 + Math.sin(this.pulse) * 0.25;

    context.save();
    context.globalAlpha = this.disabled ? 0.5 : 1;
    context.shadowColor = this.disabled ? "rgba(128, 128, 128, 0.5)" : `rgba(255, 207, 74, ${glow})`;
    context.shadowBlur = this.disabled ? 4 : 18;
    context.fillStyle = this.disabled ? "rgba(128, 128, 128, 0.75)" : "#ffcf4a";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();

    context.shadowBlur = 0;
    context.fillStyle = "#8c5a19";
    context.beginPath();
    context.arc(this.x - 4, this.y - 3, 2, 0, Math.PI * 2);
    context.arc(this.x + 4, this.y + 2, 2, 0, Math.PI * 2);
    context.arc(this.x + 1, this.y - 6, 1.6, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}

class CollectibleScroll {
  constructor(x, y, itemId) {
    this.x = x;
    this.y = y;
    this.width = 28;
    this.height = 22;
    this.itemId = itemId;
    this.collected = false;
    this.pulse = Math.random() * Math.PI * 2;
  }

  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  update(deltaTime) {
    this.pulse += deltaTime * 4;
  }

  draw(context) {
    if (this.collected) {
      return;
    }

    const glow = 0.5 + Math.sin(this.pulse) * 0.25;

    context.save();
    context.shadowColor = `rgba(124, 199, 255, ${glow})`;
    context.shadowBlur = 16;
    context.fillStyle = "#e8f7ff";
    roundRect(context, this.x, this.y, this.width, this.height, 5);
    context.fill();

    context.shadowBlur = 0;
    context.strokeStyle = "#ffcf4a";
    context.lineWidth = 2;
    roundRect(context, this.x, this.y, this.width, this.height, 5);
    context.stroke();

    context.fillStyle = "#7cc7ff";
    context.fillRect(this.x + 7, this.y + 6, this.width - 14, 2);
    context.fillRect(this.x + 7, this.y + 11, this.width - 10, 2);
    context.fillRect(this.x + 7, this.y + 16, this.width - 16, 2);
    context.restore();
  }
}

class ConceptItem {
  constructor(x, y, id, color, name) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.width = 30;
    this.height = 22;
    this.id = id;
    this.color = color;
    this.name = name;
    this.collected = false;
    this.floatTimer = Math.random() * Math.PI * 2;
  }

  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  resetToStart() {
    this.x = this.startX;
    this.y = this.startY;
    this.collected = false;
  }

  update(deltaTime) {
    this.floatTimer += deltaTime * 3;
  }

  draw(context, x = this.x, y = this.y, scale = 1, forceVisible = false) {
    if (this.collected && !forceVisible) {
      return;
    }

    const bob = Math.sin(this.floatTimer) * 2 * scale;
    const width = this.width * scale;
    const height = this.height * scale;

    context.save();
    context.shadowColor = this.color;
    context.shadowBlur = 14 * scale;
    context.fillStyle = this.color;
    roundRect(context, x, y + bob, width, height, 4 * scale);
    context.fill();

    context.shadowBlur = 0;
    context.fillStyle = "rgba(255, 255, 255, 0.72)";
    context.fillRect(x + width * 0.22, y + bob + height * 0.18, width * 0.1, height * 0.64);
    context.fillRect(x + width * 0.42, y + bob + height * 0.25, width * 0.42, height * 0.12);
    context.fillRect(x + width * 0.42, y + bob + height * 0.5, width * 0.34, height * 0.12);

    context.strokeStyle = "rgba(0, 0, 0, 0.36)";
    context.lineWidth = Math.max(1, 1.5 * scale);
    roundRect(context, x, y + bob, width, height, 4 * scale);
    context.stroke();
    context.restore();
  }
}

class ThesisChapter extends ConceptItem {
  constructor(x, y, id, name) {
    const colors = ["#ffcf4a", "#7cc7ff", "#ff7a7a", "#c23bff"];
    super(x, y, id, colors[(id - 1) % colors.length], name);
    this.width = 32;
    this.height = 24;
  }
}

class CritiqueProjectile {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.radius = 7;
    this.vx = vx;
    this.vy = vy;
    this.active = true;
  }

  get bounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }

  update(deltaTime) {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;

    if (this.x < -40 || this.x > WIDTH + 40 || this.y < -40 || this.y > HEIGHT + 80) {
      this.active = false;
    }
  }

  draw(context) {
    if (!this.active) {
      return;
    }

    context.save();
    context.shadowColor = "rgba(255, 64, 64, 0.9)";
    context.shadowBlur = 14;
    context.fillStyle = "#ff4040";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.shadowBlur = 0;
    context.fillStyle = "#ffffff";
    context.font = "700 10px Inter, Segoe UI, Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("?", this.x, this.y + 0.5);
    context.restore();
  }
}

class ResearchDesk {
  constructor(x, y, width = 132, height = 34) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.deliveredCount = 0;
  }

  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  draw(context) {
    context.save();
    context.fillStyle = "#6d4c32";
    roundRect(context, this.x, this.y, this.width, this.height, 6);
    context.fill();
    context.fillStyle = "#d8b17d";
    context.fillRect(this.x + 10, this.y + 8, this.width - 20, 5);
    context.fillStyle = "#f5f7fb";
    context.font = "700 10px Inter, Segoe UI, Arial";
    context.textAlign = "center";
    context.fillText(`Capitulos: ${this.deliveredCount}/4`, this.x + this.width / 2, this.y + 24);
    context.restore();
  }
}

class MasterDiploma {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 54;
    this.height = 36;
    this.pulse = 0;
  }

  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  update(deltaTime) {
    this.pulse += deltaTime * 4;
  }

  draw(context) {
    const bob = Math.sin(this.pulse) * 3;
    context.save();
    context.shadowColor = "rgba(255, 207, 74, 0.85)";
    context.shadowBlur = 22;
    context.fillStyle = "#fff4cf";
    roundRect(context, this.x, this.y + bob, this.width, this.height, 8);
    context.fill();
    context.shadowBlur = 0;
    context.strokeStyle = "#b68a23";
    context.lineWidth = 2;
    roundRect(context, this.x, this.y + bob, this.width, this.height, 8);
    context.stroke();
    context.fillStyle = "#d62020";
    context.fillRect(this.x + this.width / 2 - 4, this.y + bob, 8, this.height);
    context.beginPath();
    context.arc(this.x + this.width / 2, this.y + bob + this.height / 2, 8, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}

class ProfessorNPC {
  constructor(x, y, characterName, requiredConceptId, options = {}) {
    this.x = x;
    this.y = y;
    this.width = 34;
    this.height = 54;
    this.characterName = characterName;
    this.requiredConceptId = requiredConceptId;
    this.isSatisfied = false;
    this.shootsCritiques = options.shootsCritiques || false;
    this.projectileDirection = options.projectileDirection || 1;
    this.projectileCooldown = options.projectileCooldown || 2.4;
    this.projectileTimer = options.initialDelay || Math.random() * this.projectileCooldown;
  }

  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  update(deltaTime) {
    if (!this.shootsCritiques || gameEnded) {
      return;
    }

    this.projectileTimer -= deltaTime;

    if (this.projectileTimer > 0) {
      return;
    }

    this.projectileTimer = this.projectileCooldown;
    const startX = this.x + this.width / 2;
    const startY = this.y + 18;
    const vx = this.projectileDirection * (145 + Math.random() * 45);
    const vy = 38 + Math.random() * 38;
    critiqueProjectiles.push(new CritiqueProjectile(startX, startY, vx, vy));
  }

  draw(context) {
    context.save();
    context.globalAlpha = this.isSatisfied ? 0.92 : 1;
    drawCharacter(context, this.x, this.y, this.width, this.height, this.characterName);
    context.restore();

    if (this.isSatisfied) {
      context.save();
      context.fillStyle = "#48d17c";
      context.strokeStyle = "#0a3d21";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(this.x + this.width / 2, this.y - 9, 10, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.strokeStyle = "#ffffff";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(this.x + this.width / 2 - 5, this.y - 9);
      context.lineTo(this.x + this.width / 2 - 1, this.y - 5);
      context.lineTo(this.x + this.width / 2 + 6, this.y - 13);
      context.stroke();
      context.restore();
    }

    this.drawNameLabel(context);
  }

  drawNameLabel(context) {
    const label = this.characterName;
    const labelY = Math.min(HEIGHT - 10, this.y + this.height + 14);

    context.save();
    context.font = "700 10px Inter, Segoe UI, Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";

    const labelWidth = Math.min(88, context.measureText(label).width + 12);
    const labelX = clamp(this.x + this.width / 2 - labelWidth / 2, 6, WIDTH - labelWidth - 6);

    context.fillStyle = "rgba(8, 10, 14, 0.78)";
    context.strokeStyle = this.isSatisfied ? "rgba(72, 209, 124, 0.78)" : "rgba(255, 207, 74, 0.42)";
    context.lineWidth = 1;
    roundRect(context, labelX, labelY - 9, labelWidth, 18, 6);
    context.fill();
    context.stroke();

    context.fillStyle = this.isSatisfied ? "#b8ffd1" : "#f5f7fb";
    context.fillText(label, labelX + labelWidth / 2, labelY);
    context.restore();
  }
}

class PatrolEnemy {
  constructor(platform, offsetX, width, height, speed = 85, direction = 1, patrolPadding = 14) {
    this.platform = platform;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = direction;
    this.initialDirection = direction;
    this.patrolPadding = patrolPadding;
    this.pulse = Math.random() * Math.PI * 2;
    this.disabled = false;
    this.disableTimeoutId = null;

    this.calculatePatrolBounds();
    this.initialX = clamp(platform.x + offsetX, this.minX, this.maxX);
    this.x = this.initialX;
    this.y = this.getYPosition();
  }

  calculatePatrolBounds() {
    this.minX = this.platform.x + this.patrolPadding;
    this.maxX = Math.max(
      this.minX,
      this.platform.x + this.platform.width - this.patrolPadding - this.width
    );
  }

  reset() {
    this.x = this.initialX;
    this.y = this.getYPosition();
    this.direction = this.initialDirection;
    this.pulse = Math.random() * Math.PI * 2;
    this.disabled = false;
  }

  getYPosition() {
    return this.platform.y - this.height - 8;
  }

  update(deltaTime) {
    this.pulse += deltaTime * 8;

    if (this.disabled) {
      return;
    }

    this.x += this.direction * this.speed * deltaTime;

    // A patrulha usa os limites reais da plataforma. Ao tocar a borda
    // segura, o drone inverte a direcao e cria o padrao de ir e voltar.
    if (this.x <= this.minX) {
      this.x = this.minX;
      this.direction = 1;
    } else if (this.x >= this.maxX) {
      this.x = this.maxX;
      this.direction = -1;
    }
  }
}

class Drone extends PatrolEnemy {
  constructor(platform, offsetX, speed = 85, direction = 1, patrolPadding = 14) {
    super(platform, offsetX, 38, 24, speed, direction, patrolPadding);
  }

  draw(context) {
    const eyeX = this.direction > 0 ? 25 : 13;
    const glow = 0.45 + Math.sin(this.pulse) * 0.18;

    context.save();
    context.translate(this.x, this.y);
    context.globalAlpha = this.disabled ? 0.5 : 1;

    context.fillStyle = this.disabled ? "rgba(128, 128, 128, 0.18)" : `rgba(255, 82, 82, ${glow * 0.24})`;
    context.beginPath();
    context.moveTo(eyeX, 12);
    context.lineTo(this.direction > 0 ? 72 : -34, -4);
    context.lineTo(this.direction > 0 ? 72 : -34, 28);
    context.closePath();
    context.fill();

    context.shadowColor = this.disabled ? "rgba(128, 128, 128, 0.5)" : `rgba(255, 82, 82, ${glow})`;
    context.shadowBlur = this.disabled ? 4 : 14;
    context.fillStyle = this.disabled ? "rgba(128, 128, 128, 0.8)" : "#e53935";
    roundRect(context, 0, 0, this.width, this.height, 7);
    context.fill();

    context.shadowBlur = 0;
    context.fillStyle = this.disabled ? "rgba(220, 220, 220, 0.65)" : "#f5f7fb";
    context.beginPath();
    context.arc(eyeX, 12, 7, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#101317";
    context.beginPath();
    context.arc(eyeX + this.direction * 2, 12, 3, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#7b1f1f";
    context.fillRect(6, 24, 5, 5);
    context.fillRect(27, 24, 5, 5);

    context.restore();
  }
}

class VacuumRobot extends PatrolEnemy {
  constructor(platform, offsetX, speed = 68, direction = 1, patrolPadding = 18) {
    super(platform, offsetX, 50, 18, speed, direction, patrolPadding);
  }

  getYPosition() {
    return this.platform.y - this.height - 2;
  }

  draw(context) {
    const lightX = this.direction > 0 ? 38 : 12;
    const glow = 0.5 + Math.sin(this.pulse) * 0.25;

    context.save();
    context.translate(this.x, this.y);
    context.globalAlpha = this.disabled ? 0.5 : 1;

    context.shadowColor = this.disabled ? "rgba(128, 128, 128, 0.5)" : `rgba(94, 255, 147, ${glow})`;
    context.shadowBlur = this.disabled ? 3 : 10;
    context.fillStyle = this.disabled ? "rgba(128, 128, 128, 0.82)" : "#d7dde4";
    roundRect(context, 0, 0, this.width, this.height, 9);
    context.fill();

    context.shadowBlur = 0;
    context.fillStyle = "#8d98a5";
    context.fillRect(10, 4, 30, 3);

    context.fillStyle = this.disabled ? "rgba(210, 210, 210, 0.7)" : "#45f08d";
    context.beginPath();
    context.arc(lightX, 10, 4, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#59616b";
    context.fillRect(8, 16, 8, 4);
    context.fillRect(34, 16, 8, 4);

    context.restore();
  }
}

class SmartSpeaker {
  constructor(x, y, minRadius = 22, maxRadius = 88, phase = 0) {
    this.x = x;
    this.y = y;
    this.width = 28;
    this.height = 40;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.phase = phase;
    this.timer = phase;
    this.wasExpanded = this.isExpanded();
    this.disabled = false;
    this.disableTimeoutId = null;
  }

  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  get waveRatio() {
    return (Math.sin(this.timer) + 1) / 2;
  }

  get currentRadius() {
    return this.minRadius + this.waveRatio * (this.maxRadius - this.minRadius);
  }

  isExpanded() {
    return this.waveRatio > 0.48;
  }

  reset() {
    this.timer = this.phase;
    this.wasExpanded = this.isExpanded();
    this.disabled = false;
  }

  update(deltaTime) {
    if (this.disabled) {
      return;
    }

    const wasExpandedBeforeUpdate = this.wasExpanded;
    this.timer += deltaTime * 2.8;
    const expandedNow = this.isExpanded();

    if (!wasExpandedBeforeUpdate && expandedNow) {
      audioManager.playSonar();
    }

    this.wasExpanded = expandedNow;
  }

  draw(context) {
    if (this.disabled) {
      context.save();
      context.globalAlpha = 0.5;
      context.fillStyle = "rgba(128, 128, 128, 0.75)";
      roundRect(context, this.x, this.y, this.width, this.height, 8);
      context.fill();
      context.restore();
      return;
    }

    const radius = this.currentRadius;
    const active = this.isExpanded();

    context.save();
    context.strokeStyle = active ? "rgba(120, 190, 255, 0.34)" : "rgba(120, 190, 255, 0.13)";
    context.fillStyle = active ? "rgba(120, 190, 255, 0.08)" : "rgba(120, 190, 255, 0.03)";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(this.centerX, this.centerY, radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.shadowColor = active ? "rgba(120, 190, 255, 0.55)" : "rgba(120, 190, 255, 0.25)";
    context.shadowBlur = active ? 16 : 8;
    context.fillStyle = "#202833";
    roundRect(context, this.x, this.y, this.width, this.height, 8);
    context.fill();

    context.shadowBlur = 0;
    context.fillStyle = "#7cc7ff";
    context.beginPath();
    context.arc(this.centerX, this.y + 12, 5, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = "rgba(255, 255, 255, 0.35)";
    context.lineWidth = 1;
    context.beginPath();
    context.arc(this.centerX, this.y + 27, 8, 0, Math.PI * 2);
    context.stroke();

    context.restore();
  }
}

class Book {
  constructor(x, y, target) {
    this.x = x;
    this.y = y;
    this.width = 18;
    this.height = 10;
    this.target = target;
    this.speed = 430;
    this.active = true;
    this.lifeTimer = 1.2;

    const targetCenter = getThreatCenter(target);
    const directionX = targetCenter.x - x;
    const directionY = targetCenter.y - y;
    const length = Math.hypot(directionX, directionY) || 1;

    this.vx = (directionX / length) * this.speed;
    this.vy = (directionY / length) * this.speed;
  }

  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  update(deltaTime) {
    if (!this.active) {
      return;
    }

    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.lifeTimer -= deltaTime;

    if (this.lifeTimer <= 0 || this.x < -40 || this.x > WIDTH + 40 || this.y < -40 || this.y > HEIGHT + 40) {
      this.active = false;
      return;
    }

    if (this.target && isThreatActive(this.target) && rectsOverlap(this.bounds, getThreatBounds(this.target))) {
      disableThreatTemporarily(this.target);
      this.active = false;
    }
  }

  draw(context) {
    if (!this.active) {
      return;
    }

    context.save();
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate(Math.atan2(this.vy, this.vx));
    context.fillStyle = "#8a5a2b";
    context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    context.fillStyle = "#f3ead7";
    context.fillRect(-this.width / 2 + 3, -this.height / 2 + 2, this.width - 6, this.height - 4);
    context.restore();
  }
}

class AllyNPC {
  constructor(x, y, options = {}) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 54;
    this.name = options.name || "Prof. Celi";
    this.color = options.color || "#c23bff";
    this.quotes = options.quotes || bordoesCeli;
    this.variant = options.variant || "celi";
    this.shieldTimer = 0;
    this.following = false;
    this.cooldown = 0;
    this.idleTimer = 0;
    this.quoteTimer = 0;
    this.currentQuote = "";
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  update(deltaTime) {
    if (!player || gameEnded) {
      return;
    }

    this.shieldTimer = Math.max(0, this.shieldTimer - deltaTime);

    if (!this.following && distanceBetweenCenters(this, player) < 82) {
      this.following = true;
      this.currentQuote = "Pergunte ao seu orientador!";
      this.quoteTimer = 2.6;
      this.idleTimer = 0;
    }

    if (this.following) {
      const holdingShield = this.isShieldActive();
      const offsetX = player.facing >= 0 ? -54 : 54;
      const targetX = holdingShield ? this.x : clamp(player.x + offsetX, 8, WIDTH - this.width - 8);
      const targetY = clamp(player.y + player.height - this.height, 8, HEIGHT - this.height - 8);

      if (!holdingShield) {
        this.x += (targetX - this.x) * Math.min(1, deltaTime * 7);
      }
      this.y += (targetY - this.y) * Math.min(1, deltaTime * 7);
      this.cooldown = Math.max(0, this.cooldown - deltaTime);
      if (!holdingShield) {
        this.tryThrowBook();
      }
    }

    this.updateIdleQuote(deltaTime);
  }

  tryThrowBook() {
    if (this.cooldown > 0) {
      return;
    }

    const target = findNearestThreat(this.centerX, this.centerY, 300);

    if (!target) {
      return;
    }

    books.push(new Book(this.centerX, this.y + 18, target));
    this.cooldown = 2;
  }

  activateShield(duration) {
    this.following = true;
    this.shieldTimer = Math.max(this.shieldTimer, duration);
    this.currentQuote = "Fique no ponto cego!";
    this.quoteTimer = 2;
  }

  isShieldActive() {
    return this.variant === "juliana" && this.shieldTimer > 0;
  }

  getShieldBounds() {
    return {
      x: this.x - 18,
      y: this.y - 10,
      width: 68,
      height: 78
    };
  }

  updateIdleQuote(deltaTime) {
    if (this.quoteTimer > 0) {
      this.quoteTimer = Math.max(0, this.quoteTimer - deltaTime);
      return;
    }

    this.idleTimer += deltaTime;

    if (this.idleTimer >= 5) {
      this.currentQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
      this.quoteTimer = 3;
      this.idleTimer = 0;
    }
  }

  draw(context) {
    drawCharacter(context, this.x, this.y, this.width, this.height, this.name);

    if (this.isShieldActive()) {
      const shield = this.getShieldBounds();
      context.save();
      context.fillStyle = "rgba(72, 209, 124, 0.16)";
      context.strokeStyle = "rgba(72, 209, 124, 0.78)";
      context.shadowColor = "rgba(72, 209, 124, 0.7)";
      context.shadowBlur = 18;
      roundRect(context, shield.x, shield.y, shield.width, shield.height, 14);
      context.fill();
      context.stroke();
      context.restore();
    }

    this.drawQuoteBubble(context);
  }

  drawQuoteBubble(context) {
    if (!this.currentQuote || this.quoteTimer <= 0) {
      return;
    }

    drawSpeechBubble(context, this.currentQuote, this.centerX, this.y - 10, 220, "#fff0ff", "#241127");
  }
}

class BossCamera {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 116;
    this.height = 78;
    this.phase = "idle";
    this.timer = 0;
    this.attackInterval = 5;
    this.chargeDuration = 1.25;
    this.fireDuration = 1.15;
    this.laserX = WIDTH / 2 - 18;
    this.laserWidth = 36;
    this.damageCooldown = 0;
    this.patrolDirection = 1;
  }

  get eyeX() {
    return this.x + this.width / 2;
  }

  get eyeY() {
    return this.y + 38;
  }

  isCharging() {
    return this.phase === "charging";
  }

  isFiring() {
    return this.phase === "firing";
  }

  getLaserBounds() {
    return {
      x: this.laserX,
      y: 0,
      width: this.laserWidth,
      height: HEIGHT
    };
  }

  update(deltaTime) {
    this.damageCooldown = Math.max(0, this.damageCooldown - deltaTime);
    this.timer += deltaTime;

    this.x += this.patrolDirection * 36 * deltaTime;
    if (this.x < 120) {
      this.x = 120;
      this.patrolDirection = 1;
    } else if (this.x + this.width > WIDTH - 120) {
      this.x = WIDTH - 120 - this.width;
      this.patrolDirection = -1;
    }

    if (this.phase === "idle" && this.timer >= this.attackInterval) {
      this.phase = "charging";
      this.timer = 0;
      if (allyNPC && allyNPC.activateShield) {
        allyNPC.activateShield(this.chargeDuration + this.fireDuration + 0.35);
      }
      return;
    }

    if (this.phase === "charging") {
      this.laserX = clamp(this.eyeX - this.laserWidth / 2, 0, WIDTH - this.laserWidth);
      if (this.timer >= this.chargeDuration) {
        this.phase = "firing";
        this.timer = 0;
      }
      return;
    }

    if (this.phase === "firing") {
      this.checkLaserHit();
      if (this.timer >= this.fireDuration) {
        this.phase = "idle";
        this.timer = 0;
      }
    }
  }

  checkLaserHit() {
    if (!player || this.damageCooldown > 0 || isPlayerProtectedByAllyShield()) {
      return;
    }

    if (rectsOverlap(player, this.getLaserBounds())) {
      audioManager.playCollision();
      applyPrivacyDamage(40);
      statusMessage = privacy === 0 ? "Privacidade comprometida" : "Laser panoptico atingiu voce";
      statusTimer = 1.5;
      player.vx = player.x + player.width / 2 < this.eyeX ? -520 : 520;
      player.vy = -420;
      player.grounded = false;
      player.invulnerabilityTimer = PLAYER_INVULNERABLE_TIME;
      this.damageCooldown = 1.2;
    }
  }

  draw(context) {
    if (this.isFiring()) {
      const laser = this.getLaserBounds();
      context.save();
      context.fillStyle = "rgba(255, 31, 31, 0.42)";
      context.shadowColor = "rgba(255, 31, 31, 0.8)";
      context.shadowBlur = 22;
      context.fillRect(laser.x, laser.y, laser.width, laser.height);
      context.restore();
    } else if (this.isCharging()) {
      context.save();
      context.strokeStyle = "rgba(255, 64, 64, 0.35)";
      context.lineWidth = 3;
      context.setLineDash([8, 8]);
      context.beginPath();
      context.moveTo(this.eyeX, this.eyeY);
      context.lineTo(this.eyeX, HEIGHT);
      context.stroke();
      context.setLineDash([]);
      context.restore();
    }

    const chargeGlow = this.isCharging() ? 1 : this.isFiring() ? 0.85 : 0.4;
    context.save();
    context.translate(this.x, this.y);

    context.shadowColor = `rgba(255, 48, 48, ${chargeGlow})`;
    context.shadowBlur = this.isCharging() ? 26 : 14;
    context.fillStyle = "#2b2f38";
    roundRect(context, 0, 0, this.width, this.height, 14);
    context.fill();

    context.fillStyle = "#151922";
    roundRect(context, 16, 14, this.width - 32, 48, 10);
    context.fill();

    context.fillStyle = this.isCharging() || this.isFiring() ? "#ff2020" : "#a90f18";
    context.beginPath();
    context.arc(this.width / 2, 38, this.isCharging() ? 19 : 15, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#ffb3b3";
    context.beginPath();
    context.arc(this.width / 2 - 5, 34, 4, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
}

class ExitDoor {
  constructor(x, y, width = 44, height = 74) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.pulse = 0;
  }

  update(deltaTime) {
    this.pulse += deltaTime * 4;
  }

  draw(context) {
    const glow = 0.58 + Math.sin(this.pulse) * 0.18;

    context.save();
    context.shadowColor = `rgba(124, 199, 255, ${glow})`;
    context.shadowBlur = 24;

    const gradient = context.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    gradient.addColorStop(0, "#8f7dff");
    gradient.addColorStop(0.48, "#4a7dff");
    gradient.addColorStop(1, "#17265f");

    context.fillStyle = gradient;
    roundRect(context, this.x, this.y, this.width, this.height, 8);
    context.fill();

    context.shadowBlur = 0;
    context.strokeStyle = "rgba(255, 255, 255, 0.7)";
    context.lineWidth = 2;
    roundRect(context, this.x + 7, this.y + 8, this.width - 14, this.height - 16, 6);
    context.stroke();

    context.fillStyle = "#d9f2ff";
    context.beginPath();
    context.arc(this.x + this.width - 13, this.y + this.height / 2, 3, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
}

class IceBlock {
  constructor(x, y, size = 60) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
    this.vx = 0;
    this.vy = 0;
    this.color = "rgba(173, 216, 230, 0.8)";
    this.meltRate = 4.4;
    this.grounded = false;
    this.supportPlatform = null;
  }

  update(deltaTime) {
    this.width = Math.max(0, this.width - this.meltRate * deltaTime);
    this.height = Math.max(0, this.height - this.meltRate * deltaTime);
    this.vy += PHYSICS.gravity * deltaTime;

    if (this.supportPlatform instanceof MovingPlatform) {
      this.x += this.supportPlatform.moveX;
      this.y += this.supportPlatform.moveY;
    }

    const previousX = this.x;
    this.x += this.vx * deltaTime;
    this.resolveHorizontalCollisions(previousX);
    this.x = clamp(this.x, 0, WIDTH - this.width);

    const previousY = this.y;
    this.y += this.vy * deltaTime;
    this.resolveVerticalCollisions(previousY);
    this.vx *= this.grounded ? 0.82 : 0.96;
  }

  resolveHorizontalCollisions(previousX) {
    for (const platform of platforms) {
      if (!platform.isSolid() || !rectsOverlap(this, platform)) {
        continue;
      }

      const previousRight = previousX + this.width;

      if (previousRight <= platform.x) {
        this.x = platform.x - this.width;
      } else if (previousX >= platform.x + platform.width) {
        this.x = platform.x + platform.width;
      }

      this.vx = 0;
    }
  }

  resolveVerticalCollisions(previousY) {
    this.grounded = false;
    this.supportPlatform = null;

    for (const platform of platforms) {
      if (!platform.isSolid() || !rectsOverlap(this, platform)) {
        continue;
      }

      const previousBottom = previousY + this.height;
      const previousTop = previousY;

      if (previousBottom <= platform.y) {
        this.y = platform.y - this.height;
        this.vy = 0;
        this.grounded = true;
        this.supportPlatform = platform;
      } else if (previousTop >= platform.y + platform.height) {
        this.y = platform.y + platform.height;
        this.vy = 0;
      }
    }
  }

  isMelted() {
    return this.width <= 5 || this.height <= 5;
  }

  isLost() {
    return this.y > HEIGHT + 40 || this.x + this.width < -20 || this.x > WIDTH + 20;
  }

  draw(context) {
    context.save();
    context.shadowColor = "rgba(173, 216, 230, 0.72)";
    context.shadowBlur = 18;
    context.fillStyle = this.color;
    roundRect(context, this.x, this.y, this.width, this.height, 8);
    context.fill();

    context.shadowBlur = 0;
    context.strokeStyle = "rgba(230, 248, 255, 0.9)";
    context.lineWidth = 2;
    roundRect(context, this.x, this.y, this.width, this.height, 8);
    context.stroke();

    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.fillRect(this.x + this.width * 0.18, this.y + this.height * 0.2, this.width * 0.34, Math.max(2, this.height * 0.06));
    context.fillRect(this.x + this.width * 0.2, this.y + this.height * 0.34, this.width * 0.18, Math.max(2, this.height * 0.05));
    context.restore();
  }
}

class Player {
  constructor(character) {
    this.character = character;
    this.width = 34;
    this.height = 54;
    this.x = playerStart.x;
    this.y = playerStart.y;
    this.vx = 0;
    this.vy = 0;
    this.grounded = false;
    this.facing = 1;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
    this.invulnerabilityTimer = 0;
    this.carriedConcept = null;
    this.carriedChapter = null;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  update(deltaTime) {
    const inputDirection = Number(isRightPressed()) - Number(isLeftPressed());
    const previousX = this.x;
    const previousY = this.y;

    this.invulnerabilityTimer = Math.max(0, this.invulnerabilityTimer - deltaTime);

    if (inputDirection !== 0) {
      this.vx += inputDirection * PHYSICS.moveAcceleration * deltaTime;
      this.facing = inputDirection;
    } else {
      this.applyFriction(deltaTime);
    }

    this.vx = clamp(this.vx, -PHYSICS.maxSpeed, PHYSICS.maxSpeed);

    if (wasJumpRequested()) {
      this.jumpBufferTimer = PHYSICS.jumpBuffer;
    } else {
      this.jumpBufferTimer = Math.max(0, this.jumpBufferTimer - deltaTime);
    }

    this.coyoteTimer = this.grounded
      ? PHYSICS.coyoteTime
      : Math.max(0, this.coyoteTimer - deltaTime);

    // Gravidade continua: a velocidade vertical cresce a cada frame,
    // criando queda acelerada independente da taxa de quadros.
    this.vy += PHYSICS.gravity * deltaTime;

    // Jump buffer + coyote time deixam o pulo responsivo sem permitir
    // pulo infinito: o salto so ocorre se o jogador ainda estiver no chao
    // ou dentro da pequena janela logo apos sair de uma plataforma.
    if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
      this.vy = PHYSICS.jumpVelocity;
      this.grounded = false;
      this.coyoteTimer = 0;
      this.jumpBufferTimer = 0;
    }

    this.x += this.vx * deltaTime;
    this.resolveHorizontalCollisions(previousX);
    this.x = clamp(this.x, 0, WIDTH - this.width);

    this.y += this.vy * deltaTime;
    this.resolveVerticalCollisions(previousY);

    if (this.y > HEIGHT + 80) {
      this.x = playerStart.x;
      this.y = playerStart.y;
      this.vx = 0;
      this.vy = 0;
      this.invulnerabilityTimer = 0;
    }
  }

  takeDroneHit(drone) {
    const playerCenter = this.x + this.width / 2;
    const droneCenter = drone.x + drone.width / 2;
    const knockbackDirection = playerCenter < droneCenter ? -1 : 1;

    this.vx = knockbackDirection * DRONE_KNOCKBACK_X;
    this.vy = DRONE_KNOCKBACK_Y;
    this.grounded = false;
    this.invulnerabilityTimer = PLAYER_INVULNERABLE_TIME;
  }

  isInvulnerable() {
    return this.invulnerabilityTimer > 0;
  }

  applyFriction(deltaTime) {
    const friction = this.grounded ? PHYSICS.groundFriction : PHYSICS.airFriction;
    if (Math.abs(this.vx) <= friction * deltaTime) {
      this.vx = 0;
      return;
    }

    this.vx -= Math.sign(this.vx) * friction * deltaTime;
  }

  resolveHorizontalCollisions(previousX) {
    for (const platform of platforms) {
      if (!platform.isSolid() || !rectsOverlap(this, platform)) {
        continue;
      }

      const previousRight = previousX + this.width;
      const previousLeft = previousX;

      if (previousRight <= platform.x) {
        this.x = platform.x - this.width;
      } else if (previousLeft >= platform.x + platform.width) {
        this.x = platform.x + platform.width;
      }

      this.vx = 0;
    }
  }

  resolveVerticalCollisions(previousY) {
    this.grounded = false;

    for (const platform of platforms) {
      if (!platform.isSolid() || !rectsOverlap(this, platform)) {
        continue;
      }

      const previousBottom = previousY + this.height;
      const previousTop = previousY;

      if (previousBottom <= platform.y) {
        this.y = platform.y - this.height;
        this.vy = 0;
        this.grounded = true;
      } else if (previousTop >= platform.y + platform.height) {
        this.y = platform.y + platform.height;
        this.vy = 0;
      }
    }
  }

  draw(context) {
    context.save();
    context.globalAlpha = this.isInvulnerable() && Math.floor(elapsed * 18) % 2 === 0 ? 0.35 : 1;
    drawCharacter(context, this.x, this.y, this.width, this.height, this.character.name);

    if (this.carriedConcept) {
      this.carriedConcept.draw(
        context,
        this.x + this.width / 2 - 11,
        this.y - 28,
        0.74,
        true
      );
    }

    if (this.carriedChapter) {
      this.carriedChapter.draw(
        context,
        this.x + this.width / 2 - 12,
        this.y - 30,
        0.78,
        true
      );
    }

    context.restore();
  }
}

loadLevel(currentLevel);
renderPreviews();
renderStudentPreviews();

function pressTouchControl(control, pointerId) {
  touchInput[control].add(pointerId);

  if (control === "jump") {
    touchJumpRequestUntil = Math.max(
      touchJumpRequestUntil,
      performance.now() + TOUCH_JUMP_REQUEST_MS
    );
  }

  updateTouchButtonState(control);
}

function releaseTouchControl(control, pointerId) {
  touchInput[control].delete(pointerId);
  updateTouchButtonState(control);
}

function bindTouchControl(button, control) {
  if (!button) {
    return;
  }

  button.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    event.preventDefault();
    button.setPointerCapture?.(event.pointerId);
    pressTouchControl(control, event.pointerId);

    if (typeof canvas.focus === "function") {
      canvas.focus({ preventScroll: true });
    }
  });

  ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
    button.addEventListener(eventName, (event) => {
      event.preventDefault();
      releaseTouchControl(control, event.pointerId);
    });
  });

  button.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

bindTouchControl(btnLeft, "left");
bindTouchControl(btnRight, "right");
bindTouchControl(btnJump, "jump");

glossaryButton.addEventListener("click", () => {
  openGlossary(false);
});

inGameGlossaryButton.addEventListener("click", () => {
  openGlossary(true);
});

if (fullscreenButton) {
  fullscreenButton.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.querySelector(".game-shell").requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
      fullscreenButton.innerText = "✖ Sair da Tela Cheia";
    } else {
      fullscreenButton.innerText = "⛶ Tela Cheia";
    }
  });
}

glossaryCloseButton.addEventListener("click", () => {
  closeGlossary();
});

document.querySelectorAll("[data-character]").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedKey = button.dataset.character;
    const selected = CHARACTERS[button.dataset.character];
    showTermsModal(selected, selectedKey);
  });
});

document.querySelectorAll("[data-student]").forEach((button) => {
  button.addEventListener("click", () => {
    startQualificationWithStudent(button.dataset.student);
  });
});

termsAcceptButton.addEventListener("click", () => {
  acceptTermsAndStart();
});

termsRejectLink.addEventListener("click", (event) => {
  event.preventDefault();
  alert("Erro: Recusa n\u00e3o lucrativa. Redirecionando para aceita\u00e7\u00e3o obrigat\u00f3ria...");
  acceptTermsAndStart();
});

nextPhaseButton.addEventListener("click", () => {
  if (lastGameResult === "victory") {
    if (currentLevel === 1) {
      currentLevel = 2;
    } else if (currentLevel === 2) {
      currentLevel = 3;
    } else if (currentLevel === 3) {
      currentLevel = 4;
    } else if (currentLevel === 4) {
      currentLevel = 5;
    } else if (currentLevel === 5) {
      currentLevel = 6;
    } else if (currentLevel === 6) {
      currentLevel = 7;
    } else if (currentLevel === 7) {
      currentLevel = 8;
    } else if (currentLevel === 8) {
      currentLevel = 9;
    }
  }

  restartLevel();
});

retryButton.addEventListener("click", () => {
  restartLevel();
});

journeyRestartButton.addEventListener("click", () => {
  window.location.href = window.location.pathname;
});

creditsButton.addEventListener("click", () => {
  alert("Creditos: jogo-prototipo academico inspirado nas discussoes sobre trabalho, educacao, controle e tecnoestetica do Programa de Disciplina.");
});

cutsceneNextButton.addEventListener("click", () => {
  advanceCutscene();
});

cutsceneUI.addEventListener("click", (event) => {
  if (event.target === cutsceneUI) {
    advanceCutscene();
  }
});

startDirectlyFromQuery();

window.addEventListener("keydown", (event) => {
  const normalized = normalizeKey(event.key);

  if (normalized === "g" && gameStarted && !gameEnded && !cutsceneActive) {
    event.preventDefault();
    if (glossaryModal.style.display === "flex") {
      closeGlossary();
    } else {
      openGlossary(true);
    }
    return;
  }

  if (glossaryModal.style.display === "flex") {
    return;
  }

  if (cutsceneActive) {
    if ([" ", "Spacebar", "Enter"].includes(event.key)) {
      event.preventDefault();
      advanceCutscene();
    }
    return;
  }

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Spacebar"].includes(event.key)) {
    event.preventDefault();
  }

  keys.add(normalized);
});

window.addEventListener("keyup", (event) => {
  const normalized = normalizeKey(event.key);
  keys.delete(normalized);

  if (glossaryModal.style.display === "flex") {
    return;
  }

  if (["arrowup", "w", " "].includes(normalized)) {
    // Corte de pulo: soltar o botao reduz a subida e da controle fino de altura.
    cutPlayerJump();
  }
});

window.addEventListener("blur", () => {
  clearAllInput(true);
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearAllInput(true);
  }
});

window.addEventListener("resize", () => {
  refreshMobileControlsVisibility();
});

function loadLevel(level) {
  platforms = [];
  cookies = [];
  collectibleScrolls = [];
  conceptItems = [];
  professorNPCs = [];
  critiqueProjectiles = [];
  thesisChapters = [];
  drones = [];
  vacuums = [];
  smartSpeakers = [];
  books = [];
  allyNPC = null;
  bossCamera = null;
  exitDoor = null;
  iceBlock = null;
  researchDesk = null;
  masterDiploma = null;

  if (level === 9) {
    loadFinalDefenseLevel();
  } else if (level === 8) {
    loadPraxisIceLevel();
  } else if (level === 7) {
    loadQualificationBoardLevel();
  } else if (level === 6) {
    loadBossFightLevel();
  } else if (level === 5) {
    loadTechnoAestheticLevel();
  } else if (level === 4) {
    loadTechnicalCultureLevel();
  } else if (level === 3) {
    loadBehavioralFuturesLevel();
  } else if (level === 2) {
    loadSmartHomeLevel();
  } else {
    loadFeedValleyLevel();
  }

  addReferenceScrollForLevel(currentLevel);
}

function loadFeedValleyLevel() {
  currentLevel = 1;
  levelTitle = "VALE DO FEED";
  playerStart = { x: 36, y: 438 };

  platforms = [
    new Plataforma(0, 492, 960, 48, "ground"),
    new Plataforma(86, 390, 176, 22),
    new Plataforma(332, 326, 150, 22),
    new Plataforma(565, 386, 180, 22),
    new Plataforma(720, 286, 142, 22),
    new Plataforma(190, 230, 126, 22),
    new Plataforma(446, 178, 136, 22)
  ];

  cookies = [
    new Cookie(154, 358),
    new Cookie(410, 294),
    new Cookie(640, 354),
    new Cookie(790, 254),
    new Cookie(247, 198),
    new Cookie(514, 146),
    new Cookie(875, 458)
  ];

  drones = [
    new Drone(platforms[4], 18, 92, 1),
    new Drone(platforms[5], 12, 76, -1),
    new Drone(platforms[6], 28, 64, 1)
  ];

  configureExitDoorForCurrentLevel();
}

function loadSmartHomeLevel() {
  currentLevel = 2;
  levelTitle = "CASA INTELIGENTE";
  playerStart = { x: 34, y: 438 };

  platforms = [
    // Chao inicial: largo e vazio para o jogador respirar antes dos riscos.
    new Plataforma(0, 492, 960, 48, "ground"),
    // Plataforma padrao com um cookie.
    new Plataforma(120, 420, 160, 22, "furniture"),
    // Mesa larga vazia: zona segura central para planejar o proximo salto.
    new Plataforma(330, 360, 270, 22, "furniture"),
    // Plataforma curta com inimigo.
    new Plataforma(690, 402, 126, 22, "furniture"),
    // Degraus superiores, alternando risco e respiro.
    new Plataforma(170, 286, 188, 22, "furniture"),
    new Plataforma(470, 246, 240, 22, "furniture"),
    new Plataforma(780, 202, 142, 22, "furniture")
  ];

  cookies = [
    new Cookie(204, 388),
    new Cookie(548, 328),
    new Cookie(835, 170),
    new Cookie(884, 458)
  ];

  vacuums = [
    new VacuumRobot(platforms[0], 520, 66, -1, 210),
    new VacuumRobot(platforms[3], 34, 56, 1)
  ];

  smartSpeakers = [
    new SmartSpeaker(238, 246, 24, 78, 0.3),
    new SmartSpeaker(558, 206, 24, 84, 2.2)
  ];

  configureExitDoorForCurrentLevel();
}

function loadBehavioralFuturesLevel() {
  currentLevel = 3;
  levelTitle = "MERCADO DE FUTUROS";
  playerStart = { x: 34, y: 438 };
  digitalRain = new DigitalRain(WIDTH, HEIGHT, 16);

  platforms = [
    // Chao inicial: rota longa e vazia para entrada no ritmo Matrix.
    new Plataforma(0, 492, 960, 48, "ground"),
    // Glitch curta: primeiro teste de timing.
    new GlitchPlatform(108, 410, 150, 18, 2.4, 1, 0),
    // Zona segura larga: respiro apos o primeiro salto.
    new Plataforma(318, 350, 280, 18, "glitch-safe"),
    // Glitch media com cookie proximo, mas nao obrigatorio.
    new GlitchPlatform(660, 308, 150, 18, 2, 1, 0.8),
    // Zona segura superior: espaco para reposicionar antes da subida final.
    new Plataforma(178, 252, 250, 18, "glitch-safe"),
    // Glitch final curta.
    new GlitchPlatform(514, 202, 142, 18, 2.2, 0.9, 1.5)
  ];

  cookies = [
    new Cookie(184, 378),
    new Cookie(730, 276),
    new Cookie(590, 170),
    new Cookie(860, 458)
  ];

  drones = [
    new Drone(platforms[5], 20, 76, -1)
  ];

  vacuums = [
    new VacuumRobot(platforms[0], 620, 72, -1, 250)
  ];

  configureExitDoorForCurrentLevel();
}

function loadTechnicalCultureLevel() {
  currentLevel = 4;
  levelTitle = "CULTURA TECNICA";
  playerStart = { x: 34, y: 438 };

  platforms = [
    // Chao inicial amplo e seguro para encontrar a Celi.
    new Plataforma(0, 492, 960, 48, "ground"),
    // Estante baixa com cookie opcional.
    new Plataforma(118, 420, 170, 22, "furniture"),
    // Zona segura larga: mesa de estudos.
    new Plataforma(338, 362, 292, 22, "furniture"),
    // Plataforma curta com ameaca.
    new Plataforma(720, 402, 136, 22, "furniture"),
    // Degraus superiores com respiro.
    new Plataforma(168, 294, 230, 22, "furniture"),
    new Plataforma(494, 240, 260, 22, "furniture"),
    new Plataforma(806, 220, 126, 22, "furniture")
  ];

  cookies = [
    new Cookie(206, 388),
    new Cookie(548, 330),
    new Cookie(860, 158),
    new Cookie(888, 458)
  ];

  drones = [
    new Drone(platforms[5], 36, 72, -1)
  ];

  vacuums = [
    new VacuumRobot(platforms[3], 36, 54, 1),
    new VacuumRobot(platforms[0], 600, 62, -1, 250)
  ];

  smartSpeakers = [
    new SmartSpeaker(224, 254, 24, 78, 0.8),
    new SmartSpeaker(592, 200, 22, 84, 2.4)
  ];

  allyNPC = new AllyNPC(92, 438);
  configureExitDoorForCurrentLevel();
}

function loadTechnoAestheticLevel() {
  currentLevel = 5;
  levelTitle = "TECNO-ESTETICA";
  playerStart = { x: 34, y: 438 };

  platforms = [
    // Fase 5: ritmo mais exigente, com menos zonas longas e mais pressao.
    new Plataforma(0, 492, 960, 48, "ground"),
    new Plataforma(112, 420, 142, 22, "techno"),
    new Plataforma(324, 366, 210, 22, "techno-safe"),
    new Plataforma(690, 410, 118, 22, "techno"),
    new Plataforma(154, 292, 170, 22, "techno"),
    new Plataforma(444, 246, 188, 22, "techno-safe"),
    new Plataforma(792, 202, 116, 22, "techno")
  ];

  cookies = [
    new Cookie(182, 388),
    new Cookie(418, 334),
    new Cookie(505, 214),
    new Cookie(848, 170),
    new Cookie(742, 378),
    new Cookie(890, 458)
  ];

  drones = [
    new Drone(platforms[4], 24, 82, 1),
    new Drone(platforms[5], 30, 84, -1),
    new Drone(platforms[6], 20, 64, 1)
  ];

  vacuums = [
    new VacuumRobot(platforms[3], 36, 54, 1),
    new VacuumRobot(platforms[0], 470, 70, -1, 300),
    new VacuumRobot(platforms[0], 740, 58, 1, 150)
  ];

  smartSpeakers = [
    new SmartSpeaker(220, 252, 24, 88, 0.8),
    new SmartSpeaker(538, 206, 22, 92, 2.4),
    new SmartSpeaker(850, 162, 22, 78, 1.6)
  ];

  allyNPC = new AllyNPC(92, 438, {
    name: "Prof. Giordano",
    color: "#4fc3ff",
    quotes: bordoesGiordano,
    variant: "giordano"
  });
  configureExitDoorForCurrentLevel();
}

function loadBossFightLevel() {
  currentLevel = 6;
  levelTitle = "PANOPTICO MECANICO";
  playerStart = { x: 42, y: 438 };
  const helperKey = currentCharacterKey === "emerson" ? "juliana" : "emerson";
  const helperCharacter = CHARACTERS[helperKey];

  platforms = [
    new Plataforma(0, 492, 960, 48, "ground"),
    new Plataforma(92, 396, 230, 22, "techno-safe"),
    new Plataforma(378, 342, 220, 22, "techno-safe"),
    new Plataforma(650, 396, 230, 22, "techno-safe"),
    new Plataforma(270, 238, 160, 20, "techno"),
    new Plataforma(536, 238, 160, 20, "techno")
  ];

  cookies = [
    new Cookie(178, 364),
    new Cookie(480, 310),
    new Cookie(746, 364)
  ];

  allyNPC = new AllyNPC(116, 438, {
    name: helperCharacter.name,
    color: helperCharacter.color,
    quotes: helperKey === "juliana" ? bordoesJuliana : bordoesEmerson,
    variant: helperKey
  });
  allyNPC.following = true;

  bossCamera = new BossCamera(WIDTH / 2 - 58, 34);
  configureExitDoorForCurrentLevel();

  if (!skipBossCutsceneForTest) {
    prepareBossCutscene(helperKey);
  }
}

function loadQualificationBoardLevel() {
  currentLevel = 7;
  levelTitle = "BANCA DE QUALIFICACAO";
  playerStart = { x: 44, y: 438 };

  platforms = [
    new Plataforma(0, 492, 960, 48, "techno-safe"),
    new Plataforma(94, 396, 210, 22, "furniture"),
    new Plataforma(378, 356, 210, 22, "techno-safe"),
    new Plataforma(666, 396, 210, 22, "furniture"),
    new Plataforma(138, 268, 190, 22, "furniture"),
    new Plataforma(410, 230, 190, 22, "techno-safe"),
    new Plataforma(692, 268, 190, 22, "furniture")
  ];

  conceptItems = [
    new ConceptItem(178, 236, 1, "#f4d35e", "Epistemologia"),
    new ConceptItem(736, 236, 2, "#7cc7ff", "O Qui-quadrado"),
    new ConceptItem(446, 198, 3, "#ff7a7a", "Sociedade de Controle"),
    new ConceptItem(484, 324, 4, "#c23bff", "Tecnoestetica")
  ];

  professorNPCs = [
    new ProfessorNPC(128, 342, "Prof. Celi", 1),
    new ProfessorNPC(724, 342, "Prof. Giordano", 2),
    new ProfessorNPC(194, 438, "Prof. Juliana", 3),
    new ProfessorNPC(790, 438, "Prof. Emerson", 4)
  ];
}

function loadPraxisIceLevel() {
  currentLevel = 8;
  levelTitle = "PARODIA DA PRAXIS";
  playerStart = { x: 42, y: 438 };

  platforms = [
    new Plataforma(0, 492, 230, 48, "ground"),
    new MovingPlatform(280, 492, 178, 22, { rangeX: 74, speed: 1.15, variant: "techno-safe" }),
    new Plataforma(486, 492, 154, 48, "furniture"),
    new MovingPlatform(682, 492, 178, 22, { rangeX: 70, speed: 1.05, phase: Math.PI / 2, variant: "techno-safe" }),
    new Plataforma(826, 492, 134, 48, "ground")
  ];

  iceBlock = new IceBlock(96, 432, 60);
  exitDoor = new ExitDoor(900, 418, 44, 74);
}

function loadFinalDefenseLevel() {
  currentLevel = 9;
  levelTitle = "DEFESA FINAL";
  playerStart = { x: 42, y: 438 };

  platforms = [
    new Plataforma(0, 492, 960, 48, "ground"),
    new Plataforma(374, 444, 212, 22, "techno-safe"),
    new FlickeringPlatform(116, 410, 150, 18, 2.35, 1.05, 0),
    new FlickeringPlatform(326, 356, 150, 18, 2.1, 1.1, 1.1),
    new FlickeringPlatform(610, 360, 142, 18, 2.25, 1.05, 0.55),
    new FlickeringPlatform(742, 282, 140, 18, 2.05, 1.15, 1.45),
    new FlickeringPlatform(498, 238, 150, 18, 2.3, 1.05, 0.25),
    new FlickeringPlatform(214, 262, 142, 18, 2.15, 1.2, 1.7)
  ];

  thesisChapters = [
    new ThesisChapter(174, 378, 1, "Capitulo 1"),
    new ThesisChapter(370, 324, 2, "Capitulo 2"),
    new ThesisChapter(792, 250, 3, "Capitulo 3"),
    new ThesisChapter(542, 206, 4, "Capitulo 4")
  ];

  researchDesk = new ResearchDesk(WIDTH / 2 - 66, 410);

  professorNPCs = [
    new ProfessorNPC(96, 438, "Prof. Celi", 0, {
      shootsCritiques: true,
      projectileDirection: 1,
      projectileCooldown: 2.25,
      initialDelay: 0.8
    }),
    new ProfessorNPC(268, 438, "Prof. Giordano", 0, {
      shootsCritiques: true,
      projectileDirection: 1,
      projectileCooldown: 2.55,
      initialDelay: 1.4
    }),
    new ProfessorNPC(690, 438, "Prof. Juliana", 0, {
      shootsCritiques: true,
      projectileDirection: -1,
      projectileCooldown: 2.15,
      initialDelay: 0.35
    }),
    new ProfessorNPC(842, 438, "Prof. Emerson", 0, {
      shootsCritiques: true,
      projectileDirection: -1,
      projectileCooldown: 2.7,
      initialDelay: 1.1
    })
  ];

  exitDoor = null;
  masterDiploma = null;
}

function configureExitDoorForCurrentLevel() {
  const doorWidth = 44;
  const doorHeight = 74;
  const doorX = WIDTH - 50;

  if (currentLevel < 3) {
    exitDoor = new ExitDoor(doorX, 418, doorWidth, doorHeight);
    return;
  }

  const doorY = 50;
  exitDoor = new ExitDoor(doorX, doorY, doorWidth, doorHeight);

  const supportWidth = 136;
  const supportHeight = 18;
  const supportX = clamp(doorX + doorWidth / 2 - supportWidth / 2, 0, WIDTH - supportWidth);
  const supportY = doorY + doorHeight;
  platforms.push(new Plataforma(supportX, supportY, supportWidth, supportHeight, "glitch-safe"));
}

function prepareBossCutscene(helperKey) {
  const helperName = CHARACTERS[helperKey].name;
  const mainName = currentCharacter.name;

  cutsceneDialogues = [
    {
      speaker: helperName,
      text: "Vamos fazer uma roda... precisamos pensar estrategicamente."
    },
    {
      speaker: mainName,
      text: "Aquele livro da Zuboff nos avisou que a extracao nao pararia no mundo virtual. O capitalismo de vigilancia agora quer nosso espaco fisico."
    },
    {
      speaker: helperName,
      text: "Exato! A maquina quer automatizar nosso comportamento. Fique atras do meu escudo teorico quando o laser disparar. E hora da nossa cultura tecnica quebrar esse molde!"
    }
  ];

  cutsceneIndex = 0;
  cutsceneActive = true;
  cutsceneUI.style.display = "flex";
  updateCutsceneUI();
}

function updateCutsceneUI() {
  const dialogue = cutsceneDialogues[cutsceneIndex];

  if (!dialogue) {
    endBossCutscene();
    return;
  }

  cutsceneSpeaker.innerText = dialogue.speaker;
  cutsceneText.innerText = dialogue.text;
  renderCutscenePortraits();
}

function advanceCutscene() {
  if (!cutsceneActive) {
    return;
  }

  cutsceneIndex += 1;

  if (cutsceneIndex >= cutsceneDialogues.length) {
    endBossCutscene();
    return;
  }

  updateCutsceneUI();
}

function endBossCutscene() {
  cutsceneActive = false;
  cutsceneUI.style.display = "none";
  refreshMobileControlsVisibility();
  canvas.focus();
  lastTime = performance.now();
  audioManager.playBossBGM();
  animationFrameId = requestAnimationFrame(gameLoop);
}

function renderCutscenePortraits() {
  cutsceneCtx.clearRect(0, 0, cutsceneCanvas.width, cutsceneCanvas.height);

  const portraitPlayer = new Player(currentCharacter);
  portraitPlayer.x = 92;
  portraitPlayer.y = 70;
  portraitPlayer.grounded = true;

  const portraitAlly = new AllyNPC(292, 70, {
    name: allyNPC.name,
    color: allyNPC.color,
    quotes: allyNPC.quotes,
    variant: allyNPC.variant
  });

  cutsceneCtx.save();
  cutsceneCtx.fillStyle = "#080a0d";
  cutsceneCtx.fillRect(0, 0, cutsceneCanvas.width, cutsceneCanvas.height);
  cutsceneCtx.fillStyle = "rgba(72, 209, 124, 0.12)";
  cutsceneCtx.fillRect(0, 116, cutsceneCanvas.width, 2);
  portraitPlayer.draw(cutsceneCtx);
  portraitAlly.draw(cutsceneCtx);
  cutsceneCtx.restore();
}

function showTermsModal(character, characterKey) {
  audioManager.init();
  clearAllInput(true);
  setMobileControlsVisible(false);
  pendingCharacter = character;
  pendingCharacterKey = characterKey;
  characterSelect.classList.add("is-hidden");
  termsModal.style.display = "flex";
  termsAcceptButton.focus();
}

function acceptTermsAndStart() {
  if (!pendingCharacter) {
    return;
  }

  const character = pendingCharacter;
  const characterKey = pendingCharacterKey;
  pendingCharacter = null;
  pendingCharacterKey = "emerson";
  termsModal.style.display = "none";
  startGame(character, characterKey);
}

function showStudentSelectionScreen(targetLevel = 7, instructionText = QUALIFICATION_STUDENT_TEXT, title = "Banca de Qualifica\u00e7\u00e3o") {
  hideEndOverlays();
  clearAllInput(true);
  setMobileControlsVisible(false);
  pendingStudentLevel = targetLevel;
  studentSelectionTitle.innerText = title;
  studentInstructionText.innerText = instructionText;
  renderStudentPreviews();
  studentSelectionScreen.style.display = "flex";
  const firstStudentButton = studentSelectionScreen.querySelector("[data-student]");

  if (firstStudentButton) {
    firstStudentButton.focus();
  }
}

function startQualificationWithStudent(studentKey) {
  const student = CHARACTERS[studentKey];

  if (!student) {
    return;
  }

  currentCharacter = student;
  currentCharacterKey = studentKey;
  currentLevel = pendingStudentLevel;
  studentSelectionScreen.style.display = "none";
  resetLevelState(student);
  setInGameGlossaryVisible(true);
  canvas.focus();
  startGameLoop();
}

function getRequestedTestLevel() {
  const params = new URLSearchParams(window.location.search);
  const level = Number(params.get("fase"));

  if (!Number.isInteger(level) || level < 1 || level > 9) {
    return null;
  }

  const requestedCharacterKey = params.get("personagem") || params.get("aluno") || "";
  return {
    level,
    characterKey: normalizeCharacterKeyForLevel(level, requestedCharacterKey)
  };
}

function normalizeCharacterKeyForLevel(level, requestedKey) {
  const normalizedKey = normalizeCharacterName(requestedKey).replace(/[^a-z0-9]/g, "");

  if (level === 7 || level === 9) {
    return CHARACTERS[normalizedKey] ? normalizedKey : "anderson";
  }

  return normalizedKey === "juliana" ? "juliana" : "emerson";
}

function startDirectlyFromQuery() {
  const request = getRequestedTestLevel();

  if (!request) {
    return false;
  }

  const character = CHARACTERS[request.characterKey];
  skipBossCutsceneForTest = request.level === 6;
  currentCharacter = character;
  currentCharacterKey = request.characterKey;
  currentLevel = request.level;
  characterSelect.classList.add("is-hidden");
  termsModal.style.display = "none";
  studentSelectionScreen.style.display = "none";
  resetLevelState(character);
  skipBossCutsceneForTest = false;
  setInGameGlossaryVisible(true);
  canvas.focus();
  startGameLoop();
  return true;
}

function startGame(character, characterKey = "emerson") {
  audioManager.init();
  currentCharacter = character;
  currentCharacterKey = characterKey;
  currentLevel = 1;
  resetLevelState(character);
  characterSelect.classList.add("is-hidden");
  termsModal.style.display = "none";
  setInGameGlossaryVisible(true);
  canvas.focus();
  startGameLoop();
}

function restartLevel() {
  if (!currentCharacter) {
    return;
  }

  audioManager.init();
  resetLevelState(currentCharacter);
  setInGameGlossaryVisible(true);
  canvas.focus();
  startGameLoop();
}

function resetLevelState(character) {
  clearAllInput(true);
  setMobileControlsVisible(false);
  cutsceneActive = false;
  cutsceneUI.style.display = "none";
  glossaryOpenedInGame = false;
  glossaryModal.style.display = "none";
  studentSelectionScreen.style.display = "none";
  loadLevel(currentLevel);
  player = new Player(character);
  gameEnded = false;
  lastGameResult = null;
  nivelDeRastreamento = 0;
  privacy = 100;
  statusMessage = "";
  statusTimer = 0;
  resetIdleQuoteState();
  hideEndOverlays();

  cookies.forEach((cookie) => {
    cookie.collected = false;
  });

  drones.forEach((drone) => {
    drone.reset();
  });

  vacuums.forEach((vacuum) => {
    vacuum.reset();
  });

  smartSpeakers.forEach((speaker) => {
    speaker.reset();
  });

  if (digitalRain) {
    digitalRain.reset();
  }

  books = [];
}

function startGameLoop() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }

  gameStarted = true;
  lastTime = performance.now();
  if (currentLevel === 6 && !cutsceneActive) {
    audioManager.playBossBGM();
  } else if (currentLevel !== 6) {
    audioManager.playBGM();
  }
  refreshMobileControlsVisibility();
  animationFrameId = requestAnimationFrame(gameLoop);
}

function gameLoop(time) {
  if (gameEnded || cutsceneActive) {
    return;
  }

  const deltaTime = Math.min((time - lastTime) / 1000, 0.033);
  lastTime = time;
  elapsed += deltaTime;

  update(deltaTime);
  draw();

  if (!gameEnded) {
    animationFrameId = requestAnimationFrame(gameLoop);
  }
}

function update(deltaTime) {
  if (!player) {
    return;
  }

  for (const platform of platforms) {
    if (typeof platform.update === "function") {
      platform.update(deltaTime);
    }
  }

  player.update(deltaTime);
  updateIdleQuote(deltaTime);

  if (exitDoor) {
    exitDoor.update(deltaTime);
  }

  if (iceBlock) {
    iceBlock.update(deltaTime);
    handleIceBlockPush(deltaTime);

    if (iceBlock.isLost()) {
      finishGame("defeat", "O gelo caiu no precipicio. A praxis se perdeu no caminho.");
      return;
    }

    if (iceBlock.isMelted()) {
      finishGame("defeat", "O gelo derreteu. Todo o seu esforco foi em vao.");
      return;
    }
  }

  for (const drone of drones) {
    drone.update(deltaTime);
  }

  for (const vacuum of vacuums) {
    vacuum.update(deltaTime);
  }

  for (const speaker of smartSpeakers) {
    speaker.update(deltaTime);
  }

  if (allyNPC) {
    allyNPC.update(deltaTime);
  }

  if (bossCamera) {
    bossCamera.update(deltaTime);
  }

  for (const book of books) {
    book.update(deltaTime);
  }

  books = books.filter((book) => book.active);

  for (const professor of professorNPCs) {
    professor.update(deltaTime);
  }

  for (const projectile of critiqueProjectiles) {
    projectile.update(deltaTime);

    if (projectile.active && !player.isInvulnerable() && rectsOverlap(player, projectile.bounds)) {
      applyCritiqueProjectilePenalty(projectile);
    }
  }

  critiqueProjectiles = critiqueProjectiles.filter((projectile) => projectile.active);

  for (const scroll of collectibleScrolls) {
    scroll.update(deltaTime);

    if (!scroll.collected && rectsOverlap(player, scroll.bounds)) {
      scroll.collected = true;
      unlockScroll(scroll.itemId);
      audioManager.playWin();
      statusMessage = "Referencia bibliografica desbloqueada";
      statusTimer = 1.8;
    }
  }

  for (const concept of conceptItems) {
    concept.update(deltaTime);

    if (!concept.collected && !player.carriedConcept && rectsOverlap(player, concept.bounds)) {
      concept.collected = true;
      player.carriedConcept = concept;
      audioManager.playWin();
      statusMessage = `Conhecimento coletado: ${concept.name}`;
      statusTimer = 1.8;
    }
  }

  for (const chapter of thesisChapters) {
    chapter.update(deltaTime);

    if (!chapter.collected && !player.carriedChapter && rectsOverlap(player, chapter.bounds)) {
      chapter.collected = true;
      player.carriedChapter = chapter;
      audioManager.playWin();
      statusMessage = `Capitulo coletado: ${chapter.name}`;
      statusTimer = 1.8;
    }
  }

  updateFinalDefensePuzzle();

  if (masterDiploma) {
    masterDiploma.update(deltaTime);

    if (rectsOverlap(player, masterDiploma.bounds)) {
      finishGraduation();
      return;
    }
  }

  for (const professor of professorNPCs) {
    if (!professor.isSatisfied && rectsOverlap(player, professor.bounds)) {
      handleProfessorDelivery(professor);
    }
  }

  updateQualificationExit();

  for (const cookie of cookies) {
    cookie.update(deltaTime);

    if (!cookie.disabled && !cookie.collected && rectsOverlap(player, cookie.bounds)) {
      cookie.collected = true;
      audioManager.playCollision();
      applyPrivacyDamage(COOKIE_TRACKING_VALUE);
      statusMessage = privacy === 0 ? "Privacidade comprometida" : "Cookie rastreador acionado";
      statusTimer = 1.5;
    }
  }

  for (const drone of drones) {
    if (!drone.disabled && !player.isInvulnerable() && rectsOverlap(player, drone)) {
      applyDronePenalty(drone);
    }
  }

  for (const vacuum of vacuums) {
    if (!vacuum.disabled && !player.isInvulnerable() && rectsOverlap(player, vacuum)) {
      applyDronePenalty(vacuum, "Robo aspirador mapeou seus habitos");
    }
  }

  for (const speaker of smartSpeakers) {
    if (!speaker.disabled && speaker.isExpanded() && rectCircleOverlap(player, speaker.centerX, speaker.centerY, speaker.currentRadius)) {
      applyPrivacyDamage(SMART_SPEAKER_DRAIN_PER_SECOND * deltaTime);
      statusMessage = privacy === 0 ? "Privacidade comprometida" : "Assistente Smart captando dados";
      statusTimer = 0.25;
    }
  }

  if (privacy <= 0) {
    finishGame("defeat");
    return;
  }

  if (currentLevel === 8 && exitDoor && iceBlock && rectsOverlap(player, exitDoor) && rectsOverlap(iceBlock, exitDoor)) {
    finishGame("victory");
    return;
  }

  if (currentLevel !== 8 && exitDoor && rectsOverlap(player, exitDoor) && privacy > 0) {
    finishGame("victory");
    return;
  }

  statusTimer = Math.max(0, statusTimer - deltaTime);
}

function draw() {
  drawBackground();

  for (const scroll of collectibleScrolls) {
    scroll.draw(ctx);
  }

  for (const cookie of cookies) {
    cookie.draw(ctx);
  }

  for (const platform of platforms) {
    platform.draw(ctx);
  }

  for (const concept of conceptItems) {
    concept.draw(ctx);
  }

  for (const chapter of thesisChapters) {
    chapter.draw(ctx);
  }

  if (researchDesk) {
    researchDesk.draw(ctx);
  }

  if (exitDoor) {
    exitDoor.draw(ctx);
  }

  if (masterDiploma) {
    masterDiploma.draw(ctx);
  }

  if (iceBlock) {
    iceBlock.draw(ctx);
  }

  for (const drone of drones) {
    drone.draw(ctx);
  }

  for (const vacuum of vacuums) {
    vacuum.draw(ctx);
  }

  for (const speaker of smartSpeakers) {
    speaker.draw(ctx);
  }

  if (bossCamera) {
    bossCamera.draw(ctx);
  }

  for (const book of books) {
    book.draw(ctx);
  }

  for (const projectile of critiqueProjectiles) {
    projectile.draw(ctx);
  }

  if (allyNPC) {
    allyNPC.draw(ctx);
  }

  for (const professor of professorNPCs) {
    professor.draw(ctx);
  }

  if (player) {
    player.draw(ctx);
    if (currentLevel !== 7 && currentLevel !== 9) {
      drawIdleQuoteBubble(ctx);
    }
  }

  drawHud();
}

function applyDronePenalty(enemy, message = "Drone de vigilancia detectou voce") {
  audioManager.playCollision();
  applyPrivacyDamage(DRONE_TRACKING_VALUE);
  statusMessage = privacy === 0 ? "Privacidade comprometida" : message;
  statusTimer = 1.5;
  player.takeDroneHit(enemy);
}

function applyPrivacyDamage(amount) {
  privacy = clamp(privacy - amount, 0, 100);
  nivelDeRastreamento = 100 - privacy;
}

function handleIceBlockPush(deltaTime) {
  if (!iceBlock || !rectsOverlap(player, iceBlock) || Math.abs(player.vx) < 20) {
    return;
  }

  const playerCenter = player.x + player.width / 2;
  const blockCenter = iceBlock.x + iceBlock.width / 2;
  const pushDirection = playerCenter < blockCenter ? 1 : -1;

  if (Math.sign(player.vx) !== pushDirection) {
    return;
  }

  iceBlock.x += player.vx * deltaTime * 0.78;
  iceBlock.vx = player.vx * 0.72;
}

function handleProfessorDelivery(professor) {
  if (!player.carriedConcept) {
    return;
  }

  if (player.carriedConcept.id === professor.requiredConceptId) {
    professor.isSatisfied = true;
    player.carriedConcept = null;
    audioManager.playWin();
    statusMessage = "Conceito aceito pela banca";
    statusTimer = 1.8;
    return;
  }

  player.carriedConcept.resetToStart();
  player.carriedConcept = null;
  audioManager.playCollision();
  statusMessage = "Conceito incorreto para este professor!";
  statusTimer = 1.8;
}

function updateFinalDefensePuzzle() {
  if (currentLevel !== 9 || !researchDesk || !player.carriedChapter) {
    return;
  }

  if (!rectsOverlap(player, researchDesk.bounds)) {
    return;
  }

  researchDesk.deliveredCount += 1;
  player.carriedChapter = null;
  audioManager.playWin();
  statusMessage = `Capitulo entregue: ${researchDesk.deliveredCount}/4`;
  statusTimer = 1.8;

  if (researchDesk.deliveredCount >= 4 && !masterDiploma) {
    masterDiploma = new MasterDiploma(WIDTH / 2 - 27, HEIGHT / 2 - 18);
    statusMessage = "Defesa aprovada: pegue o diploma!";
    statusTimer = 2.4;
  }
}

function applyCritiqueProjectilePenalty(projectile) {
  projectile.active = false;
  audioManager.playCollision();

  const direction = Math.sign(projectile.vx) || (player.x < projectile.x ? -1 : 1);
  player.vx = direction * 420;
  player.vy = -320;
  player.grounded = false;
  player.invulnerabilityTimer = 0.9;

  statusMessage = "Critica da banca: reorganize seu argumento!";
  statusTimer = 1.4;
}

function updateQualificationExit() {
  if (currentLevel !== 7 || exitDoor || professorNPCs.length === 0) {
    return;
  }

  const boardIsSatisfied = professorNPCs.every((professor) => professor.isSatisfied);

  if (!boardIsSatisfied) {
    return;
  }

  exitDoor = new ExitDoor(WIDTH / 2 - 22, 282, 44, 74);
  audioManager.playWin();
  statusMessage = "Banca satisfeita: portal de aprovacao aberto";
  statusTimer = 2.2;
}

function getRandomQuote(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return { text: "", author: "" };
  }

  return array[Math.floor(Math.random() * array.length)];
}

function updateEndQuote(result) {
  const quote = result === "victory"
    ? getRandomQuote(quotesVictory)
    : getRandomQuote(quotesDefeat);
  const textElement = result === "victory" ? victoryQuoteText : defeatQuoteText;
  const authorElement = result === "victory" ? victoryQuoteAuthor : defeatQuoteAuthor;

  textElement.innerText = quote.text;
  authorElement.innerText = quote.author;
}

function finishGame(result, customDefeatMessage = "") {
  gameEnded = true;
  lastGameResult = result;
  audioManager.stopBGM();
  clearAllInput(true);
  setInGameGlossaryVisible(false);
  setMobileControlsVisible(false);

  pauseGameLoop();

  if (result === "victory") {
    audioManager.playWin();

    if (currentLevel === 6) {
      showStudentSelectionScreen(7, QUALIFICATION_STUDENT_TEXT, "Banca de Qualifica\u00e7\u00e3o");
      return;
    }

    if (currentLevel === 8) {
      showStudentSelectionScreen(9, FINAL_DEFENSE_STUDENT_TEXT, "Defesa Final");
      return;
    }

    updateEndQuote("victory");
    victoryOverlay.style.display = "flex";
    nextPhaseButton.focus();
    return;
  }

  updateEndQuote("defeat");
  defeatTitle.innerText = customDefeatMessage || "Game Over: Dados Completamente Extraidos";
  defeatOverlay.style.display = "flex";
  retryButton.focus();
}

function finishGraduation() {
  if (gameEnded) {
    return;
  }

  gameEnded = true;
  lastGameResult = "graduation";
  audioManager.stopBGM();
  clearAllInput(true);
  setInGameGlossaryVisible(false);
  setMobileControlsVisible(false);
  pauseGameLoop();

  const studentName = currentCharacter?.name || "ORIENTANDO";
  graduationText.innerText = `O Programa de P\u00f3s-gradua\u00e7\u00e3o concede a ${studentName} o t\u00edtulo de Mestre! A fuga do algoritmo foi um sucesso.`;
  graduationScreen.style.display = "flex";
  journeyRestartButton.focus();
}

function hideEndOverlays() {
  victoryOverlay.style.display = "none";
  defeatOverlay.style.display = "none";
  graduationScreen.style.display = "none";
  defeatTitle.innerText = "Game Over: Dados Completamente Extraidos";
}

function findNearestThreat(x, y, maxDistance) {
  let nearestThreat = null;
  let nearestDistance = maxDistance;

  for (const threat of getDisableTargets()) {
    if (!isThreatActive(threat)) {
      continue;
    }

    const center = getThreatCenter(threat);
    const distance = Math.hypot(center.x - x, center.y - y);

    if (distance < nearestDistance) {
      nearestThreat = threat;
      nearestDistance = distance;
    }
  }

  return nearestThreat;
}

function getDisableTargets() {
  return [
    ...cookies,
    ...drones,
    ...vacuums,
    ...smartSpeakers
  ];
}

function isThreatActive(threat) {
  return threat && !threat.disabled && !threat.collected;
}

function getThreatBounds(threat) {
  if (threat.bounds) {
    return threat.bounds;
  }

  return {
    x: threat.x,
    y: threat.y,
    width: threat.width,
    height: threat.height
  };
}

function getThreatCenter(threat) {
  const bounds = getThreatBounds(threat);

  return {
    x: bounds.x + bounds.width / 2,
    y: bounds.y + bounds.height / 2
  };
}

function disableThreatTemporarily(threat) {
  if (!threat) {
    return;
  }

  threat.disabled = true;

  if (typeof clearTimeout === "function" && threat.disableTimeoutId) {
    clearTimeout(threat.disableTimeoutId);
  }

  if (typeof setTimeout !== "function") {
    return;
  }

  threat.disableTimeoutId = setTimeout(() => {
    threat.disabled = false;
    threat.disableTimeoutId = null;
  }, 4000);
}

function isPlayerProtectedByAllyShield() {
  return Boolean(
    allyNPC &&
    allyNPC.isShieldActive &&
    allyNPC.isShieldActive() &&
    rectsOverlap(player, allyNPC.getShieldBounds())
  );
}

function drawBackground() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const skyColors = {
    1: ["#a1c4fd", "#c2e9fb"], // Vale do feed - Manha
    2: ["#ffecd2", "#fcb69f"], // Casa Inteligente - Entardecer
    3: ["#0b162c", "#1a2a42"], // Matrix / Futuros - Escuro pastel
    4: ["#e0c3fc", "#8ec5fc"], // Cultura Tecnica - Ceu magico
    5: ["#ff9a9e", "#fecfef"], // Tecno-estetica - Rosa sunset
    6: ["#0f2027", "#203a43"], // Panoptico - Noite tensa
    7: ["#d4fc79", "#96e6a1"], // Qualificacao - Verde sucesso
    8: ["#89f7fe", "#66a6ff"], // Parodia Praxis - Gelo
    9: ["#ffb199", "#ff0844"]  // Defesa final - Fogo sunset
  };

  const colors = skyColors[currentLevel] || ["#a1c4fd", "#c2e9fb"];
  
  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  if (currentLevel === 3) {
    if (!digitalRain) {
      digitalRain = new DigitalRain(WIDTH, HEIGHT, 16);
    }
    digitalRain.draw(ctx);
    ctx.fillStyle = "rgba(57, 255, 20, 0.15)";
    ctx.font = "700 36px Inter, Segoe UI, Arial";
    ctx.fillText(levelTitle, 44, 152);
    return;
  }

  // Draw Sun or Moon
  const isNight = currentLevel === 6 || currentLevel === 3;
  const astroColor = isNight ? "#fdfbfb" : "#fffae3";
  const astroGlow = isNight ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 220, 100, 0.4)";
  const astroSize = 45 + Math.sin(elapsed * 2) * 4;

  ctx.save();
  ctx.fillStyle = astroColor;
  ctx.shadowColor = astroGlow;
  ctx.shadowBlur = 40;
  ctx.beginPath();
  ctx.arc(WIDTH - 120, 100, astroSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Draw Clouds
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  for (let i = 0; i < 4; i++) {
    const cloudSpeed = 15 + i * 5;
    const x = ((elapsed * cloudSpeed) + i * 300) % (WIDTH + 200) - 100;
    const y = 50 + (i * 40) % 100;
    
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.arc(x + 25, y - 15, 35, 0, Math.PI * 2);
    ctx.arc(x + 55, y, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  // Parallax Silhouettes (Campuses & Servers)
  const drawSilhouettes = (color, speedMultiplier, baseHeight, buildings) => {
    ctx.fillStyle = color;
    const offset = (elapsed * speedMultiplier) % WIDTH;
    
    for (let loop = 0; loop < 2; loop++) {
      const startX = loop * WIDTH - offset;
      let currentX = startX;
      
      for (const b of buildings) {
        if (typeof roundRect === 'function') {
          roundRect(ctx, currentX, HEIGHT - baseHeight - b.h, b.w, baseHeight + b.h, 12);
        } else {
          ctx.fillRect(currentX, HEIGHT - baseHeight - b.h, b.w, baseHeight + b.h);
        }
        currentX += b.w + b.gap;
      }
    }
  };

  const bgBuildingColor = isNight ? "rgba(40, 50, 70, 0.6)" : "rgba(255, 255, 255, 0.25)";
  const fgBuildingColor = isNight ? "rgba(20, 25, 40, 0.8)" : "rgba(255, 255, 255, 0.4)";

  const bgBuildings = [
    {w: 80, h: 120, gap: 20}, {w: 140, h: 80, gap: 40}, {w: 60, h: 150, gap: 15}, 
    {w: 120, h: 100, gap: 50}, {w: 90, h: 180, gap: 30}, {w: 160, h: 60, gap: 30},
    {w: 70, h: 130, gap: 20}, {w: 100, h: 90, gap: 0}
  ];
  drawSilhouettes(bgBuildingColor, 12, 50, bgBuildings);

  const fgBuildings = [
    {w: 100, h: 60, gap: 30}, {w: 80, h: 90, gap: 15}, {w: 150, h: 40, gap: 40}, 
    {w: 60, h: 110, gap: 20}, {w: 130, h: 70, gap: 35}, {w: 70, h: 100, gap: 25},
    {w: 110, h: 50, gap: 30}, {w: 90, h: 80, gap: 0}
  ];
  drawSilhouettes(fgBuildingColor, 28, 20, fgBuildings);

  // Title Text
  ctx.fillStyle = isNight ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.08)";
  ctx.font = "700 36px Inter, Segoe UI, Arial";
  ctx.fillText(levelTitle, 44, 152);
}

function drawHud() {
  if (!player) {
    return;
  }

  const panelX = 20;
  const panelY = 18;
  const panelWidth = 302;
  const panelHeight = 92;
  const barWidth = 248;
  const barHeight = 14;
  const barX = panelX + 22;
  const barY = panelY + 56;
  const hudTextColor = currentLevel === 3 ? "#39ff14" : "#f5f7fb";
  const hudMutedColor = currentLevel === 3 ? "rgba(57, 255, 20, 0.72)" : "#aeb8c4";

  ctx.fillStyle = "rgba(8, 10, 14, 0.72)";
  roundRect(ctx, panelX, panelY, panelWidth, panelHeight, 8);
  ctx.fill();

  ctx.fillStyle = hudTextColor;
  ctx.font = "700 16px Inter, Segoe UI, Arial";
  ctx.fillText(`${player.character.name} - Fase ${currentLevel}`, panelX + 22, panelY + 30);

  ctx.fillStyle = hudMutedColor;
  ctx.font = "12px Inter, Segoe UI, Arial";
  ctx.fillText("Barra de Privacidade", barX, barY - 8);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 1;
  roundRect(ctx, barX, barY, barWidth, barHeight, 7);
  ctx.stroke();

  const fillWidth = (privacy / 100) * barWidth;
  ctx.fillStyle = privacy > 55 ? "#48d17c" : privacy > 25 ? "#ffcf4a" : "#ff5c5c";
  roundRect(ctx, barX, barY, fillWidth, barHeight, 7);
  ctx.fill();

  ctx.fillStyle = hudTextColor;
  ctx.font = "700 12px Inter, Segoe UI, Arial";
  ctx.fillText(`${Math.round(privacy)}%`, barX + barWidth + 10, barY + 12);

  if (statusTimer > 0) {
    ctx.fillStyle = privacy === 0 ? "#ff5c5c" : "#ffcf4a";
    ctx.font = "700 14px Inter, Segoe UI, Arial";
    ctx.fillText(statusMessage, panelX + 22, panelY + 82);
  }
}

function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function rectCircleOverlap(rect, circleX, circleY, radius) {
  const nearestX = clamp(circleX, rect.x, rect.x + rect.width);
  const nearestY = clamp(circleY, rect.y, rect.y + rect.height);
  const distanceX = circleX - nearestX;
  const distanceY = circleY - nearestY;

  return distanceX * distanceX + distanceY * distanceY <= radius * radius;
}

function distanceBetweenCenters(a, b) {
  const aCenterX = typeof a.centerX === "number" ? a.centerX : a.x + a.width / 2;
  const aCenterY = typeof a.centerY === "number" ? a.centerY : a.y + a.height / 2;
  const bCenterX = typeof b.centerX === "number" ? b.centerX : b.x + b.width / 2;
  const bCenterY = typeof b.centerY === "number" ? b.centerY : b.y + b.height / 2;

  return Math.hypot(aCenterX - bCenterX, aCenterY - bCenterY);
}

function drawSpeechBubble(context, text, anchorX, anchorY, maxTextWidth, backgroundColor, textColor) {
  if (!text) {
    return;
  }

  const lines = wrapCanvasText(context, text, maxTextWidth);
  const lineHeight = 16;
  const paddingX = 12;
  const paddingY = 10;
  const bubbleWidth = Math.min(
    maxTextWidth + paddingX * 2,
    Math.max(132, Math.max(...lines.map((line) => context.measureText(line).width)) + paddingX * 2)
  );
  const bubbleHeight = lines.length * lineHeight + paddingY * 2;
  const bubbleX = clamp(anchorX - bubbleWidth / 2, 12, WIDTH - bubbleWidth - 12);
  const bubbleY = clamp(anchorY - bubbleHeight, 12, HEIGHT - bubbleHeight - 12);
  const tailX = clamp(anchorX, bubbleX + 18, bubbleX + bubbleWidth - 18);

  context.save();
  context.fillStyle = backgroundColor;
  context.strokeStyle = "rgba(16, 19, 23, 0.42)";
  context.lineWidth = 1.5;
  roundRect(context, bubbleX, bubbleY, bubbleWidth, bubbleHeight, 8);
  context.fill();
  context.stroke();

  context.beginPath();
  context.moveTo(tailX - 8, bubbleY + bubbleHeight - 1);
  context.lineTo(tailX + 8, bubbleY + bubbleHeight - 1);
  context.lineTo(anchorX, anchorY + 4);
  context.closePath();
  context.fill();
  context.stroke();

  context.fillStyle = textColor;
  context.font = "700 12px Inter, Segoe UI, Arial";
  lines.forEach((line, index) => {
    context.fillText(line, bubbleX + paddingX, bubbleY + paddingY + 12 + index * lineHeight);
  });

  context.restore();
}

function resetIdleQuoteState() {
  idleTimer = 0;
  idleQuoteTimer = 0;
  currentIdleQuote = "";
}

function updateIdleQuote(deltaTime) {
  if (!player || gameEnded || currentLevel === 7) {
    resetIdleQuoteState();
    return;
  }

  const hasMovementInput = isLeftPressed() || isRightPressed() || wasJumpRequested();
  const isPhysicallyStill = Math.abs(player.vx) < 8 && player.grounded;

  if (hasMovementInput || !isPhysicallyStill) {
    resetIdleQuoteState();
    return;
  }

  if (idleQuoteTimer > 0) {
    idleQuoteTimer = Math.max(0, idleQuoteTimer - deltaTime);
    return;
  }

  idleTimer += deltaTime;

  if (idleTimer >= IDLE_QUOTE_DELAY) {
    currentIdleQuote = getRandomIdleQuote(player.character.name);
    idleQuoteTimer = IDLE_QUOTE_DURATION;
    idleTimer = 0;
  }
}

function getRandomIdleQuote(characterName) {
  const quotePool = characterName === CHARACTERS.juliana.name ? bordoesJuliana : bordoesEmerson;

  if (quotePool.length === 0) {
    return "";
  }

  return quotePool[Math.floor(Math.random() * quotePool.length)];
}

function drawIdleQuoteBubble(context) {
  if (!currentIdleQuote || idleQuoteTimer <= 0 || !player) {
    return;
  }

  const maxTextWidth = 230;
  const lines = wrapCanvasText(context, currentIdleQuote, maxTextWidth);
  const lineHeight = 16;
  const paddingX = 12;
  const paddingY = 10;
  const bubbleWidth = Math.min(
    maxTextWidth + paddingX * 2,
    Math.max(132, Math.max(...lines.map((line) => context.measureText(line).width)) + paddingX * 2)
  );
  const bubbleHeight = lines.length * lineHeight + paddingY * 2;
  const anchorX = player.x + player.width / 2;
  const anchorY = player.y - 14;
  const bubbleX = clamp(anchorX - bubbleWidth / 2, 12, WIDTH - bubbleWidth - 12);
  const bubbleY = clamp(anchorY - bubbleHeight, 12, HEIGHT - bubbleHeight - 12);
  const tailX = clamp(anchorX, bubbleX + 18, bubbleX + bubbleWidth - 18);

  context.save();
  context.globalAlpha = Math.min(1, idleQuoteTimer / 0.25);

  context.fillStyle = "rgba(245, 247, 251, 0.94)";
  context.strokeStyle = "rgba(16, 19, 23, 0.42)";
  context.lineWidth = 1.5;
  roundRect(context, bubbleX, bubbleY, bubbleWidth, bubbleHeight, 8);
  context.fill();
  context.stroke();

  context.beginPath();
  context.moveTo(tailX - 8, bubbleY + bubbleHeight - 1);
  context.lineTo(tailX + 8, bubbleY + bubbleHeight - 1);
  context.lineTo(anchorX, anchorY + 4);
  context.closePath();
  context.fill();
  context.stroke();

  context.fillStyle = "#101317";
  context.font = "700 12px Inter, Segoe UI, Arial";
  lines.forEach((line, index) => {
    context.fillText(line, bubbleX + paddingX, bubbleY + paddingY + 12 + index * lineHeight);
  });

  context.restore();
}

function wrapCanvasText(context, text, maxWidth) {
  context.save();
  context.font = "700 12px Inter, Segoe UI, Arial";

  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;

    if (context.measureText(testLine).width <= maxWidth || !currentLine) {
      currentLine = testLine;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  context.restore();
  return lines;
}

function wasJumpRequested() {
  return keys.has("arrowup") || keys.has("w") || keys.has(" ") || performance.now() <= touchJumpRequestUntil;
}

function isLeftPressed() {
  return keys.has("arrowleft") || keys.has("a") || touchInput.left.size > 0;
}

function isRightPressed() {
  return keys.has("arrowright") || keys.has("d") || touchInput.right.size > 0;
}

function normalizeKey(key) {
  return key === "Spacebar" ? " " : key.toLowerCase();
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundRect(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, Math.abs(width) / 2, Math.abs(height) / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(x + width, y + height, x, y + height, safeRadius);
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
}
