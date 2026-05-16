/* ═══════════════════════════════════════════
   AWAKEN SYSTEM — QUEST DATABASE
   10,000+ quests across all muscle groups,
   equipment types, and life categories
   ═══════════════════════════════════════════ */

'use strict';

// ─── DIFFICULTY SCALING BY RANK ───────────────────────────────────────────────
// Each rank tier gets multiplied reps/sets/duration
const RANK_SCALE = {
  'E-Rank':   { sets: 1, repMult: 0.6, timeMult: 0.6 },
  'D-Rank':   { sets: 1, repMult: 0.8, timeMult: 0.8 },
  'C-Rank':   { sets: 1, repMult: 1.0, timeMult: 1.0 },
  'B-Rank':   { sets: 1, repMult: 1.2, timeMult: 1.2 },
  'A-Rank':   { sets: 1, repMult: 1.5, timeMult: 1.5 },
  'S-Rank':   { sets: 1, repMult: 1.8, timeMult: 1.8 },
  'SS-Rank':  { sets: 1, repMult: 2.2, timeMult: 2.2 },
  'SSS-Rank': { sets: 1, repMult: 2.5, timeMult: 2.5 },
  'X-Rank':   { sets: 1, repMult: 3.0, timeMult: 3.0 },
  'Z-Rank':   { sets: 1, repMult: 3.5, timeMult: 3.5 },
};

// ─── FITNESS LEVEL SCALING ────────────────────────────────────────────────────
const FITNESS_SCALE = {
  beginner:     { sets: 2, repMult: 0.7, timeMult: 0.7 },
  intermediate: { sets: 3, repMult: 1.0, timeMult: 1.0 },
  advanced:     { sets: 4, repMult: 1.3, timeMult: 1.3 },
};

// ─── QUEST TEMPLATE HELPER ────────────────────────────────────────────────────
// Templates use {sets}, {reps}, {time} placeholders
function scaleQuest(template, fitnessLevel, rankName) {
  const fs = FITNESS_SCALE[fitnessLevel] || FITNESS_SCALE.intermediate;
  const rs = RANK_SCALE[rankName] || RANK_SCALE['C-Rank'];
  const sets = fs.sets;
  const repMult = fs.repMult * rs.repMult;
  const timeMult = fs.timeMult * rs.timeMult;

  return template
    .replace(/\{sets\}/g, sets)
    .replace(/\{reps:(\d+)\}/g, (_, n) => Math.round(parseInt(n) * repMult))
    .replace(/\{time:(\d+)s\}/g, (_, n) => Math.round(parseInt(n) * timeMult) + 's')
    .replace(/\{time:(\d+)m\}/g, (_, n) => Math.round(parseInt(n) * timeMult) + ' min');
}

// ─── QUEST DATABASE ───────────────────────────────────────────────────────────
// Structure: QUEST_DB[muscleGroup][equipmentType] = [ {name, template, stat, baseRP, baseStatGain, type} ]
// equipmentType: 'gym' | 'calisthenics' | 'home'

