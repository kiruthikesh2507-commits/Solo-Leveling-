/* ═══════════════════════════════════════════
   AWAKEN SYSTEM — APPLICATION LOGIC
   v2.0 — Local Quest Engine (No API Required)
   ═══════════════════════════════════════════ */

'use strict';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const RANKS = [
  { name: 'E-Rank',    short: 'E',   min: 55,   max: 119  },
  { name: 'D-Rank',    short: 'D',   min: 120,  max: 219  },
  { name: 'C-Rank',    short: 'C',   min: 220,  max: 399  },
  { name: 'B-Rank',    short: 'B',   min: 400,  max: 699  },
  { name: 'A-Rank',    short: 'A',   min: 700,  max: 1299 },
  { name: 'S-Rank',    short: 'S',   min: 1300, max: 1699 },
  { name: 'SS-Rank',   short: 'SS',  min: 1700, max: 2099 },
  { name: 'SSS-Rank',  short: 'SSS', min: 2100, max: 2399 },
  { name: '???-Rank',  short: '?',   min: 2400, max: 2599 },
  { name: 'DEMI GOD',  short: '∞',   min: 2600, max: Infinity },
];

const STATS_LIST = [
  'Strength','Intelligence','Dexterity','Charisma','Stamina',
  'Discipline','Speed','Durability','Agility','Wisdom','Appearance'
];

const STAT_ICONS = {
  Strength:'⚔', Intelligence:'📚', Dexterity:'🎯', Charisma:'🗣',
  Stamina:'💪', Discipline:'🔒', Speed:'⚡', Durability:'🛡',
  Agility:'🌀', Wisdom:'👁', Appearance:'✦'
};

const STAT_COLORS = {
  Strength:'#ef4444', Intelligence:'#3b82f6', Dexterity:'#f59e0b',
  Charisma:'#ec4899', Stamina:'#22c55e', Discipline:'#dc1428',
  Speed:'#06b6d4', Durability:'#a855f7', Agility:'#84cc16',
  Wisdom:'#f97316', Appearance:'#e879f9'
};

const SHOP_ITEMS = [
  { id:'cheat_day',       name:'Cheat Day Pass',         icon:'🎫', effect:'Skip all quests for one day without penalties',              cost:1000 },
  { id:'skip_quest',      name:'Skip a Quest',           icon:'⏭', effect:'Skip one daily quest without penalties',                     cost:350  },
  { id:'skip_day',        name:'Skip a Day',             icon:'📅', effect:'Skip an entire day without penalties',                      cost:1200 },
  { id:'half_day',        name:'Half-Day Break',         icon:'🌓', effect:'Complete only 4 daily quests instead of 8',                 cost:500  },
  { id:'second_chance',   name:'Second Chance',          icon:'🔄', effect:'Retry a failed quest without penalties',                    cost:600  },
  { id:'auto_complete',   name:'Auto-Complete',          icon:'⚡', effect:'Instantly complete one daily quest',                        cost:900  },
  { id:'rest_bonus',      name:'Rest Bonus',             icon:'💤', effect:'Take a full day off but gain 50% rewards',                  cost:950  },
  { id:'quest_delay',     name:'Quest Delay',            icon:'⏱', effect:'Postpone a quest until the next day',                       cost:400  },
  { id:'hard_work',       name:'Hard Work Pass',         icon:'🔥', effect:'Double quest rewards for one day',                         cost:1400 },
  { id:'swap_quest',      name:'Swap Quest',             icon:'🔁', effect:'Swap one daily quest for another',                         cost:300  },
  { id:'sp_skipper',      name:'Special Quest Skipper',  icon:'🎭', effect:'Skip a special quest without penalties',                    cost:1000 },
  { id:'easier_day',      name:'Easier Day',             icon:'🌤', effect:'Reduce difficulty of all quests for one day',              cost:850  },
  { id:'lucky_pass',      name:'Lucky Pass',             icon:'🍀', effect:'Skip one random quest but earn 50% rewards',               cost:700  },
  { id:'penalty_shield',  name:'Penalty Shield',         icon:'🛡', effect:'Prevent penalties from one failed quest',                  cost:1100 },
  { id:'task_booster',    name:'Task Booster',           icon:'✨', effect:'Double rewards of a single completed quest',               cost:800  },
  { id:'overdrive',       name:'Overdrive Mode',         icon:'💥', effect:'Triple rewards for one day but with harder quests',        cost:1800 },
  { id:'refresh_quests',  name:'Refresh Quests',         icon:'🔃', effect:'Reroll all daily quests once per day',                    cost:650  },
  { id:'reduced_effort',  name:'Reduced Effort Pass',    icon:'😌', effect:'Halve effort required for all quests today',              cost:900  },
  { id:'sleep_in',        name:'Sleep-In Pass',          icon:'🌙', effect:'Start quests later without penalty',                      cost:250  },
  { id:'double_rp',       name:'Double Rewards Pass',    icon:'💎', effect:'Double all RP earned for one day',                        cost:1500 },
  { id:'bonus_chest_key', name:'Bonus Chest Key',        icon:'🗝', effect:'Guarantee a Bonus Chest after completing daily quests',    cost:1600 },
  { id:'mystery_token',   name:'Mystery Reward Token',   icon:'❓', effect:'Exchange for a random special reward',                    cost:1200 },
  { id:'rp_multiplier',   name:'Stat Surge Token',       icon:'📈', effect:'Instantly gain +2 to every stat (one-time use)',         cost:1700 },
];

const CHEST_REWARDS = [
  { name:'RP Windfall',          value:'+100 RP',                   type:'rp',         amount:100 },
  { name:'RP Jackpot',           value:'+250 RP',                   type:'rp',         amount:250 },
  { name:'Stat Surge',           value:'+3 to a random stat',       type:'stat',       amount:3   },
  { name:'Double Surge',         value:'+5 to two random stats',    type:'multi_stat', amount:5   },
  { name:'Temporary Multiplier', value:'2x RP next quest',          type:'buff'                   },
  { name:'Quest Skip Token',     value:'Skip 1 quest free',         type:'item',       itemId:'skip_quest' },
  { name:'Mystery Reward',       value:'Surprise incoming',         type:'mystery'                },
  { name:'Bonus RP',             value:'+75 RP',                    type:'rp',         amount:75  },
];

// ─── WORKOUT SPLIT DEFINITIONS ────────────────────────────────────────────────

