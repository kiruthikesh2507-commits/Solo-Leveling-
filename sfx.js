/* ═══════════════════════════════════════════════════════════════
   AWAKEN SYSTEM — SFX & ANIMATION ENGINE
   All sounds generated via Web Audio API (zero external files)
   All animations via Canvas + CSS (zero external libraries)
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ─── AUDIO CONTEXT ────────────────────────────────────────────────────────────

let _audioCtx = null;
let _sfxEnabled = true;

function getAudioCtx() {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }
  // Resume if suspended (browser autoplay policy)
  if (_audioCtx && _audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// Unlock audio on first user interaction
document.addEventListener('touchstart', getAudioCtx, { once: true });
document.addEventListener('click', getAudioCtx, { once: true });

// ─── CORE SOUND PRIMITIVES ────────────────────────────────────────────────────

function playTone(freq, type, duration, volume, delay = 0, fadeOut = true) {
  const ctx = getAudioCtx();
  if (!ctx || !_sfxEnabled) return;
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  if (fadeOut) gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.05);
}

function playNoise(duration, volume, filterFreq = 800, delay = 0) {
  const ctx = getAudioCtx();
  if (!ctx || !_sfxEnabled) return;
  const bufSize = ctx.sampleRate * duration;
  const buffer  = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data    = buffer.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = filterFreq;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(ctx.currentTime + delay);
}

// ─── SOUND LIBRARY ────────────────────────────────────────────────────────────

const SFX = {

  // Subtle UI tap — button press
  tap() {
    playTone(440, 'sine', 0.06, 0.08);
    playTone(600, 'sine', 0.04, 0.05, 0.02);
  },

  // Quest complete — satisfying chime sequence
  questComplete() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => playTone(f, 'sine', 0.25, 0.18, i * 0.1));
    playNoise(0.08, 0.04, 1200, 0.0);
  },

  // Rank up — epic orchestral hit
  rankUp() {
    // Power chord stab
    [220, 277, 330, 440].forEach((f, i) => {
      playTone(f, 'sawtooth', 0.6, 0.12, 0);
    });
    // Rising sweep
    const ctx = getAudioCtx();
    if (ctx && _sfxEnabled) {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime + 0.05);
      osc.stop(ctx.currentTime + 0.65);
    }
    // Triumphant fanfare notes
    const fanfare = [523, 659, 784, 1047, 1319];
    fanfare.forEach((f, i) => playTone(f, 'triangle', 0.4, 0.22, 0.55 + i * 0.1));
    playNoise(0.15, 0.06, 600, 0.05);
  },

  // Badge / achievement unlock — flip reveal sound
  badgeUnlock() {
    playTone(880, 'sine', 0.12, 0.15, 0.0);
    playTone(1100, 'sine', 0.12, 0.15, 0.08);
    playTone(1320, 'sine', 0.18, 0.18, 0.16);
    playTone(1760, 'sine', 0.3, 0.20, 0.26);
    playNoise(0.1, 0.05, 2000, 0.25);
  },

  // Streak milestone — power up ascending
  streakMilestone() {
    const scale = [261, 329, 392, 523, 659, 784, 1047];
    scale.forEach((f, i) => playTone(f, 'triangle', 0.15, 0.14, i * 0.07));
    playNoise(0.12, 0.05, 900, 0.0);
  },

  // Purchase / shop buy — coin sound
  purchase() {
    playTone(1047, 'sine', 0.08, 0.15, 0.0);
    playTone(1319, 'sine', 0.08, 0.15, 0.06);
    playTone(1568, 'sine', 0.12, 0.18, 0.12);
  },

  // Error / failed — low buzz
  error() {
    playTone(180, 'sawtooth', 0.15, 0.18, 0.0);
    playTone(160, 'sawtooth', 0.15, 0.15, 0.1);
    playNoise(0.12, 0.08, 200, 0.0);
  },

  // Chest open — magical shimmer
  chestOpen() {
    const magic = [659, 784, 988, 1175, 1319, 1568];
    magic.forEach((f, i) => {
      playTone(f, 'sine', 0.2, 0.12, i * 0.06);
      playTone(f * 1.5, 'sine', 0.1, 0.06, i * 0.06 + 0.03);
    });
    playNoise(0.2, 0.06, 3000, 0.1);
  },

  // Dungeon gate open — dark rumble + whoosh
  dungeonOpen() {
    playTone(80, 'sawtooth', 0.4, 0.2, 0.0);
    playTone(60, 'sawtooth', 0.4, 0.18, 0.1);
    playNoise(0.3, 0.12, 300, 0.0);
    // Whoosh
    const ctx = getAudioCtx();
    if (ctx && _sfxEnabled) {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.7);
      gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);
      osc.start(ctx.currentTime + 0.2);
      osc.stop(ctx.currentTime + 0.8);
    }
  },

  // Penalty — ominous drone
  penalty() {
    playTone(110, 'sawtooth', 0.8, 0.2, 0.0);
    playTone(98,  'sawtooth', 0.8, 0.18, 0.05);
    playNoise(0.5, 0.1, 150, 0.0);
    // Three ominous pulses
    [0.3, 0.55, 0.8].forEach(d => {
      playTone(130, 'square', 0.12, 0.12, d);
    });
  },

  // Stat gain — ascending pop
  statGain() {
    playTone(660, 'sine', 0.08, 0.12, 0.0);
    playTone(880, 'sine', 0.08, 0.14, 0.06);
  },

  // Boot complete — system online
  bootComplete() {
    const seq = [261, 329, 392, 523];
    seq.forEach((f, i) => playTone(f, 'square', 0.15, 0.1, i * 0.12));
    playTone(1047, 'sine', 0.4, 0.2, 0.55);
    playNoise(0.08, 0.04, 1500, 0.55);
  },

  // Daily login — welcome chime
  dailyLogin() {
    playTone(523, 'sine', 0.2, 0.14, 0.0);
    playTone(659, 'sine', 0.2, 0.14, 0.12);
    playTone(784, 'sine', 0.3, 0.16, 0.24);
  },
};

window.SFX = SFX;

// Toggle SFX on/off
window.toggleSFX = function() {
  _sfxEnabled = !_sfxEnabled;
  if (typeof STATE !== 'undefined') {
    STATE.sfxEnabled = _sfxEnabled;
    if (typeof saveState === 'function') saveState();
  }
  const btn = document.getElementById('sfxToggleBtn');
  if (btn) btn.textContent = _sfxEnabled ? '🔊 ON' : '🔇 OFF';
  if (_sfxEnabled) SFX.tap();
};

// Load saved SFX preference
window.addEventListener('DOMContentLoaded', () => {
  try {
    const raw = localStorage.getItem('awakenState');
    if (raw) {
      const s = JSON.parse(raw);
      if (s.sfxEnabled === false) _sfxEnabled = false;
    }
  } catch(e) {}
  const btn = document.getElementById('sfxToggleBtn');
  if (btn) btn.textContent = _sfxEnabled ? '🔊 ON' : '🔇 OFF';
});


// ═══════════════════════════════════════════════════════════════
// ANIMATION ENGINE
// ═══════════════════════════════════════════════════════════════

// ─── PARTICLE CANVAS ──────────────────────────────────────────────────────────

function getParticleCanvas() {
  let c = document.getElementById('awakenParticleCanvas');
  if (!c) {
    c = document.createElement('canvas');
    c.id = 'awakenParticleCanvas';
    c.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      pointer-events:none;z-index:9999;
    `;
    document.body.appendChild(c);
  }
  c.width  = window.innerWidth;
  c.height = window.innerHeight;
  return c;
}

// ─── QUEST COMPLETE PARTICLES ─────────────────────────────────────────────────

window.animQuestComplete = function(originEl) {
  const canvas = getParticleCanvas();
  const ctx    = canvas.getContext('2d');

  // Origin point from element or center
  let ox = canvas.width / 2, oy = canvas.height / 2;
  if (originEl) {
    const r = originEl.getBoundingClientRect();
    ox = r.left + r.width / 2;
    oy = r.top  + r.height / 2;
  }

  const colors  = ['#dc1428','#ff4444','#ff8800','#ffcc00','#ffffff','#ff2255'];
  const particles = Array.from({ length: 60 }, () => ({
    x: ox, y: oy,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.7) * 14,
    life: 1,
    decay: 0.018 + Math.random() * 0.02,
    size: 3 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() > 0.5 ? 'circle' : 'square',
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.3,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      if (p.life <= 0) continue;
      alive = true;
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.97;
      p.life -= p.decay;
      p.rot  += p.rotSpeed;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }
      ctx.restore();
    }
    if (alive) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(draw);

  // Flash overlay
  flashScreen('#dc142830', 180);
};

// ─── RANK UP CINEMATIC ────────────────────────────────────────────────────────

window.animRankUp = function(rankName) {
  // Full-screen overlay
  const overlay = document.createElement('div');
  overlay.id = 'rankUpOverlay';
  overlay.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:rgba(0,0,0,0);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    z-index:10000;pointer-events:all;
    font-family:'Rajdhani',sans-serif;
  `;
  document.body.appendChild(overlay);

  overlay.innerHTML = `
    <div id="ruFlash" style="
      position:absolute;top:0;left:0;width:100%;height:100%;
      background:radial-gradient(ellipse at center, rgba(220,20,40,0.55) 0%, rgba(0,0,0,0.92) 70%);
      opacity:0;transition:opacity 0.25s;
    "></div>
    <div id="ruBadge" style="
      position:relative;z-index:2;
      text-align:center;
      transform:scale(0.1) rotate(-15deg);opacity:0;
      transition:transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s;
    ">
      <div style="
        width:120px;height:120px;margin:0 auto;
        background:linear-gradient(135deg,#dc1428,#8b0010);
        clip-path:polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%);
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 0 60px rgba(220,20,40,0.9),0 0 120px rgba(220,20,40,0.4);
      ">
        <span style="font-size:2.8rem;font-weight:900;color:#fff;letter-spacing:-1px;">${rankName.split('-')[0]}</span>
      </div>
      <div style="
        margin-top:1rem;font-size:1.4rem;font-weight:700;
        color:#dc1428;letter-spacing:0.25em;
        text-shadow:0 0 20px rgba(220,20,40,0.8);
      ">RANK UP</div>
      <div style="
        font-size:1.8rem;font-weight:900;color:#fff;
        letter-spacing:0.15em;margin-top:0.3rem;
        text-shadow:0 0 30px rgba(220,20,40,1);
      ">${rankName.toUpperCase()}</div>
      <div style="
        margin-top:1.5rem;font-size:0.75rem;color:rgba(255,255,255,0.5);
        letter-spacing:0.2em;
      ">TAP TO CONTINUE</div>
    </div>
  `;

  // Sweep lines (cinematic bars)
  const bars = document.createElement('div');
  bars.style.cssText = `
    position:absolute;top:0;left:0;width:100%;height:100%;
    pointer-events:none;overflow:hidden;z-index:1;
  `;
  for (let i = 0; i < 8; i++) {
    const bar = document.createElement('div');
    bar.style.cssText = `
      position:absolute;height:2px;background:rgba(220,20,40,0.3);
      left:-100%;width:100%;
      top:${10 + i * 11}%;
      transition:left ${0.4 + i * 0.06}s cubic-bezier(0.16,1,0.3,1);
      transition-delay:${i * 0.04}s;
    `;
    bars.appendChild(bar);
  }
  overlay.appendChild(bars);

  // Animate in
  requestAnimationFrame(() => {
    document.getElementById('ruFlash').style.opacity = '1';
    setTimeout(() => {
      document.getElementById('ruBadge').style.transform = 'scale(1) rotate(0deg)';
      document.getElementById('ruBadge').style.opacity = '1';
      bars.querySelectorAll('div').forEach(b => b.style.left = '0');
    }, 80);
  });

  // Particle burst from badge
  setTimeout(() => {
    const canvas = getParticleCanvas();
    const ctx    = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const colors = ['#dc1428','#ff4444','#ffcc00','#ffffff','#ff8800'];
    const particles = Array.from({ length: 100 }, () => ({
      x: cx, y: cy - 40,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.5) * 18,
      life: 1, decay: 0.012 + Math.random() * 0.015,
      size: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    function drawP() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        if (p.life <= 0) continue; alive = true;
        p.x += p.vx; p.y += p.vy; p.vy += 0.25; p.life -= p.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (alive) requestAnimationFrame(drawP);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(drawP);
  }, 300);

  // Dismiss
  overlay.addEventListener('click', () => {
    overlay.style.transition = 'opacity 0.4s';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 450);
  });
  setTimeout(() => {
    if (overlay.parentNode) {
      overlay.style.transition = 'opacity 0.4s';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 450);
    }
  }, 4500);
};

// ─── BADGE UNLOCK FLIP ────────────────────────────────────────────────────────

window.animBadgeUnlock = function(badgeName, badgeIcon, tier) {
  const tierColors = {
    bronze: '#cd7f32', silver: '#c0c0c0', gold: '#fbbf24',
    platinum: '#e5e4e2', diamond: '#b9f2ff'
  };
  const color = tierColors[tier] || '#dc1428';

  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotateY(90deg) scale(0.5);
    width:200px;padding:1.5rem;
    background:linear-gradient(135deg,#1a1a1a,#0d0d0d);
    border:2px solid ${color};
    border-radius:12px;
    box-shadow:0 0 40px ${color}66,0 0 80px ${color}33;
    z-index:10001;text-align:center;
    font-family:'Rajdhani',sans-serif;
    transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1),opacity 0.4s;
    opacity:0;
  `;
  el.innerHTML = `
    <div style="font-size:2.5rem;margin-bottom:0.5rem;">${badgeIcon}</div>
    <div style="font-size:0.6rem;letter-spacing:0.2em;color:${color};margin-bottom:0.3rem;">BADGE UNLOCKED</div>
    <div style="font-size:1rem;font-weight:700;color:#fff;letter-spacing:0.1em;">${badgeName}</div>
    <div style="font-size:0.65rem;color:rgba(255,255,255,0.4);margin-top:0.3rem;letter-spacing:0.15em;">${tier.toUpperCase()}</div>
  `;
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = 'translate(-50%,-50%) rotateY(0deg) scale(1)';
    el.style.opacity = '1';
  });

  setTimeout(() => {
    el.style.transform = 'translate(-50%,-50%) rotateY(90deg) scale(0.5)';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 450);
  }, 2200);
};

// ─── SCREEN FLASH ─────────────────────────────────────────────────────────────

function flashScreen(color, duration) {
  const f = document.createElement('div');
  f.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:${color};pointer-events:none;
    z-index:9998;opacity:1;
    transition:opacity ${duration}ms ease-out;
  `;
  document.body.appendChild(f);
  requestAnimationFrame(() => {
    f.style.opacity = '0';
    setTimeout(() => f.remove(), duration + 50);
  });
}

window.flashScreen = flashScreen;

// ─── XP / RANK BAR PULSE ──────────────────────────────────────────────────────

window.animXPPulse = function() {
  const bar = document.getElementById('rankBarFill');
  if (!bar) return;
  bar.style.transition = 'none';
  bar.style.boxShadow = '0 0 18px #dc1428, 0 0 36px #dc142888';
  bar.style.filter = 'brightness(1.5)';
  setTimeout(() => {
    bar.style.transition = 'box-shadow 0.6s, filter 0.6s';
    bar.style.boxShadow = '';
    bar.style.filter = '';
  }, 350);
};

// ─── STAT NUMBER COUNT-UP ─────────────────────────────────────────────────────

window.animStatCountUp = function() {
  const statRows = document.querySelectorAll('.stat-val-col');
  statRows.forEach(el => {
    const target = parseInt(el.textContent) || 0;
    const start  = Math.max(0, target - 8);
    let current  = start;
    const step   = () => {
      current = Math.min(target, current + 1);
      el.textContent = current;
      if (current < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};

// ─── BUTTON PRESS FEEDBACK ────────────────────────────────────────────────────

window.animButtonPress = function(btn) {
  if (!btn) return;
  btn.style.transition = 'transform 0.08s, filter 0.08s';
  btn.style.transform  = 'scale(0.94)';
  btn.style.filter     = 'brightness(1.3)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
    btn.style.filter    = '';
  }, 100);
};

// ─── CHEST OPEN SHIMMER ───────────────────────────────────────────────────────

window.animChestOpen = function(chestEl) {
  if (!chestEl) return;
  let frame = 0;
  const colors = ['#ffcc00','#ff8800','#dc1428','#ffffff','#ffcc00'];
  const id = setInterval(() => {
    chestEl.style.textShadow = `0 0 20px ${colors[frame % colors.length]}`;
    chestEl.style.transform  = `scale(${1 + Math.sin(frame * 0.8) * 0.12}) rotate(${Math.sin(frame * 1.2) * 8}deg)`;
    frame++;
    if (frame > 18) {
      clearInterval(id);
      chestEl.style.textShadow = '';
      chestEl.style.transform  = '';
    }
  }, 40);
};

// ─── PENALTY SHAKE ────────────────────────────────────────────────────────────

window.animPenaltyShake = function() {
  const app = document.getElementById('screen-app');
  if (!app) return;
  let f = 0;
  const id = setInterval(() => {
    app.style.transform = `translateX(${Math.sin(f * 2.5) * (8 - f * 0.5)}px)`;
    f++;
    if (f > 14) { clearInterval(id); app.style.transform = ''; }
  }, 40);
  flashScreen('rgba(220,20,40,0.15)', 600);
};

// ─── DAILY LOGIN WELCOME ──────────────────────────────────────────────────────

window.animDailyLogin = function(hunterName) {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;top:0;left:0;width:100%;
    background:linear-gradient(90deg,#0a0a0a,#1a0005,#0a0a0a);
    border-bottom:1px solid #dc1428;
    padding:0.9rem 1.5rem;
    z-index:9997;
    font-family:'Share Tech Mono',monospace;
    font-size:0.75rem;letter-spacing:0.15em;color:#dc1428;
    transform:translateY(-100%);
    transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
    display:flex;align-items:center;gap:0.75rem;
  `;
  el.innerHTML = `
    <span style="font-size:1rem;">⚔</span>
    <span>WELCOME BACK, ${hunterName.toUpperCase()} — SYSTEM ONLINE</span>
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.style.transform = 'translateY(0)');
  setTimeout(() => {
    el.style.transition = 'transform 0.35s ease-in';
    el.style.transform  = 'translateY(-100%)';
    setTimeout(() => el.remove(), 400);
  }, 2800);
};

// ─── BOOT SCREEN PULSE ────────────────────────────────────────────────────────

window.animBootPulse = function() {
  const bar = document.getElementById('bootBar');
  if (!bar) return;
  bar.style.boxShadow = '0 0 12px #dc1428, 0 0 24px #dc142855';
};

// ─── QUEST CARD APPEAR ────────────────────────────────────────────────────────

window.animQuestCardsIn = function() {
  const cards = document.querySelectorAll('.quest-card');
  cards.forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(18px)';
    card.style.transition = `opacity 0.3s ${i * 0.05}s, transform 0.3s ${i * 0.05}s`;
    requestAnimationFrame(() => {
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    });
  });
};

// ─── HOOK INTO APP EVENTS ─────────────────────────────────────────────────────

// Store previous rank to detect rank-up
let _prevRankName = null;

window.addEventListener('DOMContentLoaded', () => {
  // Patch button clicks for tap sound + press animation
  document.addEventListener('click', e => {
    const btn = e.target.closest('button, .btn-complete, .nav-btn, .filter-btn, .chest-item');
    if (btn) {
      SFX.tap();
      animButtonPress(btn);
    }
    const chest = e.target.closest('.chest-item');
    if (chest) {
      SFX.chestOpen();
      animChestOpen(chest.querySelector('.chest-icon'));
    }
  });

  // Boot bar pulse
  animBootPulse();
});

// Called by app.js after full load
window.onAwakenAppReady = function(hunterName) {
  SFX.bootComplete();
  setTimeout(() => animDailyLogin(hunterName), 600);
};

// Called after quest complete
window.onQuestCompleted = function(btn) {
  SFX.questComplete();
  animQuestComplete(btn);
  animXPPulse();
};

// Called after rank changes
window.onRankChanged = function(newRankName) {
  if (_prevRankName && _prevRankName !== newRankName) {
    SFX.rankUp();
    setTimeout(() => animRankUp(newRankName), 200);
  }
  _prevRankName = newRankName;
};

// Called when badge unlocked
window.onBadgeUnlocked = function(name, icon, tier) {
  SFX.badgeUnlock();
  setTimeout(() => animBadgeUnlock(name, icon, tier), 300);
};

// Called on penalty
window.onPenalty = function() {
  SFX.penalty();
  animPenaltyShake();
};

// Called when purchase made
window.onPurchase = function() {
  SFX.purchase();
};

// Called when chest opened
window.onChestOpened = function() {
  SFX.chestOpen();
};

// Called when quests rendered
window.onQuestsRendered = function() {
  setTimeout(animQuestCardsIn, 50);
};

// Called when stats tab opened
window.onStatsOpened = function() {
  setTimeout(animStatCountUp, 200);
};