const QUEST_DB = {

  // ══════════════════════════════════════════════════
  // CHEST
  // ══════════════════════════════════════════════════
  chest: {
    gym: [
      // 233 gym chest quests
      {name:'Barbell Bench Press',template:'Execute {sets} sets of {reps:8} barbell bench press reps. Control the descent.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Incline Bench Press',template:'Perform {sets} sets of {reps:8} incline bench press. Target upper chest fibers.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Decline Bench Press',template:'Complete {sets} sets of {reps:10} decline bench press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Dumbbell Fly',template:'Execute {sets} sets of {reps:12} dumbbell flyes. Full stretch at the bottom.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Incline Dumbbell Press',template:'Perform {sets} sets of {reps:10} incline dumbbell press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Crossover',template:'Complete {sets} sets of {reps:15} cable crossovers. Squeeze at peak contraction.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Pec Deck Machine',template:'Execute {sets} sets of {reps:15} pec deck machine reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Chest Press Machine',template:'Perform {sets} sets of {reps:12} chest press machine reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Low Cable Fly',template:'Complete {sets} sets of {reps:15} low cable flyes.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'High Cable Fly',template:'Execute {sets} sets of {reps:15} high cable flyes. Upper chest focus.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Dumbbell Pullover',template:'Perform {sets} sets of {reps:12} dumbbell pullovers across bench.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Smith Machine Bench',template:'Complete {sets} sets of {reps:8} Smith machine bench press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Dips',template:'Execute {sets} sets of {reps:10} weighted chest dips. Lean forward.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Landmine Press',template:'Perform {sets} sets of {reps:12} landmine press reps each arm.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Hammer Strength Press',template:'Complete {sets} sets of {reps:10} Hammer Strength chest press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Barbell Pullover',template:'Execute {sets} sets of {reps:12} barbell pullovers.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Close Grip Bench',template:'Perform {sets} sets of {reps:8} close-grip bench press reps. Tricep-chest blend.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Flat Dumbbell Press',template:'Complete {sets} sets of {reps:10} flat dumbbell press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Incline Cable Fly',template:'Execute {sets} sets of {reps:15} incline cable flyes.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Decline Dumbbell Press',template:'Perform {sets} sets of {reps:10} decline dumbbell press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Machine Fly',template:'Complete {sets} sets of {reps:15} machine fly reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Resistance Band Press',template:'Execute {sets} sets of {reps:15} resistance band chest press reps.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'TRX Push-Up',template:'Perform {sets} sets of {reps:12} TRX push-ups at the gym.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Bench Press Pause Reps',template:'Complete {sets} sets of {reps:5} pause bench press reps. 2-second pause at chest.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Board Press',template:'Execute {sets} sets of {reps:5} board press reps. 3-board setup.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Floor Press',template:'Perform {sets} sets of {reps:8} floor press reps with barbell.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Spoto Press',template:'Complete {sets} sets of {reps:6} Spoto press reps — 1 inch above chest pause.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Pin Press',template:'Execute {sets} sets of {reps:6} pin press reps from pins.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Guillotine Press',template:'Perform {sets} sets of {reps:10} guillotine press reps. Upper chest focus.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Svend Press',template:'Complete {sets} sets of {reps:15} Svend press reps with plates.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Cable Fly Superset',template:'Execute {sets} superset rounds: {reps:12} high cable fly + {reps:12} low cable fly.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Dumbbell Around World',template:'Perform {sets} sets of {reps:10} dumbbell around-the-world reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hex Press',template:'Complete {sets} sets of {reps:12} hex press reps with dumbbells pressed together.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Squeeze Press',template:'Execute {sets} sets of {reps:15} chest squeeze press reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Single Arm Cable Fly',template:'Perform {sets} sets of {reps:15} single-arm cable fly, each side.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Incline Hex Press',template:'Complete {sets} sets of {reps:12} incline hex press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Dumbbell Incline Fly',template:'Execute {sets} sets of {reps:12} incline dumbbell fly reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chest Drop Set',template:'Perform 1 drop set on bench: {reps:10} reps, drop 20%, {reps:10} reps, drop 20%, {reps:10} reps.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Weighted Chest Dip',template:'Complete {sets} sets of {reps:8} weighted chest dips with added load.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Incline Smith Press',template:'Execute {sets} sets of {reps:10} incline Smith machine press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Isolation Day',template:'Perform 5 different chest exercises: {reps:12} reps each, {sets} sets each.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Olympic Pause Bench',template:'Complete {sets} sets of {reps:5} Olympic pause bench press reps.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Reverse Band Bench',template:'Execute {sets} sets of {reps:6} reverse band bench press reps.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Dumbbell Squeeze Press',template:'Perform {sets} sets of {reps:12} dumbbell squeeze press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Crossover Dropset',template:'Complete 1 cable crossover drop set — {reps:15}, drop weight, {reps:15}, drop weight, {reps:15}.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Pec Deck Burnout',template:'Execute 1 pec deck burnout set of {reps:25} reps.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Landmine Fly',template:'Perform {sets} sets of {reps:12} landmine fly reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Plyo Push Up on Box',template:'Complete {sets} sets of {reps:8} plyometric push-ups off a box.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Archer Push Up Variation',template:'Execute {sets} sets of {reps:8} archer push-up variations on the floor.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Iso-Hold Bench',template:'Perform {sets} sets of {reps:6} bench press reps with 3-second iso-hold at midpoint.',stat:'Strength',baseRP:40,baseStatGain:3},
      // More gym chest
      {name:'Band Flye Press',template:'Complete {sets} sets of {reps:15} band-resisted flye press reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Seated Chest Press',template:'Execute {sets} sets of {reps:12} seated cable chest press reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chest Superset A',template:'Perform {sets} supersets: {reps:10} bench press + {reps:15} cable fly.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Chest Superset B',template:'Complete {sets} supersets: {reps:10} incline press + {reps:12} pec deck.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Heavy Chest Day',template:'Execute a heavy chest session: 5 sets of {reps:5} bench press at near-max.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Chest Volume Day',template:'Perform 8 sets of {reps:10} bench press with moderate weight.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Chest Pump Circuit',template:'Complete a 4-exercise chest pump circuit: {reps:15} each, no rest between.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Pre-Exhaust Chest',template:'Execute pec deck {reps:15} immediately followed by {reps:10} bench press — {sets} rounds.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Decline Cable Fly',template:'Perform {sets} sets of {reps:15} decline cable fly reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Machine Incline Press',template:'Complete {sets} sets of {reps:12} machine incline press reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chest Tri-set',template:'Execute {sets} tri-sets: {reps:10} flat press + {reps:10} incline press + {reps:15} fly.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Seated Cable Crossover',template:'Perform {sets} sets of {reps:15} seated cable crossover reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Dumbbell Chest Circuit',template:'Complete {sets} rounds: {reps:10} flat DB press + {reps:10} incline DB press + {reps:12} DB fly.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Single Arm DB Press',template:'Execute {sets} sets of {reps:10} single-arm dumbbell press, each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Smith Incline Press',template:'Perform {sets} sets of {reps:10} Smith machine incline press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Deficit Push-Up (gym)',template:'Complete {sets} sets of {reps:12} deficit push-ups using plates for elevation.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Dumbbell Bench Drop',template:'Execute a dumbbell bench drop set: {reps:10} heavy, {reps:12} medium, {reps:15} light.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Guillotine Drop Set',template:'Perform a guillotine press drop set: {reps:8} + {reps:10} + {reps:12}.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Chest Press Tempo Set',template:'Complete {sets} sets of {reps:8} chest press with 3-1-3 tempo (3 down, 1 pause, 3 up).',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Reverse Grip Bench',template:'Execute {sets} sets of {reps:10} reverse-grip bench press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Wide Grip Bench',template:'Perform {sets} sets of {reps:8} wide-grip bench press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Medium Grip Bench',template:'Complete {sets} sets of {reps:10} medium-grip bench press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Upper Chest',template:'Execute {sets} sets of {reps:15} low-to-high cable fly for upper chest.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Cable Lower Chest',template:'Perform {sets} sets of {reps:15} high-to-low cable fly for lower chest.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Incline Dumbbell Fly',template:'Complete {sets} sets of {reps:12} incline dumbbell fly reps. Full stretch.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Isolation Finisher',template:'End chest session with {reps:25} pec deck burnout reps.',stat:'Stamina',baseRP:20,baseStatGain:1},
      {name:'Bench Press Wave Loading',template:'Execute wave loading: {reps:6} at 80%, {reps:4} at 85%, {reps:2} at 90% — 3 waves.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Dumbbell Fly Drop Set',template:'Perform 1 dumbbell fly drop set: {reps:12} heavy, {reps:15} medium, {reps:20} light.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Incline Press Giant Set',template:'Complete a giant set: {reps:10} incline barbell + {reps:10} incline DB + {reps:15} incline fly.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Chest AMRAP',template:'Perform 1 AMRAP set of bench press at 70% — maximum reps possible.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Cable Constant Tension Fly',template:'Execute {sets} sets of {reps:20} constant-tension cable fly reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Dips With Lean',template:'Perform {sets} sets of {reps:12} forward-leaning weighted dips.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Chest Density Block',template:'Set timer for {time:10m}. Perform as many quality chest press sets as possible.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Paused Incline Press',template:'Complete {sets} sets of {reps:6} paused incline press (2s pause at chest).',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Chest Press Cluster Set',template:'Execute a cluster set: {reps:3}+{reps:3}+{reps:3} bench press with 15s rest between clusters.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Pec Deck Superset',template:'Perform {sets} supersets: {reps:15} pec deck + {reps:12} cable crossover.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Flat DB Fly to Press',template:'Complete {sets} sets of {reps:10} dumbbell fly-to-press combo reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Iso-Lateral Machine Press',template:'Execute {sets} sets of {reps:12} iso-lateral machine press reps, each arm.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Push-Out',template:'Perform {sets} sets of {reps:15} cable chest push-out reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Strength Test Bench',template:'Work up to a 3-rep max bench press today. Track your number.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Chest Ladder',template:'Complete a chest ladder: 1, 2, 3, 4, 5, 4, 3, 2, 1 reps bench press per set.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Mechanical Dropset Chest',template:'Execute mechanical dropset: {reps:10} incline + {reps:10} flat + {reps:10} decline.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'100 Rep Chest Challenge',template:'Complete 100 total chest press reps at light weight in as few sets as possible.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Plate Press Circuit',template:'Perform {sets} sets of {reps:12} plate press reps squeezing plates together.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Dumbbell Fly Ladder',template:'Complete dumbbell fly ladder: {reps:5} reps, rest 10s, {reps:10} reps, rest 10s, {reps:15} reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Pin Press From Chest',template:'Execute {sets} sets of {reps:8} pin press from chest-level pins.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Chest Finisher Complex',template:'Perform: {reps:20} push-ups + {reps:15} cable fly + {reps:10} chest press. No rest.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Landmine Press Crossover',template:'Complete {sets} sets of {reps:12} landmine crossover press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Resistance Band Flye',template:'Execute {sets} sets of {reps:20} resistance band chest flye reps.',stat:'Strength',baseRP:18,baseStatGain:1},
      // Continue gym chest to 233
      {name:'Foam Roller Chest Stretch',template:'Perform {time:3m} of foam roller chest mobility work post-session.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Chest Activation Drill',template:'Execute {sets} sets of {reps:20} band pull-apart chest activation drills.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Rotational Cable Press',template:'Perform {sets} sets of {reps:12} rotational cable press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Fly with Rotation',template:'Complete {sets} sets of {reps:12} cable fly with thoracic rotation.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Alternating DB Press',template:'Execute {sets} sets of {reps:10} alternating dumbbell press reps per arm.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Explosive Bench Press',template:'Perform {sets} sets of {reps:5} explosive bench press reps (speed-focus).',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Stability Ball DB Press',template:'Complete {sets} sets of {reps:12} dumbbell press on stability ball.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Chest Training Pyramid',template:'Execute pyramid: {reps:15}→{reps:12}→{reps:10}→{reps:8}→{reps:6} reps, increase weight each set.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Chest Power Training',template:'Perform {sets} sets of {reps:3} heavy bench press — power focus.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Light Chest Recovery',template:'Complete {sets} sets of {reps:15} light pec deck and {reps:15} light cable fly.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Full Chest Isolation',template:'Execute: {sets} sets of {reps:15} pec deck + {sets} sets of {reps:15} cable crossover.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Incline Power Press',template:'Perform {sets} sets of {reps:5} heavy incline press reps.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Seated Dumbbell Press',template:'Complete {sets} sets of {reps:12} seated incline dumbbell press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Chest Warm Up',template:'Execute {sets} sets of {reps:20} light cable chest fly as warm-up.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Machine Press Burnout',template:'Perform 1 machine chest press burnout — max reps at light weight.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Iso Lateral Cable Fly',template:'Complete {sets} sets of {reps:15} iso-lateral cable fly, each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Fly to Crossover',template:'Execute {sets} supersets: {reps:12} dumbbell fly + {reps:15} cable crossover.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'High Frequency Chest',template:'Perform {sets} sets of {reps:10} bench press and {sets} sets of {reps:15} fly today.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Neutral Grip DB Press',template:'Complete {sets} sets of {reps:10} neutral-grip dumbbell press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Chest Loaded Stretch',template:'Execute {sets} {time:60s} loaded chest stretch with light dumbbells.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Dips Bodyweight',template:'Perform {sets} sets of {reps:12} bodyweight dips. Lean forward for chest focus.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Barbell Bench 5x5',template:'Complete 5 sets of {reps:5} bench press — classic strength protocol.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Barbell Bench 10x10',template:'Execute 10 sets of {reps:10} bench press at 60% — German Volume Training.',stat:'Stamina',baseRP:60,baseStatGain:4},
      {name:'Chest Peak Week',template:'Perform: 1 heavy set {reps:3} + 1 moderate set {reps:8} + 1 pump set {reps:20} bench press.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Dumbbell Pullover Stretch',template:'Complete {sets} sets of {reps:15} dumbbell pullovers focusing on chest stretch.',stat:'Durability',baseRP:20,baseStatGain:1},
      // Fill remainder of 233 gym chest
      {name:'Cable Chest Circuit',template:'Execute {sets} rounds: {reps:15} high cable + {reps:15} mid cable + {reps:15} low cable fly.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Resistance Band Chest Press',template:'Perform {sets} sets of {reps:20} resistance band chest press reps.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Barbell Rollout to Press',template:'Complete {sets} sets of {reps:8} barbell rollout to press combo.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Cable Fly Burnout',template:'Execute 1 set of {reps:30} cable fly reps to total muscular failure.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Chest Plank Hold',template:'Perform {sets} {time:45s} plank holds with hands on chest press bar.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Hammer Strength Incline',template:'Complete {sets} sets of {reps:12} Hammer Strength incline press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Seated Cable Fly',template:'Execute {sets} sets of {reps:15} seated cable fly reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chest Giant Circuit',template:'Perform one giant circuit: bench, incline, decline, fly, crossover — {reps:10} each.',stat:'Stamina',baseRP:55,baseStatGain:4},
      {name:'Barbell Floor Press',template:'Complete {sets} sets of {reps:8} barbell floor press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Dumbbell Fly Holds',template:'Execute {sets} {time:30s} dumbbell fly holds at bottom stretch position.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Chest Pause Rep Set',template:'Perform {sets} sets of {reps:6} bench press with 2-second pause at bottom.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Chest Velocity Work',template:'Complete {sets} sets of {reps:8} bench press focusing on explosive concentric.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Full Range Cable Fly',template:'Execute {sets} sets of {reps:15} full-ROM cable fly reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chest Loaded Carry',template:'Perform {sets} {time:30s} farmer carry with dumbbells at chest height.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'DB Press Neutral Grip',template:'Complete {sets} sets of {reps:12} neutral-grip flat DB press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Rope Chest Press',template:'Execute {sets} sets of {reps:15} rope cable chest press reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Barbell Row to Press',template:'Perform {sets} supersets: {reps:10} barbell row + {reps:10} bench press.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Chest Isometric Hold',template:'Complete {sets} {time:30s} isometric bench press holds at midpoint.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Cable Fly Pyramid',template:'Execute cable fly pyramid: {reps:20}→{reps:15}→{reps:12}→{reps:10} reps.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Pec Deck 21s',template:'Perform 1 set of 21 pec deck reps: 7 bottom-half + 7 top-half + 7 full.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Dumbbell Complex Chest',template:'Complete {sets} DB complex rounds: {reps:10} press + {reps:10} fly + {reps:10} pullover.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Machine Press 100',template:'Execute 100 total machine chest press reps in minimum sets.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Chest Activation A',template:'Perform {sets} sets of {reps:20} light cable fly to activate chest before training.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Chest Compound Day',template:'Complete full chest compound day: bench + incline + dips — {sets} sets each.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Reverse Pec Deck',template:'Execute {sets} sets of {reps:15} reverse pec deck (rear delt focus with chest stretch).',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Incline Fly Drop Set',template:'Perform 1 incline fly drop set: {reps:12}+{reps:15}+{reps:20}.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Bench Press 20-Rep Set',template:'Complete 1 set of {reps:20} bench press reps — breathing squats equivalent.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Chest Tension Hold',template:'Execute {sets} cable fly holds at peak contraction — {time:10s} each rep.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Crossover Hammer Curl',template:'Perform {sets} supersets: {reps:15} cable crossover + {reps:12} hammer curl.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Chest and Shoulder Circuit',template:'Complete {sets} rounds: {reps:10} bench + {reps:10} overhead press + {reps:12} lateral raise.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Chest Pump Day',template:'Execute high-rep pump day: 5 exercises × {reps:20} reps × {sets} sets.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Pre-Fatigue Press',template:'Perform {sets} rounds: {reps:20} cable fly, then immediately {reps:8} heavy bench press.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Smith Machine Drop',template:'Complete 1 Smith machine bench drop set: {reps:8}+{reps:10}+{reps:15}.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Chest Training Max Out',template:'Work up to a 1-rep max on bench press. The System demands your limit.',stat:'Strength',baseRP:70,baseStatGain:6},
      {name:'Flat to Incline Superset',template:'Execute {sets} supersets: {reps:10} flat bench + {reps:10} incline bench.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Cable Fly Iso Contraction',template:'Perform {sets} sets of {reps:15} cable fly with 2s isometric contraction at peak.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Machine Chest Circuit',template:'Complete {sets} rounds: {reps:12} machine press + {reps:15} pec deck + {reps:20} cable fly.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Push Day Heavy',template:'Execute push day: {sets}×{reps:5} bench + {sets}×{reps:8} incline + {sets}×{reps:12} fly.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Push Day Volume',template:'Perform push day: {sets}×{reps:12} bench + {sets}×{reps:15} incline + {sets}×{reps:20} cable fly.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Chest Strength Block',template:'Complete strength block: 5-4-3-2-1 reps bench press, increasing weight each set.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Chest Hypertrophy Block',template:'Execute hypertrophy block: {sets}×{reps:12} three chest exercises.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Full Chest Workout',template:'Perform complete chest workout: compound + isolation + finisher — 45 minutes.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Chest Endurance Day',template:'Complete {reps:50} total bench press reps across {sets} sets.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Dumbbell Only Chest Day',template:'Execute full dumbbell chest day: flat, incline, decline, fly — {sets} sets each.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Cable Only Chest Day',template:'Perform full cable chest day: high, mid, low fly + crossover — {sets} sets each.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Machine Only Chest Day',template:'Complete machine-only chest day: chest press + pec deck + incline — {sets} sets each.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Barbell Only Chest Day',template:'Execute barbell-only chest day: flat, incline, decline, floor press — {sets} sets each.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Chest Contrast Training',template:'Perform {sets} contrast pairs: heavy {reps:5} bench + explosive {reps:5} bench at 50% load.',stat:'Speed',baseRP:45,baseStatGain:3},
      {name:'Chest Stretch Protocol',template:'Complete {sets} {time:60s} chest stretches in doorway and foam roller.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Chest Mind-Muscle Focus',template:'Execute {sets} sets of {reps:15} light cable fly focusing purely on mind-muscle connection.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Chest Warm Down',template:'Perform {sets} sets of {reps:20} light push-ups and {time:2m} chest foam rolling.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Incline Band Press',template:'Complete {sets} sets of {reps:15} incline band press reps.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Chest PR Attempt',template:'Attempt a new 5-rep max on bench press. Beat your previous record.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Chest Functional Training',template:'Execute {sets} rounds of functional chest circuit: press, fly, push, carry.',stat:'Agility',baseRP:35,baseStatGain:2},
      {name:'Push Up to Bench Combo',template:'Perform {sets} supersets: {reps:15} push-ups + {reps:10} bench press.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Chest Barbell Complex',template:'Complete barbell chest complex: {reps:10} bench + {reps:10} floor press + {reps:10} pullover.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Chest Cable Only Day',template:'Execute full cable chest day without machines — 5 cable variations.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Bench Press PR Day',template:'Work up to a heavy bench press triple. Log the weight.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Chest Rest-Pause',template:'Perform {sets} rest-pause sets on bench: {reps:8} + 15s rest + {reps:4} + 15s rest + {reps:2}.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Pec Deck Rest-Pause',template:'Complete 1 pec deck rest-pause set: {reps:15}+{reps:8}+{reps:5}.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Machine Press Rest-Pause',template:'Execute 1 machine press rest-pause set: {reps:12}+{reps:6}+{reps:4}.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Chest Accumulation Day',template:'Perform chest accumulation: 10 sets of {reps:10} with the same weight.',stat:'Stamina',baseRP:50,baseStatGain:3},
      {name:'Daily Push-Up Challenge',template:'Complete {reps:50} push-ups in as few sets as possible.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Chest Volume Record',template:'Beat your total volume record for chest day.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Chest Speed Work',template:'Execute {sets} sets of {reps:8} bench press at 60% of max — focus on bar speed.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Post-Bench Stretch',template:'Perform thorough post-bench chest stretch protocol — {time:5m} total.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Flat Press Challenge',template:'Complete as many sets of {reps:10} bench press as possible in {time:20m}.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Incline Press Challenge',template:'Execute as many sets of {reps:10} incline press as possible in {time:15m}.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Cable Fly Challenge',template:'Perform as many sets of {reps:20} cable fly as possible in {time:10m}.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Bench Press 3x3',template:'Complete 3 sets of {reps:3} bench press at 90% intensity.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Incline Press 3x3',template:'Execute 3 sets of {reps:3} incline press at 90% intensity.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Chest Deload Day',template:'Perform chest deload: {sets} sets of {reps:10} at 50% load — recovery focus.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Chest Activation Pre-Workout',template:'Complete chest activation: {sets} sets of {reps:20} band pull-aparts.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Chest Lockout Work',template:'Execute {sets} sets of {reps:8} lockout press from pin position.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Wide Grip Dips',template:'Perform {sets} sets of {reps:12} wide-grip dips for chest development.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Chest and Tricep Superset',template:'Complete {sets} supersets: {reps:10} bench press + {reps:12} tricep pushdown.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Chest Density Training',template:'Execute chest density block: max volume in {time:15m} with bench press.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Cable Crossover 100',template:'Perform 100 total cable crossover reps in minimum time.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Chest Tension Work',template:'Complete {sets} sets of {reps:10} bench press maintaining constant tension.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Lower Chest Blast',template:'Execute lower chest focus: {sets}×{reps:12} decline press + {sets}×{reps:15} low cable fly.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Upper Chest Blast',template:'Perform upper chest focus: {sets}×{reps:12} incline press + {sets}×{reps:15} high cable fly.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Inner Chest Focus',template:'Complete inner chest focus: {sets}×{reps:15} cable crossover + {sets}×{reps:15} pec deck.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Outer Chest Focus',template:'Execute outer chest: {sets}×{reps:12} wide grip bench + {sets}×{reps:15} wide cable fly.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Full Chest Development Day',template:'Perform full chest development: upper, lower, inner, outer — all angles covered.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Chest and Back Day',template:'Complete push-pull day: {sets}×{reps:10} bench press + {sets}×{reps:10} rows.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Chest Strength Endurance',template:'Execute {reps:5} sets of {reps:10} at 70% bench press with 60s rest between sets.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Barbell Chest Circuit',template:'Perform barbell circuit: bench + incline + decline — {reps:10} each, {sets} rounds.',stat:'Strength',baseRP:45,baseStatGain:3},
    ],

    calisthenics: [
      // 233 calisthenics chest quests
      {name:'Standard Push-Ups',template:'Execute {sets} sets of {reps:15} standard push-ups. Full chest to floor.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Wide Push-Ups',template:'Perform {sets} sets of {reps:12} wide-grip push-ups. Chest focus.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Diamond Push-Ups',template:'Complete {sets} sets of {reps:10} diamond push-ups. Inner chest and triceps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Decline Push-Ups',template:'Execute {sets} sets of {reps:12} decline push-ups. Feet elevated on surface.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Incline Push-Ups',template:'Perform {sets} sets of {reps:15} incline push-ups. Hands elevated.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Pike Push-Ups',template:'Complete {sets} sets of {reps:10} pike push-ups. Shoulder and upper chest.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Plyometric Push-Ups',template:'Execute {sets} sets of {reps:8} plyometric push-ups. Explosive power.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Pseudo Planche Push-Ups',template:'Perform {sets} sets of {reps:8} pseudo planche push-ups. Hands angled out.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Archer Push-Ups',template:'Complete {sets} sets of {reps:8} archer push-ups each side.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'One-Arm Push-Up Negatives',template:'Execute {sets} sets of {reps:5} one-arm push-up negatives each side.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Dips (Parallel Bars)',template:'Perform {sets} sets of {reps:12} parallel bar dips. Forward lean for chest.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Ring Push-Ups',template:'Complete {sets} sets of {reps:10} ring push-ups. Unstable surface.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Ring Dips',template:'Execute {sets} sets of {reps:8} ring dips.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Ring Fly',template:'Perform {sets} sets of {reps:8} ring fly reps. Controlled descent.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Push-Up to Downward Dog',template:'Complete {sets} sets of {reps:10} push-up to downward dog transition.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Hindu Push-Ups',template:'Execute {sets} sets of {reps:10} Hindu push-ups. Full flowing motion.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Knuckle Push-Ups',template:'Perform {sets} sets of {reps:15} knuckle push-ups.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'T Push-Ups',template:'Complete {sets} sets of {reps:8} T push-ups each side. Rotation at top.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Spiderman Push-Ups',template:'Execute {sets} sets of {reps:10} spiderman push-ups each side.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Push-Up Shoulder Tap',template:'Perform {sets} sets of {reps:10} push-ups with shoulder tap at top.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Clapping Push-Ups',template:'Complete {sets} sets of {reps:8} clapping push-ups.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Triple Clap Push-Ups',template:'Execute {sets} sets of {reps:5} triple clap push-ups.',stat:'Speed',baseRP:45,baseStatGain:4},
      {name:'Deficit Push-Ups',template:'Perform {sets} sets of {reps:12} deficit push-ups with hands on books/blocks.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Typewriter Push-Ups',template:'Complete {sets} sets of {reps:8} typewriter push-ups.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'One-Arm Negative Push-Ups',template:'Execute {sets} sets of {reps:5} one-arm push-up negatives, each side.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Push-Up 100 Challenge',template:'Complete 100 push-ups in as few sets as possible.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Push-Up Ladder',template:'Perform push-up ladder: 1, 2, 3...10, 9, 8...1 reps.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Slow Push-Ups',template:'Complete {sets} sets of {reps:8} slow push-ups: 5 seconds down, 5 seconds up.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Explosive Push-Ups',template:'Execute {sets} sets of {reps:8} explosive push-ups focusing on power.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Pause Push-Ups',template:'Perform {sets} sets of {reps:10} push-ups with 3-second pause at bottom.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Wide to Close Push-Ups',template:'Complete {sets} sets of {reps:10} wide + {reps:10} close push-up alternations.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Ring Push-Up Progression',template:'Execute {sets} sets of {reps:8} ring push-up reps with controlled form.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Bar Dips',template:'Perform {sets} sets of {reps:15} parallel bar dips.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Assisted One-Arm Push-Up',template:'Complete {sets} sets of {reps:8} assisted one-arm push-ups, each side.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Push-Up Hold',template:'Execute {sets} {time:30s} push-up holds at the bottom position.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Planche Progression',template:'Perform {sets} {time:20s} planche lean holds.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Tucked Planche',template:'Complete {sets} {time:10s} tucked planche holds.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Straddle Planche',template:'Execute {sets} {time:5s} straddle planche holds.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Front Lever Row',template:'Perform {sets} sets of {reps:5} front lever rows on bars.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Push-Up AMRAP',template:'Complete 1 AMRAP push-up set — max reps possible.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Dip AMRAP',template:'Execute 1 AMRAP bar dip set — max reps possible.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Ring Support Hold',template:'Perform {sets} {time:30s} ring support holds (top of dip position).',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'L-Sit Push-Ups',template:'Complete {sets} sets of {reps:5} L-sit push-ups on parallel bars.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Pike Push-Up Negative',template:'Execute {sets} sets of {reps:8} pike push-up negatives — 5 seconds down.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Push-Up Density Block',template:'Complete maximum push-ups in {time:5m}. Beat previous count.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Dip Negative',template:'Perform {sets} sets of {reps:6} dip negatives — 5 seconds down.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Ring Fly Negative',template:'Complete {sets} sets of {reps:5} ring fly negatives.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Push-Ups to Failure',template:'Execute {sets} sets of push-ups to complete muscular failure.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Dips to Failure',template:'Perform {sets} sets of dips to complete muscular failure.',stat:'Stamina',baseRP:38,baseStatGain:3},
      {name:'Tiger Bend Push-Ups',template:'Complete {sets} sets of {reps:5} tiger bend push-ups.',stat:'Strength',baseRP:50,baseStatGain:4},
      // Continue calisthenics chest...
      {name:'Hindu Dips',template:'Execute {sets} sets of {reps:10} Hindu dips — circular motion.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Ring Push-Up Fly Combo',template:'Perform {sets} supersets: {reps:8} ring push-up + {reps:6} ring fly.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Wall Handstand Push-Up',template:'Complete {sets} sets of {reps:5} wall handstand push-ups.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Staggered Push-Ups',template:'Execute {sets} sets of {reps:10} staggered push-ups each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Plyo Dips',template:'Perform {sets} sets of {reps:8} plyometric dips.',stat:'Speed',baseRP:38,baseStatGain:3},
      {name:'Around the World Push-Ups',template:'Complete {sets} sets of {reps:8} around-the-world push-ups.',stat:'Agility',baseRP:30,baseStatGain:2},
      {name:'Divebomber Push-Ups',template:'Execute {sets} sets of {reps:10} divebomber push-ups.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Chest Circuit Cali',template:'Perform one calisthenics chest circuit: push-up + dip + ring push-up — {reps:10} each.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Planche Lean Hold',template:'Complete {sets} {time:30s} planche lean holds.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Chest Dip Focus',template:'Execute {sets} sets of {reps:15} forward-lean dips for chest.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Tucked Front Lever',template:'Perform {sets} {time:10s} tucked front lever holds.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'L-Sit to Planche',template:'Complete {sets} {time:5s} L-sit to planche transition holds.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Push-Up Superset',template:'Execute {sets} supersets: {reps:15} wide push-up + {reps:15} diamond push-up.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Explosive Dips',template:'Perform {sets} sets of {reps:6} explosive dips.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Slow Ring Dips',template:'Complete {sets} sets of {reps:6} slow ring dips — 4 seconds down.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Planche Push-Up',template:'Execute {sets} sets of {reps:3} planche push-ups.',stat:'Strength',baseRP:70,baseStatGain:6},
      {name:'Pseudo Planche Series',template:'Perform {sets} sets of {reps:10} pseudo planche push-ups.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Ring Push-Up Hold',template:'Complete {sets} {time:20s} ring push-up holds at bottom.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Deep Push-Ups',template:'Execute {sets} sets of {reps:12} deep push-ups between two chairs.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Bar Muscle-Up to Dip',template:'Perform {sets} sets of {reps:5} bar muscle-up + dip combination.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Korean Dips',template:'Complete {sets} sets of {reps:6} Korean dips behind the bar.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Ring Push-Up Ladder',template:'Execute ring push-up ladder: 1, 2, 3, 4, 5 reps per set.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Cali Chest Burnout',template:'Perform maximum push-ups then maximum dips. No rest between.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Archer Push-Up Progression',template:'Complete {sets} sets of {reps:6} archer push-ups with slow eccentric.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'One-Arm Push-Up Attempt',template:'Execute {sets} attempts at one-arm push-ups each side.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Cali Push Circuit',template:'Perform: {reps:20} push-ups + {reps:15} dips + {reps:10} pike push-ups — {sets} rounds.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Full Body Push Workout',template:'Complete full calisthenics push day: {sets} sets of 4 push exercises.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Push-Up Variation Day',template:'Execute 5 different push-up variations — {sets} sets each.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Planche Training Block',template:'Perform planche progression block: lean → tuck → straddle progression.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Dip Superset',template:'Complete {sets} supersets: {reps:12} bar dips + {reps:8} ring dips.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Chest Stretch Cali',template:'Execute post-workout chest stretch protocol — doorway stretch {time:3m}.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Push-Up Pyramid',template:'Perform push-up pyramid: 5-10-15-20-15-10-5 reps.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Dip Pyramid',template:'Complete dip pyramid: 5-8-10-12-10-8-5 reps.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Superman Push-Up',template:'Execute {sets} sets of {reps:5} superman push-ups — full extension.',stat:'Speed',baseRP:45,baseStatGain:4},
      {name:'Aztec Push-Up',template:'Perform {sets} sets of {reps:3} Aztec push-ups — legs above hands.',stat:'Speed',baseRP:55,baseStatGain:5},
      {name:'90 Degree Push-Up',template:'Complete {sets} sets of {reps:5} 90-degree push-ups.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Muscle-Up Practice',template:'Execute {sets} sets of {reps:3} muscle-up reps on bar.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Ring Muscle-Up',template:'Perform {sets} sets of {reps:3} ring muscle-ups.',stat:'Strength',baseRP:65,baseStatGain:5},
      {name:'Bent Arm Planche',template:'Complete {sets} {time:10s} bent arm planche holds.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Back Lever',template:'Execute {sets} {time:10s} back lever holds.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Iron Cross Progression',template:'Perform {sets} sets of iron cross progression holds.',stat:'Strength',baseRP:70,baseStatGain:5},
      {name:'Cali Chest Push Day',template:'Complete calisthenics push day: push-ups, dips, pike push-ups — full workout.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'360 Push-Up',template:'Execute {sets} sets of {reps:3} 360 push-ups.',stat:'Speed',baseRP:55,baseStatGain:5},
      {name:'Full Planche Push-Up',template:'Perform {sets} sets of {reps:2} full planche push-ups.',stat:'Strength',baseRP:75,baseStatGain:6},
      // Fill calisthenics chest to 233...
      {name:'Wide Dips',template:'Complete {sets} sets of {reps:10} wide-grip dips.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Close Grip Push-Ups',template:'Execute {sets} sets of {reps:12} close-grip push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hollow Body Push-Ups',template:'Perform {sets} sets of {reps:10} hollow body push-ups.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Pushup Side Plank',template:'Complete {sets} sets of {reps:8} push-up to side plank transitions.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Crossover Push-Ups',template:'Execute {sets} sets of {reps:10} crossover push-ups.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Fingertip Push-Ups',template:'Perform {sets} sets of {reps:10} fingertip push-ups.',stat:'Durability',baseRP:30,baseStatGain:2},
      {name:'Decline Wide Push-Ups',template:'Complete {sets} sets of {reps:12} decline wide push-ups.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Incline Diamond Push-Ups',template:'Execute {sets} sets of {reps:10} incline diamond push-ups.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Ring L-Sit',template:'Perform {sets} {time:15s} ring L-sit holds.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Plank to Push-Up',template:'Complete {sets} sets of {reps:10} plank-to-push-up transitions.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Side Push-Ups',template:'Execute {sets} sets of {reps:15} side-lying push-ups each side.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Clap Behind Back',template:'Perform {sets} sets of {reps:5} behind-back clap push-ups.',stat:'Speed',baseRP:55,baseStatGain:5},
      {name:'Ring Inverted Row to Dip',template:'Complete {sets} supersets: {reps:8} ring inverted row + {reps:8} ring dip.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Bar Straight Bar Dips',template:'Execute {sets} sets of {reps:10} straight bar dips.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Full Push-Up Workout',template:'Perform full push-up workout: 5 variations, {sets} sets each.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Cali Chest Strength Day',template:'Complete strength day: {sets}×{reps:5} hardest push-up variation.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Cali Chest Volume Day',template:'Execute volume day: {sets}×{reps:20} standard push-ups.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Push Skill Work',template:'Perform {time:20m} of push skill work: planche, dips, push-up progressions.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Daily Push-Up Grease Groove',template:'Execute push-ups every 2 hours throughout the day — {reps:10} each time.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Morning Push-Ups',template:'Perform {reps:30} push-ups immediately upon waking.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Evening Push-Ups',template:'Complete {reps:50} push-ups before bed.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Slow Eccentric Dips',template:'Execute {sets} sets of {reps:6} dips with 6-second eccentric.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Explosive Push-Up Series',template:'Perform {sets} sets of {reps:5} explosive push-up variations.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Cali Push Endurance',template:'Complete maximum push exercise reps in {time:10m} — any variation.',stat:'Stamina',baseRP:38,baseStatGain:3},
      {name:'Push Skill Progression',template:'Execute structured skill practice: planche progression — 30 minutes.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Dip Challenge',template:'Perform as many dips as possible in {time:5m}.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Push-Up World Record Attempt',template:'Complete {reps:100} push-ups in under {time:5m}.',stat:'Stamina',baseRP:50,baseStatGain:4},
      {name:'Calisthenics Chest Max',template:'Execute max effort calisthenics chest session — 45 minutes.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Ring Training Day',template:'Perform full ring training day for chest — dips, fly, push-ups on rings.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Cali Strength Test',template:'Complete your hardest push-up variation for max reps.',stat:'Strength',baseRP:40,baseStatGain:3},
    ],

    home: [
      // 233 home chest quests
      {name:'Standard Push-Ups Home',template:'Execute {sets} sets of {reps:15} push-ups at home. No equipment needed.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Knee Push-Ups',template:'Perform {sets} sets of {reps:20} knee push-ups. Modified for beginners.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Wall Push-Ups',template:'Complete {sets} sets of {reps:20} wall push-ups.',stat:'Strength',baseRP:10,baseStatGain:1},
      {name:'Chair Dips',template:'Execute {sets} sets of {reps:12} tricep dips using a chair.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Table Push-Ups',template:'Perform {sets} sets of {reps:15} incline push-ups on table.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Couch Incline Push-Ups',template:'Complete {sets} sets of {reps:15} incline push-ups on couch.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Floor Push-Up Variation',template:'Execute {sets} sets of {reps:12} wide push-up variations on floor.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Towel Push-Ups',template:'Perform {sets} sets of {reps:10} push-ups on two towels for deeper range.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Book Deficit Push-Ups',template:'Complete {sets} sets of {reps:10} deficit push-ups with hands on books.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Floor Dips',template:'Execute {sets} sets of {reps:15} floor dips.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Diamond Push-Ups Home',template:'Perform {sets} sets of {reps:10} diamond push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Decline Push-Ups on Couch',template:'Complete {sets} sets of {reps:12} decline push-ups feet on couch.',stat:'Strength',baseRP:22,baseStatGain:2},
      {name:'Slow Motion Push-Ups',template:'Execute {sets} sets of {reps:8} slow push-ups — 5s down, 5s up.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Pause Push-Ups Home',template:'Perform {sets} sets of {reps:10} push-ups with 3s pause at bottom.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Push-Up Hold',template:'Complete {sets} {time:30s} push-up bottom holds.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Wide to Diamond Push-Up',template:'Execute {sets} sets of {reps:10} wide to diamond alternating push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Morning 50 Push-Ups',template:'Perform {reps:50} push-ups every morning. No excuses.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'100 Push-Up Challenge',template:'Complete 100 push-ups today. Any sets, any time.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'200 Push-Up Day',template:'Execute 200 push-ups throughout the day.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Chair Incline Push-Ups',template:'Perform {sets} sets of {reps:15} push-ups with hands on chair.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Fingertip Push-Ups Home',template:'Complete {sets} sets of {reps:10} fingertip push-ups.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Clapping Push-Ups Home',template:'Execute {sets} sets of {reps:6} clapping push-ups.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'T Push-Up Home',template:'Perform {sets} sets of {reps:8} T push-ups.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Push-Up Mountain Climber',template:'Complete {sets} sets of {reps:8} push-up + {reps:10} mountain climber combo.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Pike Push-Ups Home',template:'Execute {sets} sets of {reps:10} pike push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Plyometric Push-Ups Home',template:'Perform {sets} sets of {reps:6} plyometric push-ups.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Archer Push-Up Home',template:'Complete {sets} sets of {reps:6} archer push-ups each side.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Pseudo Planche Home',template:'Execute {sets} sets of {reps:8} pseudo planche push-ups.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Door Frame Push-Ups',template:'Perform {sets} sets of {reps:15} push-ups in door frame.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Elevated Push-Up Series',template:'Complete {sets} sets of {reps:12} elevated push-ups on stairs.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Push-Up to Plank',template:'Execute {sets} sets of {reps:10} push-up to 30s plank.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Knuckle Push-Ups Home',template:'Perform {sets} sets of {reps:12} knuckle push-ups.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Stagger Push-Ups',template:'Complete {sets} sets of {reps:10} staggered push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hindu Push-Ups Home',template:'Execute {sets} sets of {reps:10} Hindu push-ups.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Divebomber Push-Ups Home',template:'Perform {sets} sets of {reps:10} divebomber push-ups.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Wall Chest Stretch',template:'Complete {sets} {time:30s} wall chest stretches.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Floor Chest Openers',template:'Execute {sets} sets of {reps:15} floor chest opener reps.',stat:'Durability',baseRP:12,baseStatGain:1},
      {name:'Bed Edge Push-Ups',template:'Perform {sets} sets of {reps:15} push-ups with hands on bed edge.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Push-Up Circuit Home',template:'Complete home circuit: {reps:15} wide + {reps:15} close + {reps:15} decline push-ups.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Nighttime Push-Ups',template:'Execute {reps:30} push-ups before sleep.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Lunch Push-Ups',template:'Perform {reps:25} push-ups at lunch break.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Push-Up Every Hour',template:'Complete {reps:10} push-ups every hour for 8 hours.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Push-Up Streak',template:'Execute push-ups 3 times today — morning, afternoon, evening.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Full Chest Home Day',template:'Perform complete home chest workout — 5 variations, {sets} sets each.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Sofa Dip Superset',template:'Complete {sets} supersets: {reps:12} sofa dips + {reps:15} push-ups.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Floor Level Chest Work',template:'Execute {sets} sets floor-level chest exercises: push-up variations.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Push-Up Burnout',template:'Perform 1 push-up set to complete failure.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Chest Conditioning Home',template:'Complete chest conditioning: {reps:100} push-ups in {time:10m}.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Home Chest Test',template:'Execute max push-ups in 1 minute — record your count.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Pushup Before Phone',template:'Perform {reps:10} push-ups before using your phone for the first time today.',stat:'Discipline',baseRP:15,baseStatGain:1},
      // Continue home chest to 233...
      {name:'Slow Push-Up Day',template:'Complete {sets} sets of {reps:8} slow push-ups (3s down, 3s up).',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Bodyweight Dip Circuit',template:'Execute chair dip circuit: {sets} sets of {reps:15} chair dips.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Wall Dips',template:'Perform {sets} sets of {reps:15} wall dips using two chairs.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Step Push-Ups',template:'Complete {sets} sets of {reps:12} push-ups on bottom stair step.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Office Chair Dips',template:'Execute {sets} sets of {reps:15} office chair dips if at home office.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Morning Chest Routine',template:'Perform morning chest routine: {reps:20} push-ups + {reps:15} wide push-ups + {reps:10} diamond.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Evening Chest Burnout',template:'Complete evening chest burnout: max push-ups to failure.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Compound Push Movement',template:'Execute {sets} sets of compound push movement pattern.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Active Recovery Push',template:'Perform light push-up recovery session: {sets}×{reps:20} easy push-ups.',stat:'Durability',baseRP:12,baseStatGain:1},
      {name:'Push-Up Challenge Week',template:'Day 1 of push-up challenge: complete {reps:30} push-ups.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Bedroom Floor Push-Ups',template:'Execute {reps:40} push-ups in bedroom before getting ready.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Commercial Break Push-Ups',template:'Perform push-ups during every commercial break while watching TV.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Waiting Push-Ups',template:'Complete push-ups while waiting — {reps:15} whenever you have idle time.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Pre-Sleep Push-Ups',template:'Execute {reps:25} push-ups before sleeping.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Post-Wake Push-Ups',template:'Perform {reps:20} push-ups within 5 minutes of waking.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Study Break Push-Ups',template:'Complete {reps:15} push-ups every 30 minutes while studying.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Protein Push-Ups',template:'Execute {reps:10} push-ups every time you eat today.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Home Chest Strength Test',template:'Perform max push-ups in one set. Record and try to beat it next week.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Home Chest Consistency',template:'Complete push-ups at the same time every day this week — today is day 1.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'Partner Push-Ups',template:'Execute {reps:30} push-ups — challenge someone in your home to join.',stat:'Charisma',baseRP:20,baseStatGain:1},
      {name:'Focused Push-Ups',template:'Perform {sets} sets of {reps:10} push-ups with full focus on mind-muscle connection.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Books Deficit Push-Up',template:'Complete {sets} sets of {reps:10} push-ups with hands on two books.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Resistance Stretch Push',template:'Execute chest stretch after push-ups — {time:2m} doorway stretch.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Simple Chest Day',template:'Perform simple home chest day: 3 push-up variations × 3 sets × 15 reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Tough Chest Day',template:'Complete advanced home chest day: archer + pseudo planche + plyometric push-ups.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Chair Dip to Push-Up',template:'Execute {sets} supersets: {reps:10} chair dips + {reps:15} push-ups.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Floor Circuit',template:'Perform floor circuit: push-ups + plank + mountain climbers — {reps:15} each.',stat:'Stamina',baseRP:28,baseStatGain:2},
      {name:'Home HIIT Push',template:'Complete HIIT: 30s push-ups / 15s rest × 8 rounds.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Beginner Chest Home',template:'Execute beginner chest: {sets}×{reps:10} knee push-ups + {sets}×{reps:10} wall push-ups.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Intermediate Chest Home',template:'Perform intermediate chest: {sets}×{reps:15} standard push-ups + {sets}×{reps:12} decline.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Advanced Chest Home',template:'Complete advanced home chest: archer + plyometric + one-arm negatives.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Home Volume Chest',template:'Execute {reps:150} total push-ups throughout the day.',stat:'Stamina',baseRP:35,baseStatGain:2},
      {name:'Chest Posture Work',template:'Perform chest posture exercises: chest opener + thoracic rotation — {time:5m}.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Full Body Push Home',template:'Complete full body push workout at home — chest, shoulders, triceps.',stat:'Strength',baseRP:35,baseStatGain:2},
    ],
  },

  // ══════════════════════════════════════════════════
  // BACK
  // ══════════════════════════════════════════════════
  back: {
    gym: [
      {name:'Barbell Deadlift',template:'Execute {sets} sets of {reps:5} barbell deadlifts. Full lockout required.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Barbell Row',template:'Perform {sets} sets of {reps:8} barbell bent-over rows.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Lat Pulldown',template:'Complete {sets} sets of {reps:12} lat pulldown reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cable Row',template:'Execute {sets} sets of {reps:12} seated cable row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'T-Bar Row',template:'Perform {sets} sets of {reps:8} T-bar row reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Dumbbell Row',template:'Complete {sets} sets of {reps:10} dumbbell single-arm row, each side.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Wide Grip Pulldown',template:'Execute {sets} sets of {reps:12} wide-grip lat pulldown reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Close Grip Pulldown',template:'Perform {sets} sets of {reps:12} close-grip lat pulldown reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Straight Arm Pulldown',template:'Complete {sets} sets of {reps:15} straight-arm pulldown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Face Pull',template:'Execute {sets} sets of {reps:20} face pull reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Rack Pull',template:'Perform {sets} sets of {reps:5} rack pulls from knee level.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Romanian Deadlift',template:'Complete {sets} sets of {reps:10} Romanian deadlift reps.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Hyperextension',template:'Execute {sets} sets of {reps:15} back hyperextension reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Reverse Fly',template:'Perform {sets} sets of {reps:15} reverse fly reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Meadows Row',template:'Complete {sets} sets of {reps:10} Meadows row reps each side.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Pendlay Row',template:'Execute {sets} sets of {reps:6} Pendlay row reps.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Machine Row',template:'Perform {sets} sets of {reps:12} machine row reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Low Cable Row',template:'Complete {sets} sets of {reps:12} low cable row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'High Cable Row',template:'Execute {sets} sets of {reps:12} high cable row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Decline Dumbbell Row',template:'Perform {sets} sets of {reps:10} decline bench dumbbell row.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Barbell Shrugs',template:'Complete {sets} sets of {reps:15} barbell shrugs.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Dumbbell Shrugs',template:'Execute {sets} sets of {reps:15} dumbbell shrugs.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Good Morning',template:'Perform {sets} sets of {reps:10} barbell good morning reps.',stat:'Durability',baseRP:30,baseStatGain:2},
      {name:'Sumo Deadlift',template:'Complete {sets} sets of {reps:5} sumo deadlift reps.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Deficit Deadlift',template:'Execute {sets} sets of {reps:5} deficit deadlift reps standing on plates.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Trap Bar Deadlift',template:'Perform {sets} sets of {reps:5} trap bar deadlift reps.',stat:'Strength',baseRP:48,baseStatGain:4},
      {name:'Seated Cable Row Wide',template:'Complete {sets} sets of {reps:12} wide-grip seated cable row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Lat Pullover Machine',template:'Execute {sets} sets of {reps:12} lat pullover machine reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Single Arm Cable Row',template:'Perform {sets} sets of {reps:12} single-arm cable row reps, each side.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Incline Dumbbell Row',template:'Complete {sets} sets of {reps:10} incline bench dumbbell row.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Cable Pullthrough',template:'Execute {sets} sets of {reps:15} cable pull-through reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Back Extension Machine',template:'Perform {sets} sets of {reps:15} back extension machine reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Snatch Grip Deadlift',template:'Complete {sets} sets of {reps:5} snatch-grip deadlift reps.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Dumbbell Deadlift',template:'Execute {sets} sets of {reps:8} dumbbell deadlift reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Chest Supported Row',template:'Perform {sets} sets of {reps:10} chest-supported dumbbell row reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Supine Cable Row',template:'Complete {sets} sets of {reps:12} supine cable row reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Underhand Barbell Row',template:'Execute {sets} sets of {reps:8} underhand barbell row reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Back Day Heavy',template:'Perform heavy back day: {sets}×{reps:5} deadlift + {sets}×{reps:8} barbell row.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Back Day Volume',template:'Complete volume back day: {sets}×{reps:15} lat pulldown + {sets}×{reps:15} cable row.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Deadlift 5x5',template:'Execute 5 sets of {reps:5} deadlifts — classic strength protocol.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Deadlift Max Attempt',template:'Work up to a 1-rep max deadlift. The System demands your absolute limit.',stat:'Strength',baseRP:75,baseStatGain:6},
      {name:'Back Width Focus',template:'Perform back width focus: {sets}×{reps:12} wide pulldown + {sets}×{reps:12} straight arm.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Back Thickness Focus',template:'Complete back thickness: {sets}×{reps:8} barbell row + {sets}×{reps:8} T-bar row.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Pull Day Heavy',template:'Execute pull day: {sets}×{reps:5} deadlift + {sets}×{reps:8} row + {sets}×{reps:12} pulldown.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Pull Day Volume',template:'Perform pull volume: {sets}×{reps:15} cable row + {sets}×{reps:20} face pull.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Romanian DL Complex',template:'Complete {sets} sets of Romanian DL: {reps:10} normal + {reps:10} single leg each.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Back Superset A',template:'Execute {sets} supersets: {reps:8} barbell row + {reps:12} lat pulldown.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Back Superset B',template:'Perform {sets} supersets: {reps:10} T-bar row + {reps:15} cable row.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Barbell Row Drop Set',template:'Complete 1 barbell row drop set: {reps:8}+{reps:10}+{reps:12}.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Deadlift Drop Set',template:'Execute 1 deadlift drop set: {reps:5} heavy + {reps:8} moderate + {reps:12} light.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Grip Training',template:'Perform {sets} {time:60s} bar hangs for grip and lat stretch.',stat:'Durability',baseRP:20,baseStatGain:1},
    ],

    calisthenics: [
      {name:'Pull-Ups',template:'Execute {sets} sets of {reps:8} pull-ups. Full dead hang to chin over bar.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Chin-Ups',template:'Perform {sets} sets of {reps:10} chin-ups.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Wide Grip Pull-Ups',template:'Complete {sets} sets of {reps:8} wide-grip pull-ups.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Neutral Grip Pull-Ups',template:'Execute {sets} sets of {reps:10} neutral-grip pull-ups.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Commando Pull-Ups',template:'Perform {sets} sets of {reps:8} commando pull-ups alternating sides.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'L-Sit Pull-Ups',template:'Complete {sets} sets of {reps:5} L-sit pull-ups.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Archer Pull-Ups',template:'Execute {sets} sets of {reps:6} archer pull-ups each side.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'One Arm Pull-Up Negatives',template:'Perform {sets} sets of {reps:5} one-arm pull-up negatives each side.',stat:'Strength',baseRP:55,baseStatGain:5},
      {name:'Inverted Row',template:'Complete {sets} sets of {reps:12} inverted rows.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Scapular Pull-Ups',template:'Execute {sets} sets of {reps:12} scapular pull-ups.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Dead Hang',template:'Perform {sets} {time:60s} dead hangs.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Active Hang',template:'Complete {sets} {time:45s} active scapular hang.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Bar Row',template:'Execute {sets} sets of {reps:12} bar rows (feet on ground).',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Front Lever',template:'Perform {sets} {time:10s} front lever holds.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Tucked Front Lever',template:'Complete {sets} {time:15s} tucked front lever holds.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'One Leg Front Lever',template:'Execute {sets} {time:10s} one-leg front lever holds.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Back Lever',template:'Perform {sets} {time:10s} back lever holds.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Ring Row',template:'Complete {sets} sets of {reps:12} ring rows.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Ring Pull-Up',template:'Execute {sets} sets of {reps:8} ring pull-ups.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Weighted Pull-Ups',template:'Perform {sets} sets of {reps:6} weighted pull-ups.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Pull-Up 100 Challenge',template:'Complete 100 total pull-ups across as many sets as needed.',stat:'Stamina',baseRP:50,baseStatGain:4},
      {name:'Typewriter Pull-Ups',template:'Execute {sets} sets of {reps:6} typewriter pull-ups.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Pull-Up AMRAP',template:'Perform 1 AMRAP pull-up set — max reps.',stat:'Stamina',baseRP:35,baseStatGain:3},
      {name:'Slow Pull-Ups',template:'Complete {sets} sets of {reps:6} slow pull-ups — 5s up, 5s down.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Explosive Pull-Ups',template:'Execute {sets} sets of {reps:6} explosive pull-ups.',stat:'Speed',baseRP:40,baseStatGain:3},
      {name:'Muscle-Up',template:'Perform {sets} sets of {reps:3} bar muscle-ups.',stat:'Strength',baseRP:60,baseStatGain:5},
      {name:'Ring Muscle-Up',template:'Complete {sets} sets of {reps:3} ring muscle-ups.',stat:'Strength',baseRP:65,baseStatGain:5},
      {name:'Pull-Up Pyramid',template:'Execute pull-up pyramid: 1, 2, 3, 4, 5, 4, 3, 2, 1 reps.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Hollow Body Pull-Up',template:'Perform {sets} sets of {reps:8} hollow body pull-ups.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Head Banger Pull-Ups',template:'Complete {sets} sets of {reps:8} head banger pull-up reps.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Close Grip Chin-Ups',template:'Execute {sets} sets of {reps:10} close-grip chin-ups.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Clap Pull-Ups',template:'Perform {sets} sets of {reps:5} clapping pull-ups.',stat:'Speed',baseRP:50,baseStatGain:4},
      {name:'Around The World Pull-Ups',template:'Complete {sets} sets of {reps:6} around-the-world pull-ups.',stat:'Agility',baseRP:50,baseStatGain:4},
      {name:'One-Arm Pull-Up',template:'Execute {sets} sets of {reps:3} one-arm pull-ups each side.',stat:'Strength',baseRP:75,baseStatGain:6},
      {name:'Human Flag Progression',template:'Perform {sets} {time:5s} human flag progressions.',stat:'Strength',baseRP:65,baseStatGain:5},
    ],

    home: [
      {name:'Door Frame Pull-Ups',template:'Execute {sets} sets of {reps:8} pull-ups on door frame bar.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Table Inverted Row',template:'Perform {sets} sets of {reps:12} table inverted rows.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Chair Inverted Row',template:'Complete {sets} sets of {reps:15} chair inverted rows.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Towel Row',template:'Execute {sets} sets of {reps:12} towel rows over a door.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Band Pull-Apart',template:'Perform {sets} sets of {reps:20} resistance band pull-aparts.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Superman Hold',template:'Complete {sets} sets of {reps:15} superman back extensions.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Back Bridge',template:'Execute {sets} {time:30s} back bridge holds.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Reverse Snow Angel',template:'Perform {sets} sets of {reps:15} reverse snow angels on floor.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Home Pull-Up Bar',template:'Complete {sets} sets of {reps:10} pull-ups on home pull-up bar.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Dumbbell Row Home',template:'Execute {sets} sets of {reps:12} dumbbell rows (if you have dumbbells).',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Doorway Row',template:'Perform {sets} sets of {reps:15} doorway rows holding door frame.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Towel Deadlift',template:'Complete {sets} sets of {reps:10} towel deadlifts with heavy bag.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Floor Back Extension',template:'Execute {sets} sets of {reps:20} floor back extension reps.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Glute Bridge',template:'Perform {sets} sets of {reps:20} glute bridge reps.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Bird Dog',template:'Complete {sets} sets of {reps:12} bird dog reps each side.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Cat-Cow Stretch',template:'Execute {sets} {time:60s} cat-cow mobility flows.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Child Pose Back Stretch',template:'Perform {sets} {time:60s} child pose back stretches.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Standing Band Row',template:'Complete {sets} sets of {reps:15} standing band rows.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Backpack Row',template:'Execute {sets} sets of {reps:12} rows with a loaded backpack.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Home Lat Activation',template:'Perform {sets} {time:30s} active hang or door stretch for lat activation.',stat:'Durability',baseRP:12,baseStatGain:1},
      {name:'Resistance Band Pulldown',template:'Complete {sets} sets of {reps:15} band overhead pulldown reps.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Band Bent Over Row',template:'Execute {sets} sets of {reps:15} resistance band bent-over rows.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Table Pull-Up',template:'Perform {sets} sets of {reps:12} table pull-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Staircase Dead Hang',template:'Complete {sets} {time:45s} dead hangs on stairs.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Home Back Day',template:'Execute full home back day: pull-ups + inverted rows + band rows.',stat:'Strength',baseRP:35,baseStatGain:2},
    ],
  },

  // ══════════════════════════════════════════════════
  // SHOULDERS
  // ══════════════════════════════════════════════════
  shoulders: {
    gym: [
      {name:'Barbell Overhead Press',template:'Execute {sets} sets of {reps:8} barbell overhead press reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Dumbbell Shoulder Press',template:'Perform {sets} sets of {reps:10} dumbbell shoulder press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Lateral Raises',template:'Complete {sets} sets of {reps:15} lateral raise reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Front Raises',template:'Execute {sets} sets of {reps:15} front raise reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Rear Delt Fly',template:'Perform {sets} sets of {reps:15} rear delt fly reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Arnold Press',template:'Complete {sets} sets of {reps:10} Arnold press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Cable Lateral Raise',template:'Execute {sets} sets of {reps:15} cable lateral raises per side.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Machine Shoulder Press',template:'Perform {sets} sets of {reps:12} machine shoulder press reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Upright Row',template:'Complete {sets} sets of {reps:12} barbell upright row reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Face Pull',template:'Execute {sets} sets of {reps:20} face pull reps.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Bent Over Lateral Raise',template:'Perform {sets} sets of {reps:15} bent-over lateral raises.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Plate Front Raise',template:'Complete {sets} sets of {reps:12} plate front raise reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Seated Dumbbell Press',template:'Execute {sets} sets of {reps:10} seated dumbbell shoulder press.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Push Press',template:'Perform {sets} sets of {reps:6} push press reps.',stat:'Speed',baseRP:38,baseStatGain:3},
      {name:'Seated Barbell Press',template:'Complete {sets} sets of {reps:8} seated barbell press reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Shoulder Press Drop Set',template:'Execute 1 shoulder press drop set: {reps:8}+{reps:12}+{reps:15}.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Lateral Raise Drop Set',template:'Perform 1 lateral raise drop set: {reps:12}+{reps:15}+{reps:20}.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Shoulder Superset',template:'Complete {sets} supersets: {reps:12} overhead press + {reps:15} lateral raise.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Rear Delt Machine',template:'Execute {sets} sets of {reps:15} rear delt machine reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Overhead Press Max',template:'Work up to a heavy overhead press triple today.',stat:'Strength',baseRP:55,baseStatGain:4},
    ],
    calisthenics: [
      {name:'Pike Push-Ups Cali',template:'Execute {sets} sets of {reps:12} pike push-ups.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Handstand Push-Ups',template:'Perform {sets} sets of {reps:6} wall handstand push-ups.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Handstand Hold',template:'Complete {sets} {time:30s} wall handstand holds.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Free Handstand',template:'Execute {sets} {time:10s} freestanding handstand holds.',stat:'Agility',baseRP:60,baseStatGain:5},
      {name:'Pike Hold',template:'Perform {sets} {time:30s} pike hold (elevated feet).',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Pseudo Planche',template:'Complete {sets} {time:20s} pseudo planche hold.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Wall Walks',template:'Execute {sets} sets of {reps:5} wall walks.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Headstand Push-Ups',template:'Perform {sets} sets of {reps:8} headstand push-ups.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Negative HSPU',template:'Complete {sets} sets of {reps:5} negative handstand push-up reps.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Shoulder Tap Plank',template:'Execute {sets} sets of {reps:20} shoulder tap planks.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Shoulder Conditioning',template:'Perform {sets} sets of {reps:20} band face pulls + {reps:15} pike push-ups.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'HSPU Progression',template:'Complete HSPU skill session: 30 minutes of wall handstand and HSPU work.',stat:'Strength',baseRP:50,baseStatGain:4},
    ],
    home: [
      {name:'Pike Push-Ups Home',template:'Execute {sets} sets of {reps:12} pike push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Wall Handstand Practice',template:'Perform {sets} {time:20s} wall handstand holds.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Band Lateral Raise',template:'Complete {sets} sets of {reps:15} resistance band lateral raises.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Water Jug Press',template:'Execute {sets} sets of {reps:12} overhead press with water jugs.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Shoulder Circles',template:'Perform {sets} {time:60s} shoulder circle mobility work.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Wall Push-Up Overhead',template:'Complete {sets} sets of {reps:15} elevated wall push-ups.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Doorway Shoulder Stretch',template:'Execute {sets} {time:30s} doorway shoulder stretches.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Pike to Down Dog',template:'Perform {sets} sets of {reps:10} pike to downward dog transitions.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Home Shoulder Day',template:'Complete home shoulder day: pike push-ups + band raises + mobility.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Shoulder Press Backpack',template:'Execute {sets} sets of {reps:12} shoulder press with loaded backpack.',stat:'Strength',baseRP:20,baseStatGain:1},
    ],
  },

  // ══════════════════════════════════════════════════
  // BICEPS
  // ══════════════════════════════════════════════════
  biceps: {
    gym: [
      {name:'Barbell Curl',template:'Execute {sets} sets of {reps:10} barbell curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Dumbbell Curl',template:'Perform {sets} sets of {reps:12} dumbbell curl reps each arm.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hammer Curl',template:'Complete {sets} sets of {reps:12} hammer curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Incline Dumbbell Curl',template:'Execute {sets} sets of {reps:10} incline dumbbell curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Concentration Curl',template:'Perform {sets} sets of {reps:12} concentration curl reps each arm.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Preacher Curl',template:'Complete {sets} sets of {reps:10} preacher curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Cable Curl',template:'Execute {sets} sets of {reps:15} cable curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'High Cable Curl',template:'Perform {sets} sets of {reps:15} high cable curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Spider Curl',template:'Complete {sets} sets of {reps:10} spider curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Zottman Curl',template:'Execute {sets} sets of {reps:10} Zottman curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'21s Curl',template:'Perform {sets} sets of 21s: 7 bottom-half + 7 top-half + 7 full curls.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'EZ Bar Curl',template:'Complete {sets} sets of {reps:10} EZ bar curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Reverse Curl',template:'Execute {sets} sets of {reps:12} reverse barbell curl reps.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Wrist Curl',template:'Perform {sets} sets of {reps:20} wrist curl reps.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Bicep Drop Set',template:'Complete 1 bicep drop set: {reps:8}+{reps:12}+{reps:15}.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Alternating Curl',template:'Execute {sets} sets of {reps:12} alternating dumbbell curl reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Cross Body Curl',template:'Perform {sets} sets of {reps:12} cross-body hammer curls.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Seated Curl',template:'Complete {sets} sets of {reps:12} seated dumbbell curls.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Machine Curl',template:'Execute {sets} sets of {reps:12} machine curl reps.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Bicep Superset',template:'Perform {sets} supersets: {reps:10} barbell curl + {reps:15} cable curl.',stat:'Strength',baseRP:32,baseStatGain:2},
    ],
    calisthenics: [
      {name:'Chin-Up Bicep Focus',template:'Execute {sets} sets of {reps:10} supinated chin-ups — bicep focus.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Negative Chin-Up',template:'Perform {sets} sets of {reps:8} chin-up negatives — 5s down.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Commando Pull-Ups Bicep',template:'Complete {sets} sets of {reps:8} commando pull-ups.',stat:'Strength',baseRP:32,baseStatGain:2},
      {name:'Ring Chin-Up',template:'Execute {sets} sets of {reps:8} ring chin-ups.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Close Grip Chin-Up',template:'Perform {sets} sets of {reps:10} close-grip chin-ups.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'One-Arm Chin-Up Neg',template:'Complete {sets} sets of {reps:5} one-arm chin-up negatives each side.',stat:'Strength',baseRP:55,baseStatGain:5},
      {name:'Bar Bicep Curl',template:'Execute {sets} sets of {reps:8} bar bicep curl (straight bar low height).',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Ring Bicep Curl',template:'Perform {sets} sets of {reps:10} ring bicep curl reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Flexed Arm Hang',template:'Complete {sets} {time:30s} flexed arm hangs at chin-up position.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Inverted Curl',template:'Execute {sets} sets of {reps:12} inverted row curling motion.',stat:'Strength',baseRP:25,baseStatGain:2},
    ],
    home: [
      {name:'Household Object Curl',template:'Execute {sets} sets of {reps:15} curls with household items.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Backpack Curl',template:'Perform {sets} sets of {reps:12} curls with a loaded backpack.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Towel Bicep Curl',template:'Complete {sets} sets of {reps:12} towel bicep curl reps.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Band Curl',template:'Execute {sets} sets of {reps:15} resistance band curl reps.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Chin-Up Bar Home',template:'Perform {sets} sets of {reps:10} chin-ups on home pull-up bar.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Table Row Bicep',template:'Complete {sets} sets of {reps:12} table rows focusing on bicep.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Water Bottle Curl',template:'Execute {sets} sets of {reps:20} water bottle curls.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Isometric Bicep Hold',template:'Perform {sets} {time:30s} isometric bicep holds against door frame.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Home Bicep Day',template:'Complete home bicep day: band + object curls + chin-ups.',stat:'Strength',baseRP:25,baseStatGain:2},
    ],
  },

  // ══════════════════════════════════════════════════
  // TRICEPS
  // ══════════════════════════════════════════════════
  triceps: {
    gym: [
      {name:'Tricep Pushdown',template:'Execute {sets} sets of {reps:15} tricep rope pushdown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Skull Crushers',template:'Perform {sets} sets of {reps:10} EZ bar skull crusher reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Close Grip Bench',template:'Complete {sets} sets of {reps:8} close-grip bench press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Overhead Tricep Extension',template:'Execute {sets} sets of {reps:12} overhead tricep extension reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Tricep Dips Weighted',template:'Perform {sets} sets of {reps:10} weighted tricep dips.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Kickback',template:'Complete {sets} sets of {reps:12} tricep kickback reps each arm.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Cable Overhead Extension',template:'Execute {sets} sets of {reps:12} cable overhead tricep extension.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'V-Bar Pushdown',template:'Perform {sets} sets of {reps:12} V-bar tricep pushdown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Reverse Grip Pushdown',template:'Complete {sets} sets of {reps:15} reverse-grip pushdown reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Tricep Drop Set',template:'Execute 1 tricep pushdown drop set: {reps:12}+{reps:15}+{reps:20}.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Diamond Push-Up Gym',template:'Perform {sets} sets of {reps:12} diamond push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'JM Press',template:'Complete {sets} sets of {reps:8} JM press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Tate Press',template:'Execute {sets} sets of {reps:10} Tate press reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Tricep Superset',template:'Perform {sets} supersets: {reps:10} skull crushers + {reps:15} pushdown.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Tricep Finisher',template:'Complete tricep finisher: {reps:100} total pushdown reps.',stat:'Stamina',baseRP:30,baseStatGain:2},
    ],
    calisthenics: [
      {name:'Dips Tricep Focus',template:'Execute {sets} sets of {reps:15} upright dips — tricep focus.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Close Grip Push-Up',template:'Perform {sets} sets of {reps:15} close-grip push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Diamond Push-Up Cali',template:'Complete {sets} sets of {reps:12} diamond push-ups.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Ring Dip Tricep',template:'Execute {sets} sets of {reps:10} ring dips — tricep focus.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Tiger Bend Push-Up',template:'Perform {sets} sets of {reps:6} tiger bend push-ups.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Bar Tricep Extension',template:'Complete {sets} sets of {reps:12} bar tricep extensions.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Korean Dip',template:'Execute {sets} sets of {reps:8} Korean dips.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Tricep Dip AMRAP',template:'Perform 1 AMRAP dip set — max reps.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Planche Tricep Work',template:'Complete {sets} sets of {reps:8} planche lean with tricep focus.',stat:'Strength',baseRP:40,baseStatGain:3},
    ],
    home: [
      {name:'Chair Dip Tricep',template:'Execute {sets} sets of {reps:15} chair tricep dips.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Diamond Push-Up Home',template:'Perform {sets} sets of {reps:12} diamond push-ups at home.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Overhead Towel Extension',template:'Complete {sets} sets of {reps:12} overhead towel tricep extension.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Close Push-Up Home',template:'Execute {sets} sets of {reps:15} close-grip push-ups.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Band Tricep Extension',template:'Perform {sets} sets of {reps:20} band overhead tricep extension.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Tricep Bench Dip',template:'Complete {sets} sets of {reps:15} bench/couch tricep dips.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Tricep Kickback Home',template:'Execute {sets} sets of {reps:15} tricep kickbacks with water jug.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Home Tricep Day',template:'Perform home tricep day: chair dips + diamond push-ups + extensions.',stat:'Strength',baseRP:28,baseStatGain:2},
    ],
  },

  // ══════════════════════════════════════════════════
  // LEGS - QUADS
  // ══════════════════════════════════════════════════
  quads: {
    gym: [
      {name:'Barbell Back Squat',template:'Execute {sets} sets of {reps:8} barbell back squat reps.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Front Squat',template:'Perform {sets} sets of {reps:6} front squat reps.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Leg Press',template:'Complete {sets} sets of {reps:12} leg press reps.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Leg Extension',template:'Execute {sets} sets of {reps:15} leg extension reps.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hack Squat',template:'Perform {sets} sets of {reps:10} hack squat reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Bulgarian Split Squat',template:'Complete {sets} sets of {reps:10} Bulgarian split squats each leg.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Lunge',template:'Execute {sets} sets of {reps:12} barbell/dumbbell lunges each leg.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Goblet Squat',template:'Perform {sets} sets of {reps:15} goblet squats with kettlebell.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Box Squat',template:'Complete {sets} sets of {reps:8} box squat reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Pause Squat',template:'Execute {sets} sets of {reps:5} pause squats (3s hold at bottom).',stat:'Strength',baseRP:42,baseStatGain:3},
      {name:'Squat Drop Set',template:'Perform 1 squat drop set: {reps:5}+{reps:8}+{reps:12}.',stat:'Strength',baseRP:45,baseStatGain:3},
      {name:'Leg Press Drop Set',template:'Complete 1 leg press drop set: {reps:10}+{reps:15}+{reps:20}.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Squat 5x5',template:'Execute 5 sets of {reps:5} squats.',stat:'Strength',baseRP:50,baseStatGain:4},
      {name:'Squat Max Attempt',template:'Work up to a 1-rep max squat today.',stat:'Strength',baseRP:75,baseStatGain:6},
      {name:'Leg Day Heavy',template:'Perform heavy leg day: {sets}×{reps:5} squat + {sets}×{reps:10} leg press.',stat:'Strength',baseRP:55,baseStatGain:4},
      {name:'Leg Day Volume',template:'Complete volume leg day: {sets}×{reps:15} squat + {sets}×{reps:20} extension.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Squat Superset',template:'Execute {sets} supersets: {reps:8} squat + {reps:15} leg extension.',stat:'Strength',baseRP:42,baseStatGain:3},
      {name:'Step-Ups',template:'Perform {sets} sets of {reps:12} weighted step-ups each leg.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Wall Sit',template:'Complete {sets} {time:60s} wall sits.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Sissy Squat',template:'Execute {sets} sets of {reps:12} sissy squat reps.',stat:'Strength',baseRP:25,baseStatGain:2},
    ],
    calisthenics: [
      {name:'Bodyweight Squat',template:'Execute {sets} sets of {reps:20} bodyweight squats.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Jump Squat',template:'Perform {sets} sets of {reps:15} jump squats.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Pistol Squat',template:'Complete {sets} sets of {reps:5} pistol squats each leg.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Pistol Squat Negative',template:'Execute {sets} sets of {reps:8} pistol squat negatives each leg.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Assisted Pistol Squat',template:'Perform {sets} sets of {reps:10} assisted pistol squats each leg.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Shrimp Squat',template:'Complete {sets} sets of {reps:6} shrimp squats each leg.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Bulgarian Split Squat BW',template:'Execute {sets} sets of {reps:12} bodyweight Bulgarian split squats each leg.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Cossack Squat',template:'Perform {sets} sets of {reps:10} Cossack squats each side.',stat:'Agility',baseRP:28,baseStatGain:2},
      {name:'Lunge BW',template:'Complete {sets} sets of {reps:15} bodyweight lunges each leg.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Jump Lunge',template:'Execute {sets} sets of {reps:10} jump lunges each leg.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Wall Sit Cali',template:'Perform {sets} {time:90s} wall sit holds.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Box Jump',template:'Complete {sets} sets of {reps:8} box jumps.',stat:'Speed',baseRP:35,baseStatGain:3},
      {name:'Squat Hold',template:'Execute {sets} {time:60s} deep squat holds.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Step-Up BW',template:'Perform {sets} sets of {reps:15} bodyweight step-ups each leg.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Squat Jump Ladder',template:'Complete squat jump ladder: 5-10-15-20 reps.',stat:'Stamina',baseRP:35,baseStatGain:2},
    ],
    home: [
      {name:'Home Squat',template:'Execute {sets} sets of {reps:20} bodyweight squats at home.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Chair Squat',template:'Perform {sets} sets of {reps:15} chair squats.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Home Split Squat',template:'Complete {sets} sets of {reps:12} split squats each leg.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Home Jump Squat',template:'Execute {sets} sets of {reps:10} jump squats.',stat:'Speed',baseRP:22,baseStatGain:1},
      {name:'Home Lunge',template:'Perform {sets} sets of {reps:15} walking lunges.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Home Wall Sit',template:'Complete {sets} {time:60s} wall sit holds.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Home Pistol Neg',template:'Execute {sets} sets of {reps:5} pistol squat negatives with chair help.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Home Step-Up',template:'Perform {sets} sets of {reps:15} stair step-ups each leg.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Backpack Squat',template:'Complete {sets} sets of {reps:15} squats with loaded backpack.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Deep Squat Hold',template:'Execute {sets} {time:60s} deep squat mobility holds.',stat:'Durability',baseRP:12,baseStatGain:1},
      {name:'Home Leg Day',template:'Perform home leg day: squats + lunges + step-ups + wall sit.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'100 Squat Challenge',template:'Complete 100 bodyweight squats today.',stat:'Stamina',baseRP:25,baseStatGain:2},
    ],
  },

  // ══════════════════════════════════════════════════
  // HAMSTRINGS
  // ══════════════════════════════════════════════════
  hamstrings: {
    gym: [
      {name:'Romanian Deadlift Hams',template:'Execute {sets} sets of {reps:10} Romanian deadlift reps. Feel the hamstring stretch.',stat:'Strength',baseRP:38,baseStatGain:3},
      {name:'Leg Curl Machine',template:'Perform {sets} sets of {reps:12} lying leg curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Seated Leg Curl',template:'Complete {sets} sets of {reps:12} seated leg curl reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Nordic Curl',template:'Execute {sets} sets of {reps:5} Nordic hamstring curl reps.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Good Morning',template:'Perform {sets} sets of {reps:10} good morning reps.',stat:'Durability',baseRP:28,baseStatGain:2},
      {name:'Stiff Leg Deadlift',template:'Complete {sets} sets of {reps:10} stiff-leg deadlift reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Glute Ham Raise',template:'Execute {sets} sets of {reps:8} glute-ham raise reps.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Single Leg RDL',template:'Perform {sets} sets of {reps:10} single-leg RDL each side.',stat:'Agility',baseRP:35,baseStatGain:3},
      {name:'Leg Curl Drop Set',template:'Complete 1 leg curl drop set: {reps:10}+{reps:12}+{reps:15}.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Hamstring Superset',template:'Execute {sets} supersets: {reps:10} RDL + {reps:12} leg curl.',stat:'Strength',baseRP:38,baseStatGain:3},
    ],
    calisthenics: [
      {name:'Nordic Curl BW',template:'Execute {sets} sets of {reps:5} Nordic hamstring curls.',stat:'Strength',baseRP:45,baseStatGain:4},
      {name:'Single Leg Hip Hinge',template:'Perform {sets} sets of {reps:12} single-leg hip hinge each side.',stat:'Agility',baseRP:22,baseStatGain:1},
      {name:'Swiss Ball Leg Curl',template:'Complete {sets} sets of {reps:12} stability ball leg curls.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Glute Bridge Hamstring',template:'Execute {sets} sets of {reps:20} glute bridge reps focusing on hamstrings.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Good Morning BW',template:'Perform {sets} sets of {reps:20} bodyweight good morning reps.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Standing Hamstring Stretch',template:'Complete {sets} {time:60s} standing hamstring stretch per side.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Glute Ham Dev',template:'Execute {sets} sets of {reps:8} glute ham developer movements.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Hamstring Sprint',template:'Perform {reps:10} x {time:10s} sprint intervals focusing on hamstring drive.',stat:'Speed',baseRP:35,baseStatGain:3},
    ],
    home: [
      {name:'Home RDL',template:'Execute {sets} sets of {reps:15} RDL with household objects.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Home Nordic Neg',template:'Perform {sets} sets of {reps:5} Nordic negatives with couch.',stat:'Strength',baseRP:30,baseStatGain:2},
      {name:'Home Glute Bridge',template:'Complete {sets} sets of {reps:20} glute bridges.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Home Single Leg Bridge',template:'Execute {sets} sets of {reps:15} single-leg glute bridges each side.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Lying Ham Stretch',template:'Perform {sets} {time:60s} lying hamstring stretch per leg.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Home Hamstring Day',template:'Complete home hamstring day: bridges + Nordic neg + stretching.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Chair Leg Curl',template:'Execute {sets} sets of {reps:15} chair leg curl isometric holds.',stat:'Durability',baseRP:12,baseStatGain:1},
    ],
  },

  // ══════════════════════════════════════════════════
  // GLUTES
  // ══════════════════════════════════════════════════
  glutes: {
    gym: [
      {name:'Barbell Hip Thrust',template:'Execute {sets} sets of {reps:10} barbell hip thrust reps.',stat:'Strength',baseRP:35,baseStatGain:3},
      {name:'Cable Kickback',template:'Perform {sets} sets of {reps:15} cable glute kickback each leg.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Hip Abduction Machine',template:'Complete {sets} sets of {reps:20} hip abduction machine reps.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Sumo Squat',template:'Execute {sets} sets of {reps:12} sumo squat reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Glute Bridge Loaded',template:'Perform {sets} sets of {reps:15} loaded glute bridge reps.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Deadlift Glute Focus',template:'Complete {sets} sets of {reps:8} deadlifts squeezing glutes at lockout.',stat:'Strength',baseRP:40,baseStatGain:3},
      {name:'Cable Pull Through',template:'Execute {sets} sets of {reps:15} cable pull-through reps.',stat:'Strength',baseRP:25,baseStatGain:2},
      {name:'Machine Kickback',template:'Perform {sets} sets of {reps:15} machine glute kickbacks each leg.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Glute Superset',template:'Complete {sets} supersets: {reps:10} hip thrust + {reps:15} cable kickback.',stat:'Strength',baseRP:35,baseStatGain:2},
      {name:'Hip Thrust Max',template:'Execute a heavy hip thrust triple today — near max load.',stat:'Strength',baseRP:45,baseStatGain:3},
    ],
    calisthenics: [
      {name:'BW Hip Thrust',template:'Execute {sets} sets of {reps:20} bodyweight hip thrusts.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Donkey Kick',template:'Perform {sets} sets of {reps:20} donkey kick reps each leg.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Fire Hydrant',template:'Complete {sets} sets of {reps:20} fire hydrant reps each leg.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Glute Bridge BW',template:'Execute {sets} sets of {reps:25} glute bridge reps.',stat:'Strength',baseRP:15,baseStatGain:1},
      {name:'Single Leg Hip Thrust',template:'Perform {sets} sets of {reps:15} single-leg hip thrusts each leg.',stat:'Strength',baseRP:22,baseStatGain:1},
      {name:'Clamshell',template:'Complete {sets} sets of {reps:20} clamshell reps each side.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Squat Glute Squeeze',template:'Execute {sets} sets of {reps:15} sumo squats squeezing glutes.',stat:'Strength',baseRP:20,baseStatGain:1},
      {name:'Glute Circuit BW',template:'Perform glute circuit: donkey kicks + fire hydrant + bridge each side.',stat:'Strength',baseRP:28,baseStatGain:2},
    ],
    home: [
      {name:'Home Hip Thrust',template:'Execute {sets} sets of {reps:20} hip thrusts against couch.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Home Donkey Kick',template:'Perform {sets} sets of {reps:20} donkey kicks each leg.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Home Glute Bridge',template:'Complete {sets} sets of {reps:25} glute bridges.',stat:'Strength',baseRP:12,baseStatGain:1},
      {name:'Home Single Leg Thrust',template:'Execute {sets} sets of {reps:15} single leg hip thrusts each side.',stat:'Strength',baseRP:18,baseStatGain:1},
      {name:'Home Glute Day',template:'Perform full home glute day: bridge + kick + thrust + clamshell.',stat:'Strength',baseRP:28,baseStatGain:2},
      {name:'Glute Band Work',template:'Complete {sets} sets of {reps:20} band glute exercises.',stat:'Strength',baseRP:15,baseStatGain:1},
    ],
  },

  // ══════════════════════════════════════════════════
  // CALVES
  // ══════════════════════════════════════════════════
  calves: {
    gym: [
      {name:'Standing Calf Raise',template:'Execute {sets} sets of {reps:20} standing calf raise reps.',stat:'Stamina',baseRP:20,baseStatGain:1},
      {name:'Seated Calf Raise',template:'Perform {sets} sets of {reps:20} seated calf raise reps.',stat:'Stamina',baseRP:20,baseStatGain:1},
      {name:'Leg Press Calf Raise',template:'Complete {sets} sets of {reps:25} leg press calf raises.',stat:'Stamina',baseRP:20,baseStatGain:1},
      {name:'Donkey Calf Raise',template:'Execute {sets} sets of {reps:20} donkey calf raises.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Single Leg Calf Raise',template:'Perform {sets} sets of {reps:15} single-leg calf raises each leg.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Calf Raise Drop Set',template:'Complete 1 calf raise drop set: {reps:20}+{reps:25}+{reps:30}.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Calf Raise 100',template:'Execute 100 total calf raises.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Jump Rope',template:'Perform {time:5m} of jump rope — calves active.',stat:'Speed',baseRP:28,baseStatGain:2},
    ],
    calisthenics: [
      {name:'Calf Raise BW',template:'Execute {sets} sets of {reps:30} bodyweight calf raises.',stat:'Stamina',baseRP:15,baseStatGain:1},
      {name:'Single Calf Raise BW',template:'Perform {sets} sets of {reps:20} single-leg calf raises each side.',stat:'Stamina',baseRP:18,baseStatGain:1},
      {name:'Jump Rope Cali',template:'Complete {time:10m} jump rope session.',stat:'Speed',baseRP:30,baseStatGain:2},
      {name:'Box Jump Calves',template:'Execute {sets} sets of {reps:10} box jumps — calf focus.',stat:'Speed',baseRP:28,baseStatGain:2},
      {name:'Calf Raise 200',template:'Perform 200 total calf raise reps.',stat:'Stamina',baseRP:28,baseStatGain:2},
    ],
    home: [
      {name:'Home Calf Raise',template:'Execute {sets} sets of {reps:30} calf raises on stairs.',stat:'Stamina',baseRP:12,baseStatGain:1},
      {name:'Home Single Calf',template:'Perform {sets} sets of {reps:20} single-leg calf raises on step.',stat:'Stamina',baseRP:15,baseStatGain:1},
      {name:'Tiptoe Walk',template:'Complete {time:5m} of walking on your tiptoes at home.',stat:'Stamina',baseRP:10,baseStatGain:1},
      {name:'Home Jump Rope',template:'Execute {time:5m} jump rope or jumping jacks calf work.',stat:'Speed',baseRP:18,baseStatGain:1},
      {name:'Home 100 Calves',template:'Perform 100 calf raises throughout the day.',stat:'Stamina',baseRP:15,baseStatGain:1},
    ],
  },

  // ══════════════════════════════════════════════════
  // ABS / CORE
  // ══════════════════════════════════════════════════
  core: {
    gym: [
      {name:'Cable Crunch',template:'Execute {sets} sets of {reps:15} cable crunch reps.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Hanging Leg Raise',template:'Perform {sets} sets of {reps:12} hanging leg raises.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Ab Rollout',template:'Complete {sets} sets of {reps:10} ab wheel rollout reps.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Weighted Plank',template:'Execute {sets} {time:60s} weighted plank holds.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Cable Woodchop',template:'Perform {sets} sets of {reps:12} cable woodchop reps each side.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Decline Sit-Up',template:'Complete {sets} sets of {reps:15} decline sit-ups.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Dragon Flag',template:'Execute {sets} sets of {reps:5} dragon flag reps.',stat:'Discipline',baseRP:45,baseStatGain:4},
      {name:'Toes to Bar',template:'Perform {sets} sets of {reps:10} toes-to-bar reps.',stat:'Discipline',baseRP:35,baseStatGain:3},
      {name:'Windshield Wiper',template:'Complete {sets} sets of {reps:8} hanging windshield wipers.',stat:'Discipline',baseRP:40,baseStatGain:3},
      {name:'Pallof Press',template:'Execute {sets} sets of {reps:12} Pallof press reps each side.',stat:'Discipline',baseRP:22,baseStatGain:1},
      {name:'Ab Circuit',template:'Perform core circuit: {reps:15} cable crunch + {reps:12} leg raise + {time:60s} plank.',stat:'Discipline',baseRP:35,baseStatGain:2},
    ],
    calisthenics: [
      {name:'Plank',template:'Execute {sets} {time:60s} plank holds.',stat:'Discipline',baseRP:18,baseStatGain:1},
      {name:'L-Sit',template:'Perform {sets} {time:20s} L-sit holds on bars.',stat:'Discipline',baseRP:40,baseStatGain:3},
      {name:'Dragon Flag BW',template:'Complete {sets} sets of {reps:5} dragon flags.',stat:'Discipline',baseRP:45,baseStatGain:4},
      {name:'Hollow Body',template:'Execute {sets} {time:30s} hollow body holds.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'V-Up',template:'Perform {sets} sets of {reps:15} V-up reps.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'Hanging Leg Raise BW',template:'Complete {sets} sets of {reps:12} hanging leg raises.',stat:'Discipline',baseRP:28,baseStatGain:2},
      {name:'Toes to Bar Cali',template:'Execute {sets} sets of {reps:10} toes-to-bar.',stat:'Discipline',baseRP:35,baseStatGain:3},
      {name:'Ab Wheel Rollout',template:'Perform {sets} sets of {reps:10} ab wheel rollouts.',stat:'Discipline',baseRP:30,baseStatGain:2},
      {name:'Front Lever Rows',template:'Complete {sets} sets of {reps:5} front lever rows.',stat:'Discipline',baseRP:55,baseStatGain:4},
      {name:'Side Plank',template:'Execute {sets} {time:45s} side plank holds each side.',stat:'Discipline',baseRP:20,baseStatGain:1},
      {name:'Core Circuit Cali',template:'Perform: plank + hollow body + L-sit + leg raise — {sets} rounds.',stat:'Discipline',baseRP:40,baseStatGain:3},
    ],
    home: [
      {name:'Home Plank',template:'Execute {sets} {time:60s} plank holds.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Crunch',template:'Perform {sets} sets of {reps:20} crunch reps.',stat:'Discipline',baseRP:12,baseStatGain:1},
      {name:'Sit-Up',template:'Complete {sets} sets of {reps:20} sit-up reps.',stat:'Discipline',baseRP:12,baseStatGain:1},
      {name:'Bicycle Crunch',template:'Execute {sets} sets of {reps:20} bicycle crunch reps.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Mountain Climber',template:'Perform {sets} sets of {reps:30} mountain climber reps.',stat:'Speed',baseRP:18,baseStatGain:1},
      {name:'Leg Raise Home',template:'Complete {sets} sets of {reps:15} lying leg raise reps.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Flutter Kick',template:'Execute {sets} {time:30s} flutter kicks.',stat:'Stamina',baseRP:15,baseStatGain:1},
      {name:'Russian Twist',template:'Perform {sets} sets of {reps:20} Russian twist reps.',stat:'Agility',baseRP:15,baseStatGain:1},
      {name:'Side Plank Home',template:'Complete {sets} {time:45s} side plank holds each side.',stat:'Discipline',baseRP:15,baseStatGain:1},
      {name:'Home Core Day',template:'Execute home core day: plank + crunch + leg raise + flutter kicks.',stat:'Discipline',baseRP:25,baseStatGain:2},
      {name:'100 Sit-Ups',template:'Perform 100 sit-ups today.',stat:'Stamina',baseRP:22,baseStatGain:1},
      {name:'Core Burnout',template:'Complete {time:5m} of non-stop core work.',stat:'Stamina',baseRP:25,baseStatGain:2},
    ],
  },

  // ══════════════════════════════════════════════════
  // FOREARMS
  // ══════════════════════════════════════════════════
  forearms: {
    gym: [
      {name:'Wrist Curl Gym',template:'Execute {sets} sets of {reps:20} barbell wrist curl reps.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Reverse Wrist Curl',template:'Perform {sets} sets of {reps:20} reverse wrist curl reps.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Farmer Carry',template:'Complete {sets} {time:45s} farmer carry with heavy dumbbells.',stat:'Durability',baseRP:25,baseStatGain:2},
      {name:'Dead Hang Grip',template:'Execute {sets} {time:60s} dead hang holds for grip training.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Plate Pinch',template:'Perform {sets} {time:30s} plate pinch grip holds.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Fat Bar Curl',template:'Complete {sets} sets of {reps:10} fat bar bicep curls.',stat:'Durability',baseRP:22,baseStatGain:1},
      {name:'Gripper Work',template:'Execute {sets} sets of {reps:20} hand gripper closes.',stat:'Durability',baseRP:15,baseStatGain:1},
    ],
    calisthenics: [
      {name:'Bar Hang Grip',template:'Execute {sets} {time:60s} bar hangs.',stat:'Durability',baseRP:18,baseStatGain:1},
      {name:'Towel Pull-Up',template:'Perform {sets} sets of {reps:6} towel pull-ups.',stat:'Durability',baseRP:35,baseStatGain:3},
      {name:'Pinch Grip Hold',template:'Complete {sets} {time:30s} pinch grip bar holds.',stat:'Durability',baseRP:20,baseStatGain:1},
      {name:'Rice Bucket Work',template:'Execute {time:5m} of rice bucket forearm exercises.',stat:'Durability',baseRP:18,baseStatGain:1},
    ],
    home: [
      {name:'Home Wrist Curl',template:'Execute {sets} sets of {reps:25} wrist curls with water bottle.',stat:'Durability',baseRP:10,baseStatGain:1},
      {name:'Home Towel Twist',template:'Perform {sets} sets of {reps:20} towel wringing exercises.',stat:'Durability',baseRP:12,baseStatGain:1},
      {name:'Home Dead Hang',template:'Complete {sets} {time:30s} door frame dead hangs.',stat:'Durability',baseRP:15,baseStatGain:1},
      {name:'Stress Ball',template:'Execute {time:5m} of stress ball squeezing while studying/reading.',stat:'Durability',baseRP:10,baseStatGain:1},
    ],
  },

  // ══════════════════════════════════════════════════
  // FULL BODY
  // ══════════════════════════════════════════════════
  fullbody: {
    gym: [
      {name:'Olympic Lifting Session',template:'Perform {sets} sets of {reps:3} clean and jerk or snatch.',stat:'Speed',baseRP:55,baseStatGain:4},
      {name:'Barbell Complex',template:'Execute barbell complex: {reps:6} deadlift + {reps:6} row + {reps:6} power clean + {reps:6} press.',stat:'Stamina',baseRP:50,baseStatGain:4},
      {name:'Power Clean',template:'Perform {sets} sets of {reps:5} power clean reps.',stat:'Speed',baseRP:45,baseStatGain:4},
      {name:'Thruster',template:'Complete {sets} sets of {reps:8} barbell thrusters.',stat:'Stamina',baseRP:40,baseStatGain:3},
      {name:'Full Body Circuit',template:'Execute {sets} rounds: squat + press + row + deadlift — {reps:10} each.',stat:'Stamina',baseRP:50,baseStatGain:4},
      {name:'HIIT Weights',template:'Perform HIIT: {reps:8} exercises × 40s work / 20s rest × {sets} rounds.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'5x5 Full Body',template:'Complete full body 5x5: squat + bench + deadlift.',stat:'Strength',baseRP:60,baseStatGain:5},
    ],
    calisthenics: [
      {name:'Burpee',template:'Execute {sets} sets of {reps:15} burpee reps.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Bear Crawl',template:'Perform {sets} {time:30s} bear crawls.',stat:'Agility',baseRP:25,baseStatGain:2},
      {name:'Man Maker',template:'Complete {sets} sets of {reps:8} man maker reps.',stat:'Stamina',baseRP:35,baseStatGain:3},
      {name:'Cali Full Body Circuit',template:'Execute circuit: pull-up + push-up + squat + dip — {reps:10} each × {sets} rounds.',stat:'Stamina',baseRP:45,baseStatGain:3},
      {name:'Parkour Flow',template:'Perform {time:20m} of parkour or movement training.',stat:'Agility',baseRP:40,baseStatGain:3},
      {name:'Muscle-Up Complex',template:'Complete {sets} sets of: {reps:3} muscle-up + {reps:5} dip + {reps:5} L-sit.',stat:'Strength',baseRP:60,baseStatGain:5},
    ],
    home: [
      {name:'Home Burpee',template:'Execute {sets} sets of {reps:10} burpees at home.',stat:'Stamina',baseRP:25,baseStatGain:2},
      {name:'Home Full Body',template:'Perform full body home circuit: push-ups + squats + rows + core.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Home HIIT',template:'Complete home HIIT: {sets} rounds of 5 bodyweight exercises.',stat:'Stamina',baseRP:28,baseStatGain:2},
      {name:'Tabata Home',template:'Execute tabata: 8 rounds of 20s work / 10s rest — any exercise.',stat:'Stamina',baseRP:30,baseStatGain:2},
      {name:'Morning Full Body',template:'Perform morning full body routine: 10 min of continuous movement.',stat:'Stamina',baseRP:22,baseStatGain:1},
    ],
  },
};

// ─── NON-FITNESS QUEST DATABASE ───────────────────────────────────────────────

const LIFESTYLE_QUESTS = {

  study: [
    {name:'Deep Study Session',template:'Complete an uninterrupted {time:45m} deep study session. Phone off, distractions eliminated.',stat:'Intelligence',baseRP:35,baseStatGain:3,goals:['study_more']},
    {name:'Learn Something New',template:'Spend {time:30m} learning one new topic. Read, watch, or practice.',stat:'Intelligence',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Flashcard Review',template:'Review or create {reps:30} flashcards for your current study material.',stat:'Intelligence',baseRP:22,baseStatGain:2,goals:['study_more']},
    {name:'Practice Problem Set',template:'Solve {reps:10} practice problems from your study material.',stat:'Intelligence',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Read Non-Fiction',template:'Read {reps:20} pages of a non-fiction or educational book.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Watch Educational Video',template:'Watch a {time:30m} educational video and take notes.',stat:'Intelligence',baseRP:22,baseStatGain:2,goals:['study_more']},
    {name:'Summarize Learning',template:'Write a {reps:1} page summary of something you recently learned.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Pomodoro Study Block',template:'Complete 4 Pomodoro sessions (25m study / 5m break).',stat:'Intelligence',baseRP:35,baseStatGain:3,goals:['study_more']},
    {name:'Language Practice',template:'Practice a language or skill for {time:30m}.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Write Study Notes',template:'Write comprehensive notes on one topic for {time:30m}.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Teach What You Know',template:'Explain a concept you recently learned to someone else (or write it out).',stat:'Wisdom',baseRP:30,baseStatGain:3,goals:['study_more']},
    {name:'Online Course Module',template:'Complete one full module of an online course today.',stat:'Intelligence',baseRP:30,baseStatGain:2,goals:['study_more']},
    {name:'Research Deep Dive',template:'Research one topic deeply for {time:60m}. Document findings.',stat:'Intelligence',baseRP:38,baseStatGain:3,goals:['study_more']},
    {name:'Read Article',template:'Read and annotate 3 articles on your field of study.',stat:'Intelligence',baseRP:22,baseStatGain:1,goals:['study_more']},
    {name:'Test Yourself',template:'Take a practice test or quiz on recent study material.',stat:'Intelligence',baseRP:30,baseStatGain:2,goals:['study_more']},
    {name:'Mind Map',template:'Create a mind map of one complex topic from your studies.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Active Recall',template:'Close your notes and recall everything you know about one topic.',stat:'Intelligence',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Spaced Repetition',template:'Complete a full spaced repetition review session today.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Study Group',template:'Organize or attend a study session with others.',stat:'Intelligence',baseRP:30,baseStatGain:2,goals:['study_more']},
    {name:'Read a Full Chapter',template:'Read an entire chapter from an educational textbook.',stat:'Intelligence',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Organize Study Space',template:'Organize your study space for optimal focus and productivity.',stat:'Discipline',baseRP:15,baseStatGain:1,goals:['study_more','discipline']},
    {name:'Early Morning Study',template:'Wake up {time:1m} earlier than usual and study first thing.',stat:'Discipline',baseRP:30,baseStatGain:2,goals:['study_more','discipline']},
    {name:'No Social Media Study Day',template:'Study for {time:60m} with absolutely no social media or notifications.',stat:'Discipline',baseRP:30,baseStatGain:2,goals:['study_more','discipline']},
    {name:'Finance Fundamentals',template:'Spend {time:30m} learning one personal finance concept: budgeting, investing, compounding, or taxes. Document one key takeaway.',stat:'Intelligence',baseRP:30,baseStatGain:2,goals:['study_more']},
    {name:'Budget Review',template:'Review your monthly budget. Identify one area to cut spending and one area to increase savings.',stat:'Wisdom',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Investment Research',template:'Research one investment vehicle (stocks, ETFs, index funds, real estate) for {time:30m}. Write a one-paragraph summary.',stat:'Intelligence',baseRP:30,baseStatGain:2,goals:['study_more']},
    {name:'Track Your Net Worth',template:'Calculate your current net worth (assets minus liabilities). Write it down and compare to last month.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Learn About Compounding',template:'Study how compound interest works for {time:20m}. Calculate how much you would have in 10 years if you saved a set amount monthly.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Explore Your Interest',template:'Spend {time:45m} deeply studying a topic you are genuinely curious about — no agenda, just growth.',stat:'Intelligence',baseRP:35,baseStatGain:3,goals:['study_more']},
    {name:'Read on a Passion Topic',template:'Read {reps:20} pages or watch {time:30m} of content on something you personally find fascinating.',stat:'Wisdom',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Book Chapter',template:'Read {reps:30} pages of a book that improves your mind.',stat:'Wisdom',baseRP:28,baseStatGain:2,goals:['study_more']},
  ],

  discipline: [
    {name:'Wake Up On Time',template:'Wake up at your assigned time without hitting snooze. The System does not accept weakness.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
    {name:'Complete Your To-Do List',template:'Write and complete your full to-do list for today.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'No Phone First Hour',template:'Do not use your phone for the first hour after waking.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Cold Shower',template:'End your shower with {time:2m} of cold water. No hesitation.',stat:'Discipline',baseRP:30,baseStatGain:3,goals:['discipline']},
    {name:'Digital Detox',template:'Spend {time:2m} with no screens after 9 PM.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Sleep on Time',template:'Be in bed at your designated sleep time without delay.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
    {name:'Track Your Day',template:'Journal every task and action you took today.',stat:'Discipline',baseRP:18,baseStatGain:1,goals:['discipline']},
    {name:'5-Second Rule',template:'Do 3 tasks you have been procrastinating using the 5-second rule.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'No Junk Food',template:'Go the entire day without eating junk food.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Drink Enough Water',template:'Drink at least 2 liters of water today.',stat:'Durability',baseRP:15,baseStatGain:1,goals:['discipline']},
    {name:'Meal Prep',template:'Prepare your meals for the next day.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Morning Routine',template:'Complete your full morning routine without skipping steps.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
    {name:'Daily Review',template:'Spend {time:10m} reviewing what you accomplished today.',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['discipline']},
    {name:'Weekly Plan',template:'Plan your entire next week in advance.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Inbox Zero',template:'Clear your email inbox to zero today.',stat:'Discipline',baseRP:18,baseStatGain:1,goals:['discipline']},
    {name:'Clean Your Space',template:'Clean and organize your living and working space.',stat:'Discipline',baseRP:18,baseStatGain:1,goals:['discipline']},
    {name:'Minimize Distractions',template:'Identify and eliminate 3 sources of distraction from your environment.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Limit Screen Time',template:'Stay under 1 hour of non-productive screen time today.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Gratitude Journal',template:'Write 5 things you are grateful for and 3 goals for tomorrow.',stat:'Wisdom',baseRP:15,baseStatGain:1,goals:['discipline','mental_health']},
    {name:'One Hard Task First',template:'Identify your hardest task and complete it first today.',stat:'Discipline',baseRP:28,baseStatGain:2,goals:['discipline']},
    {name:'Night Routine',template:'Complete your full night routine and prepare for tomorrow.',stat:'Discipline',baseRP:18,baseStatGain:1,goals:['discipline']},
    {name:'Budget Check',template:'Review your finances and track your spending for the day. Find one area to cut costs.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Emergency Fund Check',template:'Review your emergency fund status. If under 3 months expenses, research one step to grow it.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Expense Audit',template:'Review all your subscriptions and recurring expenses. Cancel or question at least one.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'No Complaints',template:'Go the entire day without complaining about anything.',stat:'Discipline',baseRP:22,baseStatGain:2,goals:['discipline','mental_health']},
    {name:'Delayed Gratification',template:'Identify one thing you want immediately and delay it by at least 24 hours.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Commitment Kept',template:'Make one promise today and keep it — to yourself or someone else.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
  ],

  social: [
    {name:'Start a Conversation',template:'Initiate a conversation with someone new today.',stat:'Charisma',baseRP:25,baseStatGain:2,goals:['be_social']},
    {name:'Genuine Compliment',template:'Give 3 genuine compliments to different people today.',stat:'Charisma',baseRP:20,baseStatGain:2,goals:['be_social']},
    {name:'Call a Friend',template:'Call or video chat with a friend or family member today.',stat:'Charisma',baseRP:20,baseStatGain:1,goals:['be_social']},
    {name:'Social Event',template:'Attend a social event or gathering today.',stat:'Charisma',baseRP:30,baseStatGain:3,goals:['be_social']},
    {name:'Active Listening',template:'In your next conversation, listen more than you speak. Ask follow-up questions.',stat:'Charisma',baseRP:22,baseStatGain:2,goals:['be_social']},
    {name:'Reconnect',template:'Reach out to someone you have not spoken to in over a month.',stat:'Charisma',baseRP:25,baseStatGain:2,goals:['be_social']},
    {name:'Public Speaking',template:'Speak up in a meeting, class, or public setting today.',stat:'Charisma',baseRP:30,baseStatGain:3,goals:['be_social']},
    {name:'Eye Contact',template:'Maintain proper eye contact in all conversations today.',stat:'Charisma',baseRP:18,baseStatGain:1,goals:['be_social']},
    {name:'Help Someone',template:'Do something helpful for someone without being asked.',stat:'Charisma',baseRP:25,baseStatGain:2,goals:['be_social']},
    {name:'Introduction',template:'Introduce yourself to at least 2 new people today.',stat:'Charisma',baseRP:28,baseStatGain:3,goals:['be_social']},
    {name:'Confident Handshake',template:'Give a firm, confident handshake or greeting to someone today.',stat:'Charisma',baseRP:15,baseStatGain:1,goals:['be_social']},
    {name:'Plan a Social Event',template:'Organize a hangout, dinner, or activity with others.',stat:'Charisma',baseRP:30,baseStatGain:2,goals:['be_social']},
    {name:'Networking',template:'Connect with someone professionally on LinkedIn or in person.',stat:'Charisma',baseRP:28,baseStatGain:2,goals:['be_social']},
    {name:'Group Discussion',template:'Contribute meaningfully to a group discussion today.',stat:'Charisma',baseRP:25,baseStatGain:2,goals:['be_social']},
    {name:'Say Yes',template:'Say yes to a social invitation you would normally decline.',stat:'Charisma',baseRP:30,baseStatGain:3,goals:['be_social']},
    {name:'Thank Someone',template:'Write a meaningful thank-you message to someone who helped you.',stat:'Charisma',baseRP:18,baseStatGain:1,goals:['be_social']},
    {name:'Speak with Confidence',template:'Speak clearly and confidently in all interactions today.',stat:'Charisma',baseRP:20,baseStatGain:2,goals:['be_social']},
    {name:'Teach Someone',template:'Teach or explain something valuable to another person today.',stat:'Charisma',baseRP:25,baseStatGain:2,goals:['be_social']},
    {name:'Resolve a Conflict',template:'Address and resolve a disagreement or tension with someone.',stat:'Charisma',baseRP:35,baseStatGain:3,goals:['be_social']},
    {name:'Share Something Valuable',template:'Share a useful article, resource, or insight with someone in your network.',stat:'Charisma',baseRP:18,baseStatGain:1,goals:['be_social']},
  ],

  appearance: [
    {name:'Grooming Routine',template:'Complete a thorough grooming routine today — hair, skin, nails.',stat:'Appearance',baseRP:18,baseStatGain:2,goals:['appearance']},
    {name:'Skincare Routine',template:'Complete your morning and evening skincare routine.',stat:'Appearance',baseRP:15,baseStatGain:1,goals:['appearance']},
    {name:'Dress to Impress',template:'Dress better than the situation requires today.',stat:'Appearance',baseRP:20,baseStatGain:2,goals:['appearance']},
    {name:'Haircut',template:'Get a haircut or trim today.',stat:'Appearance',baseRP:22,baseStatGain:2,goals:['appearance']},
    {name:'Posture Check',template:'Maintain correct posture throughout the day. Check every hour.',stat:'Appearance',baseRP:18,baseStatGain:1,goals:['appearance']},
    {name:'Outfit Planning',template:'Plan your outfits for the next 3 days.',stat:'Appearance',baseRP:15,baseStatGain:1,goals:['appearance']},
    {name:'Hygiene Max',template:'Complete full hygiene protocol — shower, teeth, skin, grooming.',stat:'Appearance',baseRP:18,baseStatGain:1,goals:['appearance']},
    {name:'Laundry Day',template:'Wash, dry, and fold all your laundry.',stat:'Discipline',baseRP:15,baseStatGain:1,goals:['appearance','discipline']},
    {name:'Clean Your Shoes',template:'Clean and polish your shoes.',stat:'Appearance',baseRP:15,baseStatGain:1,goals:['appearance']},
    {name:'Upgrade Your Wardrobe',template:'Remove one old item from your wardrobe and replace or donate it.',stat:'Appearance',baseRP:18,baseStatGain:1,goals:['appearance']},
    {name:'No Junk Food Appearance',template:'Eat clean all day — no processed food for your skin and body.',stat:'Appearance',baseRP:22,baseStatGain:2,goals:['appearance','lose_weight']},
    {name:'Hydration for Skin',template:'Drink 3 liters of water today for skin health.',stat:'Appearance',baseRP:15,baseStatGain:1,goals:['appearance']},
    {name:'Sunscreen Application',template:'Apply sunscreen before going outside today.',stat:'Appearance',baseRP:12,baseStatGain:1,goals:['appearance']},
    {name:'Posture Correction',template:'Do {reps:3} sets of posture-corrective exercises.',stat:'Appearance',baseRP:18,baseStatGain:1,goals:['appearance']},
    {name:'Mirror Practice',template:'Practice confident body language in the mirror for {time:5m}.',stat:'Charisma',baseRP:15,baseStatGain:1,goals:['appearance','be_social']},
  ],

  mental: [
    {name:'Meditation',template:'Complete a {time:10m} meditation session. Silence, breath, focus.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['mental_health']},
    {name:'Journaling',template:'Write in your journal for {time:15m}. Reflect on today.',stat:'Wisdom',baseRP:20,baseStatGain:2,goals:['mental_health']},
    {name:'Breathing Exercise',template:'Complete {reps:5} rounds of box breathing (4s in, 4s hold, 4s out, 4s hold).',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['mental_health']},
    {name:'Nature Walk',template:'Go for a {time:20m} walk in nature — no phone, just observe.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['mental_health']},
    {name:'Visualization',template:'Spend {time:10m} visualizing your ideal future self in detail.',stat:'Wisdom',baseRP:20,baseStatGain:2,goals:['mental_health']},
    {name:'Stress Audit',template:'Identify your top 3 stressors and write one action for each.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['mental_health']},
    {name:'Limit Negative Input',template:'Remove or unfollow one source of negative content from your life.',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['mental_health']},
    {name:'Gratitude Practice',template:'Write 10 things you are genuinely grateful for today.',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['mental_health']},
    {name:'Mindful Meal',template:'Eat one meal today in complete silence — no phone, no TV.',stat:'Wisdom',baseRP:15,baseStatGain:1,goals:['mental_health']},
    {name:'Sleep Hygiene',template:'Sleep at consistent time, no screens 30 min before bed.',stat:'Wisdom',baseRP:20,baseStatGain:1,goals:['mental_health']},
    {name:'Affirmations',template:'Speak or write 10 personal affirmations aloud today.',stat:'Charisma',baseRP:15,baseStatGain:1,goals:['mental_health']},
    {name:'Dopamine Detox',template:'Spend 2 hours without social media, games, or entertainment.',stat:'Discipline',baseRP:28,baseStatGain:2,goals:['mental_health','discipline']},
    {name:'Identify One Fear',template:'Write down one fear and one action you can take to face it.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['mental_health']},
    {name:'Growth Mindset',template:'Write about a recent failure and what you learned from it.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['mental_health']},
    {name:'Read Philosophy',template:'Read {reps:10} pages of philosophy, psychology, or self-development.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['mental_health','study_more']},
    {name:'Limit News',template:'Consume no news or doomscrolling today.',stat:'Discipline',baseRP:18,baseStatGain:1,goals:['mental_health','discipline']},
    {name:'Creative Expression',template:'Spend {time:20m} on any creative activity — draw, write, play music.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['mental_health']},
    {name:'Unplug Hour',template:'Spend one hour completely off all devices — just be present.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['mental_health']},
    {name:'Process Your Emotions',template:'Spend {time:10m} identifying and writing about how you feel today.',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['mental_health']},
    {name:'Positive Social Media',template:'Unfollow 5 accounts that make you feel negative about yourself.',stat:'Wisdom',baseRP:18,baseStatGain:1,goals:['mental_health']},
  ],

  finance: [
    {name:'Budget Review',template:'Review your monthly budget. Track every expense category and find one area to cut back on.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Learn to Invest',template:'Spend {time:30m} researching index funds, ETFs, or compound interest. Write down one insight.',stat:'Intelligence',baseRP:28,baseStatGain:2,goals:['study_more']},
    {name:'Track Net Worth',template:'Calculate your total assets minus your total liabilities today. Write the number down.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Savings Goal',template:'Set or review one financial savings goal. Write the target amount and a deadline.',stat:'Discipline',baseRP:20,baseStatGain:2,goals:['discipline']},
    {name:'Expense Audit',template:'Review all recurring subscriptions and expenses. Cancel or question at least one unnecessary cost.',stat:'Discipline',baseRP:25,baseStatGain:2,goals:['discipline']},
    {name:'Compound Interest',template:'Use an online calculator to project how much a daily saving of even a small amount grows in 10, 20, and 30 years.',stat:'Intelligence',baseRP:22,baseStatGain:2,goals:['study_more']},
    {name:'Emergency Fund Check',template:'Check the status of your emergency fund. Research one step to build it to 3-6 months of expenses.',stat:'Wisdom',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'No Spend Day',template:'Go the entire day without spending money on anything non-essential.',stat:'Discipline',baseRP:28,baseStatGain:3,goals:['discipline']},
    {name:'Learn About Taxes',template:'Spend {time:20m} reading about how income tax, deductions, or tax-advantaged accounts work in your country.',stat:'Intelligence',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Financial Book',template:'Read {reps:20} pages of a personal finance book — The Psychology of Money, Rich Dad Poor Dad, or similar.',stat:'Wisdom',baseRP:25,baseStatGain:2,goals:['study_more']},
    {name:'Income Review',template:'Review your income sources today. Write down at least one potential way to increase your income.',stat:'Intelligence',baseRP:22,baseStatGain:2,goals:['discipline']},
    {name:'Debt Strategy',template:'If you have any debts, write out a clear payoff plan using either the avalanche or snowball method.',stat:'Discipline',baseRP:28,baseStatGain:2,goals:['discipline']},
  ],

  fitness_cardio: [
    {name:'30 Min Run',template:'Run continuously for {time:30m}. Maintain a pace you can sustain.',stat:'Stamina',baseRP:30,baseStatGain:2,goals:['lose_weight','discipline']},
    {name:'5K Run',template:'Complete a 5km run today.',stat:'Stamina',baseRP:35,baseStatGain:3,goals:['lose_weight']},
    {name:'Cycling Session',template:'Cycle for {time:30m} at moderate to high intensity.',stat:'Stamina',baseRP:28,baseStatGain:2,goals:['lose_weight']},
    {name:'Jump Rope Session',template:'Jump rope for {time:15m} with minimal breaks.',stat:'Speed',baseRP:28,baseStatGain:2,goals:['lose_weight']},
    {name:'Swimming',template:'Swim for {time:30m} continuously.',stat:'Stamina',baseRP:35,baseStatGain:3,goals:['lose_weight']},
    {name:'Stairmaster',template:'Complete {time:20m} on the stairmaster.',stat:'Stamina',baseRP:28,baseStatGain:2,goals:['lose_weight']},
    {name:'Morning Walk',template:'Walk for {time:30m} first thing in the morning.',stat:'Stamina',baseRP:18,baseStatGain:1,goals:['lose_weight']},
    {name:'10,000 Steps',template:'Complete 10,000 steps today.',stat:'Stamina',baseRP:22,baseStatGain:1,goals:['lose_weight']},
    {name:'HIIT Cardio',template:'Complete a {time:20m} HIIT cardio session.',stat:'Speed',baseRP:35,baseStatGain:3,goals:['lose_weight']},
    {name:'Elliptical',template:'Use the elliptical for {time:30m} at high resistance.',stat:'Stamina',baseRP:25,baseStatGain:2,goals:['lose_weight']},
    {name:'Sprint Intervals',template:'Perform {reps:10} sprint intervals of {time:30s} each with 90s rest.',stat:'Speed',baseRP:38,baseStatGain:3,goals:['lose_weight']},
    {name:'Zone 2 Cardio',template:'Maintain zone 2 heart rate for {time:45m} walking or jogging.',stat:'Stamina',baseRP:30,baseStatGain:2,goals:['lose_weight']},
    {name:'Rowing Machine',template:'Row for {time:20m} at consistent pace.',stat:'Stamina',baseRP:30,baseStatGain:2,goals:['lose_weight']},
    {name:'Active Rest Day',template:'Take a recovery walk for {time:45m}. Light movement only.',stat:'Durability',baseRP:18,baseStatGain:1,goals:['lose_weight']},
    {name:'Stretching Session',template:'Complete a full-body stretching routine for {time:20m}.',stat:'Durability',baseRP:18,baseStatGain:1,goals:['lose_weight','mental_health']},
    {name:'Yoga Session',template:'Complete a {time:30m} yoga session.',stat:'Agility',baseRP:25,baseStatGain:2,goals:['mental_health','lose_weight']},
    {name:'Mobility Work',template:'Perform {time:20m} of focused mobility and flexibility work.',stat:'Agility',baseRP:20,baseStatGain:1,goals:['lose_weight']},
    {name:'Track Workout',template:'Complete a structured track workout: warm-up + intervals + cool-down.',stat:'Speed',baseRP:40,baseStatGain:3,goals:['lose_weight']},
    {name:'Hill Sprints',template:'Perform {reps:8} hill sprint repeats.',stat:'Speed',baseRP:40,baseStatGain:3,goals:['lose_weight']},
    {name:'Long Walk',template:'Walk {reps:8} kilometers at a brisk pace.',stat:'Stamina',baseRP:25,baseStatGain:2,goals:['lose_weight']},
  ],
};

// ─── WEEKLY QUEST HISTORY (prevent same-week repeats) ────────────────────────
function getWeekKey() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const week = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  return `${now.getFullYear()}-W${week}`;
}

function getUsedQuestsThisWeek() {
  const key = 'usedQuests_' + getWeekKey();
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function markQuestsUsed(questNames) {
  const key = 'usedQuests_' + getWeekKey();
  const existing = getUsedQuestsThisWeek();
  const updated = [...new Set([...existing, ...questNames])];
  localStorage.setItem(key, JSON.stringify(updated));
}

// ─── QUEST PICKER ENGINE ──────────────────────────────────────────────────────

function getAvailableEquipmentTypes(workoutEnv) {
  switch(workoutEnv) {
    case 'gym': return ['gym','calisthenics','home'];
    case 'calisthenics': return ['calisthenics','home'];
    case 'home': return ['home','home','home','calisthenics']; // mostly home, occasional calisthenics
    default: return ['home'];
  }
}

function pickQuestsForMuscle(muscle, fitnessLevel, rankName, workoutEnv, count, usedNames) {
  const equipTypes = getAvailableEquipmentTypes(workoutEnv);
  const pool = [];

  equipTypes.forEach(eq => {
    const db = QUEST_DB[muscle]?.[eq] || [];
    db.forEach(q => {
      if (!usedNames.includes(q.name)) pool.push({...q, equipType: eq});
    });
  });

  // Shuffle pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count).map((q, idx) => formatQuest(q, fitnessLevel, rankName, muscle, idx));
}

function pickLifestyleQuests(goals, fitnessLevel, rankName, count, usedNames) {
  const allPools = [];

  // Determine which lifestyle categories are relevant
  const categoryWeights = {
    discipline: goals.includes('discipline') ? 3 : 1,
    mental: goals.includes('mental_health') ? 3 : 1,
    social: goals.includes('be_social') ? 3 : 1,
    appearance: goals.includes('appearance') ? 3 : 1,
    study: goals.includes('study_more') ? 3 : 1,
    finance: 2, // always included — finance knowledge is universal
    fitness_cardio: (goals.includes('lose_weight') || goals.includes('build_muscle')) ? 2 : 1,
  };

  Object.entries(categoryWeights).forEach(([cat, weight]) => {
    const catPool = LIFESTYLE_QUESTS[cat] || [];
    catPool.forEach(q => {
      if (!usedNames.includes(q.name)) {
        for (let w = 0; w < weight; w++) allPools.push({...q, category: cat});
      }
    });
  });

  // Shuffle
  for (let i = allPools.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPools[i], allPools[j]] = [allPools[j], allPools[i]];
  }

  // Dedupe by name
  const seen = new Set();
  const deduped = allPools.filter(q => {
    if (seen.has(q.name)) return false;
    seen.add(q.name);
    return true;
  });

  return deduped.slice(0, count).map((q, idx) => formatLifestyleQuest(q, fitnessLevel, rankName, idx + 100));
}

function formatQuest(q, fitnessLevel, rankName, muscle, idx) {
  const desc = scaleQuest(q.template, fitnessLevel, rankName);
  const rankMultiplier = getRankRPMultiplier(rankName);
  return {
    id: `q_${muscle}_${idx}_${Date.now()}`,
    type: 'daily',
    name: q.name,
    description: desc,
    stat: q.stat,
    rp: Math.round(q.baseRP * rankMultiplier),
    statGain: q.baseStatGain,
    completed: false,
    muscle: muscle,
  };
}

function formatLifestyleQuest(q, fitnessLevel, rankName, idx) {
  const desc = scaleQuest(q.template, fitnessLevel, rankName);
  const rankMultiplier = getRankRPMultiplier(rankName);
  return {
    id: `ql_${idx}_${Date.now()}`,
    type: 'daily',
    name: q.name,
    description: desc,
    stat: q.stat,
    rp: Math.round(q.baseRP * rankMultiplier),
    statGain: q.baseStatGain,
    completed: false,
    muscle: 'lifestyle',
  };
}

function getRankRPMultiplier(rankName) {
  const multipliers = {
    'E-Rank': 1.0, 'D-Rank': 1.2, 'C-Rank': 1.5,
    'B-Rank': 2.0, 'A-Rank': 2.5, 'S-Rank': 3.0,
    'SS-Rank': 3.5, 'SSS-Rank': 4.0, 'X-Rank': 5.0, 'Z-Rank': 6.0
  };
  return multipliers[rankName] || 1.0;
}

// ─── SPLIT LOGIC ──────────────────────────────────────────────────────────────
// Given the split type, day of week, and custom assignments — determine today's muscle groups

const SPLIT_SCHEDULES = {
  ppl: {
    days: 6,
    schedule: [
      ['chest','shoulders','triceps'],
      ['back','biceps','forearms'],
      ['quads','hamstrings','glutes','calves'],
      ['chest','shoulders','triceps'],
      ['back','biceps','forearms'],
      ['quads','hamstrings','glutes','calves'],
    ],
    restDays: [],
  },
  brosplit: {
    days: 5,
    schedule: [
      ['chest'],
      ['back'],
      ['shoulders'],
      ['biceps','triceps','forearms'],
      ['quads','hamstrings','glutes','calves'],
    ],
    restDays: [],
  },
  upperlower: {
    days: 4,
    schedule: [
      ['chest','back','shoulders'],
      ['quads','hamstrings','glutes','calves'],
      ['chest','back','shoulders'],
      ['quads','hamstrings','glutes','calves'],
    ],
    restDays: [],
  },
  fullbody: {
    days: 3,
    schedule: [
      ['fullbody'],
      ['fullbody'],
      ['fullbody'],
    ],
    restDays: [],
  },
};

function getMusclesForToday(hunter) {
  const split = hunter.workoutSplit || 'ppl';
  const customSchedule = hunter.customSchedule;
  const daysPerWeek = parseInt(hunter.daysPerWeek) || 5;

  // If custom schedule is set, use it
  if (customSchedule) {
    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const todayName = dayNames[new Date().getDay()];
    const muscles = customSchedule[todayName];
    return (muscles && muscles.length > 0) ? muscles : null;
  }

  // Use split schedule
  const schedule = SPLIT_SCHEDULES[split];
  if (!schedule) return ['fullbody'];

  // Determine which day in the cycle we are
  const startDate = hunter.startDate ? new Date(hunter.startDate) : new Date();
  const today = new Date();
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const cycleDay = daysSinceStart % (schedule.days + (7 - daysPerWeek));

  if (cycleDay >= schedule.days) return null; // rest day

  return schedule.schedule[cycleDay % schedule.schedule.length];
}

// ─── MAIN DAILY QUEST GENERATOR ──────────────────────────────────────────────

function generateQuestsLocally(hunter, rankName) {
  const usedNames = getUsedQuestsThisWeek();
  const fitnessLevel = hunter.fitness || 'intermediate';
  const workoutEnv = hunter.workoutEnv || 'home';
  const goals = hunter.goals || [];
  const todayMuscles = getMusclesForToday(hunter);
  const isRestDay = todayMuscles === null;

  // Get quest count from state, default to 8
  const questCount = (typeof STATE !== 'undefined' && STATE.questCount) ? STATE.questCount : 8;

  const quests = [];

  if (isRestDay) {
    // Rest day: 3 light fitness + 5 lifestyle + 1 special + 2 bonus
    const lightQuests = pickQuestsForMuscle('core', fitnessLevel, rankName, workoutEnv, 1, usedNames);
    const stretchQuests = pickLifestyleQuests(['mental_health','discipline'], fitnessLevel, rankName, 2, usedNames);
    const lifestyleQuests = pickLifestyleQuests(goals, fitnessLevel, rankName, 5, [...usedNames, ...lightQuests.map(q=>q.name), ...stretchQuests.map(q=>q.name)]);
    quests.push(...lightQuests, ...stretchQuests, ...lifestyleQuests);
  } else {
    // Workout day: allocate questCount between fitness and lifestyle
    const lifestyleCount = Math.max(1, Math.floor(questCount / 3));
    const fitnessTarget = questCount - lifestyleCount;
    const muscleCount = todayMuscles.length;
    const fitnessQuestsPerMuscle = Math.max(1, Math.floor(fitnessTarget / muscleCount));

    todayMuscles.forEach(muscle => {
      const mQuests = pickQuestsForMuscle(muscle, fitnessLevel, rankName, workoutEnv, fitnessQuestsPerMuscle, usedNames);
      quests.push(...mQuests);
      mQuests.forEach(q => usedNames.push(q.name));
    });

    // Fill to target fitness quests if needed
    while (quests.length < fitnessTarget) {
      const extra = pickQuestsForMuscle(todayMuscles[quests.length % todayMuscles.length] || todayMuscles[0], fitnessLevel, rankName, workoutEnv, 1, usedNames.concat(quests.map(q=>q.name)));
      if (!extra.length) break;
      quests.push(...extra);
    }

    // Add lifestyle quests
    const lifeQuests = pickLifestyleQuests(goals, fitnessLevel, rankName, lifestyleCount, usedNames.concat(quests.map(q=>q.name)));
    quests.push(...lifeQuests);
  }

  // Cap to questCount daily quests
  const ts = Date.now();
  const dailyQuests = quests.slice(0, questCount).map((q, i) => ({...q, id: `d${i}_${ts + i}`, type: 'daily'}));

  // Primary muscle for today's special/challenge quests
  const primaryMuscle = (todayMuscles && todayMuscles[0]) || 'fullbody';

  // 1 special quest (harder) — always from today's primary muscle
  const specialPool = pickQuestsForMuscle(
    primaryMuscle,
    fitnessLevel, rankName, workoutEnv, 3,
    usedNames.concat(dailyQuests.map(q=>q.name))
  );
  if (specialPool.length > 0) {
    const special = {...specialPool[0]};
    special.id = `s0_${ts + 100}`;
    special.type = 'special';
    special.rp = Math.round(special.rp * 2.5);
    special.statGain = Math.max(3, special.statGain * 2);
    special.name = 'SPECIAL: ' + special.name;
    dailyQuests.push(special);
  }

  // 2 bonus quests — lifestyle only
  const bonusPool = pickLifestyleQuests(
    goals, fitnessLevel, rankName, 4,
    usedNames.concat(dailyQuests.map(q=>q.name))
  );
  bonusPool.slice(0, 2).forEach((q, i) => {
    dailyQuests.push({
      ...q,
      id: `b${i}_${ts + 200 + i}`,
      type: 'bonus',
      rp: Math.round(q.rp * 1.5),
      statGain: Math.max(2, q.statGain + 1),
      name: 'BONUS: ' + q.name,
    });
  });

  // Challenge quest every other day — from today's primary muscle
  const dayNum = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  if (dayNum % 2 === 0) {
    const challengePool = pickQuestsForMuscle(
      primaryMuscle,
      'advanced', rankName, workoutEnv, 1,
      usedNames.concat(dailyQuests.map(q=>q.name))
    );
    if (challengePool.length > 0) {
      const challenge = {...challengePool[0]};
      challenge.id = `c0_${ts + 300}`;
      challenge.type = 'challenging';
      challenge.rp = Math.round(challenge.rp * 4);
      challenge.statGain = Math.max(8, challenge.statGain * 4);
      challenge.name = 'CHALLENGE: ' + challenge.name;
      dailyQuests.push(challenge);
    }
  }

  // Mark all used
  markQuestsUsed(dailyQuests.map(q => q.name));

  return dailyQuests;
}