const SPLITS = {
  ppl: {
    label: 'PPL (Push / Pull / Legs)',
    defaultDays: 6,
    cycle: [
      { label: 'Push Day',  muscles: ['chest','shoulders','triceps'] },
      { label: 'Pull Day',  muscles: ['back','biceps','forearms']    },
      { label: 'Leg Day',   muscles: ['quads','hamstrings','glutes','calves'] },
      { label: 'Push Day',  muscles: ['chest','shoulders','triceps'] },
      { label: 'Pull Day',  muscles: ['back','biceps','forearms']    },
      { label: 'Leg Day',   muscles: ['quads','hamstrings','glutes','calves'] },
    ],
  },
  brosplit: {
    label: 'Bro Split',
    defaultDays: 5,
    cycle: [
      { label: 'Chest Day',        muscles: ['chest']               },
      { label: 'Back Day',         muscles: ['back']                },
      { label: 'Shoulder Day',     muscles: ['shoulders']           },
      { label: 'Arms Day',         muscles: ['biceps','triceps','forearms'] },
      { label: 'Leg Day',          muscles: ['quads','hamstrings','glutes','calves'] },
    ],
  },
  upperlower: {
    label: 'Upper / Lower',
    defaultDays: 4,
    cycle: [
      { label: 'Upper Body', muscles: ['chest','back','shoulders'] },
      { label: 'Lower Body', muscles: ['quads','hamstrings','glutes','calves'] },
      { label: 'Upper Body', muscles: ['chest','back','shoulders'] },
      { label: 'Lower Body', muscles: ['quads','hamstrings','glutes','calves'] },
    ],
  },
  fullbody: {
    label: 'Full Body',
    defaultDays: 3,
    cycle: [
      { label: 'Full Body A', muscles: ['fullbody'] },
      { label: 'Full Body B', muscles: ['fullbody'] },
      { label: 'Full Body C', muscles: ['fullbody'] },
    ],
  },
  apphandle: {
    label: 'Let App Decide',
    defaultDays: 5,
    cycle: [
      { label: 'Chest & Triceps', muscles: ['chest','triceps']    },
      { label: 'Back & Biceps',   muscles: ['back','biceps']      },
      { label: 'Leg Day',         muscles: ['quads','hamstrings','glutes'] },
      { label: 'Shoulder & Core', muscles: ['shoulders','core']   },
      { label: 'Full Body',       muscles: ['fullbody']           },
    ],
  },
};

const MUSCLE_LABELS = {
  chest:'Chest', back:'Back', shoulders:'Shoulders', biceps:'Biceps',
  triceps:'Triceps', forearms:'Forearms', quads:'Quads', hamstrings:'Hamstrings',
  glutes:'Glutes', calves:'Calves', core:'Core / Abs', fullbody:'Full Body'
};

// ─── STATE ────────────────────────────────────────────────────────────────────

let STATE = {
  hunter: null,
  stats: null,
  rp: 0,
  quests: [],
  inventory: [],
  streak: 0,
  lastQuestDate: null,
  rpTodayEarned: 0,
  statsTodayGained: 0,
  questsCompleted: 0,
  bonusChests: [],
  penaltyDays: 0,
  theme: 'dark',
  activeFilter: 'all',
  activeTab: 'dashboard',
};

// ─── INIT ─────────────────────────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  if (STATE.hunter) {
    runBootSequence(() => showApp());
  } else {
    runBootSequence(() => showOnboarding());
  }
  applyTheme(STATE.theme);
  registerSW();
});

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

// ─── BOOT ─────────────────────────────────────────────────────────────────────

function runBootSequence(callback) {
  const bar = document.getElementById('bootBar');
  const status = document.getElementById('bootStatus');
  const msgs = [
    'INITIALIZING SYSTEM...', 'LOADING HUNTER DATABASE...',
    'CALIBRATING QUEST ENGINE...', 'LOADING 10,000 MISSIONS...',
    'RANK ASSESSMENT LOADING...', 'SYSTEM READY.'
  ];
  let progress = 0; let msgIdx = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    bar.style.width = progress + '%';
    const newIdx = Math.floor((progress / 100) * msgs.length);
    if (newIdx !== msgIdx && newIdx < msgs.length) { msgIdx = newIdx; status.textContent = msgs[msgIdx]; }
    if (progress >= 100) { setTimeout(() => { showScreen('onboarding'); setTimeout(callback, 100); }, 500); }
  }, 120);
  showScreen('boot');
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + name);
  if (el) el.classList.add('active');
}

function showApp() {
  showScreen('app');
  syncUI();
  checkDailyReset();
  checkPenalty();
  renderShop();
  renderStats();
  renderRankTable();
  // Feature: check achievements on load
  if (typeof checkAchievements === 'function') setTimeout(checkAchievements, 200);
  if (typeof renderAchievements === 'function') setTimeout(renderAchievements, 300);
}

function showOnboarding() {
  showScreen('onboarding');
  currentStep = 1;
  totalSteps = 6;
  renderOnboardingStep(1);
  injectWorkoutSteps();
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────

let currentStep = 1;
let totalSteps = 6;
let selectedTheme = 'dark';
let selectedSplit = '';
let customSchedule = {}; // { Mon: [muscles], Tue: [muscles], ... }

window.selectTheme = function(theme) {
  selectedTheme = theme;
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === theme);
  });
  applyTheme(theme);
};

// Inject the two new onboarding steps (4a: workout setup, 4b: day assignment)
function injectWorkoutSteps() {
  const container = document.querySelector('.onboard-container');
  const nav = container.querySelector('.onboard-nav');

  // Update step indicator to 6 steps
  const stepsIndicator = container.querySelector('.steps-indicator');
  stepsIndicator.innerHTML = '';
  for (let i = 1; i <= 6; i++) {
    const dot = document.createElement('div');
    dot.className = 'step-dot' + (i === 1 ? ' active' : '');
    dot.dataset.step = i;
    stepsIndicator.appendChild(dot);
    if (i < 6) {
      const line = document.createElement('div');
      line.className = 'step-line';
      stepsIndicator.appendChild(line);
    }
  }

  // Confirmation step is already data-step="6" in HTML, no renaming needed

  // Step 4: Workout Environment + Split
  const step4 = document.createElement('div');
  step4.className = 'onboard-step';
  step4.dataset.step = '4';
  step4.innerHTML = `
    <div class="step-label">STEP 04 / WORKOUT SETUP</div>

    <div class="form-group">
      <label class="form-label">WHERE DO YOU PRIMARILY TRAIN?</label>
      <div class="radio-group">
        <label class="radio-item">
          <input type="radio" name="workoutEnv" value="gym" />
          <span>🏋️ Gym — Access to all equipment</span>
        </label>
        <label class="radio-item">
          <input type="radio" name="workoutEnv" value="calisthenics" />
          <span>🤸 Outdoors / Calisthenics — Bars, bodyweight, parks</span>
        </label>
        <label class="radio-item">
          <input type="radio" name="workoutEnv" value="home" />
          <span>🏠 Home — No equipment</span>
        </label>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">WORKOUT SPLIT</label>
      <div class="radio-group" id="splitOptions">
        <label class="radio-item">
          <input type="radio" name="workoutSplit" value="ppl" onchange="onSplitChange(this.value)" />
          <span>PPL — Push / Pull / Legs (6 days)</span>
        </label>
        <label class="radio-item">
          <input type="radio" name="workoutSplit" value="brosplit" onchange="onSplitChange(this.value)" />
          <span>Bro Split — One muscle per day (5 days)</span>
        </label>
        <label class="radio-item">
          <input type="radio" name="workoutSplit" value="upperlower" onchange="onSplitChange(this.value)" />
          <span>Upper / Lower (4 days)</span>
        </label>
        <label class="radio-item">
          <input type="radio" name="workoutSplit" value="fullbody" onchange="onSplitChange(this.value)" />
          <span>Full Body (3 days)</span>
        </label>
        <label class="radio-item">
          <input type="radio" name="workoutSplit" value="apphandle" onchange="onSplitChange(this.value)" />
          <span>Let the App Decide (5 days)</span>
        </label>
      </div>
    </div>

    <div class="form-group" id="daysPerWeekGroup" style="display:none">
      <label class="form-label">WORKOUT DAYS PER WEEK</label>
      <div class="radio-group days-row">
        ${[3,4,5,6,7].map(d => `
          <label class="radio-item-inline">
            <input type="radio" name="daysPerWeek" value="${d}" />
            <span>${d} days</span>
          </label>`).join('')}
      </div>
    </div>
  `;

  // Step 5: Day-by-day muscle assignment
  const step5 = document.createElement('div');
  step5.className = 'onboard-step';
  step5.dataset.step = '5';
  step5.innerHTML = `
    <div class="step-label">STEP 05 / TRAINING SCHEDULE</div>
    <div class="schedule-info">Assign your muscles to each day. Leave a day blank for rest.</div>
    <div id="dayAssignmentGrid" class="day-assignment-grid"></div>
  `;

  // Insert steps 4, 5 before nav; step 6 is already in HTML before nav
  const step6 = document.querySelector('.onboard-step[data-step="6"]');
  container.insertBefore(step4, step6);
  container.insertBefore(step5, step6);
}

