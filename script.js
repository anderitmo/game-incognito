const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const characterSelect = document.getElementById("characterSelect");
const victoryOverlay = document.getElementById("victoryOverlay");
const defeatOverlay = document.getElementById("defeatOverlay");
const nextPhaseButton = document.getElementById("nextPhaseButton");
const retryButton = document.getElementById("retryButton");
const victoryQuoteText = document.getElementById("victoryQuoteText");
const victoryQuoteAuthor = document.getElementById("victoryQuoteAuthor");
const defeatQuoteText = document.getElementById("defeatQuoteText");
const defeatQuoteAuthor = document.getElementById("defeatQuoteAuthor");

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

class AudioManager {
  constructor() {
    this.context = null;
    this.masterGain = null;
    this.bgmOscillator = null;
    this.bgmLfo = null;
    this.bgmLfoGain = null;
    this.bgmGain = null;
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

    const now = this.context.currentTime;
    if (this.bgmOscillator) {
      this.bgmGain.gain.cancelScheduledValues(now);
      this.bgmGain.gain.setTargetAtTime(0.035, now, 0.2);
      return;
    }

    this.bgmOscillator = this.context.createOscillator();
    this.bgmLfo = this.context.createOscillator();
    this.bgmLfoGain = this.context.createGain();
    this.bgmGain = this.context.createGain();

    this.bgmOscillator.type = "sine";
    this.bgmOscillator.frequency.setValueAtTime(58, now);

    this.bgmLfo.type = "sine";
    this.bgmLfo.frequency.setValueAtTime(0.18, now);
    this.bgmLfoGain.gain.setValueAtTime(9, now);
    this.bgmLfo.connect(this.bgmLfoGain);
    this.bgmLfoGain.connect(this.bgmOscillator.frequency);

    this.bgmGain.gain.setValueAtTime(0.001, now);
    this.bgmGain.gain.setTargetAtTime(0.035, now, 0.35);

    this.bgmOscillator.connect(this.bgmGain);
    this.bgmGain.connect(this.masterGain);

    this.bgmOscillator.start(now);
    this.bgmLfo.start(now);
  }

  stopBGM() {
    if (!this.context || !this.bgmOscillator) {
      return;
    }

    const now = this.context.currentTime;
    this.bgmGain.gain.cancelScheduledValues(now);
    this.bgmGain.gain.setTargetAtTime(0.001, now, 0.08);

    const oscillator = this.bgmOscillator;
    const lfo = this.bgmLfo;
    oscillator.stop(now + 0.25);
    lfo.stop(now + 0.25);

    this.bgmOscillator = null;
    this.bgmLfo = null;
    this.bgmLfoGain = null;
    this.bgmGain = null;
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
  }
};

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

