# 📄 Configurable PDF Report Generation System with User Authentication

This project is a full-stack web application that includes:

✅ A secure **User Authentication System**  
✅ A flexible, configuration-driven **PDF Report Generation System**  
✅ Support for **multiple assessment types** without code modifications

---

## 🚀 Features

### 🔐 User Authentication
- User Signup with form validation
- Secure Login with JWT authentication
- Auth-protected endpoints
- Built with **Node.js (Express)** + **React.js** + **Tailwind CSS**

### 🧾 PDF Report Generation
- Read assessment data from a static `data.js` file
- Generate reports based on `session_id`
- Automatically detect assessment type using `assessment_id`
- Dynamically generate HTML reports based on configurations
- Convert HTML to PDF using **Puppeteer**
- Save generated PDFs to local `/reports` folder

---

## 🏗️ Project Structure

assessment-management-system/
│
├── assessment-backend/                  # Backend root
│   ├── config/                          # Configuration-driven files (reportConfigs.js, etc.)
│   ├── controllers/                     # reportController.js, authController.js
│   ├── data/                            # data.js — pre-existing assessment data
│   ├── middleware/                      # auth middleware (e.g., verifyToken.js)
│   ├── reports/                         # Generated PDF output files
│   ├── routes/                          # Route definitions (reportRoutes.js, authRoutes.js)
│   ├── templates/                       # HTML templates per assessment
│   ├── utils/                           # Helpers like generatePDF.js, getValueByPath.js
│   ├── server.js                        # Express server entry point
│   ├── package.json
│   └── package-lock.json
│
├── assessment-frontend/                # Frontend root
│   ├── public/
│   ├── src/
│   │   ├── components/                  # Reusable components (e.g., InputField, AuthForm)
│   │   ├── context/                     # AuthContext for global state
│   │   ├── hooks/                       # Custom hooks (e.g., useAuth)
│   │   ├── pages/                       # Page-level components (Login, Signup, Dashboard)
│   │   ├── services/                    # API interaction logic (axios config)
│   │   ├── utils/                       # Frontend helpers
│   │   ├── App.js
│   │   └── index.js
│   ├── tailwind.config.js
│   └── package.json
│
├── README.md
└── .env                                # For sensitive data like JWT_SECRET, DB configs


---

## 📁 Sample Data Structure (`data/data.js`)

``js
module.exports = [
  {
    session_id: "abc123",
    assessment_id: "as_hr_02",
    user: {
      name: "Sneha",
      age: 27
    },
    vitals: {
      hr: 78,
      bp: "120/80"
    }
  },
  {
    session_id: "xyz789",
    assessment_id: "mental_health_01",
    user: {
      name: "Sneha"
    },
    mental: {
      stress_level: "Moderate",
      anxiety_score: 18,
      sleep_quality: "Poor",
      summary: "Signs of elevated stress"
    }
  }
];
``
✅ Add a New Assessment Type:
``
In config/reportConfigs.js:
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
✅ Configure Sections:
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
✅ Configure Field Mappings:
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
✅ Configure Classification Ranges (Optional):
``
exports.classificationRanges = {
  anxiety_score: {
    low: [0, 10],
    moderate: [11, 20],
    high: [21, 30]
  },
  hr: {
    normal: [60, 100],
    elevated: [101, 120],
    high: [121, 200]
  }
};
``
🔃 API Endpoints
POST /api/auth/signup

Register a new user-
{
  "name": "Sneha",
  "email": "sneha@example.com",
  "password": "password123"
}

POST /api/auth/login

Login existing user-
{
  "email": "sneha@example.com",
  "password": "password123"
}

Response:
{
  "token": "JWT_TOKEN"
}

POST /api/report/generate

Generate a report from session data-

Authorization: Bearer <JWT_TOKEN>
Body:
{
  "session_id": "abc123"
}
Response:
{
  "success": true,
  "message": "PDF generated",
  "filePath": "/reports/as_hr_02_abc123_1720512345987.pdf"
}

GET /api/report/assessment-types
Returns all available assessment types from config

GET /api/report/config/:assessmentType
Returns configuration (sections, mappings) for a given type

🧪 How to Test
1.Register and Login through the frontend or Postman

2.Call /generate-report with a valid session_id

3.Go to /backend/reports folder

4.Open the generated PDF file

🧰 Tech Stack:

Frontend: React.js + Tailwind CSS
Backend: Node.js + Express.js
Authentication: JWT
PDF Conversion: Puppeteer
Data Source: Static JavaScript file (data.js)

📝 Setup Instructions:

Backend Setup-
cd backend
npm install
node server.js

Frontend Setup-
cd frontend
npm install
npm start

| Flexibility Feature          | Configurable |
| ---------------------------- | ------------ |
| Add new report types         | ✅ Yes        |
| Change report sections       | ✅ Yes        |
| Map new fields dynamically   | ✅ Yes        |
| Adjust classification ranges | ✅ Yes        |
| Use different HTML templates | ✅ Yes        |

✅ No backend code changes are needed when adding new assessment types