window.onSplitChange = function(splitVal) {
  selectedSplit = splitVal;
  const daysGroup = document.getElementById('daysPerWeekGroup');
  daysGroup.style.display = 'block';

  // Pre-select default days for this split
  const def = SPLITS[splitVal]?.defaultDays || 5;
  document.querySelectorAll('input[name="daysPerWeek"]').forEach(r => {
    r.checked = parseInt(r.value) === def;
  });
};

// ─── TAP BUTTON OPTIONS FOR DAY ASSIGNMENT ───────────────────────────────────
const DAY_OPTIONS = [
  { label: '🛌 Rest',       value: 'rest',                  muscles: null },
  { label: '💪 Push',       value: 'chest+shoulders+triceps', muscles: ['chest','shoulders','triceps'] },
  { label: '🔙 Pull',       value: 'back+biceps',            muscles: ['back','biceps'] },
  { label: '🦵 Legs',       value: 'quads+hamstrings+glutes', muscles: ['quads','hamstrings','glutes'] },
  { label: '🏋 Chest',      value: 'chest',                  muscles: ['chest'] },
  { label: '🔗 Back',       value: 'back',                   muscles: ['back'] },
  { label: '🔼 Shoulders',  value: 'shoulders',              muscles: ['shoulders'] },
  { label: '💥 Arms',       value: 'biceps+triceps',         muscles: ['biceps','triceps'] },
  { label: '⚡ Full Body',  value: 'fullbody',               muscles: ['fullbody'] },
  { label: '🧘 Core',       value: 'core',                   muscles: ['core'] },
];

function buildDayAssignmentGrid() {
  const grid = document.getElementById('dayAssignmentGrid');
  if (!grid) return;

  const split = document.querySelector('input[name="workoutSplit"]:checked')?.value || 'apphandle';
  const daysPerWeek = parseInt(document.querySelector('input[name="daysPerWeek"]:checked')?.value || '5');
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const splitCycle = SPLITS[split]?.cycle || SPLITS.apphandle.cycle;

  // Build default schedule from split
  let cycleIdx = 0;
  const defaults = days.map((day, i) => {
    const isWorkoutDay = i < daysPerWeek;
    const splitDay = isWorkoutDay ? splitCycle[cycleIdx++ % splitCycle.length] : null;
    return splitDay ? splitDay.muscles[0] : 'rest';
  });

  grid.innerHTML = `
    <style>
      .day-btn-row { display:flex; flex-direction:column; gap:0.6rem; margin-bottom:0.5rem; }
      .day-btn-header { display:flex; align-items:center; gap:0.8rem; }
      .day-btn-label { font-family:var(--font-main); font-size:0.75rem; color:var(--accent); font-weight:700; width:2.5rem; flex-shrink:0; }
      .day-selected-val { font-size:0.8rem; color:var(--text); font-family:var(--font-main); }
      .day-btn-options { display:flex; flex-wrap:wrap; gap:0.4rem; }
      .day-opt-btn { padding:0.35rem 0.65rem; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text-muted); font-size:0.75rem; font-family:var(--font-main); cursor:pointer; transition:all 0.15s; white-space:nowrap; }
      .day-opt-btn.active { border-color:var(--accent); background:rgba(220,20,40,0.15); color:var(--accent); font-weight:700; }
    </style>
    ${days.map((day, i) => {
      const defaultVal = defaults[i] || 'rest';
      const defaultOpt = DAY_OPTIONS.find(o => o.value === defaultVal) || DAY_OPTIONS[0];
      return `
        <div class="day-btn-row">
          <div class="day-btn-header">
            <div class="day-btn-label">${day.substring(0,3).toUpperCase()}</div>
            <div class="day-selected-val" id="sel-${day}">${defaultOpt.label}</div>
          </div>
          <div class="day-btn-options">
            ${DAY_OPTIONS.map(opt => `
              <button type="button"
                class="day-opt-btn${opt.value === defaultVal ? ' active' : ''}"
                onclick="onDayBtnClick('${day}', '${opt.value}', this)">
                ${opt.label}
              </button>`).join('')}
          </div>
        </div>`;
    }).join('')}
  `;

  // Set initial custom schedule
  days.forEach((day, i) => {
    const val = defaults[i] || 'rest';
    const opt = DAY_OPTIONS.find(o => o.value === val);
    customSchedule[day] = opt ? opt.muscles : null;
  });
}

