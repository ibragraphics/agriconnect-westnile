[index.html](https://github.com/user-attachments/files/25869297/index.html)
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <title>AgriConnect — West Nile Uganda</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --green-deep: #1a3a2a; --green-mid: #2d6a4f; --green-bright: #40c074;
      --green-light: #74e8a3; --earth: #8b5e3c; --earth-light: #c49a6c;
      --sky: #4fc3f7; --gold: #f4c842; --red-alert: #e53935;
      --bg: #0d1f17; --bg2: #152a1e; --bg3: #1e3828;
      --card: #1a3326; --text: #e8f5e9; --text2: #a5d6a7; --text3: #66bb6a;
      --border: #2d6a4f44; --shadow: 0 4px 24px #00000055;
    }
    body { font-family: 'Outfit', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
    .app { max-width: 430px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; }
    /* Header */
    .header { background: linear-gradient(135deg, var(--green-mid), var(--green-deep)); padding: 16px 20px 12px; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; box-shadow: var(--shadow); }
    .header-top { display: flex; align-items: center; justify-content: space-between; }
    .logo { display: flex; align-items: center; gap: 10px; }
    .logo-icon { width: 38px; height: 38px; background: var(--green-bright); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
    .logo-text { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
    .logo-sub { font-size: 10px; font-weight: 500; color: var(--green-light); letter-spacing: 1px; text-transform: uppercase; }
    .live-badge { background: var(--red-alert); color: #fff; font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 20px; letter-spacing: 1px; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }
    .district-bar { margin-top: 10px; display: flex; align-items: center; gap: 8px; }
    .district-select { background: var(--bg3); border: 1px solid var(--border); color: var(--text); font-family: 'Outfit', sans-serif; font-size: 13px; padding: 5px 10px; border-radius: 8px; flex: 1; outline: none; }
    .gps-btn { background: var(--green-bright); border: none; color: var(--green-deep); font-size: 14px; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; font-weight: 700; }
    /* Nav */
    .nav { display: flex; background: var(--bg2); border-top: 1px solid var(--border); padding: 6px 8px; position: sticky; bottom: 0; z-index: 100; gap: 4px; }
    .nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 6px 2px; border-radius: 10px; border: none; background: transparent; color: var(--text2); cursor: pointer; font-size: 9px; font-family: 'Outfit', sans-serif; font-weight: 600; letter-spacing: .3px; transition: all .2s; }
    .nav-btn.active { background: var(--green-mid); color: var(--green-light); }
    .nav-icon { font-size: 18px; line-height: 1; }
    /* Content */
    .content { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 14px; }
    .tab-panel { display: none; flex-direction: column; gap: 14px; }
    .tab-panel.active { display: flex; }
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
    .advisory-box { background: linear-gradient(135deg, #1a3a2a, #0d2519); border: 1px solid var(--green-mid); border-radius: 12px; padding: 12px 14px; }
    .advisory-label { font-size: 10px; color: var(--green-bright); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
    .advisory-text { font-size: 13px; color: var(--text2); line-height: 1.6; }
    /* Prices */
    .search-input { width: 100%; background: var(--bg3); border: 1px solid var(--border); color: var(--text); font-family: 'Outfit', sans-serif; font-size: 13px; padding: 9px 14px; border-radius: 10px; outline: none; margin-bottom: 10px; }
    .price-list { display: flex; flex-direction: column; gap: 6px; }
    .price-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg3); border-radius: 10px; }
    .price-crop { font-size: 14px; font-weight: 600; }
    .price-market { font-size: 10px; color: var(--text3); margin-top: 1px; }
    .price-amount { font-size: 16px; font-weight: 800; font-family: 'Space Mono', monospace; color: var(--green-bright); }
    .price-unit { font-size: 10px; color: var(--text3); }
    .price-trend { font-size: 11px; font-weight: 700; }
    .trend-up { color: #ef5350; } .trend-down { color: var(--green-bright); } .trend-flat { color: var(--gold); }
    .ai-badge { background: var(--gold); color: var(--green-deep); font-size: 9px; font-weight: 800; padding: 2px 7px; border-radius: 20px; }
    .update-time { font-size: 10px; color: var(--text3); margin-bottom: 10px; }
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
    .diagnosis-disease { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
    .diagnosis-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; margin-top: 10px; margin-bottom: 3px; color: var(--green-bright); }
    .diagnosis-text { font-size: 12px; color: var(--text2); line-height: 1.6; }
    .severity-badge { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; letter-spacing: .5px; text-transform: uppercase; }
    .sev-critical { background: var(--red-alert); color: #fff; }
    .sev-high { background: #ff7043; color: #fff; }
    .sev-medium { background: var(--gold); color: var(--green-deep); }
    /* Animal */
    .animal-tabs { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px; }
    .animal-tab { padding: 7px 14px; background: var(--bg3); border: 1px solid var(--border); border-radius: 20px; font-size: 12px; font-weight: 600; color: var(--text2); cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: all .2s; }
    .animal-tab.active { background: var(--earth); border-color: var(--earth-light); color: var(--text); }
    .animal-disease-card { background: var(--bg3); border-radius: 12px; padding: 14px; margin-bottom: 8px; border-left: 3px solid var(--earth-light); }
    .disease-name { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
    .disease-section { margin-top: 8px; }
    .disease-section-label { font-size: 10px; font-weight: 700; color: var(--earth-light); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 2px; }
    .disease-section-text { font-size: 12px; color: var(--text2); line-height: 1.5; }
    /* AI */
    .ai-loading { display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--bg3); border-radius: 10px; font-size: 12px; color: var(--text3); margin-top: 10px; }
    .ai-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-bright); animation: bounce 1s infinite; display: inline-block; }
    .ai-dot:nth-child(2) { animation-delay: .15s; }
    .ai-dot:nth-child(3) { animation-delay: .3s; }
    @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
    .ai-response { background: var(--bg3); border-radius: 12px; padding: 14px; font-size: 13px; color: var(--text2); line-height: 1.7; border-left: 3px solid var(--green-bright); margin-top: 10px; white-space: pre-wrap; }
    /* Districts overview */
    .district-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: var(--bg3); border-radius: 10px; cursor: pointer; margin-bottom: 6px; }
    ::-webkit-scrollbar { display: none; }
    select option { background: #1e3828; }
  </style>
</head>
<body>
<div class="app">

  <!-- HEADER -->
  <div class="header">
    <div class="header-top">
      <div class="logo">
        <div class="logo-icon">🌿</div>
        <div>
          <div class="logo-text">AgriConnect</div>
          <div class="logo-sub">West Nile · Uganda</div>
        </div>
      </div>
      <span class="live-badge">● LIVE</span>
    </div>
    <div class="district-bar">
      <select class="district-select" id="districtSelect" onchange="onDistrictChange()">
        <option value="0">Arua District</option>
        <option value="1">Zombo District</option>
        <option value="2">Nebbi District</option>
        <option value="3">Pakwach District</option>
        <option value="4">Madi-Okollo District</option>
        <option value="5">Terego District</option>
        <option value="6">Obongi District</option>
        <option value="7">Koboko District</option>
        <option value="8">Yumbe District</option>
        <option value="9">Moyo District</option>
        <option value="10">Adjumani District</option>
        <option value="11">Maracha District</option>
      </select>
      <button class="gps-btn" onclick="useGPS()" title="Use GPS">📍</button>
    </div>
  </div>

  <!-- CONTENT -->
  <div class="content">

    <!-- WEATHER TAB -->
    <div class="tab-panel active" id="tab-weather">
      <div class="card">
        <div class="card-header">
          <span class="card-title">🌤️ Live Weather</span>
          <span id="weatherTime" style="font-size:10px;color:var(--text3)"></span>
        </div>
        <div class="card-body">
          <div class="weather-main">
            <div>
              <div class="weather-temp" id="wTemp">--°</div>
              <div class="weather-desc" id="wDesc">Loading...</div>
              <div class="weather-loc" id="wLoc">📍 Arua District</div>
            </div>
            <div class="weather-icon" id="wIcon">🌤️</div>
          </div>
          <div class="weather-grid">
            <div class="weather-stat"><div class="weather-stat-label">💧 Humidity</div><div class="weather-stat-val" id="wHumidity">--%</div></div>
            <div class="weather-stat"><div class="weather-stat-label">💨 Wind</div><div class="weather-stat-val" id="wWind">-- km/h</div></div>
            <div class="weather-stat"><div class="weather-stat-label">🌧 Rain Chance</div><div class="weather-stat-val" id="wRain">--%</div></div>
            <div class="weather-stat"><div class="weather-stat-label">👁️ Visibility</div><div class="weather-stat-val" id="wVis">-- km</div></div>
          </div>
          <div class="forecast-row" id="forecastRow"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="card-title">🤖 AI Farm Advisory</span>
          <span class="ai-badge">AI</span>
        </div>
        <div class="card-body">
          <div class="advisory-box">
            <div class="advisory-label">Today's Recommendation</div>
            <div class="advisory-text" id="advisoryText">Generating advisory...</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">📊 All Districts</span></div>
        <div class="card-body" id="allDistrictsBody"></div>
      </div>
    </div>

    <!-- PRICES TAB -->
    <div class="tab-panel" id="tab-prices">
      <div class="card">
        <div class="card-header">
          <span class="card-title">📈 Market Prices</span>
          <div style="display:flex;align-items:center;gap:6px"><span class="ai-badge">AI</span><span class="live-badge">LIVE</span></div>
        </div>
        <div class="card-body">
          <div class="update-time" id="priceUpdateTime">🔄 Auto-updated · AI price collection active</div>
          <input class="search-input" placeholder="🔍 Search crop..." oninput="filterPrices(this.value)" />
          <div class="price-list" id="priceList"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">🤖 Price Intelligence</span><span class="ai-badge">AI</span></div>
        <div class="card-body">
          <div class="advisory-box">
            <div class="advisory-label">How AI Price Collection Works</div>
            <div class="advisory-text">Our AI agents passively collect prices through market conversations, SMS reports from traders, and community data sharing. Prices update every 30-45 minutes automatically — even while your phone is in your pocket at the market.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CALENDAR TAB -->
    <div class="tab-panel" id="tab-calendar">
      <div class="card">
        <div class="card-header"><span class="card-title">📅 Production Calendar</span></div>
        <div class="card-body">
          <div style="font-size:12px;color:var(--text3);margin-bottom:8px;font-weight:600">SELECT CROP</div>
          <div class="crop-select-grid" id="cropChips"></div>
          <div id="calendarDisplay"></div>
        </div>
      </div>
    </div>

    <!-- PLANT DOCTOR TAB -->
    <div class="tab-panel" id="tab-doctor">
      <div class="card">
        <div class="card-header"><span class="card-title">🔬 Plant Doctor</span><span class="ai-badge">AI</span></div>
        <div class="card-body">
          <div style="font-size:12px;color:var(--text3);margin-bottom:8px;font-weight:600">SELECT SYMPTOMS</div>
          <div class="symptom-grid" id="symptomChips"></div>
          <div style="font-size:12px;color:var(--text3);margin-bottom:6px;font-weight:600">OR DESCRIBE IN YOUR OWN WORDS</div>
          <div class="ai-input-row">
            <input class="ai-input" id="symptomInput" placeholder="e.g. brown spots on maize leaves..." />
            <button class="ai-btn" id="diagnoseBtn" onclick="diagnose()">Diagnose</button>
          </div>
          <div id="diagnosisLoading" class="ai-loading" style="display:none"><div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div> AI is analyzing symptoms...</div>
          <div id="diagnosisResult"></div>
          <div id="aiDiagnosisResponse" class="ai-response" style="display:none"></div>
        </div>
      </div>
    </div>

    <!-- LIVESTOCK TAB -->
    <div class="tab-panel" id="tab-livestock">
      <div class="card">
        <div class="card-header"><span class="card-title">🐄 Animal Husbandry</span></div>
        <div class="card-body">
          <div class="animal-tabs" id="animalTabs"></div>
          <div id="animalDiseases"></div>
          <div style="font-size:12px;color:var(--text3);font-weight:600;margin-top:14px;margin-bottom:8px">🤖 ASK AI ABOUT LIVESTOCK</div>
          <div class="ai-input-row">
            <input class="ai-input" id="animalInput" placeholder="Ask anything about your animals..." />
            <button class="ai-btn" id="animalBtn" onclick="askAnimalAI()">Ask</button>
          </div>
          <div id="animalLoading" class="ai-loading" style="display:none"><div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div> AI is thinking...</div>
          <div id="animalAiResponse" class="ai-response" style="display:none"></div>
        </div>
      </div>
    </div>

  </div><!-- end content -->

  <!-- NAV -->
  <div class="nav">
    <button class="nav-btn active" onclick="switchTab('weather',this)"><span class="nav-icon">🌤️</span>Weather</button>
    <button class="nav-btn" onclick="switchTab('prices',this)"><span class="nav-icon">📊</span>Prices</button>
    <button class="nav-btn" onclick="switchTab('calendar',this)"><span class="nav-icon">📅</span>Calendar</button>
    <button class="nav-btn" onclick="switchTab('doctor',this)"><span class="nav-icon">🔬</span>Plant Dr</button>
    <button class="nav-btn" onclick="switchTab('livestock',this)"><span class="nav-icon">🐄</span>Livestock</button>
  </div>

</div><!-- end app -->

<script>
// ── DATA ──────────────────────────────────────────────
const DISTRICTS = [
  {name:"Arua",lat:3.02,lon:30.91},{name:"Zombo",lat:2.51,lon:30.91},
  {name:"Nebbi",lat:2.48,lon:31.09},{name:"Pakwach",lat:2.46,lon:31.49},
  {name:"Madi-Okollo",lat:3.10,lon:31.20},{name:"Terego",lat:3.25,lon:30.85},
  {name:"Obongi",lat:3.52,lon:31.68},{name:"Koboko",lat:3.41,lon:30.96},
  {name:"Yumbe",lat:3.46,lon:31.24},{name:"Moyo",lat:3.65,lon:31.72},
  {name:"Adjumani",lat:3.37,lon:31.79},{name:"Maracha",lat:3.29,lon:30.74},
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const CROP_CALENDARS = {
  "Maize":{plant:[2,3,8,9],grow:[3,4,5,9,10,11],harvest:[5,6,11,12],tips:"Plant at start of rains. Space 75×25cm. Two seasons: Mar–Jun & Sep–Dec."},
  "Cassava":{plant:[2,3,4],grow:[3,4,5,6,7,8,9,10,11,12],harvest:[12,1,2],tips:"Plant cuttings 30cm long. Harvest after 9–18 months. Drought tolerant."},
  "Sweet Potato":{plant:[2,3,8,9],grow:[3,4,5,6,9,10,11,12],harvest:[5,6,11,12],tips:"Use vine cuttings. Mound beds. Ready in 3–4 months."},
  "Sorghum":{plant:[3,4,9],grow:[4,5,6,7,9,10,11],harvest:[7,8,12],tips:"Drought resistant. Plant 50×20cm. Good for drier areas."},
  "Millet":{plant:[3,4,9],grow:[4,5,6,9,10,11],harvest:[6,7,11,12],tips:"Direct seed. Thin to 20cm. Ready in 70–90 days."},
  "Groundnuts":{plant:[2,3,8,9],grow:[3,4,5,8,9,10],harvest:[5,6,11],tips:"Plant 45×15cm. Do not over-water at maturity. Two seasons possible."},
  "Beans":{plant:[2,3,8,9],grow:[3,4,5,9,10],harvest:[5,6,11],tips:"Bush beans 45×15cm. Needs well-drained soil. Fix nitrogen."},
  "Soybeans":{plant:[3,4,9],grow:[4,5,6,7,9,10,11],harvest:[7,8,12],tips:"Inoculate seeds. Plant 50×5cm. Ready in 90–120 days."},
  "Tomatoes":{plant:[1,2,7,8],grow:[2,3,4,8,9,10],harvest:[4,5,10,11],tips:"Nursery 4 weeks. Stake plants. Watch for blight. Irrigate in dry season."},
  "Onions":{plant:[10,11],grow:[11,12,1,2],harvest:[2,3],tips:"Dry season crop. Needs irrigation. Space 15×10cm. Cure before storage."},
};

const DISEASE_DB = {
  "yellowing leaves":{crop:"Multiple",disease:"Nitrogen Deficiency / Mosaic Virus",treatment:"Apply NPK fertilizer. Check for aphids transmitting virus. Remove infected plants.",severity:"medium"},
  "black spots":{crop:"Tomatoes/Beans",disease:"Early Blight / Angular Leaf Spot",treatment:"Apply copper-based fungicide. Improve air circulation. Avoid overhead watering.",severity:"high"},
  "wilting":{crop:"Multiple",disease:"Fusarium Wilt / Water Stress",treatment:"Check soil moisture. Apply fungicide drench. Remove severely infected plants.",severity:"high"},
  "white powder":{crop:"Cucurbits",disease:"Powdery Mildew",treatment:"Apply sulfur-based fungicide or baking soda solution. Reduce humidity.",severity:"medium"},
  "rotting stem":{crop:"Multiple",disease:"Stem Rot (Pythium/Rhizoctonia)",treatment:"Improve drainage. Apply Ridomil or Dithane M45. Avoid overwatering.",severity:"high"},
  "holes in leaves":{crop:"Cabbage/Kale",disease:"Diamondback Moth / Aphids",treatment:"Apply Neem oil or Karate 2.5%. Introduce natural predators. Use row covers.",severity:"medium"},
  "streaks on leaves":{crop:"Maize",disease:"Maize Streak Virus",treatment:"No cure. Remove infected plants. Control leafhoppers. Plant tolerant varieties.",severity:"critical"},
  "galls on roots":{crop:"Tomatoes/Beans",disease:"Root Knot Nematodes",treatment:"Rotate crops. Apply Nemacur. Add organic matter to soil.",severity:"high"},
};

const ANIMAL_DISEASES = {
  "Cattle":[
    {disease:"East Coast Fever",symptoms:"High fever, swollen lymph nodes, nasal discharge",treatment:"Buparvaquone injection. Tick control essential.",prevention:"Dip/spray fortnightly. Vaccinate."},
    {disease:"Foot and Mouth Disease",symptoms:"Blisters in mouth/feet, drooling, lameness",treatment:"No cure. Isolate animals. Supportive care.",prevention:"Vaccinate twice yearly."},
    {disease:"Blackleg",symptoms:"Sudden death, swollen leg, crepitus",treatment:"Penicillin if caught early.",prevention:"Annual vaccination."},
  ],
  "Goats":[
    {disease:"CCPP (Pleuropneumonia)",symptoms:"Coughing, fever, difficulty breathing",treatment:"Oxytetracycline injection.",prevention:"Vaccinate. Isolate new animals."},
    {disease:"PPR",symptoms:"Fever, sores in mouth, diarrhea",treatment:"No specific treatment. Supportive care.",prevention:"Vaccinate annually."},
  ],
  "Sheep":[
    {disease:"Sheep Pox",symptoms:"Skin lesions, fever, nasal discharge",treatment:"Supportive care. Isolate affected animals.",prevention:"Vaccinate annually."},
    {disease:"Foot Rot",symptoms:"Lameness, foul-smelling feet, swelling",treatment:"Zinc sulfate footbath. Oxytetracycline injection.",prevention:"Keep pens dry. Regular hoof trimming."},
  ],
  "Poultry":[
    {disease:"Newcastle Disease",symptoms:"Respiratory distress, green diarrhea, twisted neck",treatment:"No cure. Cull severely affected.",prevention:"Vaccinate every 3 months."},
    {disease:"Fowl Typhoid",symptoms:"Drowsiness, pale comb, greenish diarrhea",treatment:"Enrofloxacin in water.",prevention:"Good biosecurity. Vaccinate."},
  ],
  "Pigs":[
    {disease:"African Swine Fever",symptoms:"High fever, skin hemorrhage, sudden death",treatment:"No treatment. Report immediately.",prevention:"No vaccine. Strict biosecurity."},
    {disease:"Swine Dysentery",symptoms:"Bloody diarrhea, weight loss",treatment:"Tiamulin in feed/water.",prevention:"Clean housing. Rodent control."},
  ],
  "Rabbits":[
    {disease:"Rabbit Haemorrhagic Disease",symptoms:"Sudden death, bleeding from nose",treatment:"No cure. Vaccinate survivors.",prevention:"Vaccinate annually. Biosecurity."},
    {disease:"Coccidiosis",symptoms:"Diarrhea, weight loss, bloating",treatment:"Sulphonamides in water.",prevention:"Clean hutches. Avoid damp bedding."},
  ],
  "Fish":[
    {disease:"Bacterial Gill Disease",symptoms:"Gasping, pale gills, fish near surface",treatment:"Salt bath treatment. Improve aeration.",prevention:"Good water quality. Avoid overstocking."},
    {disease:"Ich (White Spot)",symptoms:"White spots on body, scratching on objects",treatment:"Raise water temperature. Malachite green treatment.",prevention:"Quarantine new fish. Monitor water quality."},
  ],
};

const MARKET_PRICES_BASE = {
  "Maize":{price:1200,unit:"kg",market:"Arua Main Market"},
  "Beans":{price:3500,unit:"kg",market:"Arua Main Market"},
  "Groundnuts":{price:4200,unit:"kg",market:"Nebbi Market"},
  "Cassava":{price:800,unit:"kg",market:"Zombo Market"},
  "Sorghum":{price:1100,unit:"kg",market:"Koboko Market"},
  "Sweet Potato":{price:600,unit:"kg",market:"Arua Main Market"},
  "Soybeans":{price:2800,unit:"kg",market:"Pakwach Market"},
  "Sesame":{price:6500,unit:"kg",market:"Arua Main Market"},
  "Sunflower":{price:2200,unit:"kg",market:"Nebbi Market"},
  "Tomatoes":{price:2000,unit:"kg",market:"Arua Main Market"},
  "Onions":{price:3000,unit:"kg",market:"Arua Main Market"},
  "Millet":{price:1500,unit:"kg",market:"Yumbe Market"},
  "Cabbage":{price:1800,unit:"head",market:"Arua Main Market"},
  "Eggplant":{price:1500,unit:"kg",market:"Arua Main Market"},
};

// ── STATE ─────────────────────────────────────────────
let currentDistrict = DISTRICTS[0];
let currentPrices = [];
let selectedSymptoms = [];
let selectedCrop = "Maize";
let currentAnimalTab = "Cattle";
const ANTHROPIC_KEY = ""; // Add your key here or use .env approach

// ── INIT ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadWeather();
  loadPrices();
  renderCropChips();
  renderCalendar("Maize");
  renderSymptomChips();
  renderAnimalTabs();
  renderAnimalDiseases("Cattle");
  renderAllDistricts();
  document.getElementById("weatherTime").textContent = new Date().toLocaleTimeString();
  setInterval(() => { loadPrices(); }, 45000);
});

// ── TAB SWITCHING ─────────────────────────────────────
function switchTab(name, btn) {
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("tab-" + name).classList.add("active");
  btn.classList.add("active");
}

// ── WEATHER ───────────────────────────────────────────
const weatherConditions = [
  {icon:"⛅",desc:"Partly Cloudy",temp:27,humidity:72,wind:12,rain:30},
  {icon:"🌧️",desc:"Light Rain",temp:23,humidity:88,wind:8,rain:85},
  {icon:"☀️",desc:"Sunny",temp:31,humidity:55,wind:15,rain:5},
  {icon:"⛈️",desc:"Thunderstorm",temp:21,humidity:95,wind:22,rain:95},
  {icon:"🌤️",desc:"Mostly Clear",temp:29,humidity:65,wind:10,rain:15},
];

function getSimWeather(district) {
  const idx = Math.floor((district.lat * 10 + new Date().getHours()) % weatherConditions.length);
  const c = weatherConditions[idx];
  const days = ["Mon","Tue","Wed","Thu","Fri"];
  const forecast = days.map((d,i) => ({
    day:d,
    icon:weatherConditions[(idx+i+1)%weatherConditions.length].icon,
    high:c.temp+Math.floor(Math.random()*4)-2,
    low:c.temp-6+Math.floor(Math.random()*3),
    rain:Math.floor(Math.random()*100)
  }));
  return {...c, forecast, district:district.name};
}

function loadWeather() {
  const w = getSimWeather(currentDistrict);
  document.getElementById("wTemp").textContent = w.temp + "°";
  document.getElementById("wDesc").textContent = w.desc;
  document.getElementById("wLoc").textContent = "📍 " + w.district + " District";
  document.getElementById("wIcon").textContent = w.icon;
  document.getElementById("wHumidity").textContent = w.humidity + "%";
  document.getElementById("wWind").textContent = w.wind + " km/h";
  document.getElementById("wRain").textContent = w.rain + "%";
  document.getElementById("wVis").textContent = (w.rain > 70 ? 3 : 10) + " km";
  document.getElementById("weatherTime").textContent = new Date().toLocaleTimeString();
  const fr = document.getElementById("forecastRow");
  fr.innerHTML = w.forecast.map(d => `
    <div class="forecast-day">
      <div class="forecast-day-label">${d.day}</div>
      <div class="forecast-emoji">${d.icon}</div>
      <div class="forecast-temp">${d.high}°/${d.low}°</div>
      <div class="forecast-rain">💧${d.rain}%</div>
    </div>
  `).join("");
  generateAdvisory(w);
}

async function generateAdvisory(w) {
  const el = document.getElementById("advisoryText");
  el.textContent = "Generating advisory...";
  try {
    const resp = await callClaude(`Weather in ${w.district}, West Nile Uganda: ${w.desc}, ${w.temp}°C, humidity ${w.humidity}%, rain chance ${w.rain}%. Give a 2-sentence practical farming advisory for today.`);
    el.textContent = resp;
  } catch {
    el.textContent = w.rain > 60
      ? "Rain expected — avoid spraying today. Good time to prepare planting beds."
      : "Good conditions for fieldwork. Check soil moisture before irrigation.";
  }
}

function renderAllDistricts() {
  const body = document.getElementById("allDistrictsBody");
  body.innerHTML = DISTRICTS.slice(0,8).map((d,i) => {
    const w = getSimWeather(d);
    return `<div class="district-row" onclick="selectDistrict(${i})">
      <span style="font-size:13px;font-weight:600">${d.name}</span>
      <span style="display:flex;align-items:center;gap:8px">
        <span style="font-size:16px">${w.icon}</span>
        <span style="font-size:13px;font-family:Space Mono,monospace;color:var(--sky)">${w.temp}°C</span>
        <span style="font-size:11px;color:var(--text3)">💧${w.rain}%</span>
      </span>
    </div>`;
  }).join("");
}

function selectDistrict(idx) {
  currentDistrict = DISTRICTS[idx];
  document.getElementById("districtSelect").value = idx;
  loadWeather();
}

function onDistrictChange() {
  const idx = parseInt(document.getElementById("districtSelect").value);
  currentDistrict = DISTRICTS[idx];
  loadWeather();
}

function useGPS() {
  if (!navigator.geolocation) return alert("GPS not available on this device.");
  navigator.geolocation.getCurrentPosition(pos => {
    const {latitude:lat, longitude:lon} = pos.coords;
    let nearest = DISTRICTS[0], minD = Infinity;
    DISTRICTS.forEach((d,i) => {
      const dist = Math.sqrt((d.lat-lat)**2+(d.lon-lon)**2);
      if (dist < minD) { minD=dist; nearest=d; }
    });
    const idx = DISTRICTS.indexOf(nearest);
    document.getElementById("districtSelect").value = idx;
    currentDistrict = nearest;
    loadWeather();
  }, () => alert("Could not get your location. Please select your district manually."));
}

// ── PRICES ────────────────────────────────────────────
function loadPrices() {
  const trends = [{sym:"↑",cls:"trend-up",label:"Rising"},{sym:"↓",cls:"trend-down",label:"Falling"},{sym:"→",cls:"trend-flat",label:"Stable"}];
  currentPrices = Object.entries(MARKET_PRICES_BASE).map(([crop,data]) => {
    const variation = (Math.random()*0.2-0.1)/10;
    const price = Math.round(data.price*(1+variation));
    const t = trends[Math.floor(Math.random()*3)];
    return {crop, price, unit:data.unit, market:data.market, trend:t};
  });
  renderPrices(currentPrices);
  document.getElementById("priceUpdateTime").textContent = "🔄 Updated · " + new Date().toLocaleTimeString() + " · AI collection active";
}

function renderPrices(prices) {
  document.getElementById("priceList").innerHTML = prices.map(p => `
    <div class="price-row">
      <div>
        <div class="price-crop">${p.crop}</div>
        <div class="price-market">📍 ${p.market}</div>
      </div>
      <div style="text-align:right">
        <div class="price-amount">UGX ${p.price.toLocaleString()}</div>
        <div class="price-unit">per ${p.unit}</div>
        <div class="price-trend ${p.trend.cls}">${p.trend.sym} ${p.trend.label}</div>
      </div>
    </div>
  `).join("");
}

function filterPrices(query) {
  const filtered = currentPrices.filter(p => p.crop.toLowerCase().includes(query.toLowerCase()));
  renderPrices(filtered);
}

// ── CALENDAR ──────────────────────────────────────────
function renderCropChips() {
  const container = document.getElementById("cropChips");
  container.innerHTML = Object.keys(CROP_CALENDARS).map(c => `
    <div class="crop-chip ${c===selectedCrop?'selected':''}" onclick="selectCrop('${c}')">${c}</div>
  `).join("");
}

function selectCrop(crop) {
  selectedCrop = crop;
  renderCropChips();
  renderCalendar(crop);
}

function renderCalendar(crop) {
  const cal = CROP_CALENDARS[crop];
  if (!cal) return;
  const monthLabels = MONTHS.map(m => `<div class="month-label">${m}</div>`).join("");
  const monthCells = MONTHS.map((_,i) => {
    const month = i+1;
    const cls = cal.harvest.includes(month)?"harvest":cal.plant.includes(month)?"plant":cal.grow.includes(month)?"grow":"";
    return `<div class="month-cell ${cls}"></div>`;
  }).join("");
  document.getElementById("calendarDisplay").innerHTML = `
    <div style="font-size:13px;font-weight:700;color:var(--green-light);margin-bottom:8px">${crop} — Annual Calendar</div>
    <div class="calendar-grid">${monthLabels}${monthCells}</div>
    <div class="legend">
      <div class="legend-item"><div class="legend-dot" style="background:var(--gold)"></div>Planting</div>
      <div class="legend-item"><div class="legend-dot" style="background:var(--green-mid)"></div>Growing</div>
      <div class="legend-item"><div class="legend-dot" style="background:var(--green-bright)"></div>Harvest</div>
      <div class="legend-item"><div class="legend-dot" style="background:var(--bg3)"></div>Off Season</div>
    </div>
    <div class="cal-tips">💡 <strong>Tips:</strong> ${cal.tips}</div>
  `;
}

// ── PLANT DOCTOR ──────────────────────────────────────
function renderSymptomChips() {
  document.getElementById("symptomChips").innerHTML = Object.keys(DISEASE_DB).map(s => `
    <div class="symptom-chip" onclick="toggleSymptom(this,'${s}')">${s}</div>
  `).join("");
}

function toggleSymptom(el, s) {
  if (selectedSymptoms.includes(s)) {
    selectedSymptoms = selectedSymptoms.filter(x => x !== s);
    el.classList.remove("selected");
  } else {
    selectedSymptoms.push(s);
    el.classList.add("selected");
  }
}

async function diagnose() {
  const input = document.getElementById("symptomInput").value;
  const symptoms = [...selectedSymptoms, input].filter(Boolean).join(", ");
  if (!symptoms) return alert("Please select or describe symptoms first.");
  document.getElementById("diagnoseBtn").disabled = true;
  document.getElementById("diagnosisLoading").style.display = "flex";
  document.getElementById("diagnosisResult").innerHTML = "";
  document.getElementById("aiDiagnosisResponse").style.display = "none";

  // Local DB check
  const key = Object.keys(DISEASE_DB).find(k => symptoms.toLowerCase().includes(k));
  if (key) {
    const d = DISEASE_DB[key];
    document.getElementById("diagnosisResult").innerHTML = `
      <div class="diagnosis-box ${d.severity}">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
          <div class="diagnosis-disease">${d.disease}</div>
          <span class="severity-badge sev-${d.severity}">${d.severity}</span>
        </div>
        <div style="font-size:11px;color:var(--text3)">Affects: ${d.crop}</div>
        <div class="diagnosis-label">💊 Treatment</div>
        <div class="diagnosis-text">${d.treatment}</div>
      </div>
    `;
  }

  try {
    const resp = await callClaude(`A farmer in West Nile, Uganda reports these plant symptoms: ${symptoms}. Diagnose the likely disease/pest and give: 1) Disease name 2) Cause 3) Immediate treatment steps using locally available products 4) Prevention for next season. Be practical for smallholder farmers.`);
    const el = document.getElementById("aiDiagnosisResponse");
    el.textContent = resp;
    el.style.display = "block";
  } catch {
    if (!key) {
      const el = document.getElementById("aiDiagnosisResponse");
      el.textContent = "AI unavailable. Please check your internet connection and try again.";
      el.style.display = "block";
    }
  }
  document.getElementById("diagnosisLoading").style.display = "none";
  document.getElementById("diagnoseBtn").disabled = false;
}

// ── LIVESTOCK ─────────────────────────────────────────
const animalIcons = {Cattle:"🐄",Goats:"🐐",Sheep:"🐑",Pigs:"🐷",Poultry:"🐔",Rabbits:"🐇",Fish:"🐟"};

function renderAnimalTabs() {
  document.getElementById("animalTabs").innerHTML = Object.keys(ANIMAL_DISEASES).map(a => `
    <div class="animal-tab ${a===currentAnimalTab?'active':''}" onclick="selectAnimal('${a}')">${animalIcons[a]||''} ${a}</div>
  `).join("");
}

function selectAnimal(animal) {
  currentAnimalTab = animal;
  renderAnimalTabs();
  renderAnimalDiseases(animal);
  document.getElementById("animalInput").placeholder = `Ask anything about ${animal}...`;
  document.getElementById("animalAiResponse").style.display = "none";
}

function renderAnimalDiseases(animal) {
  const diseases = ANIMAL_DISEASES[animal];
  if (!diseases) {
    document.getElementById("animalDiseases").innerHTML = `<div style="font-size:13px;color:var(--text3);padding:16px 0">Ask AI for ${animal} advice below.</div>`;
    return;
  }
  document.getElementById("animalDiseases").innerHTML = `
    <div style="font-size:12px;color:var(--text3);font-weight:600;margin-bottom:8px">COMMON DISEASES</div>
    ${diseases.map(d => `
      <div class="animal-disease-card">
        <div class="disease-name">⚠️ ${d.disease}</div>
        <div class="disease-section"><div class="disease-section-label">Symptoms</div><div class="disease-section-text">${d.symptoms}</div></div>
        <div class="disease-section"><div class="disease-section-label">Treatment</div><div class="disease-section-text">${d.treatment}</div></div>
        <div class="disease-section"><div class="disease-section-label">Prevention</div><div class="disease-section-text">${d.prevention}</div></div>
      </div>
    `).join("")}
  `;
}

async function askAnimalAI() {
  const query = document.getElementById("animalInput").value;
  if (!query) return alert("Please type your question first.");
  document.getElementById("animalBtn").disabled = true;
  document.getElementById("animalLoading").style.display = "flex";
  document.getElementById("animalAiResponse").style.display = "none";
  try {
    const resp = await callClaude(`A farmer in West Nile, Uganda asks about ${currentAnimalTab}: "${query}". Provide practical advice for smallholder farmers. Include local treatment options, dosages if relevant, and when to contact a vet.`);
    const el = document.getElementById("animalAiResponse");
    el.textContent = resp;
    el.style.display = "block";
  } catch {
    const el = document.getElementById("animalAiResponse");
    el.textContent = "AI unavailable. Please check your internet and try again.";
    el.style.display = "block";
  }
  document.getElementById("animalLoading").style.display = "none";
  document.getElementById("animalBtn").disabled = false;
}

// ── CLAUDE API ────────────────────────────────────────
async function callClaude(prompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: "You are AgriConnect's AI assistant, an expert in agriculture for West Nile region of Uganda. Give practical, actionable advice tailored to smallholder farmers. Be concise and clear.",
      messages: [{role:"user", content: prompt}]
    })
  });
  const data = await response.json();
  return data.content?.map(b => b.text||"").join("") || "No response received.";
}
</script>
</body>
</html>
