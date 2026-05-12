/* ═══════════════════════════════════════════════════════════════════
   SOLO LEVELING SYSTEM — FEATURES MODULE
   Feature 1: Achievement / Badge System (220 badges, 5 tiers)
   Feature 2: Dungeon Gate Pop-Up Quests (30s timer, hard penalty)
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ─── TIER DEFINITIONS ────────────────────────────────────────────────────────

const ACH_TIERS = {
  bronze:   { label: 'BRONZE',   rp: 25,   color: '#cd7f32' },
  silver:   { label: 'SILVER',   rp: 75,   color: '#c0c0c0' },
  gold:     { label: 'GOLD',     rp: 200,  color: '#fbbf24' },
  platinum: { label: 'PLATINUM', rp: 500,  color: '#e5e4e2' },
  diamond:  { label: 'DIAMOND',  rp: 1500, color: '#b9f2ff' },
};

// ─── ACHIEVEMENT DATABASE (220 badges) ────────────────────────────────────────
// condition(STATE) returns true when unlocked

const ACHIEVEMENTS = [

  // ══════════════ BRONZE — FIRST STEPS (50 badges) ══════════════
  { id:'first_blood',     tier:'bronze', icon:'⚔',  name:'First Blood',         desc:'Complete your very first quest.',                     condition: s => (s.hunter?.questsEverCompleted||0) >= 1 },
  { id:'baby_steps',      tier:'bronze', icon:'👣',  name:'Baby Steps',          desc:'Complete 5 quests total.',                            condition: s => (s.hunter?.questsEverCompleted||0) >= 5 },
  { id:'getting_started', tier:'bronze', icon:'🔰',  name:'Getting Started',     desc:'Complete 10 quests.',                                 condition: s => (s.hunter?.questsEverCompleted||0) >= 10 },
  { id:'novice_hunter',   tier:'bronze', icon:'🗡',  name:'Novice Hunter',       desc:'Complete 25 quests.',                                 condition: s => (s.hunter?.questsEverCompleted||0) >= 25 },
  { id:'on_a_roll',       tier:'bronze', icon:'🎲',  name:'On a Roll',           desc:'Achieve a 3-day streak.',                             condition: s => (s.streak||0) >= 3 },
  { id:'week_warrior',    tier:'bronze', icon:'📅',  name:'Week Warrior',        desc:'Achieve a 7-day streak.',                             condition: s => (s.streak||0) >= 7 },
  { id:'first_rank',      tier:'bronze', icon:'📊',  name:'Ranked Up',           desc:'Reach D-Rank.',                                       condition: s => getTotalStatsF(s) >= 120 },
  { id:'stat_collector',  tier:'bronze', icon:'📈',  name:'Stat Collector',      desc:'Accumulate 100 total stat points.',                   condition: s => getTotalStatsF(s) >= 100 },
  { id:'rp_earner',       tier:'bronze', icon:'◆',   name:'RP Earner',           desc:'Earn 100 RP total.',                                  condition: s => (s.hunter?.rpEverEarned||0) >= 100 },
  { id:'shop_visitor',    tier:'bronze', icon:'🛒',  name:'Window Shopper',      desc:'Purchase your first item from the shop.',             condition: s => (s.hunter?.itemsPurchased||0) >= 1 },
  { id:'chest_opener',    tier:'bronze', icon:'📦',  name:'Treasure Hunter',     desc:'Open your first Bonus Chest.',                        condition: s => (s.hunter?.chestsOpened||0) >= 1 },
  { id:'morning_hunter',  tier:'bronze', icon:'🌅',  name:'Early Riser',         desc:'Complete a quest before 9 AM.',                       condition: s => (s.hunter?.earlyQuestDone||false) },
  { id:'night_owl',       tier:'bronze', icon:'🦉',  name:'Night Owl',           desc:'Complete a quest after 10 PM.',                       condition: s => (s.hunter?.lateQuestDone||false) },
  { id:'strength_begin',  tier:'bronze', icon:'💪',  name:'Iron Beginner',       desc:'Raise Strength to 15.',                               condition: s => (s.stats?.Strength||0) >= 15 },
  { id:'intel_begin',     tier:'bronze', icon:'📚',  name:'Scholar Initiate',    desc:'Raise Intelligence to 15.',                           condition: s => (s.stats?.Intelligence||0) >= 15 },
  { id:'speed_begin',     tier:'bronze', icon:'⚡',  name:'Swift Feet',          desc:'Raise Speed to 15.',                                  condition: s => (s.stats?.Speed||0) >= 15 },
  { id:'stamina_begin',   tier:'bronze', icon:'🫁',  name:'Iron Lungs',          desc:'Raise Stamina to 15.',                                condition: s => (s.stats?.Stamina||0) >= 15 },
  { id:'discipline_init', tier:'bronze', icon:'🔒',  name:'First Discipline',    desc:'Raise Discipline to 15.',                             condition: s => (s.stats?.Discipline||0) >= 15 },
  { id:'charisma_init',   tier:'bronze', icon:'🗣',  name:'First Words',         desc:'Raise Charisma to 15.',                               condition: s => (s.stats?.Charisma||0) >= 15 },
  { id:'appearance_init', tier:'bronze', icon:'✦',   name:'Self-Aware',          desc:'Raise Appearance to 15.',                             condition: s => (s.stats?.Appearance||0) >= 15 },
  { id:'agility_init',    tier:'bronze', icon:'🌀',  name:'Quick Learner',       desc:'Raise Agility to 15.',                                condition: s => (s.stats?.Agility||0) >= 15 },
  { id:'wisdom_init',     tier:'bronze', icon:'👁',  name:'Open Eyes',           desc:'Raise Wisdom to 15.',                                 condition: s => (s.stats?.Wisdom||0) >= 15 },
  { id:'dex_init',        tier:'bronze', icon:'🎯',  name:'Steady Hands',        desc:'Raise Dexterity to 15.',                              condition: s => (s.stats?.Dexterity||0) >= 15 },
  { id:'dur_init',        tier:'bronze', icon:'🛡',  name:'Tough Skin',          desc:'Raise Durability to 15.',                             condition: s => (s.stats?.Durability||0) >= 15 },
  { id:'first_dungeon',   tier:'bronze', icon:'🚪',  name:'Gate Crasher',        desc:'Accept your first Dungeon Quest.',                    condition: s => (s.hunter?.dungeonsAccepted||0) >= 1 },
  { id:'survived',        tier:'bronze', icon:'💀',  name:'Survived',            desc:'Survive your first Penalty.',                         condition: s => (s.hunter?.penaltiesSurvived||0) >= 1 },
  { id:'quest_20',        tier:'bronze', icon:'🎯',  name:'Mission Operative',   desc:'Complete 20 quests total.',                           condition: s => (s.hunter?.questsEverCompleted||0) >= 20 },
  { id:'quest_50',        tier:'bronze', icon:'🗂',  name:'Quest Addict',        desc:'Complete 50 quests.',                                 condition: s => (s.hunter?.questsEverCompleted||0) >= 50 },
  { id:'rp_250',          tier:'bronze', icon:'💰',  name:'RP Hoarder',          desc:'Earn 250 RP total.',                                  condition: s => (s.hunter?.rpEverEarned||0) >= 250 },
  { id:'streak_5',        tier:'bronze', icon:'🔥',  name:'Consistent',          desc:'Achieve a 5-day streak.',                             condition: s => (s.streak||0) >= 5 },
  { id:'all_stats_10',    tier:'bronze', icon:'⬡',   name:'Balanced Beginner',   desc:'Raise all stats to at least 10.',                     condition: s => s.stats && Object.values(s.stats).every(v => v >= 10) },
  { id:'buy_3',           tier:'bronze', icon:'🛍',  name:'Regular Customer',    desc:'Purchase 3 items from the shop.',                     condition: s => (s.hunter?.itemsPurchased||0) >= 3 },
  { id:'open_3',          tier:'bronze', icon:'🎁',  name:'Chest Collector',     desc:'Open 3 Bonus Chests.',                                condition: s => (s.hunter?.chestsOpened||0) >= 3 },
  { id:'special_done',    tier:'bronze', icon:'🌟',  name:'Special Ops',         desc:'Complete a Special quest.',                           condition: s => (s.hunter?.specialQuestsDone||0) >= 1 },
  { id:'hard_done',       tier:'bronze', icon:'💥',  name:'Pain Seeker',         desc:'Complete a Challenging quest.',                       condition: s => (s.hunter?.hardQuestsDone||0) >= 1 },
  { id:'two_weeks',       tier:'bronze', icon:'📆',  name:'Two Weeks Strong',    desc:'Play for 14 days total.',                             condition: s => getDaysSinceStart(s) >= 14 },
  { id:'one_week_streak', tier:'bronze', icon:'7️⃣',  name:'Perfect Week',        desc:'Complete a 7-day streak.',                            condition: s => (s.streak||0) >= 7 },
  { id:'gym_goer',        tier:'bronze', icon:'🏋',  name:'Gym Goer',            desc:'Complete 10 workout quests.',                         condition: s => (s.hunter?.workoutQuestsDone||0) >= 10 },
  { id:'rp_500',          tier:'bronze', icon:'💎',  name:'RP Accumulator',      desc:'Earn 500 RP total.',                                  condition: s => (s.hunter?.rpEverEarned||0) >= 500 },
  { id:'total_150',       tier:'bronze', icon:'📊',  name:'Rising Hunter',       desc:'Reach 150 total stat points.',                        condition: s => getTotalStatsF(s) >= 150 },
  { id:'quest_75',        tier:'bronze', icon:'📋',  name:'Mission Master',      desc:'Complete 75 quests.',                                 condition: s => (s.hunter?.questsEverCompleted||0) >= 75 },
  { id:'chest_5',         tier:'bronze', icon:'⬡',   name:'Loot Goblin',         desc:'Open 5 Bonus Chests.',                                condition: s => (s.hunter?.chestsOpened||0) >= 5 },
  { id:'str_20',          tier:'bronze', icon:'🦾',  name:'Getting Stronger',    desc:'Raise Strength to 20.',                               condition: s => (s.stats?.Strength||0) >= 20 },
  { id:'int_20',          tier:'bronze', icon:'🧠',  name:'Sharp Mind',          desc:'Raise Intelligence to 20.',                           condition: s => (s.stats?.Intelligence||0) >= 20 },
  { id:'bonus_done',      tier:'bronze', icon:'🎰',  name:'Bonus Hunter',        desc:'Complete a Bonus quest.',                             condition: s => (s.hunter?.bonusQuestsDone||0) >= 1 },
  { id:'three_dungeons',  tier:'bronze', icon:'🗺',  name:'Dungeon Regular',     desc:'Accept 3 Dungeon quests.',                            condition: s => (s.hunter?.dungeonsAccepted||0) >= 3 },
  { id:'no_skip_week',    tier:'bronze', icon:'✅',  name:'No Excuses',          desc:'Complete quests 7 days without skipping.',            condition: s => (s.hunter?.noSkipStreak||0) >= 7 },
  { id:'rp_750',          tier:'bronze', icon:'💰',  name:'RP Veteran',          desc:'Earn 750 RP total.',                                  condition: s => (s.hunter?.rpEverEarned||0) >= 750 },
  { id:'one_month',       tier:'bronze', icon:'🗓',  name:'One Month Strong',    desc:'Play for 30 days.',                                   condition: s => getDaysSinceStart(s) >= 30 },

  // ══════════════ SILVER — DEDICATION (50 badges) ══════════════
  { id:'quest_100',       tier:'silver', icon:'💯',  name:'Century',             desc:'Complete 100 quests total.',                          condition: s => (s.hunter?.questsEverCompleted||0) >= 100 },
  { id:'streak_14',       tier:'silver', icon:'🔥',  name:'Two-Week Fire',       desc:'Achieve a 14-day streak.',                            condition: s => (s.streak||0) >= 14 },
  { id:'c_rank',          tier:'silver', icon:'©',   name:'C-Rank Achieved',     desc:'Reach C-Rank (220 stat points).',                     condition: s => getTotalStatsF(s) >= 220 },
  { id:'str_30',          tier:'silver', icon:'⚔',   name:'Iron Fist',           desc:'Raise Strength to 30.',                               condition: s => (s.stats?.Strength||0) >= 30 },
  { id:'int_30',          tier:'silver', icon:'📖',  name:'Knowledge Seeker',    desc:'Raise Intelligence to 30.',                           condition: s => (s.stats?.Intelligence||0) >= 30 },
  { id:'stamina_30',      tier:'silver', icon:'🫀',  name:'Endurance Core',      desc:'Raise Stamina to 30.',                                condition: s => (s.stats?.Stamina||0) >= 30 },
  { id:'speed_30',        tier:'silver', icon:'💨',  name:'Speed Demon',         desc:'Raise Speed to 30.',                                  condition: s => (s.stats?.Speed||0) >= 30 },
  { id:'rp_2000',         tier:'silver', icon:'💰',  name:'Wealthy Hunter',      desc:'Earn 2,000 RP total.',                                condition: s => (s.hunter?.rpEverEarned||0) >= 2000 },
  { id:'all_stats_20',    tier:'silver', icon:'⬡',   name:'Well-Rounded',        desc:'Raise all stats to at least 20.',                     condition: s => s.stats && Object.values(s.stats).every(v => v >= 20) },
  { id:'streak_21',       tier:'silver', icon:'🌙',  name:'Three-Week Grind',    desc:'Achieve a 21-day streak.',                            condition: s => (s.streak||0) >= 21 },
  { id:'dungeon_5',       tier:'silver', icon:'🚪',  name:'Dungeon Diver',       desc:'Complete 5 Dungeon quests.',                          condition: s => (s.hunter?.dungeonsCompleted||0) >= 5 },
  { id:'quest_150',       tier:'silver', icon:'📋',  name:'Experienced Operative',desc:'Complete 150 quests.',                               condition: s => (s.hunter?.questsEverCompleted||0) >= 150 },
  { id:'total_300',       tier:'silver', icon:'📊',  name:'Powered Up',          desc:'Reach 300 total stat points.',                        condition: s => getTotalStatsF(s) >= 300 },
  { id:'special_10',      tier:'silver', icon:'🌟',  name:'Special Agent',       desc:'Complete 10 Special quests.',                         condition: s => (s.hunter?.specialQuestsDone||0) >= 10 },
  { id:'hard_10',         tier:'silver', icon:'💥',  name:'Challenge Accepted',  desc:'Complete 10 Challenging quests.',                     condition: s => (s.hunter?.hardQuestsDone||0) >= 10 },
  { id:'chest_15',        tier:'silver', icon:'📦',  name:'Treasure Hoarder',    desc:'Open 15 Bonus Chests.',                               condition: s => (s.hunter?.chestsOpened||0) >= 15 },
  { id:'shop_10',         tier:'silver', icon:'🏪',  name:'Big Spender',         desc:'Purchase 10 shop items.',                             condition: s => (s.hunter?.itemsPurchased||0) >= 10 },
  { id:'dur_30',          tier:'silver', icon:'🛡',  name:'Iron Skin',           desc:'Raise Durability to 30.',                             condition: s => (s.stats?.Durability||0) >= 30 },
  { id:'agi_30',          tier:'silver', icon:'🌀',  name:'Agile Body',          desc:'Raise Agility to 30.',                                condition: s => (s.stats?.Agility||0) >= 30 },
  { id:'wis_30',          tier:'silver', icon:'👁',  name:'Inner Sight',         desc:'Raise Wisdom to 30.',                                 condition: s => (s.stats?.Wisdom||0) >= 30 },
  { id:'char_30',         tier:'silver', icon:'🗣',  name:'Social Climber',      desc:'Raise Charisma to 30.',                               condition: s => (s.stats?.Charisma||0) >= 30 },
  { id:'dex_30',          tier:'silver', icon:'🎯',  name:'Precise Hands',       desc:'Raise Dexterity to 30.',                              condition: s => (s.stats?.Dexterity||0) >= 30 },
  { id:'disc_30',         tier:'silver', icon:'🔒',  name:'Iron Will',           desc:'Raise Discipline to 30.',                             condition: s => (s.stats?.Discipline||0) >= 30 },
  { id:'app_30',          tier:'silver', icon:'✦',   name:'Looking Good',        desc:'Raise Appearance to 30.',                             condition: s => (s.stats?.Appearance||0) >= 30 },
  { id:'two_months',      tier:'silver', icon:'📅',  name:'Two Months Strong',   desc:'Play for 60 days.',                                   condition: s => getDaysSinceStart(s) >= 60 },
  { id:'streak_28',       tier:'silver', icon:'🔥',  name:'Monthly Beast',       desc:'Achieve a 28-day streak.',                            condition: s => (s.streak||0) >= 28 },
  { id:'rp_5000',         tier:'silver', icon:'💎',  name:'RP Rich',             desc:'Earn 5,000 RP total.',                                condition: s => (s.hunter?.rpEverEarned||0) >= 5000 },
  { id:'quest_200',       tier:'silver', icon:'📋',  name:'Quest Master',        desc:'Complete 200 quests.',                                condition: s => (s.hunter?.questsEverCompleted||0) >= 200 },
  { id:'total_400',       tier:'silver', icon:'📊',  name:'Power Rising',        desc:'Reach 400 total stat points (B-Rank).',               condition: s => getTotalStatsF(s) >= 400 },
  { id:'dungeon_10',      tier:'silver', icon:'🗺',  name:'Gate Hunter',         desc:'Complete 10 Dungeon quests.',                         condition: s => (s.hunter?.dungeonsCompleted||0) >= 10 },
  { id:'workout_50',      tier:'silver', icon:'🏋',  name:'Gym Rat',             desc:'Complete 50 workout quests.',                         condition: s => (s.hunter?.workoutQuestsDone||0) >= 50 },
  { id:'no_skip_30',      tier:'silver', icon:'✅',  name:'Disciplined Soul',    desc:'Complete quests 30 days without skipping.',           condition: s => (s.hunter?.noSkipStreak||0) >= 30 },
  { id:'all_stats_30',    tier:'silver', icon:'⬡',   name:'Balanced Warrior',    desc:'Raise all stats to at least 30.',                     condition: s => s.stats && Object.values(s.stats).every(v => v >= 30) },
  { id:'b_rank',          tier:'silver', icon:'🔷',  name:'B-Rank Hunter',       desc:'Reach B-Rank (400 stat points).',                     condition: s => getTotalStatsF(s) >= 400 },
  { id:'penalty_3',       tier:'silver', icon:'💀',  name:'Punishment Veteran',  desc:'Survive 3 System Penalties.',                         condition: s => (s.hunter?.penaltiesSurvived||0) >= 3 },
  { id:'chest_25',        tier:'silver', icon:'📦',  name:'Loot Master',         desc:'Open 25 Bonus Chests.',                               condition: s => (s.hunter?.chestsOpened||0) >= 25 },
  { id:'rp_8000',         tier:'silver', icon:'💰',  name:'RP Magnate',          desc:'Earn 8,000 RP total.',                                condition: s => (s.hunter?.rpEverEarned||0) >= 8000 },
  { id:'quest_300',       tier:'silver', icon:'🎖',  name:'Elite Operative',     desc:'Complete 300 quests.',                                condition: s => (s.hunter?.questsEverCompleted||0) >= 300 },
  { id:'str_50',          tier:'silver', icon:'⚔',   name:'Half-Way Warrior',    desc:'Raise Strength to 50.',                               condition: s => (s.stats?.Strength||0) >= 50 },
  { id:'int_50',          tier:'silver', icon:'🎓',  name:'Half-Way Scholar',    desc:'Raise Intelligence to 50.',                           condition: s => (s.stats?.Intelligence||0) >= 50 },
  { id:'speed_50',        tier:'silver', icon:'⚡',  name:'Half-Way Speedster',  desc:'Raise Speed to 50.',                                  condition: s => (s.stats?.Speed||0) >= 50 },
  { id:'three_months',    tier:'silver', icon:'📆',  name:'Three Months In',     desc:'Play for 90 days.',                                   condition: s => getDaysSinceStart(s) >= 90 },
  { id:'bonus_20',        tier:'silver', icon:'🎰',  name:'Bonus Addict',        desc:'Complete 20 Bonus quests.',                           condition: s => (s.hunter?.bonusQuestsDone||0) >= 20 },
  { id:'dungeon_15',      tier:'silver', icon:'🚪',  name:'Gate Breaker',        desc:'Complete 15 Dungeon quests.',                         condition: s => (s.hunter?.dungeonsCompleted||0) >= 15 },
  { id:'shop_20',         tier:'silver', icon:'🏪',  name:'Shop Veteran',        desc:'Purchase 20 shop items.',                             condition: s => (s.hunter?.itemsPurchased||0) >= 20 },
  { id:'total_500',       tier:'silver', icon:'📊',  name:'Power Surge',         desc:'Reach 500 stat points.',                              condition: s => getTotalStatsF(s) >= 500 },
  { id:'streak_45',       tier:'silver', icon:'🌙',  name:'45-Day Streak',       desc:'Achieve a 45-day streak.',                            condition: s => (s.streak||0) >= 45 },
  { id:'hard_25',         tier:'silver', icon:'💥',  name:'Pain Aficionado',     desc:'Complete 25 Challenging quests.',                     condition: s => (s.hunter?.hardQuestsDone||0) >= 25 },
  { id:'special_25',      tier:'silver', icon:'🌟',  name:'Special Veteran',     desc:'Complete 25 Special quests.',                         condition: s => (s.hunter?.specialQuestsDone||0) >= 25 },

  // ══════════════ GOLD — MASTERY (50 badges) ══════════════
  { id:'quest_400',       tier:'gold', icon:'📋',  name:'Quest Veteran',        desc:'Complete 400 quests.',                                condition: s => (s.hunter?.questsEverCompleted||0) >= 400 },
  { id:'streak_60',       tier:'gold', icon:'🔥',  name:'Two-Month Flame',      desc:'Achieve a 60-day streak.',                            condition: s => (s.streak||0) >= 60 },
  { id:'a_rank',          tier:'gold', icon:'🅰',   name:'A-Rank Hunter',        desc:'Reach A-Rank (700 stat points).',                     condition: s => getTotalStatsF(s) >= 700 },
  { id:'total_700',       tier:'gold', icon:'📊',  name:'Formidable Power',     desc:'Reach 700 total stat points.',                        condition: s => getTotalStatsF(s) >= 700 },
  { id:'str_75',          tier:'gold', icon:'💪',  name:'Warrior Body',         desc:'Raise Strength to 75.',                               condition: s => (s.stats?.Strength||0) >= 75 },
  { id:'int_75',          tier:'gold', icon:'🧠',  name:'Brilliant Mind',       desc:'Raise Intelligence to 75.',                           condition: s => (s.stats?.Intelligence||0) >= 75 },
  { id:'all_stats_50',    tier:'gold', icon:'⬡',   name:'Fully Forged',         desc:'Raise all stats to at least 50.',                     condition: s => s.stats && Object.values(s.stats).every(v => v >= 50) },
  { id:'rp_15000',        tier:'gold', icon:'💰',  name:'RP Baron',             desc:'Earn 15,000 RP total.',                               condition: s => (s.hunter?.rpEverEarned||0) >= 15000 },
  { id:'dungeon_25',      tier:'gold', icon:'🗺',  name:'Dungeon Veteran',      desc:'Complete 25 Dungeon quests.',                         condition: s => (s.hunter?.dungeonsCompleted||0) >= 25 },
  { id:'quest_500',       tier:'gold', icon:'5️⃣',  name:'Five Hundred',         desc:'Complete 500 quests.',                                condition: s => (s.hunter?.questsEverCompleted||0) >= 500 },
  { id:'chest_50',        tier:'gold', icon:'📦',  name:'Chest Baron',          desc:'Open 50 Bonus Chests.',                               condition: s => (s.hunter?.chestsOpened||0) >= 50 },
  { id:'streak_90',       tier:'gold', icon:'🌕',  name:'Three-Month Flame',    desc:'Achieve a 90-day streak.',                            condition: s => (s.streak||0) >= 90 },
  { id:'six_months',      tier:'gold', icon:'📆',  name:'Half-Year Hunter',     desc:'Play for 180 days.',                                  condition: s => getDaysSinceStart(s) >= 180 },
  { id:'all_stats_75',    tier:'gold', icon:'⬡',   name:'Ascended',             desc:'Raise all stats to at least 75.',                     condition: s => s.stats && Object.values(s.stats).every(v => v >= 75) },
  { id:'total_900',       tier:'gold', icon:'📊',  name:'Overwhelming Force',   desc:'Reach 900 total stat points.',                        condition: s => getTotalStatsF(s) >= 900 },
  { id:'workout_150',     tier:'gold', icon:'🏋',  name:'Iron Addict',          desc:'Complete 150 workout quests.',                        condition: s => (s.hunter?.workoutQuestsDone||0) >= 150 },
  { id:'no_skip_90',      tier:'gold', icon:'✅',  name:'Zero Excuses',         desc:'Complete quests 90 days without skipping.',           condition: s => (s.hunter?.noSkipStreak||0) >= 90 },
  { id:'rp_25000',        tier:'gold', icon:'💎',  name:'RP Lord',              desc:'Earn 25,000 RP total.',                               condition: s => (s.hunter?.rpEverEarned||0) >= 25000 },
  { id:'str_100',         tier:'gold', icon:'⚔',   name:'Centurion Strength',   desc:'Raise Strength to 100.',                              condition: s => (s.stats?.Strength||0) >= 100 },
  { id:'int_100',         tier:'gold', icon:'📚',  name:'Centurion Scholar',    desc:'Raise Intelligence to 100.',                          condition: s => (s.stats?.Intelligence||0) >= 100 },
  { id:'speed_100',       tier:'gold', icon:'⚡',  name:'Centurion Speed',      desc:'Raise Speed to 100.',                                 condition: s => (s.stats?.Speed||0) >= 100 },
  { id:'stamina_100',     tier:'gold', icon:'💪',  name:'Centurion Stamina',    desc:'Raise Stamina to 100.',                               condition: s => (s.stats?.Stamina||0) >= 100 },
  { id:'quest_750',       tier:'gold', icon:'🎖',  name:'Grand Operative',      desc:'Complete 750 quests.',                                condition: s => (s.hunter?.questsEverCompleted||0) >= 750 },
  { id:'dungeon_50',      tier:'gold', icon:'🚪',  name:'Dungeon Lord',         desc:'Complete 50 Dungeon quests.',                         condition: s => (s.hunter?.dungeonsCompleted||0) >= 50 },
  { id:'hard_50',         tier:'gold', icon:'💥',  name:'Masochist',            desc:'Complete 50 Challenging quests.',                     condition: s => (s.hunter?.hardQuestsDone||0) >= 50 },
  { id:'special_50',      tier:'gold', icon:'🌟',  name:'Special Forces',       desc:'Complete 50 Special quests.',                         condition: s => (s.hunter?.specialQuestsDone||0) >= 50 },
  { id:'shop_50',         tier:'gold', icon:'🏪',  name:'Shop Emperor',         desc:'Purchase 50 shop items.',                             condition: s => (s.hunter?.itemsPurchased||0) >= 50 },
  { id:'chest_100',       tier:'gold', icon:'📦',  name:'Chest King',           desc:'Open 100 Bonus Chests.',                              condition: s => (s.hunter?.chestsOpened||0) >= 100 },
  { id:'streak_120',      tier:'gold', icon:'🔥',  name:'Four Months Burning',  desc:'Achieve a 120-day streak.',                           condition: s => (s.streak||0) >= 120 },
  { id:'total_1100',      tier:'gold', icon:'📊',  name:'Power Elite',          desc:'Reach 1,100 stat points.',                            condition: s => getTotalStatsF(s) >= 1100 },
  { id:'dur_75',          tier:'gold', icon:'🛡',  name:'Diamond Skin',         desc:'Raise Durability to 75.',                             condition: s => (s.stats?.Durability||0) >= 75 },
  { id:'agi_75',          tier:'gold', icon:'🌀',  name:'Swift Phantom',        desc:'Raise Agility to 75.',                                condition: s => (s.stats?.Agility||0) >= 75 },
  { id:'wis_75',          tier:'gold', icon:'👁',  name:'Third Eye',            desc:'Raise Wisdom to 75.',                                 condition: s => (s.stats?.Wisdom||0) >= 75 },
  { id:'char_75',         tier:'gold', icon:'🗣',  name:'Silver-Tongued',       desc:'Raise Charisma to 75.',                               condition: s => (s.stats?.Charisma||0) >= 75 },
  { id:'dex_75',          tier:'gold', icon:'🎯',  name:'Eagle Eye',            desc:'Raise Dexterity to 75.',                              condition: s => (s.stats?.Dexterity||0) >= 75 },
  { id:'disc_75',         tier:'gold', icon:'🔒',  name:'Unbreakable Will',     desc:'Raise Discipline to 75.',                             condition: s => (s.stats?.Discipline||0) >= 75 },
  { id:'app_75',          tier:'gold', icon:'✦',   name:'Head Turner',          desc:'Raise Appearance to 75.',                             condition: s => (s.stats?.Appearance||0) >= 75 },
  { id:'one_year',        tier:'gold', icon:'🗓',  name:'Year One',             desc:'Play for 365 days.',                                  condition: s => getDaysSinceStart(s) >= 365 },
  { id:'rp_50000',        tier:'gold', icon:'💰',  name:'RP Emperor',           desc:'Earn 50,000 RP total.',                               condition: s => (s.hunter?.rpEverEarned||0) >= 50000 },
  { id:'quest_1000',      tier:'gold', icon:'🎯',  name:'One Thousand',         desc:'Complete 1,000 quests.',                              condition: s => (s.hunter?.questsEverCompleted||0) >= 1000 },
  { id:'all_stats_100',   tier:'gold', icon:'⬡',   name:'Maximum Output',       desc:'Raise all stats to at least 100.',                    condition: s => s.stats && Object.values(s.stats).every(v => v >= 100) },
  { id:'bonus_50',        tier:'gold', icon:'🎰',  name:'Bonus Legend',         desc:'Complete 50 Bonus quests.',                           condition: s => (s.hunter?.bonusQuestsDone||0) >= 50 },
  { id:'dungeon_75',      tier:'gold', icon:'🗺',  name:'Gate Emperor',         desc:'Complete 75 Dungeon quests.',                         condition: s => (s.hunter?.dungeonsCompleted||0) >= 75 },
  { id:'no_skip_180',     tier:'gold', icon:'✅',  name:'Absolute Discipline',  desc:'Complete quests 180 days without skipping.',          condition: s => (s.hunter?.noSkipStreak||0) >= 180 },
  { id:'streak_180',      tier:'gold', icon:'🔥',  name:'Six-Month Inferno',    desc:'Achieve a 180-day streak.',                           condition: s => (s.streak||0) >= 180 },
  { id:'total_1300',      tier:'gold', icon:'📊',  name:'S-Rank Threshold',     desc:'Reach 1,300 stat points.',                            condition: s => getTotalStatsF(s) >= 1300 },
  { id:'s_rank',          tier:'gold', icon:'⭐',  name:'S-Rank Hunter',        desc:'Reach S-Rank (1,300 stat points).',                   condition: s => getTotalStatsF(s) >= 1300 },
  { id:'workout_300',     tier:'gold', icon:'🏋',  name:'Gym Legend',           desc:'Complete 300 workout quests.',                        condition: s => (s.hunter?.workoutQuestsDone||0) >= 300 },
  { id:'rp_100k',         tier:'gold', icon:'💎',  name:'RP Billionaire',       desc:'Earn 100,000 RP total.',                              condition: s => (s.hunter?.rpEverEarned||0) >= 100000 },
  { id:'hard_100',        tier:'gold', icon:'💥',  name:'Pain is Power',        desc:'Complete 100 Challenging quests.',                    condition: s => (s.hunter?.hardQuestsDone||0) >= 100 },

  // ══════════════ PLATINUM — LEGENDARY (40 badges) ══════════════
  { id:'ss_rank',         tier:'platinum', icon:'🌠', name:'SS-Rank Hunter',      desc:'Reach SS-Rank (1,700 stat points).',                  condition: s => getTotalStatsF(s) >= 1700 },
  { id:'streak_365',      tier:'platinum', icon:'🔥', name:'Year-Long Flame',     desc:'Achieve a 365-day streak.',                           condition: s => (s.streak||0) >= 365 },
  { id:'quest_2000',      tier:'platinum', icon:'🎖', name:'Two Thousand',        desc:'Complete 2,000 quests.',                              condition: s => (s.hunter?.questsEverCompleted||0) >= 2000 },
  { id:'all_stats_150',   tier:'platinum', icon:'⬡',  name:'Transcendent',        desc:'Raise all stats to at least 150.',                    condition: s => s.stats && Object.values(s.stats).every(v => v >= 150) },
  { id:'total_1700',      tier:'platinum', icon:'📊', name:'SS-Rank Power',       desc:'Reach 1,700 stat points.',                            condition: s => getTotalStatsF(s) >= 1700 },
  { id:'dungeon_100',     tier:'platinum', icon:'🚪', name:'Dungeon Overlord',    desc:'Complete 100 Dungeon quests.',                        condition: s => (s.hunter?.dungeonsCompleted||0) >= 100 },
  { id:'rp_quarter_mil',  tier:'platinum', icon:'💰', name:'RP Quarter Million',  desc:'Earn 250,000 RP total.',                              condition: s => (s.hunter?.rpEverEarned||0) >= 250000 },
  { id:'no_skip_365',     tier:'platinum', icon:'✅', name:'365 Days No Excuses', desc:'Complete quests 365 days without skipping.',          condition: s => (s.hunter?.noSkipStreak||0) >= 365 },
  { id:'str_200',         tier:'platinum', icon:'⚔',  name:'Herculean Strength',  desc:'Raise Strength to 200.',                              condition: s => (s.stats?.Strength||0) >= 200 },
  { id:'int_200',         tier:'platinum', icon:'🧠', name:'Omniscient Scholar',  desc:'Raise Intelligence to 200.',                          condition: s => (s.stats?.Intelligence||0) >= 200 },
  { id:'speed_200',       tier:'platinum', icon:'⚡', name:'Lightspeed',          desc:'Raise Speed to 200.',                                 condition: s => (s.stats?.Speed||0) >= 200 },
  { id:'stamina_200',     tier:'platinum', icon:'💪', name:'Indestructible',      desc:'Raise Stamina to 200.',                               condition: s => (s.stats?.Stamina||0) >= 200 },
  { id:'disc_200',        tier:'platinum', icon:'🔒', name:'Absolute Will',       desc:'Raise Discipline to 200.',                            condition: s => (s.stats?.Discipline||0) >= 200 },
  { id:'sss_rank',        tier:'platinum', icon:'💠', name:'SSS-Rank Hunter',     desc:'Reach SSS-Rank (2,100 stat points).',                 condition: s => getTotalStatsF(s) >= 2100 },
  { id:'total_2100',      tier:'platinum', icon:'📊', name:'SSS-Rank Power',      desc:'Reach 2,100 stat points.',                            condition: s => getTotalStatsF(s) >= 2100 },
  { id:'two_years',       tier:'platinum', icon:'🗓', name:'Two Years',           desc:'Play for 730 days.',                                  condition: s => getDaysSinceStart(s) >= 730 },
  { id:'quest_3000',      tier:'platinum', icon:'📋', name:'Three Thousand',      desc:'Complete 3,000 quests.',                              condition: s => (s.hunter?.questsEverCompleted||0) >= 3000 },
  { id:'chest_200',       tier:'platinum', icon:'📦', name:'Chest Emperor',       desc:'Open 200 Bonus Chests.',                              condition: s => (s.hunter?.chestsOpened||0) >= 200 },
  { id:'workout_1000',    tier:'platinum', icon:'🏋', name:'Gym God',             desc:'Complete 1,000 workout quests.',                      condition: s => (s.hunter?.workoutQuestsDone||0) >= 1000 },
  { id:'all_stats_200',   tier:'platinum', icon:'⬡',  name:'Ultimate Balance',    desc:'Raise all stats to at least 200.',                    condition: s => s.stats && Object.values(s.stats).every(v => v >= 200) },
  { id:'rp_million',      tier:'platinum', icon:'💎', name:'RP Millionaire',      desc:'Earn 1,000,000 RP total.',                            condition: s => (s.hunter?.rpEverEarned||0) >= 1000000 },
  { id:'hard_200',        tier:'platinum', icon:'💥', name:'Born of Pain',        desc:'Complete 200 Challenging quests.',                    condition: s => (s.hunter?.hardQuestsDone||0) >= 200 },
  { id:'special_100',     tier:'platinum', icon:'🌟', name:'Special Legend',      desc:'Complete 100 Special quests.',                        condition: s => (s.hunter?.specialQuestsDone||0) >= 100 },
  { id:'dungeon_200',     tier:'platinum', icon:'🗺', name:'Gate God',            desc:'Complete 200 Dungeon quests.',                        condition: s => (s.hunter?.dungeonsCompleted||0) >= 200 },
  { id:'streak_500',      tier:'platinum', icon:'🌕', name:'500-Day Warrior',     desc:'Achieve a 500-day streak.',                           condition: s => (s.streak||0) >= 500 },
  { id:'total_2400',      tier:'platinum', icon:'📊', name:'Transcendent Power',  desc:'Reach 2,400 stat points.',                            condition: s => getTotalStatsF(s) >= 2400 },
  { id:'mystery_rank',    tier:'platinum', icon:'❓', name:'???-Rank',            desc:'Reach ???-Rank (2,400 stat points).',                 condition: s => getTotalStatsF(s) >= 2400 },
  { id:'quest_5000',      tier:'platinum', icon:'🎖', name:'Five Thousand',       desc:'Complete 5,000 quests.',                              condition: s => (s.hunter?.questsEverCompleted||0) >= 5000 },
  { id:'no_skip_500',     tier:'platinum', icon:'✅', name:'500 Days No Excuses', desc:'Complete quests 500 days without skipping.',          condition: s => (s.hunter?.noSkipStreak||0) >= 500 },
  { id:'all_stats_250',   tier:'platinum', icon:'⬡',  name:'Maximum Existence',   desc:'Raise all stats to at least 250.',                    condition: s => s.stats && Object.values(s.stats).every(v => v >= 250) },
  { id:'rp_5mil',         tier:'platinum', icon:'💰', name:'RP Legend',           desc:'Earn 5,000,000 RP total.',                            condition: s => (s.hunter?.rpEverEarned||0) >= 5000000 },
  { id:'dur_200',         tier:'platinum', icon:'🛡', name:'Mythic Armor',        desc:'Raise Durability to 200.',                            condition: s => (s.stats?.Durability||0) >= 200 },
  { id:'agi_200',         tier:'platinum', icon:'🌀', name:'Invisible Speed',     desc:'Raise Agility to 200.',                               condition: s => (s.stats?.Agility||0) >= 200 },
  { id:'wis_200',         tier:'platinum', icon:'👁', name:'All-Seeing Eye',      desc:'Raise Wisdom to 200.',                                condition: s => (s.stats?.Wisdom||0) >= 200 },
  { id:'char_200',        tier:'platinum', icon:'🗣', name:'Kingmaker',           desc:'Raise Charisma to 200.',                              condition: s => (s.stats?.Charisma||0) >= 200 },
  { id:'app_200',         tier:'platinum', icon:'✦',  name:'Mythic Beauty',       desc:'Raise Appearance to 200.',                            condition: s => (s.stats?.Appearance||0) >= 200 },
  { id:'dex_200',         tier:'platinum', icon:'🎯', name:'Zero Margin',         desc:'Raise Dexterity to 200.',                             condition: s => (s.stats?.Dexterity||0) >= 200 },
  { id:'chest_500',       tier:'platinum', icon:'📦', name:'Chest Overlord',      desc:'Open 500 Bonus Chests.',                              condition: s => (s.hunter?.chestsOpened||0) >= 500 },
  { id:'dungeon_500',     tier:'platinum', icon:'🚪', name:'Rift Master',         desc:'Complete 500 Dungeon quests.',                        condition: s => (s.hunter?.dungeonsCompleted||0) >= 500 },

  // ══════════════ DIAMOND — GOD TIER (30 badges) ══════════════
  { id:'demi_god',        tier:'diamond', icon:'∞',   name:'DEMI GOD',            desc:'Reach DEMI GOD rank (2,600 stat points). The pinnacle of existence.',  condition: s => getTotalStatsF(s) >= 2600 },
  { id:'total_2600',      tier:'diamond', icon:'💠',  name:'Infinite Power',      desc:'Reach 2,600 stat points — DEMI GOD achieved.',        condition: s => getTotalStatsF(s) >= 2600 },
  { id:'streak_1000',     tier:'diamond', icon:'🔥',  name:'Eternal Flame',       desc:'Achieve a 1,000-day streak.',                         condition: s => (s.streak||0) >= 1000 },
  { id:'quest_10000',     tier:'diamond', icon:'💎',  name:'Ten Thousand',        desc:'Complete 10,000 quests. A true legend.',               condition: s => (s.hunter?.questsEverCompleted||0) >= 10000 },
  { id:'all_stats_300',   tier:'diamond', icon:'⬡',   name:'Absolute Maximum',    desc:'Raise all stats to at least 300.',                    condition: s => s.stats && Object.values(s.stats).every(v => v >= 300) },
  { id:'no_skip_1000',    tier:'diamond', icon:'✅',  name:'1000 Days No Excuses',desc:'Complete quests 1,000 days without skipping.',         condition: s => (s.hunter?.noSkipStreak||0) >= 1000 },
  { id:'dungeon_1000',    tier:'diamond', icon:'🚪',  name:'Gate Sovereign',      desc:'Complete 1,000 Dungeon quests.',                      condition: s => (s.hunter?.dungeonsCompleted||0) >= 1000 },
  { id:'rp_10mil',        tier:'diamond', icon:'💰',  name:'God of Wealth',       desc:'Earn 10,000,000 RP total.',                           condition: s => (s.hunter?.rpEverEarned||0) >= 10000000 },
  { id:'str_300',         tier:'diamond', icon:'⚔',   name:'Divine Strength',     desc:'Raise Strength to 300.',                              condition: s => (s.stats?.Strength||0) >= 300 },
  { id:'int_300',         tier:'diamond', icon:'🧠',  name:'Divine Intelligence', desc:'Raise Intelligence to 300.',                          condition: s => (s.stats?.Intelligence||0) >= 300 },
  { id:'speed_300',       tier:'diamond', icon:'⚡',  name:'Divine Speed',        desc:'Raise Speed to 300.',                                 condition: s => (s.stats?.Speed||0) >= 300 },
  { id:'stamina_300',     tier:'diamond', icon:'💪',  name:'Divine Stamina',      desc:'Raise Stamina to 300.',                               condition: s => (s.stats?.Stamina||0) >= 300 },
  { id:'disc_300',        tier:'diamond', icon:'🔒',  name:'Divine Discipline',   desc:'Raise Discipline to 300.',                            condition: s => (s.stats?.Discipline||0) >= 300 },
  { id:'dur_300',         tier:'diamond', icon:'🛡',  name:'Divine Durability',   desc:'Raise Durability to 300.',                            condition: s => (s.stats?.Durability||0) >= 300 },
  { id:'agi_300',         tier:'diamond', icon:'🌀',  name:'Divine Agility',      desc:'Raise Agility to 300.',                               condition: s => (s.stats?.Agility||0) >= 300 },
  { id:'wis_300',         tier:'diamond', icon:'👁',  name:'Divine Wisdom',       desc:'Raise Wisdom to 300.',                                condition: s => (s.stats?.Wisdom||0) >= 300 },
  { id:'char_300',        tier:'diamond', icon:'🗣',  name:'Divine Charisma',     desc:'Raise Charisma to 300.',                              condition: s => (s.stats?.Charisma||0) >= 300 },
  { id:'app_300',         tier:'diamond', icon:'✦',   name:'Divine Appearance',   desc:'Raise Appearance to 300.',                            condition: s => (s.stats?.Appearance||0) >= 300 },
  { id:'dex_300',         tier:'diamond', icon:'🎯',  name:'Divine Dexterity',    desc:'Raise Dexterity to 300.',                             condition: s => (s.stats?.Dexterity||0) >= 300 },
  { id:'three_years',     tier:'diamond', icon:'🗓',  name:'Three Years',         desc:'Play for 1,095 days.',                                condition: s => getDaysSinceStart(s) >= 1095 },
  { id:'chest_1000',      tier:'diamond', icon:'📦',  name:'Chest Deity',         desc:'Open 1,000 Bonus Chests.',                            condition: s => (s.hunter?.chestsOpened||0) >= 1000 },
  { id:'hard_500',        tier:'diamond', icon:'💥',  name:'God of Pain',         desc:'Complete 500 Challenging quests.',                    condition: s => (s.hunter?.hardQuestsDone||0) >= 500 },
  { id:'special_500',     tier:'diamond', icon:'🌟',  name:'Transcendent Special',desc:'Complete 500 Special quests.',                        condition: s => (s.hunter?.specialQuestsDone||0) >= 500 },
  { id:'streak_2000',     tier:'diamond', icon:'🌕',  name:'Eternal Warrior',     desc:'Achieve a 2,000-day streak.',                         condition: s => (s.streak||0) >= 2000 },
  { id:'quest_50000',     tier:'diamond', icon:'📋',  name:'Fifty Thousand',      desc:'Complete 50,000 quests.',                             condition: s => (s.hunter?.questsEverCompleted||0) >= 50000 },
  { id:'all_stats_500',   tier:'diamond', icon:'⬡',   name:'Omnipotent',          desc:'Raise all stats to at least 500.',                    condition: s => s.stats && Object.values(s.stats).every(v => v >= 500) },
  { id:'five_years',      tier:'diamond', icon:'👑',  name:'Five Years of Power',  desc:'Play for 1,825 days.',                                condition: s => getDaysSinceStart(s) >= 1825 },
  { id:'workout_10000',   tier:'diamond', icon:'🏋',  name:'Eternal Gym God',     desc:'Complete 10,000 workout quests.',                     condition: s => (s.hunter?.workoutQuestsDone||0) >= 10000 },
  { id:'no_quit',         tier:'diamond', icon:'🏆',  name:'SOLO LEVELING',       desc:'Reach DEMI GOD rank with a 365+ streak. You are the strongest.',  condition: s => getTotalStatsF(s) >= 2600 && (s.streak||0) >= 365 },
  { id:'shadow_monarch',  tier:'diamond', icon:'👁',  name:'SHADOW MONARCH',      desc:'Reach DEMI GOD, complete 1,000+ dungeons, and maintain a 1,000-day streak.',  condition: s => getTotalStatsF(s) >= 2600 && (s.hunter?.dungeonsCompleted||0) >= 1000 && (s.streak||0) >= 1000 },
];

// ─── HELPER: Get total stats (mirrors app.js logic without circular dep) ─────
function getTotalStatsF(state) {
  if (!state.stats) return 55;
  return Object.values(state.stats).reduce((a, b) => a + b, 0);
}
function getDaysSinceStart(state) {
  if (!state.hunter?.startDate) return 0;
  return Math.floor((Date.now() - new Date(state.hunter.startDate)) / 86400000);
}

// ─── ACHIEVEMENT STATE ────────────────────────────────────────────────────────
let _achFilter = 'all';
let _achQueue  = []; // queued unlocks to show one by one

// ─── ACHIEVEMENT CHECKING ─────────────────────────────────────────────────────
window.checkAchievements = function() {
  if (!window.STATE) return;
  if (!STATE.unlockedAchievements) STATE.unlockedAchievements = {};

  const newlyUnlocked = [];
  for (const ach of ACHIEVEMENTS) {
    if (STATE.unlockedAchievements[ach.id]) continue;
    try {
      if (ach.condition(STATE)) {
        STATE.unlockedAchievements[ach.id] = Date.now();
        const tierRP = ACH_TIERS[ach.tier]?.rp || 0;
        STATE.rp += tierRP;
        if (!STATE.hunter.rpEverEarned) STATE.hunter.rpEverEarned = 0;
        STATE.hunter.rpEverEarned += tierRP;
        newlyUnlocked.push({ ...ach, bonusRP: tierRP });
      }
    } catch(e) {}
  }

  if (newlyUnlocked.length) {
    _achQueue.push(...newlyUnlocked);
    if (typeof saveState === 'function') saveState();
    if (typeof syncUI === 'function') syncUI();
    _showNextAchUnlock();
  }
};

function _showNextAchUnlock() {
  if (!_achQueue.length) return;
  const ach = _achQueue.shift();
  const tierData = ACH_TIERS[ach.tier];

  document.getElementById('achUnlockBadge').textContent = ach.icon;
  document.getElementById('achUnlockTier').textContent  = tierData.label;
  document.getElementById('achUnlockTier').style.color  = tierData.color;
  document.getElementById('achUnlockName').textContent  = ach.name;
  document.getElementById('achUnlockDesc').textContent  = ach.desc;
  document.getElementById('achUnlockRP').textContent    = '+' + ach.bonusRP + ' RP';

  // Set glow color to tier
  const glow = document.querySelector('.ach-unlock-glow');
  if (glow) {
    const c = tierData.color;
    glow.style.background = `radial-gradient(circle, ${c}44 0%, transparent 70%)`;
  }

  showModal('modalAchievement');

  // After this modal closes, show next if any
  const orig = window.closeModal;
  window.closeModal = function() {
    orig();
    window.closeModal = orig;
    setTimeout(() => {
      if (_achQueue.length) _showNextAchUnlock();
    }, 300);
  };
}

// ─── ACHIEVEMENTS RENDERING ───────────────────────────────────────────────────
window.filterAchievements = function(tier) {
  _achFilter = tier;
  document.querySelectorAll('.ach-filter').forEach(b => {
    b.classList.toggle('active', b.dataset.tier === tier);
  });
  renderAchievements();
};

window.renderAchievements = function() {
  if (!window.STATE) return;
  if (!STATE.unlockedAchievements) STATE.unlockedAchievements = {};

  const filtered = _achFilter === 'all'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.tier === _achFilter);

  const unlocked   = filtered.filter(a => STATE.unlockedAchievements[a.id]);
  const locked     = filtered.filter(a => !STATE.unlockedAchievements[a.id]);
  const sorted     = [...unlocked, ...locked];

  const totalUnlocked = ACHIEVEMENTS.filter(a => STATE.unlockedAchievements[a.id]).length;
  document.getElementById('achUnlocked').textContent = totalUnlocked;
  document.getElementById('achTotal').textContent    = ACHIEVEMENTS.length;

  document.getElementById('achievementsList').innerHTML = sorted.map(ach => {
    const isUnlocked = !!STATE.unlockedAchievements[ach.id];
    const tierData   = ACH_TIERS[ach.tier];
    return `
      <div class="ach-card tier-${ach.tier} ${isUnlocked ? 'unlocked' : 'locked'}">
        ${!isUnlocked ? '<div class="ach-lock-icon">🔒</div>' : ''}
        <div class="ach-card-icon">${ach.icon}</div>
        <div class="ach-card-tier-badge">${tierData.label}</div>
        <div class="ach-card-name">${ach.name}</div>
        <div class="ach-card-desc">${ach.desc}</div>
        <div class="ach-card-rp">◆ ${isUnlocked ? '+' + tierData.rp + ' RP' : tierData.rp + ' RP'}</div>
      </div>`;
  }).join('');
};


// ═══════════════════════════════════════════════════════════════════
//  DUNGEON GATE SYSTEM
// ═══════════════════════════════════════════════════════════════════

const DUNGEON_QUESTS = [
  // ─── Physical — Endurance ───
  { rank:'S-CLASS', name:'6KM DEAD SPRINT', desc:'Run 6km without stopping. No walking. Track it or prove it.', stat:'Stamina', statGain:8, rp:600, muscle:'fullbody' },
  { rank:'A-CLASS', name:'5KM ENDURANCE RUN', desc:'Complete a 5km run at a challenging pace. Feel your limits.', stat:'Stamina', statGain:6, rp:450, muscle:'fullbody' },
  { rank:'B-CLASS', name:'3KM SHADOW SPRINT', desc:'Sprint 3km. Push your speed to the absolute maximum.', stat:'Speed', statGain:5, rp:350, muscle:'fullbody' },
  { rank:'S-CLASS', name:'10KM HUNTER MARCH', desc:'Complete a 10km run or power walk. No stopping allowed.', stat:'Stamina', statGain:10, rp:700, muscle:'fullbody' },
  { rank:'A-CLASS', name:'STAIRCASE ASSAULT', desc:'Find stairs. Climb 20 floors non-stop. Record time.', stat:'Stamina', statGain:7, rp:500, muscle:'quads' },

  // ─── Physical — Strength ───
  { rank:'A-CLASS', name:'100 PUSHUP TRIAL', desc:'Complete 100 push-ups. Break into sets if needed. Finish today.', stat:'Strength', statGain:7, rp:480, muscle:'chest' },
  { rank:'S-CLASS', name:'200 BODYWEIGHT SQUATS', desc:'Complete 200 squats before end of day. No excuses.', stat:'Strength', statGain:8, rp:560, muscle:'quads' },
  { rank:'B-CLASS', name:'75 PULL-UP GATE', desc:'Complete 75 pull-ups in as few sets as needed. Today.', stat:'Strength', statGain:6, rp:420, muscle:'back' },
  { rank:'A-CLASS', name:'PLANK 10 MINUTES', desc:'Hold a plank for 10 cumulative minutes today. Core of steel.', stat:'Stamina', statGain:6, rp:440, muscle:'core' },
  { rank:'S-CLASS', name:'300 REP GAUNTLET', desc:'150 push-ups + 150 bodyweight squats. Complete in one session.', stat:'Strength', statGain:9, rp:650, muscle:'fullbody' },
  { rank:'A-CLASS', name:'DIPS DUNGEON', desc:'Complete 80 dips today. Chest and triceps screaming.', stat:'Strength', statGain:6, rp:460, muscle:'triceps' },

  // ─── Mental / Discipline ───
  { rank:'B-CLASS', name:'NO PHONE HOUR', desc:'Put your phone away for 1 hour. Study, read, or focus on a task.', stat:'Discipline', statGain:5, rp:320, muscle:'lifestyle' },
  { rank:'A-CLASS', name:'DEEP WORK SESSION', desc:'Complete a 2-hour deep work block with zero distractions.', stat:'Intelligence', statGain:6, rp:430, muscle:'lifestyle' },
  { rank:'S-CLASS', name:'4 HOUR FOCUS RAID', desc:'Study or work intensely for 4 hours. No social media. Log it.', stat:'Intelligence', statGain:8, rp:580, muscle:'lifestyle' },
  { rank:'B-CLASS', name:'READING DUNGEON', desc:'Read 50 pages of a book without stopping. Knowledge is power.', stat:'Intelligence', statGain:5, rp:310, muscle:'lifestyle' },
  { rank:'A-CLASS', name:'DISCIPLINE TRIAL', desc:'Wake up on first alarm. No snooze. Complete all quests by 6PM.', stat:'Discipline', statGain:7, rp:500, muscle:'lifestyle' },

  // ─── Social / Appearance ───
  { rank:'B-CLASS', name:'SOCIAL DUNGEON', desc:'Initiate a meaningful conversation with someone new today.', stat:'Charisma', statGain:5, rp:330, muscle:'lifestyle' },
  { rank:'A-CLASS', name:'FULL GROOMING RAID', desc:'Hair, skin, nails, clothes — present yourself at 100% today.', stat:'Appearance', statGain:6, rp:400, muscle:'lifestyle' },
  { rank:'B-CLASS', name:'COLD SHOWER GATE', desc:'Take a 3-minute cold shower. Do not turn the hot water on.', stat:'Discipline', statGain:5, rp:350, muscle:'lifestyle' },

  // ─── Extreme / SS Dungeons ───
  { rank:'SS-CLASS', name:'IRON BODY PROTOCOL', desc:'200 push-ups + 200 squats + 5km run. All in one day.', stat:'Strength', statGain:12, rp:900, muscle:'fullbody' },
  { rank:'SS-CLASS', name:'SHADOW MARATHON', desc:'Run 15km. This is what separates hunters from shadows.', stat:'Stamina', statGain:14, rp:1100, muscle:'fullbody' },
  { rank:'SS-CLASS', name:'MONARCH TRIAL', desc:'Complete every daily quest + 100 pull-ups + 1hr study session.', stat:'Discipline', statGain:15, rp:1200, muscle:'fullbody' },
];

const DUNGEON_RANK_CLASSES = ['B-CLASS','A-CLASS','S-CLASS','SS-CLASS'];

let _dungeonTimer = null;
let _currentDungeonQuest = null;
let _dungeonTimerSeconds = 30;

// ─── DUNGEON CHECK ON APP OPEN ────────────────────────────────────────────────
window.checkDungeonGate = function() {
  if (!window.STATE || !STATE.hunter) return;
  if (!STATE.lastDungeonCheck) STATE.lastDungeonCheck = null;
  if (!STATE.dungeonsDeclinedToday) STATE.dungeonsDeclinedToday = 0;

  const today = new Date().toISOString().split('T')[0];

  // Only one dungeon per day, only if today's quests are generated
  if (STATE.lastDungeonDate === today) return;
  if (STATE.lastQuestDate !== today) return;

  // 20% base chance + increases with rank
  const total = getTotalStatsF(STATE);
  const rankBonus = Math.min(0.3, total / 5000);
  const chance = 0.20 + rankBonus;

  if (Math.random() < chance) {
    STATE.lastDungeonDate = today;
    if (typeof saveState === 'function') saveState();
    setTimeout(() => triggerDungeonGate(), 1200); // slight delay for drama
  }
};

function triggerDungeonGate() {
  // Pick a quest weighted toward lower ranks for lower-rank players
  const total = getTotalStatsF(STATE);
  let pool = DUNGEON_QUESTS;
  if (total < 400)  pool = DUNGEON_QUESTS.filter(q => q.rank === 'B-CLASS' || q.rank === 'A-CLASS');
  else if (total < 1300) pool = DUNGEON_QUESTS.filter(q => q.rank !== 'SS-CLASS');

  _currentDungeonQuest = pool[Math.floor(Math.random() * pool.length)];

  document.getElementById('gateQuestRank').textContent = _currentDungeonQuest.rank + ' DUNGEON';
  document.getElementById('gateQuestName').textContent = _currentDungeonQuest.name;
  document.getElementById('gateQuestDesc').textContent = _currentDungeonQuest.desc;
  document.getElementById('gateRP').textContent = '+' + _currentDungeonQuest.rp + ' RP';
  document.getElementById('gateStat').textContent = '+' + _currentDungeonQuest.statGain + ' ' + _currentDungeonQuest.stat;

  // Spawn particles
  spawnGateParticles();

  // Show overlay
  document.getElementById('dungeonGateOverlay').classList.add('active');

  // Start 30s timer
  startDungeonTimer();
}

function spawnGateParticles() {
  const container = document.getElementById('gateParticles');
  container.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'gate-particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 20}%;
      animation-duration: ${2 + Math.random() * 4}s;
      animation-delay: ${Math.random() * 3}s;
      --drift: ${(Math.random() - 0.5) * 60}px;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      opacity: ${0.4 + Math.random() * 0.6};
    `;
    container.appendChild(p);
  }
}

function startDungeonTimer() {
  _dungeonTimerSeconds = 30;
  clearInterval(_dungeonTimer);

  const display = document.getElementById('gateTimerDisplay');
  const bar     = document.getElementById('gateTimerBar');

  display.classList.remove('urgent');
  bar.classList.remove('urgent');

  _dungeonTimer = setInterval(() => {
    _dungeonTimerSeconds--;
    display.textContent = _dungeonTimerSeconds;
    bar.style.width = (_dungeonTimerSeconds / 30 * 100) + '%';

    if (_dungeonTimerSeconds <= 10) {
      display.classList.add('urgent');
      bar.classList.add('urgent');
    }

    if (_dungeonTimerSeconds <= 0) {
      clearInterval(_dungeonTimer);
      // Time's up = auto-decline
      declineDungeonQuest();
    }
  }, 1000);
}

window.acceptDungeonQuest = function() {
  clearInterval(_dungeonTimer);
  document.getElementById('dungeonGateOverlay').classList.remove('active');

  if (!_currentDungeonQuest) return;

  // Track stat
  if (!STATE.hunter.dungeonsAccepted) STATE.hunter.dungeonsAccepted = 0;
  STATE.hunter.dungeonsAccepted++;

  // Add dungeon quest to today's quest list
  const dungeonQ = {
    id:          'dungeon_' + Date.now(),
    name:        '⬡ ' + _currentDungeonQuest.name,
    description: _currentDungeonQuest.desc,
    type:        'dungeon',
    stat:        _currentDungeonQuest.stat,
    statGain:    _currentDungeonQuest.statGain,
    rp:          _currentDungeonQuest.rp,
    muscle:      _currentDungeonQuest.muscle,
    completed:   false,
  };
  STATE.quests.push(dungeonQ);

  if (typeof saveState === 'function') saveState();
  if (typeof syncUI === 'function') syncUI();
  if (typeof renderQuests === 'function') renderQuests();
  if (typeof checkAchievements === 'function') checkAchievements();

  // Switch to quests tab to see it
  if (typeof switchTab === 'function') switchTab('quests');

  showDungeonToast('⚔ DUNGEON QUEST ADDED — COMPLETE IT, HUNTER');
};

window.declineDungeonQuest = function() {
  clearInterval(_dungeonTimer);
  document.getElementById('dungeonGateOverlay').classList.remove('active');

  if (!_currentDungeonQuest) return;

  // Hard penalty: lose RP + stats
  const rpLoss   = Math.floor((_currentDungeonQuest.rp || 300) * 0.5);
  const statLoss = 3;

  STATE.rp = Math.max(0, (STATE.rp || 0) - rpLoss);
  if (STATE.stats) {
    ['Strength','Stamina','Speed'].forEach(s => {
      STATE.stats[s] = Math.max(1, (STATE.stats[s] || 5) - statLoss);
    });
  }

  if (!STATE.hunter.penaltiesSurvived) STATE.hunter.penaltiesSurvived = 0;
  STATE.hunter.penaltiesSurvived++;

  if (typeof saveState === 'function') saveState();
  if (typeof syncUI === 'function') syncUI();
  if (typeof checkAchievements === 'function') checkAchievements();

  // Show punishment modal-style toast
  showDungeonToast(`✕ COWARD'S PUNISHMENT — LOST ${rpLoss} RP & STATS`);

  // Show the penalty modal after a moment
  setTimeout(() => {
    if (typeof showPenaltyModalCustom === 'function') {
      showPenaltyModalCustom(rpLoss, statLoss);
    }
  }, 500);
};

// Expose a custom penalty modal for dungeon declines
window.showPenaltyModalCustom = function(rpLoss, statLoss) {
  const el = document.getElementById('penaltyDetails');
  if (el) {
    el.innerHTML = `
      <div class="reward-row"><span class="reward-label">RP LOST</span><span class="reward-val" style="color:var(--danger)">-${rpLoss}</span></div>
      <div class="reward-row"><span class="reward-label">STR/STA/SPD</span><span class="reward-val" style="color:var(--danger)">-${statLoss} EACH</span></div>
    `;
  }
  if (typeof showModal === 'function') showModal('modalPenalty');
};

function showDungeonToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.style.cssText = 'border-color:rgba(80,160,255,0.7);color:#89e4f5;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

// ─── PATCH INTO APP: hook completeQuest to track dungeon completions ──────────
// We wait for app.js to load, then wrap completeQuest
window.addEventListener('load', () => {
  // Wrap completeQuest to track per-type completions
  const origComplete = window.completeQuest;
  if (origComplete) {
    window.completeQuest = function(questId) {
      const quest = STATE.quests?.find(q => q.id === questId);
      if (quest && !quest.completed) {
        if (!STATE.hunter) STATE.hunter = {};
        // Track quest counts
        if (!STATE.hunter.questsEverCompleted) STATE.hunter.questsEverCompleted = 0;
        STATE.hunter.questsEverCompleted++;
        if (!STATE.hunter.rpEverEarned) STATE.hunter.rpEverEarned = 0;
        if (!STATE.hunter.chestsOpened) STATE.hunter.chestsOpened = 0;

        // Type tracking
        if (quest.type === 'special')    { if (!STATE.hunter.specialQuestsDone) STATE.hunter.specialQuestsDone = 0; STATE.hunter.specialQuestsDone++; }
        if (quest.type === 'challenging') { if (!STATE.hunter.hardQuestsDone) STATE.hunter.hardQuestsDone = 0; STATE.hunter.hardQuestsDone++; }
        if (quest.type === 'bonus')      { if (!STATE.hunter.bonusQuestsDone) STATE.hunter.bonusQuestsDone = 0; STATE.hunter.bonusQuestsDone++; }
        if (quest.type === 'dungeon')    { if (!STATE.hunter.dungeonsCompleted) STATE.hunter.dungeonsCompleted = 0; STATE.hunter.dungeonsCompleted++; }

        // Workout tracking
        const workoutMuscles = ['chest','back','shoulders','biceps','triceps','forearms','quads','hamstrings','glutes','calves','core','fullbody'];
        if (quest.muscle && workoutMuscles.includes(quest.muscle)) {
          if (!STATE.hunter.workoutQuestsDone) STATE.hunter.workoutQuestsDone = 0;
          STATE.hunter.workoutQuestsDone++;
        }

        // No-skip streak
        if (!quest.skipped) {
          if (!STATE.hunter.noSkipStreak) STATE.hunter.noSkipStreak = 0;
          STATE.hunter.noSkipStreak++;
        }

        // Time of day
        const hour = new Date().getHours();
        if (hour < 9)  STATE.hunter.earlyQuestDone = true;
        if (hour >= 22) STATE.hunter.lateQuestDone = true;
      }

      origComplete(questId);

      // Track RP earned
      if (quest && !quest.completed) {
        if (!STATE.hunter.rpEverEarned) STATE.hunter.rpEverEarned = 0;
        STATE.hunter.rpEverEarned += (quest.rp || 0);
      }

      checkAchievements();
    };
  }

  // Wrap purchaseItem to track purchases
  const origPurchase = window.purchaseItem;
  if (origPurchase) {
    window.purchaseItem = function(itemId) {
      origPurchase(itemId);
      if (!STATE.hunter.itemsPurchased) STATE.hunter.itemsPurchased = 0;
      STATE.hunter.itemsPurchased++;
      checkAchievements();
    };
  }

  // Wrap openChest to track chest opens
  const origChest = window.openChest;
  if (origChest) {
    window.openChest = function(chestId) {
      origChest(chestId);
      if (!STATE.hunter.chestsOpened) STATE.hunter.chestsOpened = 0;
      STATE.hunter.chestsOpened++;
      checkAchievements();
    };
  }

  // Wrap generateDailyQuests to trigger dungeon check
  const origGenerate = window.generateDailyQuests;
  if (origGenerate) {
    window.generateDailyQuests = function() {
      origGenerate();
      setTimeout(() => checkDungeonGate(), 800);
    };
  }

  // Initial achievement check
  if (STATE.hunter) {
    checkAchievements();
  }
});