window.onDayBtnClick = function(day, val, btn) {
  // Update active button style
  const row = btn.closest('.day-btn-row');
  row.querySelectorAll('.day-opt-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Update label
  const opt = DAY_OPTIONS.find(o => o.value === val);
  const sel = document.getElementById('sel-' + day);
  if (sel && opt) sel.textContent = opt.label;

  // Update schedule
  customSchedule[day] = opt ? opt.muscles : null;
};

// Keep onDayChange for backward compat
window.onDayChange = function() {};

function renderOnboardingStep(step) {
  document.querySelectorAll('.onboard-step').forEach(s => s.classList.remove('active'));
  const el = document.querySelector(`.onboard-step[data-step="${step}"]`);
  if (el) el.classList.add('active');
  // Scroll onboarding container to top so content is always visible
  const container = document.querySelector('.onboard-container');
  if (container) container.scrollTop = 0;

  document.querySelectorAll('.step-dot').forEach(d => {
    const n = parseInt(d.dataset.step);
    d.classList.toggle('active', n === step);
    d.classList.toggle('done', n < step);
  });

  document.getElementById('btnBack').style.display = step > 1 ? 'block' : 'none';
  document.getElementById('btnNext').textContent = step === totalSteps ? 'BEGIN ▶' : 'NEXT ▶';

  if (step === 5) buildDayAssignmentGrid();
  if (step === totalSteps) buildConfirmData();
}

function buildConfirmData() {
  const name = document.getElementById('ob-name').value || 'Unknown';
  const age = document.getElementById('ob-age').value || '—';
  const gender = document.getElementById('ob-gender').value || '—';
  const fitness = document.querySelector('input[name="fitness"]:checked')?.value || '—';
  const goals = [...document.querySelectorAll('input[name="goals"]:checked')].map(g => g.value).join(', ') || '—';
  const workoutEnv = document.querySelector('input[name="workoutEnv"]:checked')?.value || '—';
  const split = document.querySelector('input[name="workoutSplit"]:checked')?.value || '—';
  const days = document.querySelector('input[name="daysPerWeek"]:checked')?.value || '—';

  const envLabels = { gym:'🏋️ Gym', calisthenics:'🤸 Calisthenics', home:'🏠 Home' };
  const splitLabel = SPLITS[split]?.label || split;

  const cd = document.getElementById('confirmData');
  cd.innerHTML = [
    ['NAME', name], ['AGE', age], ['GENDER', gender],
    ['FITNESS', fitness], ['GOALS', goals],
    ['TRAINING ENV', envLabels[workoutEnv] || workoutEnv],
    ['SPLIT', splitLabel], ['DAYS/WEEK', days + ' days']
  ].map(([l, v]) => `<div class="confirm-row"><span class="confirm-row-label">${l}</span><span class="confirm-row-val">${v}</span></div>`).join('');
}

window.onboardNext = function() {
  if (!validateStep(currentStep)) return;
  if (currentStep === totalSteps) { completeOnboarding(); return; }
  currentStep++;
  renderOnboardingStep(currentStep);
};

window.onboardBack = function() {
  if (currentStep > 1) { currentStep--; renderOnboardingStep(currentStep); }
};

function validateStep(step) {
  if (step === 1) {
    if (!document.getElementById('ob-name').value.trim()) { showToast('Enter your Hunter Name', 'error'); return false; }
    if (!document.getElementById('ob-age').value) { showToast('Enter your age', 'error'); return false; }
    if (!document.getElementById('ob-gender').value) { showToast('Select your gender', 'error'); return false; }
  }
  if (step === 2) {
    if (!document.getElementById('ob-height').value) { showToast('Enter your height', 'error'); return false; }
    if (!document.getElementById('ob-weight').value) { showToast('Enter your weight', 'error'); return false; }
    if (!document.querySelector('input[name="activity"]:checked')) { showToast('Select activity level', 'error'); return false; }
    if (!document.querySelector('input[name="fitness"]:checked')) { showToast('Select fitness level', 'error'); return false; }
  }
  if (step === 3) {
    if (!document.querySelectorAll('input[name="goals"]:checked').length) { showToast('Select at least one goal', 'error'); return false; }
    if (!document.querySelector('input[name="freetime"]:checked')) { showToast('Select daily free time', 'error'); return false; }
  }
  if (step === 4) {
    if (!document.querySelector('input[name="workoutEnv"]:checked')) { showToast('Select where you train', 'error'); return false; }
    if (!document.querySelector('input[name="workoutSplit"]:checked')) { showToast('Select a workout split', 'error'); return false; }
    if (!document.querySelector('input[name="daysPerWeek"]:checked')) { showToast('Select days per week', 'error'); return false; }
  }
  if (step === totalSteps) {
    if (!document.getElementById('ob-accept').checked) { showToast('You must accept the System terms', 'error'); return false; }
  }
  return true;
}

function completeOnboarding() {
  const goals = [...document.querySelectorAll('input[name="goals"]:checked')].map(g => g.value);
  const workoutEnv = document.querySelector('input[name="workoutEnv"]:checked')?.value || 'home';
  const workoutSplit = document.querySelector('input[name="workoutSplit"]:checked')?.value || 'apphandle';
  const daysPerWeek = document.querySelector('input[name="daysPerWeek"]:checked')?.value || '5';

  STATE.hunter = {
    name:        document.getElementById('ob-name').value.trim(),
    age:         document.getElementById('ob-age').value,
    gender:      document.getElementById('ob-gender').value,
    height:      document.getElementById('ob-height').value,
    weight:      document.getElementById('ob-weight').value,
    activity:    document.querySelector('input[name="activity"]:checked')?.value,
    fitness:     document.querySelector('input[name="fitness"]:checked')?.value || 'intermediate',
    goals:       goals,
    freetime:    document.querySelector('input[name="freetime"]:checked')?.value,
    wakeup:      document.getElementById('ob-wakeup').value,
    sleep:       document.getElementById('ob-sleep').value,
    workoutEnv:  workoutEnv,
    workoutSplit:workoutSplit,
    daysPerWeek: daysPerWeek,
    customSchedule: customSchedule,
    startDate:   new Date().toISOString(),
  };

  STATE.stats = {};
  STATS_LIST.forEach(s => STATE.stats[s] = 5);
  STATE.rp = 0;
  STATE.theme = selectedTheme;
  saveState();
  applyTheme(selectedTheme);
  showApp();
}

// ─── THEME ────────────────────────────────────────────────────────────────────

function applyTheme(theme) {
  document.body.classList.toggle('dark-mode', theme === 'dark');
  document.body.classList.toggle('light-mode', theme === 'light');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#f5f5f5');
}

window.toggleTheme = function() {
  STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
  applyTheme(STATE.theme);
  saveState();
  document.querySelectorAll('.icon-btn').forEach(b => {
    if (b.textContent.trim() === '☀' || b.textContent.trim() === '🌙') b.textContent = STATE.theme === 'dark' ? '☀' : '🌙';
  });
  showToast(STATE.theme === 'dark' ? 'DARK MODE ACTIVATED' : 'LIGHT MODE ACTIVATED');
};

// ─── TAB SYSTEM ───────────────────────────────────────────────────────────────

window.switchTab = function(tab) {
  STATE.activeTab = tab;
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const tc = document.getElementById('tab-' + tab);
  const nb = document.querySelector(`.nav-btn[data-tab="${tab}"]`);
  if (tc) tc.classList.add('active');
  if (nb) nb.classList.add('active');
  if (tab === 'stats')        { renderStats(); renderRankTable(); }
  if (tab === 'shop')         { renderShop(); }
  if (tab === 'inventory')    { renderInventory(); }
  if (tab === 'quests')       { renderQuests(); }
  if (tab === 'achievements') {
    if (typeof renderAchievements === 'function') renderAchievements();
    else setTimeout(() => { if (typeof renderAchievements === 'function') renderAchievements(); }, 100);
  }
};

// ─── QUEST GENERATION (LOCAL) ─────────────────────────────────────────────────

window.generateDailyQuests = function() {
  const today = getTodayStr();
  if (STATE.lastQuestDate === today && STATE.quests.length > 0) {
    showToast('QUESTS ALREADY ASSIGNED FOR TODAY', 'error');
    switchTab('quests');
    return;
  }

  const rankName = getCurrentRank().name;
  const quests = generateQuestsLocally(STATE.hunter, rankName);

  STATE.quests = quests;
  STATE.lastQuestDate = today;
  STATE.rpTodayEarned = 0;
  STATE.statsTodayGained = 0;
  STATE.questsCompleted = 0;
  saveState();
  syncUI();
  renderQuests();
  switchTab('quests');
  showToast('MISSIONS ASSIGNED. BEGIN YOUR HUNT.', 'success');
};

// ─── QUEST COMPLETION ─────────────────────────────────────────────────────────

window.completeQuest = function(questId) {
  const quest = STATE.quests.find(q => q.id === questId);
  if (!quest || quest.completed) return;
  quest.completed = true;

  let rpGain = quest.rp;
  let statGain = quest.statGain;

  if (STATE.activeEffects?.doubleRewards) { rpGain *= 2; statGain *= 2; }
  if (STATE.activeEffects?.taskBooster)   { rpGain *= 2; statGain *= 2; STATE.activeEffects.taskBooster = false; }

  STATE.rp += rpGain;
  STATE.stats[quest.stat] = (STATE.stats[quest.stat] || 5) + statGain;
  STATE.rpTodayEarned += rpGain;
  STATE.statsTodayGained += statGain;
  STATE.questsCompleted++;

  const chestChance = 0.10 + (getTotalStats() / 10000);
  let bonusChest = null;
  if (Math.random() < chestChance || STATE.activeEffects?.guaranteeChest) {
    bonusChest = { id: 'chest_' + Date.now(), reward: CHEST_REWARDS[Math.floor(Math.random() * CHEST_REWARDS.length)] };
    STATE.bonusChests.push(bonusChest);
    if (STATE.activeEffects?.guaranteeChest) STATE.activeEffects.guaranteeChest = false;
  }

  saveState(); syncUI(); renderQuests();
  showQuestCompleteModal(quest, rpGain, statGain, bonusChest);
};

window.openChest = function(chestId) {
  const idx = STATE.bonusChests.findIndex(c => c.id === chestId);
  if (idx === -1) return;
  const chest = STATE.bonusChests.splice(idx, 1)[0];
  const r = chest.reward;

  if (r.type === 'rp') {
    STATE.rp += r.amount;
  } else if (r.type === 'stat') {
    const stat = STATS_LIST[Math.floor(Math.random() * STATS_LIST.length)];
    STATE.stats[stat] = (STATE.stats[stat] || 5) + r.amount;
  } else if (r.type === 'multi_stat') {
    for (let i = 0; i < 2; i++) {
      const stat = STATS_LIST[Math.floor(Math.random() * STATS_LIST.length)];
      STATE.stats[stat] = (STATE.stats[stat] || 5) + r.amount;
    }
  } else if (r.type === 'item') {
    addToInventory(r.itemId, 1);
  }

  saveState(); syncUI();
  showChestModal(r);
};

// ─── SHOP ─────────────────────────────────────────────────────────────────────

function renderShop() {
  const grid = document.getElementById('shopGrid');
  document.getElementById('shopRP').textContent = STATE.rp;
  grid.innerHTML = SHOP_ITEMS.map(item => `
    <div class="shop-item">
      <div class="shop-item-icon">${item.icon}</div>
      <div class="shop-item-name">${item.name}</div>
      <div class="shop-item-effect">${item.effect}</div>
      <div class="shop-item-cost"><span class="shop-item-cost-icon">◆</span> ${item.cost}</div>
      <button class="btn-buy" onclick="purchaseItem('${item.id}')" ${STATE.rp < item.cost ? 'disabled' : ''}>
        ${STATE.rp >= item.cost ? 'PURCHASE' : 'INSUFFICIENT RP'}
      </button>
    </div>`).join('');
}

window.purchaseItem = function(itemId) {
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return;
  if (STATE.rp < item.cost) { showToast('INSUFFICIENT RP', 'error'); return; }
  STATE.rp -= item.cost;
  addToInventory(itemId, 1);
  saveState(); syncUI(); renderShop(); renderInventory();
  showToast(`${item.name} ACQUIRED`, 'gold');
};

// ─── INVENTORY ────────────────────────────────────────────────────────────────

function addToInventory(itemId, qty) {
  const existing = STATE.inventory.find(i => i.id === itemId);
  if (existing) existing.qty += qty;
  else STATE.inventory.push({ id: itemId, qty });
}

function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  if (!STATE.inventory.length) {
    grid.innerHTML = `<div class="empty-inventory"><div class="empty-icon">▣</div><div>NO ITEMS IN INVENTORY</div><div class="empty-sub">Purchase items from the Shop</div></div>`;
    return;
  }
  grid.innerHTML = STATE.inventory.map(inv => {
    const item = SHOP_ITEMS.find(i => i.id === inv.id);
    if (!item) return '';
    return `<div class="inv-item">
      <div class="inv-item-qty">${inv.qty}</div>
      <div class="inv-item-icon">${item.icon}</div>
      <div class="inv-item-name">${item.name}</div>
      <button class="btn-use-inv" onclick="useItem('${inv.id}')">USE</button>
    </div>`;
  }).join('');
}

