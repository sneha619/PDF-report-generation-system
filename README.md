# 📄 PDF Report Generation System

A full-stack web application for secure user authentication and flexible PDF report generation based on pre-existing assessment data. Designed to support multiple assessment types with no code changes — only config updates!

---
Deployed link - https://pdf-report-generation-system.onrender.com

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- 📄 PDF generation from existing `session_id` data
- 🧩 Dynamic config-based report generation
- 💾 No DB setup — reads from `data/data.js`
- 💼 Supports multiple assessment types
- 🧠 Configuration-driven design for:
  - Template structure
  - Sections and titles
  - Field mappings (JSON path)
  - Value classification ranges

---

## 📁 Project Structure

PDF-report-generation-system/
├── assessment-backend/ # Backend root
│ ├── config/ # Config files (reportConfigs.js, etc.)
│ ├── controllers/ # reportController.js, authController.js
│ ├── data/ # Pre-existing data file (data.js)
│ ├── middleware/ # Auth middlewares (e.g., verifyToken.js)
│ ├── reports/ # Generated PDFs saved here
│ ├── routes/ # Routes (authRoutes.js, reportRoutes.js)
│ ├── templates/ # HTML templates per assessment
│ ├── utils/ # Utilities (generatePDF.js, getValueByPath.js)
│ └── server.js # Express entry point
│ └── package.json
│ └── .env # JWT_SECRET, etc.
│
├── assessment-frontend/ # Frontend root
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # Auth context
│ │ ├── hooks/ # Custom hooks (useAuth, etc.)
│ │ ├── pages/ # Pages (Login, Signup, Dashboard)
│ │ ├── services/ # API interaction (Axios config)
│ │ ├── utils/ # Frontend helpers
│ │ ├── App.js
│ │ └── index.js
│ └── tailwind.config.js
│ └── package.json
│
└── README.md

---

## 🧾 Sample Data Format (`data/data.js`)

``js
module.exports = [
  {
    session_id: "abc123",
    assessment_id: "as_hr_02",
    user: { name: "Sneha", age: 27 },
    vitals: { hr: 78, bp: "120/80" }
  },
  {
    session_id: "xyz789",
    assessment_id: "mental_health_01",
    user: { name: "Sneha" },
    mental: {
      stress_level: "Moderate",
      anxiety_score: 18,
      sleep_quality: "Poor",
      summary: "Signs of elevated stress"
    }
  }
];
``
⚙️ Configuration Structure (config/reportConfigs.js)
``
exports.assessmentTypes = {
  mental_health_01: {
    name: "Mental Health Assessment",
    template: "mental_health_01.html",
    sections: ["stress", "anxiety", "sleep", "summary"]
  },
  as_hr_02: {
    name: "Health & Fitness Assessment",
    template: "as_hr_02.html",
    sections: ["heart_rate", "blood_pressure"]
  }
};
``
✅ Section Configs

``
exports.sectionConfigs = {
  stress: { title: "Stress Level", showCharts: false },
  anxiety: { title: "Anxiety Score" },
  sleep: { title: "Sleep Quality" },
  summary: { title: "Conclusion" },
  heart_rate: { title: "Heart Rate" },
  blood_pressure: { title: "Blood Pressure" }
};
``
✅ Field Mappings
``
exports.fieldMappings = {
  mental_health_01: {
    stress: "mental.stress_level",
    anxiety: "mental.anxiety_score",
    sleep: "mental.sleep_quality",
    summary: "mental.summary"
  },
  as_hr_02: {
    heart_rate: "vitals.hr",
    blood_pressure: "vitals.bp"
  }
};
``
✅ Value Classification Ranges (Optional)

``
exports.classificationRanges = {
  anxiety_score: { low: [0, 10], moderate: [11, 20], high: [21, 30] },
  hr: { normal: [60, 100], elevated: [101, 120], high: [121, 200] }
};
``
📡 API Endpoints
🔐 Authentication
POST /api/auth/signup — Register new users

POST /api/auth/login — Authenticate existing users

📝 Report Generation
POST /generate-report?session_id=abc123
→ Generates PDF from existing session
→ Saves it in reports/ folder

📦 Installation

# Backend setup
cd assessment-backend
npm install
npm start

# Frontend setup
cd ../assessment-frontend
npm install
npm run dev

📌 Tech Stack

🟨 Node.js + Express

📄 Puppeteer for PDF generation

🔐 JWT for auth

⚛️ React.js

💨 Tailwind CSS

| Feature                    | Required | Implemented via        |
| -------------------------- | -------- | ---------------------- |
| User Authentication        | ✅        | JWT, Auth Routes       |
| PDF Report API             | ✅        | `/generate-report`     |
| Assessment Config System   | ✅        | `reportConfigs.js`     |
| Session-based PDF Creation | ✅        | `session_id` logic     |
| No Code Change Needed      | ✅        | Config-based templates |

