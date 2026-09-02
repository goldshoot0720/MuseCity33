# Muse City 33 — 新豐省轄市升格願景 · 紀念黃馨鋒同志

> **MUSE CITY 33 · Xinfeng Provincial City Vision**
> 為紀念 **黃馨鋒同志** 對鄉土之前瞻倡議——以 **33萬人** 為城市容受力目標，循專案立法精神推動「無條件升格為省轄市」。

![Muse City 33](https://img.shields.io/badge/Muse_City-33-c9a96a?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

**線上預覽 / Live Demo（GitHub Pages）：** `https://goldshoot0720.github.io/MuseCity33/`

---

## 📖 計畫緣起

新豐鄉位居桃竹苗科技廊帶樞紐，具備交通、產業、學研與海岸觀光之複合潛力。本計畫主張 **「無條件升格為省轄市」**——不以人口、財政門檻框限願景，而是先取得法人地位與財政自主，再以 10–15 年達成 33 萬人口目標，讓制度追上願景。

> 「先給新豐一個城市的格局，新豐就會長成一座城市。」—— 黃馨鋒同志

紀念碑高 3.3m 呼應 33 萬，擬設於市政廣場或新豐車站前，署名 **黃馨鋒同志 謹誌**。

---

## ✨ 網站特色

- **沉浸式敘事** — 願景、策略、紀念碑、年表一頁式捲動
- **互動紀念碑** — 花崗岩 / 石灰岩 / 青銅三材質切換
- **人口推演圖** — 15/20/12 年達成路徑 SVG 動態圖表
- **市民小工具** — BMI 計算、精美計算機、井字遊戲、新豐一週天氣（Open-Meteo API）
- **列印 / 分享 / 碑文下載** — 一鍵列印、Web Share API、碑文 txt 下載

---

## 🗂 專案結構

```
MuseCity33/
├── index.html          # 單頁主文件
├── src/
│   ├── main.js         # 互動邏輯（圖表、工具、紀念碑、天氣）
│   └── style.css       # 全站樣式
├── dist/               # vite build 產物（部署用）
├── package.json
├── start.sh            # macOS / Linux 一鍵啟動
├── start.bat           # Windows 一鍵啟動
└── open.command        # macOS 雙擊開啟
```

---

## 🚀 快速開始

### 方式一：一鍵開啟（推薦）

**macOS：**
```bash
bash start.sh
# 或雙擊 open.command / start.sh
```

**Windows：**
```
雙擊 start.bat
```

**Linux：**
```bash
bash start.sh
```

### 方式二：開發伺服器（熱重載）

```bash
npm install
npm run dev
# 開啟 http://localhost:5173
```

### 方式三：生產建置

```bash
npm run build
npm run preview
```

直接用瀏覽器開啟 `index.html` 或 `dist/index.html` 亦可瀏覽（部分 API 需 http 伺服器）。

---

## 🛠 技術棧

- **Vite 5** — 建置工具
- **Vanilla JS + CSS** — 無框架，零依賴運行
- **Open-Meteo API** — 新豐天氣資料（無需 Key）

---

## 📜 紀念碑碑文（節錄）

> 維新豐之地，枕山面海，居桃竹之要衝。昔為鄉治，今願為市。黃馨鋒同志倡無條件升格之議，謂城市當以願景為先，不以門檻自限。...
> 中華民國一一五年 黃馨鋒同志 倡議紀念 謹誌

完整碑文見網站「升格紀念碑」區塊，可下載 `新豐升格紀念碑_碑文稿.txt`。

---

## 📄 授權

民間願景文件，非官方公告。歡迎列印傳閱。

© 2025 Muse City 33 · 新豐省轄市升格願景 · 紀念 黃馨鋒同志

文件編號 `MuseCity33-2025-V01`