window.useItem = function(itemId) {
  const invItem = STATE.inventory.find(i => i.id === itemId);
  if (!invItem || invItem.qty <= 0) return;
  const shopItem = SHOP_ITEMS.find(i => i.id === itemId);
  if (!shopItem) return;
  if (!STATE.activeEffects) STATE.activeEffects = {};

  switch(itemId) {
    case 'skip_quest':    skipOneRandomQuest(); break;
    case 'cheat_day':
    case 'skip_day':      skipAllQuests(); break;
    case 'half_day':      activateHalfDay(); break;
    case 'double_rp':     STATE.activeEffects.doubleRewards = true; showToast('DOUBLE RP ACTIVATED'); break;
    case 'rp_multiplier':
      STATS_LIST.forEach(s => { STATE.stats[s] = (STATE.stats[s] || 5) + 2; });
      renderStats(); showToast('+2 TO ALL STATS!', 'success'); break;
    case 'hard_work':     STATE.activeEffects.doubleRewards = true; showToast('HARD WORK MODE: 2X REWARDS'); break;
    case 'task_booster':  STATE.activeEffects.taskBooster = true; showToast('TASK BOOSTER READY'); break;
    case 'bonus_chest_key': STATE.activeEffects.guaranteeChest = true; showToast('NEXT QUEST GUARANTEES A CHEST', 'gold'); break;
    case 'refresh_quests': STATE.quests = []; STATE.lastQuestDate = null; window.generateDailyQuests(); break;
    case 'swap_quest':    swapRandomQuest(); break;
    case 'auto_complete': autoCompleteOneQuest(); break;
    default: showToast(shopItem.name + ' ACTIVATED'); break;
  }

  invItem.qty--;
  if (invItem.qty <= 0) STATE.inventory = STATE.inventory.filter(i => i.id !== itemId);
  saveState(); renderInventory(); syncUI();
};

function skipOneRandomQuest() {
  const pending = STATE.quests.filter(q => !q.completed && q.type === 'daily');
  if (!pending.length) { showToast('NO PENDING QUESTS TO SKIP', 'error'); return; }
  pending[0].completed = true; pending[0].skipped = true;
  saveState(); renderQuests(); showToast('QUEST SKIPPED');
}

function skipAllQuests() {
  STATE.quests.forEach(q => { q.completed = true; q.skipped = true; });
  saveState(); renderQuests(); showToast('ALL QUESTS SKIPPED FOR TODAY');
}

function activateHalfDay() {
  const daily = STATE.quests.filter(q => q.type === 'daily' && !q.completed);
  daily.slice(4).forEach(q => { q.completed = true; q.skipped = true; });
  saveState(); renderQuests(); showToast('HALF-DAY ACTIVATED: 4 QUESTS REMAIN');
}

function swapRandomQuest() {
  const pending = STATE.quests.filter(q => !q.completed && q.type === 'daily');
  if (!pending.length) { showToast('NO QUESTS TO SWAP', 'error'); return; }

  // Generate one replacement quest
  const rankName = getCurrentRank().name;
  const hunter = STATE.hunter;
  const usedNames = STATE.quests.map(q => q.name);
  const muscles = ['core','fullbody','chest','back'];
  const muscle = muscles[Math.floor(Math.random() * muscles.length)];
  const newOnes = pickQuestsForMuscle(muscle, hunter.fitness, rankName, hunter.workoutEnv, 1, usedNames);

  if (newOnes.length) {
    const idx = STATE.quests.indexOf(pending[0]);
    STATE.quests[idx] = { ...newOnes[0], type: 'daily' };
  }

  saveState(); renderQuests(); showToast('QUEST SWAPPED');
}

function autoCompleteOneQuest() {
  const pending = STATE.quests.filter(q => !q.completed);
  if (!pending.length) { showToast('ALL QUESTS DONE', 'success'); return; }
  window.completeQuest(pending[0].id);
  showToast('AUTO-COMPLETE USED');
}

// ─── STATS RENDERING ──────────────────────────────────────────────────────────