const keys = new Set();
let player = null;
let currentLevel = 1;
let gameStarted = false;
let gameEnded = false;
let animationFrameId = null;
let currentCharacter = null;
let lastGameResult = null;
let lastTime = 0;
let elapsed = 0;
let nivelDeRastreamento = 0;
let privacy = 100;
let statusMessage = "";
let statusTimer = 0;
let idleTimer = 0;
let idleQuoteTimer = 0;
let currentIdleQuote = "";
let levelTitle = "VALE DO FEED";
let playerStart = { x: 36, y: 438 };
let platforms = [];
let cookies = [];
let drones = [];
let vacuums = [];
let smartSpeakers = [];
let books = [];
let allyNPC = null;
let exitDoor = null;
let digitalRain = null;

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
    const gradient = context.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    const topColor = this.variant === "ground"
      ? "#343a40"
      : this.variant === "furniture"
        ? "#5f6872"
        : "#4b525b";
    const bottomColor = this.variant === "ground"
      ? "#171b20"
      : this.variant === "furniture"
        ? "#2f3640"
        : "#242a31";
    gradient.addColorStop(0, topColor);
    gradient.addColorStop(1, bottomColor);

    context.fillStyle = gradient;
    context.fillRect(this.x, this.y, this.width, this.height);

    context.fillStyle = "rgba(255, 255, 255, 0.18)";
    context.fillRect(this.x, this.y, this.width, 3);
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
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 54;
    this.name = "Prof. Celi";
    this.color = "#c23bff";
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

    if (!this.following && distanceBetweenCenters(this, player) < 82) {
      this.following = true;
      this.currentQuote = "Pergunte ao seu orientador!";
      this.quoteTimer = 2.6;
      this.idleTimer = 0;
    }

    if (this.following) {
      const offsetX = player.facing >= 0 ? -54 : 54;
      const targetX = clamp(player.x + offsetX, 8, WIDTH - this.width - 8);
      const targetY = clamp(player.y + player.height - this.height, 8, HEIGHT - this.height - 8);

      this.x += (targetX - this.x) * Math.min(1, deltaTime * 7);
      this.y += (targetY - this.y) * Math.min(1, deltaTime * 7);
      this.cooldown = Math.max(0, this.cooldown - deltaTime);
      this.tryThrowBook();
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

  updateIdleQuote(deltaTime) {
    if (this.quoteTimer > 0) {
      this.quoteTimer = Math.max(0, this.quoteTimer - deltaTime);
      return;
    }

    this.idleTimer += deltaTime;

    if (this.idleTimer >= 5) {
      this.currentQuote = bordoesCeli[Math.floor(Math.random() * bordoesCeli.length)];
      this.quoteTimer = 3;
      this.idleTimer = 0;
    }
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);

    context.fillStyle = "rgba(0, 0, 0, 0.24)";
    context.beginPath();
    context.ellipse(this.width / 2, this.height + 5, 18, 5, 0, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#f0c8ff";
    context.beginPath();
    context.arc(16, 10, 11, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(16, 19);
    context.lineTo(4, 49);
    context.lineTo(28, 49);
    context.closePath();
    context.fill();

    context.fillStyle = "#241127";
    context.fillRect(12, 8, 3, 3);
    context.fillRect(20, 8, 3, 3);
    context.fillRect(7, 49, 6, 5);
    context.fillRect(20, 49, 6, 5);

    context.restore();

    this.drawQuoteBubble(context);
  }

  drawQuoteBubble(context) {
    if (!this.currentQuote || this.quoteTimer <= 0) {
      return;
    }

    drawSpeechBubble(context, this.currentQuote, this.centerX, this.y - 10, 220, "#fff0ff", "#241127");
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
    context.translate(this.x, this.y);
    context.globalAlpha = this.isInvulnerable() && Math.floor(elapsed * 18) % 2 === 0 ? 0.35 : 1;

    context.fillStyle = "rgba(0, 0, 0, 0.28)";
    context.beginPath();
    context.ellipse(this.width / 2, this.height + 6, 20, 6, 0, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = this.character.color;
    context.fillRect(6, 18, 22, 30);

    context.fillStyle = this.character.accent;
    context.beginPath();
    context.arc(17, 11, 12, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#101317";
    context.fillRect(this.facing > 0 ? 21 : 9, 9, 4, 4);
    context.fillRect(10, 49, 6, 5);
    context.fillRect(22, 49, 6, 5);

    context.restore();
  }
}

loadLevel(currentLevel);

document.querySelectorAll("[data-character]").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = CHARACTERS[button.dataset.character];
    startGame(selected);
  });
});

nextPhaseButton.addEventListener("click", () => {
  if (lastGameResult === "victory") {
    if (currentLevel === 1) {
      currentLevel = 2;
    } else if (currentLevel === 2) {
      currentLevel = 3;
    } else if (currentLevel === 3) {
      currentLevel = 4;
    }
  }

  restartLevel();
});

retryButton.addEventListener("click", () => {
  restartLevel();
});

window.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Spacebar"].includes(event.key)) {
    event.preventDefault();
  }

  keys.add(normalizeKey(event.key));
});

window.addEventListener("keyup", (event) => {
  keys.delete(normalizeKey(event.key));

  if (["arrowup", "w", " "].includes(normalizeKey(event.key)) && player && player.vy < -180) {
    // Corte de pulo: soltar o botao reduz a subida e da controle fino de altura.
    player.vy *= 0.5;
  }
});

function loadLevel(level) {
  platforms = [];
  cookies = [];
  drones = [];
  vacuums = [];
  smartSpeakers = [];
  books = [];
  allyNPC = null;

  if (level === 4) {
    loadTechnicalCultureLevel();
    return;
  }

  if (level === 3) {
    loadBehavioralFuturesLevel();
    return;
  }

  if (level === 2) {
    loadSmartHomeLevel();
    return;
  }

  loadFeedValleyLevel();
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

  exitDoor = new ExitDoor(892, 418);
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

  exitDoor = new ExitDoor(892, 418);
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
    new GlitchPlatform(514, 202, 142, 18, 2.2, 0.9, 1.5),
    // Plataforma fixa sob a porta alta.
    new Plataforma(820, 196, 124, 18, "glitch-safe")
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

  exitDoor = new ExitDoor(872, 122);
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
    new Plataforma(806, 190, 126, 22, "furniture")
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
  exitDoor = new ExitDoor(892, 418);
}

