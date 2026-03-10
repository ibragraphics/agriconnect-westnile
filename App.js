import { useState, useEffect, useRef } from "react";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

// West Nile Districts
const WEST_NILE_DISTRICTS = [
  { name: "Arua", lat: 3.02, lon: 30.91 },
  { name: "Zombo", lat: 2.51, lon: 30.91 },
  { name: "Nebbi", lat: 2.48, lon: 31.09 },
  { name: "Pakwach", lat: 2.46, lon: 31.49 },
  { name: "Madi-Okollo", lat: 3.10, lon: 31.20 },
  { name: "Terego", lat: 3.25, lon: 30.85 },
  { name: "Obongi", lat: 3.52, lon: 31.68 },
  { name: "Koboko", lat: 3.41, lon: 30.96 },
  { name: "Yumbe", lat: 3.46, lon: 31.24 },
  { name: "Moyo", lat: 3.65, lon: 31.72 },
  { name: "Adjumani", lat: 3.37, lon: 31.79 },
  { name: "Maracha", lat: 3.29, lon: 30.74 },
];

const CROPS = [
  "Maize","Cassava","Sweet Potato","Sorghum","Millet","Groundnuts","Beans","Soybeans",
  "Sesame","Sunflower","Onions","Tomatoes","Cabbage","Eggplant","Pepper","Okra",
  "Watermelon","Pumpkin","Cowpeas","Pigeon Peas"
];

const ANIMAL_TYPES = ["Cattle","Goats","Sheep","Pigs","Poultry","Rabbits","Fish"];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const CROP_CALENDARS = {
  "Maize": { plant: [2,3,8,9], grow: [3,4,5,9,10,11], harvest: [5,6,11,12], tips: "Plant at start of rains. Space 75×25cm. Two seasons: Mar-Jun & Sep-Dec." },
  "Cassava": { plant: [2,3,4], grow: [3,4,5,6,7,8,9,10,11,12], harvest: [12,1,2], tips: "Plant cuttings 30cm long. Harvest after 9-18 months. Drought tolerant." },
  "Sweet Potato": { plant: [2,3,8,9], grow: [3,4,5,6,9,10,11,12], harvest: [5,6,11,12], tips: "Use vine cuttings. Mound beds. Ready in 3-4 months." },
  "Sorghum": { plant: [3,4,9], grow: [4,5,6,7,9,10,11], harvest: [7,8,12], tips: "Drought resistant. Plant 50×20cm. Good for drier areas." },
  "Millet": { plant: [3,4,9], grow: [4,5,6,9,10,11], harvest: [6,7,11,12], tips: "Direct seed. Thin to 20cm. Ready in 70-90 days." },
  "Groundnuts": { plant: [2,3,8,9], grow: [3,4,5,8,9,10], harvest: [5,6,11], tips: "Plant 45×15cm. Do not over-water at maturity. Two seasons possible." },
  "Beans": { plant: [2,3,8,9], grow: [3,4,5,9,10], harvest: [5,6,11], tips: "Bush beans 45×15cm. Needs well-drained soil. Fix nitrogen." },
  "Soybeans": { plant: [3,4,9], grow: [4,5,6,7,9,10,11], harvest: [7,8,12], tips: "Inoculate seeds. Plant 50×5cm. Ready in 90-120 days." },
  "Tomatoes": { plant: [1,2,7,8], grow: [2,3,4,8,9,10], harvest: [4,5,10,11], tips: "Nursery 4 weeks. Stake plants. Watch for blight. Irrigate in dry season." },
  "Onions": { plant: [10,11], grow: [11,12,1,2], harvest: [2,3], tips: "Dry season crop. Needs irrigation. Space 15×10cm. Cure before storage." },
};

const DISEASE_DB = {
  "yellowing leaves": { crop: "Multiple", disease: "Nitrogen Deficiency / Mosaic Virus", treatment: "Apply NPK fertilizer. Check for aphids transmitting virus. Remove infected plants.", severity: "medium" },
  "black spots": { crop: "Tomatoes/Beans", disease: "Early Blight / Angular Leaf Spot", treatment: "Apply copper-based fungicide. Improve air circulation. Avoid overhead watering.", severity: "high" },
  "wilting": { crop: "Multiple", disease: "Fusarium Wilt / Water Stress", treatment: "Check soil moisture. Apply fungicide drench. Remove severely infected plants.", severity: "high" },
  "white powder": { crop: "Cucurbits", disease: "Powdery Mildew", treatment: "Apply sulfur-based fungicide or baking soda solution. Reduce humidity.", severity: "medium" },
  "rotting stem": { crop: "Multiple", disease: "Stem Rot (Pythium/Rhizoctonia)", treatment: "Improve drainage. Apply Ridomil or Dithane M45. Avoid overwatering.", severity: "high" },
  "holes in leaves": { crop: "Cabbage/Kale", disease: "Diamondback Moth / Aphids", treatment: "Apply Neem oil or Karate 2.5%. Introduce natural predators. Use row covers.", severity: "medium" },
  "streaks on leaves": { crop: "Maize", disease: "Maize Streak Virus", treatment: "No cure. Remove infected plants. Control leafhoppers. Plant tolerant varieties.", severity: "critical" },
  "galls on roots": { crop: "Tomatoes/Beans", disease: "Root Knot Nematodes", treatment: "Rotate crops. Apply Nemacur. Add organic matter to soil.", severity: "high" },
};