function renderStats() {
  const grid = document.getElementById('statsGrid');
  if (!STATE.stats) return;
  grid.innerHTML = STATS_LIST.map(stat => {
    const val = STATE.stats[stat] || 5;
    const maxForBar = Math.max(50, val + 20);
    const pct = Math.min(100, (val / maxForBar) * 100);
    return `<div class="stat-row">
      <div class="stat-name-col">
        <span style="color:${STAT_COLORS[stat]}">${STAT_ICONS[stat]}</span>
        <span class="stat-name"> ${stat}</span>
      </div>
      <div class="stat-bar-col">
        <div class="stat-bar-track">
          <div class="stat-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,${STAT_COLORS[stat]}88,${STAT_COLORS[stat]})"></div>
        </div>
      </div>
      <div class="stat-val-col" style="color:${STAT_COLORS[stat]}">${val}</div>
    </div>`;
  }).join('');
}

function renderRankTable() {
  const total = getTotalStats();
  const rt = document.getElementById('rankTable');
  rt.innerHTML = RANKS.map(r => {
    const achieved = total >= r.max;
    const current  = total >= r.min && total < r.max;
    let cls = ''; let badge = '';
    if (current)  { cls = 'current';  badge = '<span class="rank-status-badge current">CURRENT</span>'; }
    else if (achieved) { cls = 'achieved'; badge = '<span class="rank-status-badge achieved">✓</span>'; }
    else { badge = '<span class="rank-status-badge locked">LOCKED</span>'; }
    return `<div class="rank-row ${cls}">
      <span class="rank-name">${r.name}</span>
      <span class="rank-req">${r.min}+ pts</span>
      ${badge}
    </div>`;
  }).join('');
}

function renderMiniStats() {
  const container = document.getElementById('miniStats');
  if (!STATE.stats || !container) return;

  // Ensure chart type preference exists
  if (!STATE.statChartType) STATE.statChartType = 'radar';

  container.innerHTML = `
    <div class="chart-toggle-row">
      <button class="chart-type-btn${STATE.statChartType === 'radar' ? ' active' : ''}" onclick="setStatChart('radar')">◈ RADAR</button>
      <button class="chart-type-btn${STATE.statChartType === 'bar'   ? ' active' : ''}" onclick="setStatChart('bar')">▦ BAR</button>
      <button class="chart-type-btn${STATE.statChartType === 'pie'   ? ' active' : ''}" onclick="setStatChart('pie')">◉ PIE</button>
    </div>
    <canvas id="statChart" width="320" height="260" style="display:block;margin:0 auto;max-width:100%"></canvas>
  `;

  drawStatChart();
}

window.setStatChart = function(type) {
  STATE.statChartType = type;
  saveState();
  renderMiniStats();
};

function drawStatChart() {
  const canvas = document.getElementById('statChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const type = STATE.statChartType || 'radar';
  const stats = STATS_LIST.map(s => ({ name: s, val: STATE.stats[s] || 5, color: STAT_COLORS[s], icon: STAT_ICONS[s] }));
  const isDark = STATE.theme !== 'light';
  const textColor = isDark ? '#ccc' : '#333';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const accentColor = '#dc1428';

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (type === 'radar') drawRadarChart(ctx, canvas, stats, textColor, gridColor, accentColor, isDark);
  else if (type === 'bar') drawBarChart(ctx, canvas, stats, textColor, gridColor, isDark);
  else if (type === 'pie') drawPieChart(ctx, canvas, stats, textColor, isDark);
}

function drawRadarChart(ctx, canvas, stats, textColor, gridColor, accentColor, isDark) {
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2 - 10;
  const R = Math.min(W, H) * 0.32;
  const n = stats.length;
  const maxVal = Math.max(...stats.map(s => s.val), 20);

  // Draw grid rings
  [0.25, 0.5, 0.75, 1].forEach(frac => {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * R * frac;
      const y = cy + Math.sin(angle) * R * frac;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Draw axes
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw filled polygon
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const frac = stats[i].val / maxVal;
    const x = cx + Math.cos(angle) * R * frac;
    const y = cy + Math.sin(angle) * R * frac;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = isDark ? 'rgba(220,20,40,0.25)' : 'rgba(220,20,40,0.15)';
  ctx.fill();
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw dots & labels
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const frac = stats[i].val / maxVal;
    const px = cx + Math.cos(angle) * R * frac;
    const py = cy + Math.sin(angle) * R * frac;

    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = stats[i].color;
    ctx.fill();

    // Label
    const lx = cx + Math.cos(angle) * (R + 18);
    const ly = cy + Math.sin(angle) * (R + 18);
    ctx.font = '9px Rajdhani, sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(stats[i].icon + ' ' + stats[i].val, lx, ly);
  }

  // Stat name legend at bottom
  ctx.font = '8px Rajdhani, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  ctx.fillText('[ STAT RADAR ]', cx, H - 8);
}

function drawBarChart(ctx, canvas, stats, textColor, gridColor, isDark) {
  const W = canvas.width, H = canvas.height;
  const padL = 30, padR = 10, padT = 14, padB = 60;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = Math.max(...stats.map(s => s.val), 20);
  const barW = chartW / stats.length;

  // Grid lines
  [0.25, 0.5, 0.75, 1].forEach(frac => {
    const y = padT + chartH * (1 - frac);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(padL + chartW, y);
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.font = '8px Rajdhani, sans-serif';
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(maxVal * frac), padL - 3, y + 3);
  });

  // Bars
  stats.forEach((s, i) => {
    const barH = (s.val / maxVal) * chartH;
    const x = padL + i * barW + barW * 0.15;
    const y = padT + chartH - barH;
    const bw = barW * 0.7;

    // Gradient bar
    const grad = ctx.createLinearGradient(x, y + barH, x, y);
    grad.addColorStop(0, s.color + '44');
    grad.addColorStop(1, s.color);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x, y, bw, barH, [3, 3, 0, 0]) : ctx.rect(x, y, bw, barH);
    ctx.fill();

    // Value label above bar
    ctx.font = 'bold 9px Rajdhani, sans-serif';
    ctx.fillStyle = s.color;
    ctx.textAlign = 'center';
    ctx.fillText(s.val, x + bw / 2, y - 4);

    // Icon below bar
    ctx.font = '11px serif';
    ctx.fillStyle = textColor;
    ctx.fillText(s.icon, x + bw / 2, padT + chartH + 14);

    // Name below icon (abbreviated)
    ctx.font = '7.5px Rajdhani, sans-serif';
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
    ctx.fillText(s.name.substring(0, 3).toUpperCase(), x + bw / 2, padT + chartH + 28);
  });
}

