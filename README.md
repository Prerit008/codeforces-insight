


# **Codeforces Insight** <img src="https://avatars.githubusercontent.com/u/80686842?v=4" width="45" align="right" alt="Prerit Agarwal">

A modern, interactive dashboard to visualize Codeforces user statistics using clean UI components, beautiful charts, and real-time data from the **Codeforces API**.

Built with **React + Vite**, styled using **TailwindCSS**, and enhanced with **FontAwesome** icons.

---

## 🚀 **Features**

### 📊 **Comprehensive User Statistics**

* Rating history visualization
* Contest participation analytics
* Verdict distribution chart
* Language usage breakdown
* Problem tags analysis
* Heatmap of problem attempts
* Unsolved problems section

### ⚡ **Tech Highlights**

* **React (Vite)** for fast development
* **TailwindCSS** for modern, responsive UI
* **FontAwesome** for icons
* **Codeforces API** for live data
* Modular and reusable UI components

---

## 📁 **Project Structure**

```
📦 Codeforces Insight
┣ 📂public
┃ ┗ 📜output.css
┣ 📂src
┃ ┣ 📂components
┃ ┃ ┣ 📜ContestStats.jsx
┃ ┃ ┣ 📜HeatMap.jsx
┃ ┃ ┣ 📜LanguageChart.jsx
┃ ┃ ┣ 📜RatingChart.jsx
┃ ┃ ┣ 📜TagChart.jsx
┃ ┃ ┣ 📜UnsolvedProblems.jsx
┃ ┃ ┣ 📜UserStats.jsx
┃ ┃ ┗ 📜VerdictChart.jsx
┃ ┣ 📜App.jsx
┃ ┣ 📜index.css
┃ ┗ 📜main.jsx
┣ 📜.gitignore
┣ 📜eslint.config.js
┣ 📜index.html
┣ 📜package.json
┣ 📜README.md
┗ 📜vite.config.js
```

Each component handles a specific visualization or dataset from Codeforces.

---

## 🛠️ **Setup & Installation**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/prerit008/codeforces-insight.git
cd codeforces-insight
```

### 2️⃣ Install dependencies

```bash
npm install
```
---

## 🎨 **TailwindCSS Setup**

This project uses the **Tailwind CLI** to compile the CSS.

### Run Tailwind in watch mode:

```bash
npx @tailwindcss/cli -i ./src/index.css -o ./public/output.css --watch
```

This will continuously generate your `output.css` whenever changes are detected.

---


### 3️⃣ Start development server

```bash
npm run dev
```

### 4️⃣ Build for production

```bash
npm run build
```

---

## 🔧 **Configuration**

The app uses the **Codeforces public API**, so **no API key** is required.

You only need to enter a **Codeforces handle** in the input field to load stats.

---

## 🖼️ **Components Overview**

| Component              | Description                           |
| ---------------------- | ------------------------------------- |
| `UserStats.jsx`        | Basic user profile information        |
| `RatingChart.jsx`      | Line chart of rating history          |
| `ContestStats.jsx`     | Contest participation and performance |
| `HeatMap.jsx`          | Activity heatmap                      |
| `LanguageChart.jsx`    | Programming language usage            |
| `TagChart.jsx`         | Problem tag distribution              |
| `VerdictChart.jsx`     | Verdict analysis (OK, WA, TLE, etc.)  |
| `UnsolvedProblems.jsx` | List of unsolved problems             |

---

## 🎨 **Styling & Icons**

* **TailwindCSS** is used for layout, responsiveness, and utility-first styling.
* **FontAwesome** provides icons for UI enhancement.

---

## 🤝 **Contributing**

Contributions are welcome!
Feel free to open issues or submit PRs for bug fixes, features, or improvements.

---

## ⭐ **License**

This project is licensed under the **MIT License**.