function startGame(character) {
  audioManager.init();
  currentCharacter = character;
  currentLevel = 1;
  resetLevelState(character);
  characterSelect.classList.add("is-hidden");
  canvas.focus();
  startGameLoop();
}

function restartLevel() {
  if (!currentCharacter) {
    return;
  }

  audioManager.init();
  resetLevelState(currentCharacter);
  canvas.focus();
  startGameLoop();
}

function resetLevelState(character) {
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
  audioManager.playBGM();
  animationFrameId = requestAnimationFrame(gameLoop);
}

function gameLoop(time) {
  if (gameEnded) {
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
  exitDoor.update(deltaTime);

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

  for (const book of books) {
    book.update(deltaTime);
  }

  books = books.filter((book) => book.active);

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

  if (rectsOverlap(player, exitDoor) && privacy > 0) {
    finishGame("victory");
    return;
  }

  statusTimer = Math.max(0, statusTimer - deltaTime);
}

function draw() {
  drawBackground();

  for (const cookie of cookies) {
    cookie.draw(ctx);
  }

  for (const platform of platforms) {
    platform.draw(ctx);
  }

  exitDoor.draw(ctx);

  for (const drone of drones) {
    drone.draw(ctx);
  }

  for (const vacuum of vacuums) {
    vacuum.draw(ctx);
  }

  for (const speaker of smartSpeakers) {
    speaker.draw(ctx);
  }

  for (const book of books) {
    book.draw(ctx);
  }

  if (allyNPC) {
    allyNPC.draw(ctx);
  }

  if (player) {
    player.draw(ctx);
    drawIdleQuoteBubble(ctx);
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

function finishGame(result) {
  gameEnded = true;
  lastGameResult = result;
  audioManager.stopBGM();

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (result === "victory") {
    audioManager.playWin();
    updateEndQuote("victory");
    victoryOverlay.style.display = "flex";
    nextPhaseButton.focus();
    return;
  }

  updateEndQuote("defeat");
  defeatOverlay.style.display = "flex";
  retryButton.focus();
}

function hideEndOverlays() {
  victoryOverlay.style.display = "none";
  defeatOverlay.style.display = "none";
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

function drawBackground() {
  if (currentLevel === 3) {
    if (!digitalRain) {
      digitalRain = new DigitalRain(WIDTH, HEIGHT, 16);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    digitalRain.draw(ctx);

    ctx.fillStyle = "rgba(57, 255, 20, 0.08)";
    ctx.font = "700 46px Consolas, monospace";
    ctx.fillText(levelTitle, 44, 100);
    return;
  }

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  if (currentLevel === 4) {
    gradient.addColorStop(0, "#12071f");
    gradient.addColorStop(0.55, "#1b1230");
    gradient.addColorStop(1, "#25152f");
  } else if (currentLevel === 2) {
    gradient.addColorStop(0, "#060b14");
    gradient.addColorStop(0.55, "#111923");
    gradient.addColorStop(1, "#17191d");
  } else {
    gradient.addColorStop(0, "#080a10");
    gradient.addColorStop(0.55, "#111821");
    gradient.addColorStop(1, "#15110d");
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.strokeStyle = currentLevel === 4
    ? "rgba(194, 59, 255, 0.12)"
    : currentLevel === 2
      ? "rgba(124, 199, 255, 0.09)"
      : "rgba(88, 220, 190, 0.11)";
  ctx.lineWidth = 1;

  const gridOffset = (elapsed * 18) % 48;
  for (let x = -48; x <= WIDTH; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x + gridOffset, 0);
    ctx.lineTo(x + gridOffset, HEIGHT);
    ctx.stroke();
  }

  for (let y = 0; y <= HEIGHT; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y + gridOffset * 0.5);
    ctx.lineTo(WIDTH, y + gridOffset * 0.5);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  ctx.font = "700 52px Inter, Segoe UI, Arial";
  ctx.fillText(levelTitle, 44, 100);
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
  if (!player || gameEnded) {
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
  return keys.has("arrowup") || keys.has("w") || keys.has(" ");
}

function isLeftPressed() {
  return keys.has("arrowleft") || keys.has("a");
}

function isRightPressed() {
  return keys.has("arrowright") || keys.has("d");
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