function drawPieChart(ctx, canvas, stats, textColor, isDark) {
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2 - 10;
  const R = Math.min(W, H) * 0.3;
  const total = stats.reduce((a, s) => a + s.val, 0);

  let startAngle = -Math.PI / 2;
  stats.forEach((s, i) => {
    const slice = (s.val / total) * Math.PI * 2;
    const endAngle = startAngle + slice;
    const mid = startAngle + slice / 2;

    // Slice
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = s.color + (isDark ? 'cc' : 'dd');
    ctx.fill();
    ctx.strokeStyle = isDark ? '#111' : '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label outside for larger slices
    const pct = (s.val / total * 100).toFixed(0);
    if (slice > 0.25) {
      const lx = cx + Math.cos(mid) * (R + 16);
      const ly = cy + Math.sin(mid) * (R + 16);
      ctx.font = '9px Rajdhani, sans-serif';
      ctx.fillStyle = s.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.icon + pct + '%', lx, ly);
    }

    startAngle = endAngle;
  });

  // Center hole (donut effect)
  ctx.beginPath();
  ctx.arc(cx, cy, R * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#1a1a1a' : '#f5f5f5';
  ctx.fill();
  ctx.font = 'bold 11px Rajdhani, sans-serif';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(total, cx, cy - 6);
  ctx.font = '8px Rajdhani, sans-serif';
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  ctx.fillText('TOTAL', cx, cy + 7);

  // Legend at bottom
  const cols = 3;
  const legendY = H - 52;
  const itemW = W / cols;
  stats.forEach((s, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const lx = col * itemW + itemW * 0.1;
    const ly = legendY + row * 16;
    ctx.fillStyle = s.color;
    ctx.fillRect(lx, ly + 1, 8, 8);
    ctx.font = '8px Rajdhani, sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(s.name.substring(0,4).toUpperCase() + ' ' + s.val, lx + 11, ly);
  });
}

// ─── QUEST RENDERING ──────────────────────────────────────────────────────────

function renderQuests() {
  const list = document.getElementById('questList');
  const filter = STATE.activeFilter;

  if (!STATE.quests.length) {
    list.innerHTML = `<div class="no-quests">
      <div class="no-quest-icon">◈</div>
      <div class="no-quest-text">NO MISSIONS ASSIGNED</div>
      <div class="no-quest-sub">Return to STATUS and generate today's quests</div>
    </div>`;
    return;
  }

  let filtered = filter === 'all' ? STATE.quests : STATE.quests.filter(q => q.type === filter);
  if (!filtered.length) {
    list.innerHTML = `<div class="no-quests"><div class="no-quest-icon">◈</div><div class="no-quest-text">NO ${filter.toUpperCase()} QUESTS</div></div>`;
    return;
  }

  list.innerHTML = filtered.map(q => questCard(q)).join('');
  const now = new Date();
  const el = document.getElementById('questDate');
  if (el) el.textContent = now.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' }).toUpperCase();

  // Show today's muscle group
  const todayMuscles = STATE.hunter ? getMusclesForToday(STATE.hunter) : null;
  const muscleStr = todayMuscles ? todayMuscles.map(m => MUSCLE_LABELS[m] || m).join(' + ') : 'Rest Day';
  showToast('TODAY: ' + muscleStr);
}

function questCard(q) {
  const statColor = STAT_COLORS[q.stat] || 'var(--accent)';
  const muscleTag = q.muscle && q.muscle !== 'lifestyle' ? `<span class="muscle-tag">${MUSCLE_LABELS[q.muscle] || q.muscle}</span>` : '';
  const rewardsOrStatus = q.completed
    ? `<span class="qr-complete-badge">${q.skipped ? '— SKIPPED' : '✓ DONE'}</span>`
    : `<div class="quest-rewards-mini"><span class="qr-rp">◆ ${q.rp} RP</span><span class="qr-stat">+${q.statGain} ${q.stat}</span></div>`;
  return `
    <div class="quest-card ${q.completed ? 'completed' : ''} ${q.type === 'challenging' ? 'challenging' : ''} ${q.type === 'special' ? 'special' : ''}">
      <div class="quest-type-bar ${q.type}"></div>
      <div class="quest-header-row">
        <span class="quest-type-badge ${q.type}">${q.type.toUpperCase()}</span>
        ${rewardsOrStatus}
      </div>
      <div class="quest-name">${q.name}</div>
      <div class="quest-desc">${q.description}</div>
      <div class="quest-stat-tag">
        <div class="stat-dot" style="background:${statColor}"></div>
        ${STAT_ICONS[q.stat] || ''} ${q.stat} ${muscleTag}
      </div>
      <div class="quest-actions">
        <button class="btn-complete" onclick="completeQuest('${q.id}')" ${q.completed ? 'disabled' : ''}>
          ${q.completed ? (q.skipped ? '— SKIPPED' : '✓ COMPLETE') : 'MARK COMPLETE'}
        </button>
      </div>
    </div>`;
}

window.filterQuests = function(f) {
  STATE.activeFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderQuests();
};

// ─── TODAY'S MUSCLE RESOLVER ──────────────────────────────────────────────────

function getMusclesForToday(hunter) {
  const schedule = hunter.customSchedule || {};
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todayName = dayNames[new Date().getDay()];
  const todayMuscles = schedule[todayName];
  if (todayMuscles === null || todayMuscles === undefined) {
    // Fallback to split cycle
    const split = SPLITS[hunter.workoutSplit] || SPLITS.apphandle;
    const startDate = hunter.startDate ? new Date(hunter.startDate) : new Date();
    const daysSince = Math.floor((new Date() - startDate) / (1000*60*60*24));
    const daysPerWeek = parseInt(hunter.daysPerWeek) || 5;
    const dayOfWeek = new Date().getDay();
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    if (adjustedDay >= daysPerWeek) return null; // rest day
    return split.cycle[daysSince % split.cycle.length]?.muscles || ['fullbody'];
  }
  return todayMuscles;
}

// ─── RANK & STATS HELPERS ─────────────────────────────────────────────────────

function getTotalStats() {
  if (!STATE.stats) return 55;
  return Object.values(STATE.stats).reduce((a, b) => a + b, 0);
}

function getCurrentRank() {
  const total = getTotalStats();
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (total >= RANKS[i].min) return RANKS[i];
  }
  return RANKS[0];
}

function getNextRank() {
  const total = getTotalStats();
  for (let i = 0; i < RANKS.length; i++) {
    if (total < RANKS[i].min) return RANKS[i];
  }
  return null;
}

// ─── SYNC UI ──────────────────────────────────────────────────────────────────