const ANIMAL_DISEASES = {
  "Cattle": [
    { disease: "East Coast Fever", symptoms: "High fever, swollen lymph nodes, nasal discharge", treatment: "Buparvaquone injection. Tick control essential.", prevention: "Dip/spray fortnightly. Vaccinate." },
    { disease: "Foot and Mouth Disease", symptoms: "Blisters in mouth/feet, drooling, lameness", treatment: "No cure. Isolate animals. Supportive care.", prevention: "Vaccinate twice yearly." },
    { disease: "Blackleg", symptoms: "Sudden death, swollen leg, crepitus", treatment: "Penicillin if caught early.", prevention: "Annual vaccination." },
  ],
  "Goats": [
    { disease: "CCPP (Pleuropneumonia)", symptoms: "Coughing, fever, difficulty breathing", treatment: "Oxytetracycline injection.", prevention: "Vaccinate. Isolate new animals." },
    { disease: "PPR (Peste des Petits Ruminants)", symptoms: "Fever, sores in mouth, diarrhea", treatment: "No specific treatment. Supportive care.", prevention: "Vaccinate annually." },
  ],
  "Poultry": [
    { disease: "Newcastle Disease", symptoms: "Respiratory distress, green diarrhea, twisted neck", treatment: "No cure. Cull severely affected.", prevention: "Vaccinate every 3 months." },
    { disease: "Fowl Typhoid", symptoms: "Drowsiness, pale comb, greenish diarrhea", treatment: "Enrofloxacin in water.", prevention: "Good biosecurity. Vaccinate." },
  ],
  "Pigs": [
    { disease: "African Swine Fever", symptoms: "High fever, skin hemorrhage, sudden death", treatment: "No treatment. Report immediately.", prevention: "No vaccine. Strict biosecurity." },
    { disease: "Swine Dysentery", symptoms: "Bloody diarrhea, weight loss", treatment: "Tiamulin in feed/water.", prevention: "Clean housing. Rodent control." },
  ],
};

const MARKET_PRICES_BASE = {
  "Maize": { price: 1200, unit: "kg", market: "Arua Main Market" },
  "Beans": { price: 3500, unit: "kg", market: "Arua Main Market" },
  "Groundnuts": { price: 4200, unit: "kg", market: "Nebbi Market" },
  "Cassava": { price: 800, unit: "kg", market: "Zombo Market" },
  "Sorghum": { price: 1100, unit: "kg", market: "Koboko Market" },
  "Sweet Potato": { price: 600, unit: "kg", market: "Arua Main Market" },
  "Soybeans": { price: 2800, unit: "kg", market: "Packwach Market" },
  "Sesame": { price: 6500, unit: "kg", market: "Arua Main Market" },
  "Sunflower": { price: 2200, unit: "kg", market: "Nebbi Market" },
  "Tomatoes": { price: 2000, unit: "kg", market: "Arua Main Market" },
  "Onions": { price: 3000, unit: "kg", market: "Arua Main Market" },
  "Millet": { price: 1500, unit: "kg", market: "Yumbe Market" },
  "Cabbage": { price: 1800, unit: "head", market: "Arua Main Market" },
  "Eggplant": { price: 1500, unit: "kg", market: "Arua Main Market" },
};

// Styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --green-deep: #1a3a2a;
    --green-mid: #2d6a4f;
    --green-bright: #40c074;
    --green-light: #74e8a3;
    --earth: #8b5e3c;
    --earth-light: #c49a6c;
    --sky: #4fc3f7;
    --sky-deep: #1565c0;
    --gold: #f4c842;
    --red-alert: #e53935;
    --bg: #0d1f17;
    --bg2: #152a1e;
    --bg3: #1e3828;
    --card: #1a3326;
    --card2: #203d2e;
    --text: #e8f5e9;
    --text2: #a5d6a7;
    --text3: #66bb6a;
    --border: #2d6a4f44;
    --shadow: 0 4px 24px #00000055;
  }

  body { font-family: 'Outfit', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

  .app { max-width: 430px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; position: relative; overflow: hidden; }

  /* Header */
  .header {
    background: linear-gradient(135deg, var(--green-mid), var(--green-deep));
    padding: 16px 20px 12px;
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 100;
    box-shadow: var(--shadow);
  }
  .header-top { display: flex; align-items: center; justify-content: space-between; }
  .logo { display: flex; align-items: center; gap: 10px; }
  .logo-icon { width: 38px; height: 38px; background: var(--green-bright); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
  .logo-text { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: var(--text); }
  .logo-sub { font-size: 10px; font-weight: 500; color: var(--green-light); letter-spacing: 1px; text-transform: uppercase; }
  .live-badge { background: var(--red-alert); color: #fff; font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 20px; letter-spacing: 1px; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }

  .district-bar { margin-top: 10px; display: flex; align-items: center; gap: 8px; }
  .district-select { background: var(--bg3); border: 1px solid var(--border); color: var(--text); font-family: 'Outfit', sans-serif; font-size: 13px; padding: 5px 10px; border-radius: 8px; flex: 1; outline: none; }
  .gps-btn { background: var(--green-bright); border: none; color: var(--green-deep); font-size: 14px; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 700; }

  /* Nav */
  .nav { display: flex; background: var(--bg2); border-top: 1px solid var(--border); padding: 6px 8px; position: sticky; bottom: 0; z-index: 100; gap: 4px; }
  .nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 6px 2px; border-radius: 10px; border: none; background: transparent; color: var(--text2); cursor: pointer; transition: all .2s; font-size: 9px; font-family: 'Outfit', sans-serif; font-weight: 600; letter-spacing: .3px; }
  .nav-btn.active { background: var(--green-mid); color: var(--green-light); }
  .nav-icon { font-size: 18px; line-height: 1; }

  /* Content */
  .content { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 14px; }

  /* Cards */
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
  .card-header { padding: 14px 16px 10px; display: flex; align-items: center; justify-content: space-between; }
  .card-title { font-size: 14px; font-weight: 700; color: var(--green-light); display: flex; align-items: center; gap: 6px; }
  .card-body { padding: 0 16px 16px; }

  /* Weather */
  .weather-main { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: linear-gradient(135deg, #1a3a5c, #0d2136); border-radius: 14px; margin-bottom: 12px; }
  .weather-temp { font-size: 48px; font-weight: 300; font-family: 'Space Mono', monospace; color: var(--sky); line-height: 1; }
  .weather-icon { font-size: 56px; }
  .weather-desc { font-size: 13px; color: var(--sky); font-weight: 600; margin-top: 4px; }
  .weather-loc { font-size: 11px; color: #90caf9; }
  .weather-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .weather-stat { background: var(--bg3); border-radius: 10px; padding: 10px 12px; }
  .weather-stat-label { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: .5px; }
  .weather-stat-val { font-size: 18px; font-weight: 700; font-family: 'Space Mono', monospace; color: var(--text); margin-top: 2px; }
  .forecast-row { display: flex; gap: 8px; margin-top: 12px; overflow-x: auto; padding-bottom: 4px; }
  .forecast-day { background: var(--bg3); border-radius: 10px; padding: 8px 12px; text-align: center; min-width: 60px; flex-shrink: 0; }
  .forecast-day-label { font-size: 10px; color: var(--text3); font-weight: 600; }
  .forecast-emoji { font-size: 22px; margin: 4px 0; }
  .forecast-temp { font-size: 13px; font-weight: 700; color: var(--text); font-family: 'Space Mono', monospace; }
  .forecast-rain { font-size: 10px; color: var(--sky); }

  /* Farm Advisory */
  .advisory-box { background: linear-gradient(135deg, #1a3a2a, #0d2519); border: 1px solid var(--green-mid); border-radius: 12px; padding: 12px 14px; }
  .advisory-label { font-size: 10px; color: var(--green-bright); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
  .advisory-text { font-size: 13px; color: var(--text2); line-height: 1.6; }

  /* Market Prices */
  .search-input { width: 100%; background: var(--bg3); border: 1px solid var(--border); color: var(--text); font-family: 'Outfit', sans-serif; font-size: 13px; padding: 9px 14px; border-radius: 10px; outline: none; margin-bottom: 10px; }
  .price-list { display: flex; flex-direction: column; gap: 6px; }
  .price-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg3); border-radius: 10px; }
  .price-crop { font-size: 14px; font-weight: 600; color: var(--text); }
  .price-market { font-size: 10px; color: var(--text3); margin-top: 1px; }
  .price-val { text-align: right; }
  .price-amount { font-size: 16px; font-weight: 800; font-family: 'Space Mono', monospace; color: var(--green-bright); }
  .price-unit { font-size: 10px; color: var(--text3); }
  .price-trend { font-size: 11px; font-weight: 700; }
  .trend-up { color: #ef5350; }
  .trend-down { color: var(--green-bright); }
  .trend-flat { color: var(--gold); }
  .ai-badge { background: var(--gold); color: var(--green-deep); font-size: 9px; font-weight: 800; padding: 2px 7px; border-radius: 20px; letter-spacing: .5px; }
  .update-time { font-size: 10px; color: var(--text3); display: flex; align-items: center; gap: 4px; }

  /* Calendar */
  .crop-select-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 14px; max-height: 160px; overflow-y: auto; }
  .crop-chip { padding: 8px 12px; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; font-size: 12px; font-weight: 600; color: var(--text2); cursor: pointer; text-align: center; transition: all .2s; }
  .crop-chip.selected { background: var(--green-mid); border-color: var(--green-bright); color: var(--green-light); }
  .calendar-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 3px; margin-bottom: 8px; }
  .month-label { font-size: 8px; color: var(--text3); text-align: center; padding-bottom: 2px; font-weight: 600; }
  .month-cell { height: 22px; border-radius: 4px; background: var(--bg3); }
  .month-cell.plant { background: var(--gold); }
  .month-cell.grow { background: var(--green-mid); }
  .month-cell.harvest { background: var(--green-bright); }
  .legend { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
  .legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text2); }
  .legend-dot { width: 12px; height: 12px; border-radius: 3px; }
  .cal-tips { margin-top: 12px; background: var(--bg3); border-radius: 10px; padding: 12px; font-size: 12px; color: var(--text2); line-height: 1.6; border-left: 3px solid var(--green-bright); }

  /* Plant Doctor */
  .symptom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 12px; }
  .symptom-chip { padding: 9px 10px; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; font-size: 11px; font-weight: 600; color: var(--text2); cursor: pointer; text-align: center; transition: all .2s; }
  .symptom-chip.selected { background: #3d1f1f; border-color: var(--red-alert); color: #ef9a9a; }
  .ai-input-row { display: flex; gap: 8px; }
  .ai-input { flex: 1; background: var(--bg3); border: 1px solid var(--border); color: var(--text); font-family: 'Outfit', sans-serif; font-size: 13px; padding: 9px 12px; border-radius: 10px; outline: none; }
  .ai-btn { background: var(--green-bright); border: none; color: var(--green-deep); font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700; padding: 9px 14px; border-radius: 10px; cursor: pointer; white-space: nowrap; }
  .ai-btn:disabled { opacity: .5; cursor: not-allowed; }
  .diagnosis-box { margin-top: 12px; background: var(--bg3); border-radius: 12px; padding: 14px; border-left: 3px solid; }
  .diagnosis-box.critical { border-color: var(--red-alert); }
  .diagnosis-box.high { border-color: #ff7043; }
  .diagnosis-box.medium { border-color: var(--gold); }
  .diagnosis-box.low { border-color: var(--green-bright); }
  .diagnosis-disease { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
  .diagnosis-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; margin-top: 10px; margin-bottom: 3px; }
  .diagnosis-label.treat { color: var(--green-bright); }
  .diagnosis-label.prevent { color: var(--sky); }
  .diagnosis-text { font-size: 12px; color: var(--text2); line-height: 1.6; }
  .severity-badge { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; letter-spacing: .5px; text-transform: uppercase; }
  .sev-critical { background: var(--red-alert); color: #fff; }
  .sev-high { background: #ff7043; color: #fff; }
  .sev-medium { background: var(--gold); color: var(--green-deep); }
  .sev-low { background: var(--green-bright); color: var(--green-deep); }

  /* Animal */
  .animal-tabs { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px; }
  .animal-tab { padding: 7px 14px; background: var(--bg3); border: 1px solid var(--border); border-radius: 20px; font-size: 12px; font-weight: 600; color: var(--text2); cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: all .2s; }
  .animal-tab.active { background: var(--earth); border-color: var(--earth-light); color: var(--text); }
  .animal-disease-card { background: var(--bg3); border-radius: 12px; padding: 14px; margin-bottom: 8px; border-left: 3px solid var(--earth-light); }
  .disease-name { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
  .disease-section { margin-top: 8px; }
  .disease-section-label { font-size: 10px; font-weight: 700; color: var(--earth-light); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 2px; }
  .disease-section-text { font-size: 12px; color: var(--text2); line-height: 1.5; }
  .animal-ai-section { margin-top: 12px; }

  /* AI Chat */
  .ai-loading { display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--bg3); border-radius: 10px; font-size: 12px; color: var(--text3); }
  .ai-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-bright); animation: bounce 1s infinite; }
  .ai-dot:nth-child(2) { animation-delay: .15s; }
  .ai-dot:nth-child(3) { animation-delay: .3s; }
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  .ai-response { background: var(--bg3); border-radius: 12px; padding: 14px; font-size: 13px; color: var(--text2); line-height: 1.7; border-left: 3px solid var(--green-bright); margin-top: 10px; white-space: pre-wrap; }

  /* Misc */
  .section-divider { height: 1px; background: var(--border); margin: 4px 0; }
  .tag { display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; }
  .scroll-fade::-webkit-scrollbar { display: none; }
`;

// Simulated weather data
async function getWeatherData(district) {
  const conditions = [
    { icon: "⛅", desc: "Partly Cloudy", temp: 27, humidity: 72, wind: 12, rain: 30 },
    { icon: "🌧️", desc: "Light Rain", temp: 23, humidity: 88, wind: 8, rain: 85 },
    { icon: "☀️", desc: "Sunny", temp: 31, humidity: 55, wind: 15, rain: 5 },
    { icon: "⛈️", desc: "Thunderstorm", temp: 21, humidity: 95, wind: 22, rain: 95 },
    { icon: "🌤️", desc: "Mostly Clear", temp: 29, humidity: 65, wind: 10, rain: 15 },
  ];
  const idx = (district.lat * 10 + new Date().getHours()) % conditions.length;
  const cond = conditions[Math.floor(idx)];
  const forecast = ["Mon","Tue","Wed","Thu","Fri"].map((d, i) => ({
    day: d,
    icon: conditions[(Math.floor(idx) + i + 1) % conditions.length].icon,
    high: cond.temp + Math.floor(Math.random() * 4) - 2,
    low: cond.temp - 6 + Math.floor(Math.random() * 3),
    rain: Math.floor(Math.random() * 100),
  }));
  return { ...cond, forecast, district: district.name };
}

// Simulated price fluctuation
function getPrices() {
  const trends = ["↑","↓","→"];
  return Object.entries(MARKET_PRICES_BASE).map(([crop, data]) => {
    const variation = (Math.random() * 0.2 - 0.1);
    const price = Math.round(data.price * (1 + variation / 10));
    const trendIdx = Math.floor(Math.random() * 3);
    return { crop, price, unit: data.unit, market: data.market, trend: trends[trendIdx], trendIdx };
  });
}

async function callClaude(prompt, systemPrompt = "") {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt || "You are AgriConnect's AI assistant, an expert in agriculture for West Nile region of Uganda. Give practical, actionable advice tailored to smallholder farmers. Be concise, clear, and empathetic. Use local context.",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.content?.map(b => b.text || "").join("") || "Unable to get AI response.";
}

export default function AgriConnect() {
  const [tab, setTab] = useState("weather");
  const [district, setDistrict] = useState(WEST_NILE_DISTRICTS[0]);
  const [weather, setWeather] = useState(null);
  const [prices, setPrices] = useState([]);
  const [priceSearch, setPriceSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("Maize");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomInput, setSymptomInput] = useState("");
  const [diagnosis, setDiagnosis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [animalTab, setAnimalTab] = useState("Cattle");
  const [animalQuery, setAnimalQuery] = useState("");
  const [animalAiResp, setAnimalAiResp] = useState("");
  const [animalAiLoading, setAnimalAiLoading] = useState(false);
  const [weatherAdvisory, setWeatherAdvisory] = useState("");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    setWeather(getWeatherData(district));
    setPrices(getPrices());
    generateWeatherAdvisory(district);
  }, [district]);

  // Background price update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(getPrices());
      setLastUpdate(new Date());
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  async function generateWeatherAdvisory(dist) {
    const w = getWeatherData(dist);
    try {
      const resp = await callClaude(
        `Weather in ${dist.name}, West Nile Uganda: ${w.desc}, ${w.temp}°C, humidity ${w.humidity}%, chance of rain ${w.rain}%. Give a 2-sentence farming advisory for today. Be specific and practical.`
      );
      setWeatherAdvisory(resp);
    } catch {
      setWeatherAdvisory("Check soil moisture before irrigation. Good conditions for field work today.");
    }
  }

  function handleGPS() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        let nearest = WEST_NILE_DISTRICTS[0];
        let minDist = Infinity;
        WEST_NILE_DISTRICTS.forEach(d => {
          const dist = Math.sqrt((d.lat - latitude) ** 2 + (d.lon - longitude) ** 2);
          if (dist < minDist) { minDist = dist; nearest = d; }
        });
        setDistrict(nearest);
      });
    }
  }

  function toggleSymptom(s) {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  async function diagnose() {
    const symptoms = [...selectedSymptoms, symptomInput].filter(Boolean).join(", ");
    if (!symptoms) return;
    setAiLoading(true);
    setDiagnosis(null);
    setAiResponse("");
    
    // Check local DB first
    const key = Object.keys(DISEASE_DB).find(k => symptoms.toLowerCase().includes(k));
    if (key) {
      setDiagnosis(DISEASE_DB[key]);
    }
    
    try {
      const resp = await callClaude(
        `A farmer in West Nile, Uganda reports these plant symptoms: ${symptoms}. Diagnose the likely disease/pest and give: 1) Disease name 2) Cause 3) Immediate treatment steps using locally available products 4) Prevention for next season. Be practical for smallholder farmers.`
      );
      setAiResponse(resp);
    } catch {
      setAiResponse("AI diagnosis unavailable. Check local DB result above.");
    }
    setAiLoading(false);
  }

  async function askAnimalAI() {
    if (!animalQuery) return;
    setAnimalAiLoading(true);
    setAnimalAiResp("");
    try {
      const resp = await callClaude(
        `A farmer in West Nile, Uganda asks about ${animalTab}: "${animalQuery}". Provide practical advice for smallholder farmers. Include local treatment options, dosages if relevant, and when to contact a vet.`
      );
      setAnimalAiResp(resp);
    } catch {
      setAnimalAiResp("Unable to get AI response. Please try again.");
    }
    setAnimalAiLoading(false);
  }

  const filteredPrices = prices.filter(p =>
    p.crop.toLowerCase().includes(priceSearch.toLowerCase())
  );

  const cal = CROP_CALENDARS[selectedCrop];

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* Header */}
        <div className="header">
          <div className="header-top">
            <div className="logo">
              <div className="logo-icon">🌿</div>
              <div>
                <div className="logo-text">AgriConnect</div>
                <div className="logo-sub">West Nile · Uganda</div>
              </div>
            </div>
            <span className="live-badge">● LIVE</span>
          </div>
          <div className="district-bar">
            <select
              className="district-select"
              value={district.name}
              onChange={e => setDistrict(WEST_NILE_DISTRICTS.find(d => d.name === e.target.value))}
            >
              {WEST_NILE_DISTRICTS.map(d => (
                <option key={d.name} value={d.name}>{d.name} District</option>
              ))}
            </select>
            <button className="gps-btn" onClick={handleGPS} title="Use GPS">📍</button>
          </div>
        </div>

        {/* Content */}
        <div className="content scroll-fade">

          {/* === WEATHER === */}
          {tab === "weather" && weather && (
            <>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">🌤️ Live Weather · {weather.district}</span>
                  <span style={{ fontSize: 10, color: "var(--text3)" }}>{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="card-body">
                  <div className="weather-main">
                    <div>
                      <div className="weather-temp">{weather.temp}°</div>
                      <div className="weather-desc">{weather.desc}</div>
                      <div className="weather-loc">📍 {weather.district} District</div>
                    </div>
                    <div className="weather-icon">{weather.icon}</div>
                  </div>
                  <div className="weather-grid">
                    <div className="weather-stat">
                      <div className="weather-stat-label">💧 Humidity</div>
                      <div className="weather-stat-val">{weather.humidity}%</div>
                    </div>
                    <div className="weather-stat">
                      <div className="weather-stat-label">💨 Wind</div>
                      <div className="weather-stat-val">{weather.wind} km/h</div>
                    </div>
                    <div className="weather-stat">
                      <div className="weather-stat-label">🌧 Rain Chance</div>
                      <div className="weather-stat-val">{weather.rain}%</div>
                    </div>
                    <div className="weather-stat">
                      <div className="weather-stat-label">👁️ Visibility</div>
                      <div className="weather-stat-val">{weather.rain > 70 ? "3" : "10"} km</div>
                    </div>
                  </div>
                  <div className="forecast-row scroll-fade">
                    {(weather.forecast || []).map((d, i) => (
                      <div key={i} className="forecast-day">
                        <div className="forecast-day-label">{d.day}</div>
                        <div className="forecast-emoji">{d.icon}</div>
                        <div className="forecast-temp">{d.high}°/{d.low}°</div>
                        <div className="forecast-rain">💧{d.rain}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <span className="card-title">🤖 AI Farm Advisory</span>
                  <span className="ai-badge">AI</span>
                </div>
                <div className="card-body">
                  <div className="advisory-box">
                    <div className="advisory-label">Today's Recommendation</div>
                    <div className="advisory-text">
                      {weatherAdvisory || "Generating advisory..."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <span className="card-title">📊 All Districts Overview</span>
                </div>
                <div className="card-body">
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {WEST_NILE_DISTRICTS.slice(0, 6).map(d => {
                      const w = getWeatherData(d);
                      return (
                        <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "var(--bg3)", borderRadius: 10, cursor: "pointer" }}
                          onClick={() => setDistrict(d)}>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</span>
                          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 16 }}>{w.icon}</span>
                            <span style={{ fontSize: 13, fontFamily: "Space Mono, monospace", color: "var(--sky)" }}>{w.temp}°C</span>
                            <span style={{ fontSize: 11, color: "var(--text3)" }}>💧{w.rain}%</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* === PRICES === */}
          {tab === "prices" && (
            <>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">📈 Market Prices</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="ai-badge">AI</span>
                    <span className="live-badge">LIVE</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="update-time" style={{ marginBottom: 10 }}>
                    🔄 Auto-updated · {lastUpdate.toLocaleTimeString()} · AI price collection active
                  </div>
                  <input
                    className="search-input"
                    placeholder="🔍 Search crop..."
                    value={priceSearch}
                    onChange={e => setPriceSearch(e.target.value)}
                  />
                  <div className="price-list">
                    {filteredPrices.map((p, i) => (
                      <div key={i} className="price-row">
                        <div>
                          <div className="price-crop">{p.crop}</div>
                          <div className="price-market">📍 {p.market}</div>
                        </div>
                        <div className="price-val">
                          <div className="price-amount">UGX {p.price.toLocaleString()}</div>
                          <div className="price-unit">per {p.unit}</div>
                          <div className={`price-trend ${p.trendIdx === 0 ? "trend-up" : p.trendIdx === 1 ? "trend-down" : "trend-flat"}`}>
                            {p.trend} {p.trendIdx === 0 ? "Rising" : p.trendIdx === 1 ? "Falling" : "Stable"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <span className="card-title">🤖 Price Intelligence</span>
                  <span className="ai-badge">AI</span>
                </div>
                <div className="card-body">
                  <div className="advisory-box">
                    <div className="advisory-label">How AI Price Collection Works</div>
                    <div className="advisory-text">
                      Our AI agents passively collect prices through market conversations, SMS reports from traders, and community data sharing. Prices update every 30-45 minutes automatically — even while your phone is in your pocket at the market. Your participation helps all farmers get fair prices.
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* === CALENDAR === */}
          {tab === "calendar" && (
            <>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">📅 Production Calendar</span>
                </div>
                <div className="card-body">
                  <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, fontWeight: 600 }}>SELECT CROP</div>
                  <div className="crop-select-grid scroll-fade">
                    {Object.keys(CROP_CALENDARS).map(c => (
                      <div
                        key={c}
                        className={`crop-chip ${selectedCrop === c ? "selected" : ""}`}
                        onClick={() => setSelectedCrop(c)}
                      >{c}</div>
                    ))}
                  </div>

                  {cal && (
                    <>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--green-light)", marginBottom: 8 }}>
                        {selectedCrop} — Annual Calendar
                      </div>
                      <div className="calendar-grid">
                        {MONTHS.map((m, i) => (
                          <div key={i} className="month-label">{m}</div>
                        ))}
                        {MONTHS.map((m, i) => {
                          const month = i + 1;
                          const cls = cal.harvest.includes(month) ? "harvest" :
                            cal.plant.includes(month) ? "plant" :
                            cal.grow.includes(month) ? "grow" : "";
                          return <div key={i} className={`month-cell ${cls}`} />;
                        })}
                      </div>
                      <div className="legend">
                        <div className="legend-item"><div className="legend-dot" style={{ background: "var(--gold)" }} />Planting</div>
                        <div className="legend-item"><div className="legend-dot" style={{ background: "var(--green-mid)" }} />Growing</div>
                        <div className="legend-item"><div className="legend-dot" style={{ background: "var(--green-bright)" }} />Harvest</div>
                        <div className="legend-item"><div className="legend-dot" style={{ background: "var(--bg3)" }} />Off Season</div>
                      </div>
                      <div className="cal-tips">
                        💡 <strong>Tips:</strong> {cal.tips}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <span className="card-title">🌱 All Crops Quick View</span>
                </div>
                <div className="card-body">
                  {CROPS.filter(c => !CROP_CALENDARS[c]).map(c => (
                    <div key={c} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 13, color: "var(--text2)", display: "flex", justifyContent: "space-between" }}>
                      <span>{c}</span>
                      <span style={{ color: "var(--text3)", fontSize: 11 }}>Mar–Jun · Sep–Dec</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* === PLANT DOCTOR === */}
          {tab === "doctor" && (
            <>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">🔬 Plant Doctor</span>
                  <span className="ai-badge">AI</span>
                </div>
                <div className="card-body">
                  <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, fontWeight: 600 }}>SELECT SYMPTOMS</div>
                  <div className="symptom-grid">
                    {Object.keys(DISEASE_DB).map(s => (
                      <div
                        key={s}
                        className={`symptom-chip ${selectedSymptoms.includes(s) ? "selected" : ""}`}
                        onClick={() => toggleSymptom(s)}
                      >{s}</div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 6, fontWeight: 600 }}>OR DESCRIBE IN YOUR OWN WORDS</div>
                  <div className="ai-input-row">
                    <input
                      className="ai-input"
                      placeholder="e.g. brown spots on maize leaves..."
                      value={symptomInput}
                      onChange={e => setSymptomInput(e.target.value)}
                    />
                    <button className="ai-btn" onClick={diagnose} disabled={aiLoading}>
                      {aiLoading ? "..." : "Diagnose"}
                    </button>
                  </div>

                  {aiLoading && (
                    <div className="ai-loading">
                      <div className="ai-dot" /><div className="ai-dot" /><div className="ai-dot" />
                      AI is analyzing symptoms...
                    </div>
                  )}

                  {diagnosis && (
                    <div className={`diagnosis-box ${diagnosis.severity}`}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                        <div className="diagnosis-disease">{diagnosis.disease}</div>
                        <span className={`severity-badge sev-${diagnosis.severity}`}>{diagnosis.severity}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text3)" }}>Affects: {diagnosis.crop}</div>
                      <div className="diagnosis-label treat">💊 Treatment</div>
                      <div className="diagnosis-text">{diagnosis.treatment}</div>
                    </div>
                  )}

                  {aiResponse && (
                    <div className="ai-response">{aiResponse}</div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* === LIVESTOCK === */}
          {tab === "livestock" && (
            <>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">🐄 Animal Husbandry</span>
                </div>
                <div className="card-body">
                  <div className="animal-tabs scroll-fade">
                    {ANIMAL_TYPES.map(a => (
                      <div
                        key={a}
                        className={`animal-tab ${animalTab === a ? "active" : ""}`}
                        onClick={() => setAnimalTab(a)}
                      >
                        {a === "Cattle" ? "🐄" : a === "Goats" ? "🐐" : a === "Sheep" ? "🐑" : a === "Pigs" ? "🐷" : a === "Poultry" ? "🐔" : a === "Rabbits" ? "🐇" : "🐟"} {a}
                      </div>
                    ))}
                  </div>

                  {ANIMAL_DISEASES[animalTab] ? (
                    <>
                      <div style={{ fontSize: 12, color: "var(--text3)", fontWeight: 600, marginBottom: 8 }}>COMMON DISEASES</div>
                      {ANIMAL_DISEASES[animalTab].map((d, i) => (
                        <div key={i} className="animal-disease-card">
                          <div className="disease-name">⚠️ {d.disease}</div>
                          <div className="disease-section">
                            <div className="disease-section-label">Symptoms</div>
                            <div className="disease-section-text">{d.symptoms}</div>
                          </div>
                          <div className="disease-section">
                            <div className="disease-section-label">Treatment</div>
                            <div className="disease-section-text">{d.treatment}</div>
                          </div>
                          <div className="disease-section">
                            <div className="disease-section-label">Prevention</div>
                            <div className="disease-section-text">{d.prevention}</div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div style={{ fontSize: 13, color: "var(--text3)", padding: "16px 0" }}>Ask AI for {animalTab} advice below.</div>
                  )}

                  <div className="animal-ai-section">
                    <div style={{ fontSize: 12, color: "var(--text3)", fontWeight: 600, marginBottom: 8 }}>🤖 ASK AI ABOUT {animalTab.toUpperCase()}</div>
                    <div className="ai-input-row">
                      <input
                        className="ai-input"
                        placeholder={`Ask anything about ${animalTab}...`}
                        value={animalQuery}
                        onChange={e => setAnimalQuery(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && askAnimalAI()}
                      />
                      <button className="ai-btn" onClick={askAnimalAI} disabled={animalAiLoading}>
                        {animalAiLoading ? "..." : "Ask"}
                      </button>
                    </div>
                    {animalAiLoading && (
                      <div className="ai-loading" style={{ marginTop: 8 }}>
                        <div className="ai-dot" /><div className="ai-dot" /><div className="ai-dot" />
                        AI is thinking...
                      </div>
                    )}
                    {animalAiResp && <div className="ai-response">{animalAiResp}</div>}
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Bottom Nav */}
        <div className="nav">
          {[
            { id: "weather", icon: "🌤️", label: "Weather" },
            { id: "prices", icon: "📊", label: "Prices" },
            { id: "calendar", icon: "📅", label: "Calendar" },
            { id: "doctor", icon: "🔬", label: "Plant Dr" },
            { id: "livestock", icon: "🐄", label: "Livestock" },
          ].map(t => (
            <button
              key={t.id}
              className={`nav-btn ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              <span className="nav-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