function syncUI() {
  if (!STATE.hunter) return;
  const rank  = getCurrentRank();
  const total = getTotalStats();
  const next  = getNextRank();
  const name  = STATE.hunter.name.toUpperCase();

  document.getElementById('headerName').textContent = name;
  document.getElementById('headerRank').textContent = rank.short;
  document.getElementById('headerRankLabel').textContent = rank.name.toUpperCase();
  document.getElementById('headerRP').textContent = STATE.rp;
  document.getElementById('shopRP').textContent = STATE.rp;

  document.getElementById('dcRank').textContent = rank.name.toUpperCase();
  document.getElementById('dcName').textContent = name;
  document.getElementById('dcTotalStats').textContent = total;
  document.getElementById('dcRP').textContent = STATE.rp;
  document.getElementById('dcStreak').textContent = STATE.streak;

  document.getElementById('rpCurrentRank').textContent = rank.name.toUpperCase();
  if (next) {
    document.getElementById('rpNextRank').textContent = next.name.toUpperCase();
    const pct = ((total - rank.min) / (next.min - rank.min)) * 100;
    document.getElementById('rankBarFill').style.width = Math.min(100, pct) + '%';
    document.getElementById('rankProgressText').textContent = `${total} / ${next.min} stat points`;
  } else {
    document.getElementById('rpNextRank').textContent = 'MAX';
    document.getElementById('rankBarFill').style.width = '100%';
    document.getElementById('rankProgressText').textContent = `${total} — DEMI GOD ACHIEVED`;
  }

  const completed = STATE.quests.filter(q => q.completed && !q.skipped).length;
  document.getElementById('dcQuestDone').textContent = completed;
  document.getElementById('dcQuestTotal').textContent = STATE.quests.length;
  document.getElementById('dcRPToday').textContent = STATE.rpTodayEarned;
  document.getElementById('dcStatToday').textContent = STATE.statsTodayGained;

  renderMiniStats();

  document.getElementById('settingName').textContent = name;

  const chestArea = document.getElementById('bonusChestArea');
  if (STATE.bonusChests.length > 0) {
    chestArea.style.display = 'block';
    document.getElementById('chestList').innerHTML = STATE.bonusChests.map(c =>
      `<div class="chest-item" onclick="openChest('${c.id}')"><div class="chest-icon">⬡</div><div class="chest-label">BONUS CHEST</div></div>`
    ).join('');
  } else {
    chestArea.style.display = 'none';
  }

  const today = getTodayStr();
  const genBtn = document.getElementById('btnGenerate');
  if (STATE.lastQuestDate === today && STATE.quests.length > 0) {
    genBtn.querySelector('.btn-gen-text').textContent = 'MISSIONS ASSIGNED TODAY';
    genBtn.querySelector('.btn-gen-sub').textContent = 'Go to QUESTS tab to view missions';
  } else {
    genBtn.querySelector('.btn-gen-text').textContent = "GENERATE TODAY'S QUESTS";
    genBtn.querySelector('.btn-gen-sub').textContent = 'Instant mission assignment — no API needed';
  }

  // Show today's training info on dashboard
  const todayMuscles = getMusclesForToday(STATE.hunter);
  const todayInfo = document.getElementById('todayTrainingInfo');
  if (todayInfo) {
    if (todayMuscles) {
      todayInfo.textContent = '⚔ TODAY: ' + todayMuscles.map(m => MUSCLE_LABELS[m] || m).join(' + ');
      todayInfo.style.display = 'block';
    } else {
      todayInfo.textContent = '💤 TODAY: REST DAY';
      todayInfo.style.display = 'block';
    }
  }
}

// ─── DAILY RESET & PENALTY ────────────────────────────────────────────────────

function checkDailyReset() {
  const today = getTodayStr();
  if (STATE.lastQuestDate && STATE.lastQuestDate !== today) {
    const completedYesterday = STATE.quests.filter(q => q.completed && !q.skipped).length > 0;
    if (completedYesterday) {
      STATE.streak++;
      STATE.penaltyDays = 0;
      if (!STATE.hunter.noSkipStreak) STATE.hunter.noSkipStreak = 0;
      const allDone = STATE.quests.filter(q => !q.skipped).every(q => q.completed);
      if (allDone) STATE.hunter.noSkipStreak++;
      else STATE.hunter.noSkipStreak = 0;
    } else {
      STATE.streak = 0;
      STATE.penaltyDays++;
      if (STATE.hunter) STATE.hunter.noSkipStreak = 0;
    }
    STATE.rpTodayEarned = 0;
    STATE.statsTodayGained = 0;
    STATE.questsCompleted = 0;
    STATE.quests = [];
    saveState();
  }
  checkPenalty();
}

function checkPenalty() {
  if (STATE.penaltyDays >= 2) {
    const rpLoss = Math.floor(STATE.rp * 0.15);
    STATE.rp = Math.max(0, STATE.rp - rpLoss);
    STATS_LIST.forEach(s => { STATE.stats[s] = Math.max(1, (STATE.stats[s] || 5) - 2); });
    STATE.penaltyDays = 0;
    saveState();
    showPenaltyModal(rpLoss);
  }
}

// ─── MODALS ───────────────────────────────────────────────────────────────────

function showQuestCompleteModal(quest, rp, stat, bonusChest) {
  document.getElementById('mqName').textContent = quest.name;
  document.getElementById('mqRP').textContent = '+' + rp + ' RP';
  document.getElementById('mqStat').textContent = '+' + stat;
  document.getElementById('mqStatType').textContent = quest.stat;
  document.getElementById('mqBonus').style.display = bonusChest ? 'block' : 'none';
  showModal('modalQuestComplete');
}

function showChestModal(reward) {
  document.getElementById('chestRewardName').textContent = reward.name;
  document.getElementById('chestRewardVal').textContent = reward.value;
  showModal('modalChest');
}

function showPenaltyModal(rpLoss) {
  document.getElementById('penaltyDetails').innerHTML = `
    <div class="reward-row"><span class="reward-label">RP LOST</span><span class="reward-val" style="color:var(--danger)">-${rpLoss}</span></div>
    <div class="reward-row"><span class="reward-label">ALL STATS</span><span class="reward-val" style="color:var(--danger)">-2 EACH</span></div>`;
  showModal('modalPenalty');
}

function showModal(id) {
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById(id).classList.add('active');
}

window.closeModal = function() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
};

// ─── SETTINGS ─────────────────────────────────────────────────────────────────

window.showSettings = function() {
  if (STATE.hunter) {
    const wu = document.getElementById('setting-wakeup');
    const sl = document.getElementById('setting-sleep');
    const fi = document.getElementById('setting-fitness');
    if (wu) wu.value = STATE.hunter.wakeup || '07:00';
    if (sl) sl.value = STATE.hunter.sleep || '23:00';
    if (fi) fi.value = STATE.hunter.fitness || 'beginner';
  }
  document.getElementById('settingsPanel').classList.add('open');
  document.getElementById('settingsOverlay').classList.add('open');
};
window.hideSettings = function() {
  document.getElementById('settingsPanel').classList.remove('open');
  document.getElementById('settingsOverlay').classList.remove('open');
};

window.saveProfileSettings = function() {
  if (!STATE.hunter) return;
  const wu = document.getElementById('setting-wakeup');
  const sl = document.getElementById('setting-sleep');
  const fi = document.getElementById('setting-fitness');
  if (wu && wu.value) STATE.hunter.wakeup = wu.value;
  if (sl && sl.value) STATE.hunter.sleep = sl.value;
  if (fi && fi.value) STATE.hunter.fitness = fi.value;
  saveState();
  showToast('PROFILE UPDATED', 'success');
};

window.exportData = function() {
  try {
    const blob = new Blob([JSON.stringify(STATE, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'awaken-backup-' + getTodayStr() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('DATA EXPORTED', 'success');
  } catch(e) { showToast('EXPORT FAILED', 'error'); }
};

window.importData = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported.hunter) { showToast('INVALID BACKUP FILE', 'error'); return; }
      if (!confirm('Import this backup? Current progress will be replaced.')) return;
      STATE = { ...STATE, ...imported };
      saveState();
      syncUI();
      renderShop();
      renderStats();
      renderRankTable();
      if (typeof renderAchievements === 'function') renderAchievements();
      showToast('DATA IMPORTED ✓', 'success');
      hideSettings();
    } catch(err) { showToast('IMPORT FAILED: CORRUPTED FILE', 'error'); }
  };
  reader.readAsText(file);
  event.target.value = '';
};

window.confirmReset = function() {
  if (confirm('RESET ALL PROGRESS? This cannot be undone.')) {
    localStorage.clear();
    location.reload();
  }
};

// ─── TOAST ────────────────────────────────────────────────────────────────────

function showToast(msg, type = '') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ─── PERSISTENCE ─────────────────────────────────────────────────────────────

function saveState() {
  try { localStorage.setItem('awakenState', JSON.stringify(STATE)); } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem('awakenState');
    if (raw) STATE = { ...STATE, ...JSON.parse(raw) };
  } catch(e) {}
}

// ─── UTILS ────────────────────────────────────────────────────────────────────

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}
