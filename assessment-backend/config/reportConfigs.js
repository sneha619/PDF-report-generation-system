// config/reportConfigs.js
module.exports = {
    // Assessment Type Configurations
    assessmentTypes: {
        as_hr_02: {
            name: "Comprehensive Health Report",
            template: "report-template.html",
            sections: [
                "header",
                "healthScore", 
                "keyBodyVitals",
                "bodyComposition",
                "exerciseResults",
                "advancedMetrics",
                "glucoseMetrics"
            ]
        },
        as_card_01: {
            name: "Basic Cardiovascular Report",
            template: "report-template.html",
            sections: [
                "header",
                "healthScore",
                "keyBodyVitals",
                "bodyComposition",
                "exerciseResults"
            ]
        }
    },

    // Dynamic Field Mappings
    fieldMappings: {
        // Patient Information
        patientName: "patientName",
        entry_time: "vitalsMap.entry_time",
        gender: "gender",
        age: "bodyCompositionData.Age",
        height: "height",
        weight: "weight",
        sessionId: "session_id",
        employee_id: "vitalsMap.employee_id",
        assessmentId: "assessment_id",
        api_key: "vitalsMap.api_key",
        
        // Health Metrics
        healthScore: "accuracy",
        assessmentScore: "accuracy",
        heartRate: "vitalsMap.vitals.heart_rate",
        respirationRate: "vitalsMap.vitals.resp_rate",
        bpSys: "vitalsMap.vitals.bp_sys",
        bpDia: "vitalsMap.vitals.bp_dia",
        oxygenSaturation: "vitalsMap.vitals.oxy_sat_prcnt",
        wellnessScore: "vitalsMap.wellness_score",
        riskScore: "vitalsMap.health_risk_score",
        healthRiskScore: "vitalsMap.health_risk_score",
        
        // Body Composition
        bmi: "bodyCompositionData.BMI",
        bodyFat: "vitalsMap.metadata.physiological_scores.bodyfat",
        leanMass: "bodyCompositionData.LM",
        fatMass: "bodyCompositionData.FM",
        bmr: "bodyCompositionData.BMR",
        metabolicAge: "bodyCompositionData.M_Age",
        whr: "bodyCompositionData.WHR",
        
        // Exercise Data
        jogTestTime: "exercises[?(@.id==235)].setList[0].time",
        jogTestName: "exercises[?(@.id==235)].name",
        squatReps: "exercises[?(@.id==259)].correctReps",
        squatName: "exercises[?(@.id==259)].name",
        postureAnalysisFrontal: "exercises[?(@.id==73)].name",
        postureAnalysisSide: "exercises[?(@.id==74)].name",
        postureFrontalScore: "exercises[?(@.id==73)].analysisScore",
        postureSideScore: "exercises[?(@.id==74)].analysisScore",
        postureFrontalAnalysis: "exercises[?(@.id==73)].analysisList",
        postureSideAnalysis: "exercises[?(@.id==74)].analysisList",
        postureFrontalTips: "exercises[?(@.id==73)].tipsList",
        postureSideTips: "exercises[?(@.id==74)].tipsList",
        flexibilityTest: "exercises[?(@.id==281)].name",
        flexibilityDistance: "exercises[?(@.id==281)].setList[0].additionalFields[?(@.fieldName=='Distance')].fieldValue",
        
        // Advanced Metrics
        wellnessScore: "vitalsMap.wellness_score",
        vo2Max: "vitalsMap.metadata.physiological_scores.vo2max",
        stressIndex: "vitalsMap.metadata.heart_scores.stress_index",
        heartRateVariability: "vitalsMap.metadata.heart_scores.rmssd",
        cardiacOutput: "vitalsMap.metadata.cardiovascular.cardiac_out",
        bloodVolume: "vitalsMap.metadata.physiological_scores.bloodvolume",
        totalBodyWater: "vitalsMap.metadata.physiological_scores.tbw",
        
        // Glucose and Diabetes
        hba1c: "vitalsMap.metadata.glucose_info.hba1c",
        diabetesControlScore: "vitalsMap.metadata.glucose_info.diabetes_control_score",
        
        // Time and Duration
        timeElapsed: "timeElapsed",
        scanCompletionTime: "vitalsMap.scan_completion_time"
    },

    // Classification Ranges
    classificationRanges: {
        healthScore: {
            excellent: { min: 90, max: 100, color: "#10b981", label: "Excellent" },
            good: { min: 80, max: 89, color: "#22c55e", label: "Good" },
            fair: { min: 70, max: 79, color: "#eab308", label: "Fair" },
            poor: { min: 0, max: 69, color: "#ef4444", label: "Poor" }
        },
        heartRate: {
            low: { min: 0, max: 59, color: "#3b82f6", label: "Low" },
            normal: { min: 60, max: 100, color: "#10b981", label: "Normal" },
            high: { min: 101, max: 200, color: "#ef4444", label: "High" }
        },
        respirationRate: {
            low: { min: 0, max: 11, color: "#3b82f6", label: "Low" },
            normal: { min: 12, max: 20, color: "#10b981", label: "Normal" },
            high: { min: 21, max: 50, color: "#ef4444", label: "High" }
        },
        bpSys: {
            low: { min: 0, max: 89, color: "#3b82f6", label: "Low" },
            normal: { min: 90, max: 119, color: "#10b981", label: "Normal" },
            elevated: { min: 120, max: 129, color: "#eab308", label: "Elevated" },
            high: { min: 130, max: 200, color: "#ef4444", label: "High" }
        },
        bpDia: {
            low: { min: 0, max: 59, color: "#3b82f6", label: "Low" },
            normal: { min: 60, max: 79, color: "#10b981", label: "Normal" },
            elevated: { min: 80, max: 89, color: "#eab308", label: "Elevated" },
            high: { min: 90, max: 150, color: "#ef4444", label: "High" }
        },
        bmi: {
            underweight: { min: 0, max: 18.4, color: "#3b82f6", label: "Underweight" },
            normal: { min: 18.5, max: 24.9, color: "#10b981", label: "Normal" },
            overweight: { min: 25, max: 29.9, color: "#eab308", label: "Overweight" },
            obese: { min: 30, max: 50, color: "#ef4444", label: "Obese" }
        },
        bodyFat: {
            low: { min: 0, max: 14, color: "#3b82f6", label: "Low" },
            normal: { min: 15, max: 24, color: "#10b981", label: "Normal" },
            high: { min: 25, max: 50, color: "#ef4444", label: "High" }
        }
    },

    // Report Section Configurations
    sectionConfigs: {
        header: {
            fields: ["patientName", "assessmentDate", "gender", "age", "height", "weight", "sessionId"],
            template: "header-section"
        },
        healthScore: {
            fields: ["healthScore", "wellnessScore", "healthRiskScore"],
            template: "health-score-section",
            showClassification: true
        },
        keyBodyVitals: {
            fields: ["heartRate", "respirationRate", "bpSys", "bpDia", "oxygenSaturation"],
            template: "vitals-section",
            showClassification: true,
            showMetricBars: true
        },
        bodyComposition: {
            fields: ["bmi", "bodyFat", "leanMass", "fatMass", "bmr", "metabolicAge", "whr"],
            template: "composition-section",
            showClassification: true
        },
        exerciseResults: {
            fields: ["jogTestName", "jogTestTime", "squatName", "squatReps", "flexibilityTest", "flexibilityDistance"],
            template: "exercise-section",
            showClassification: false
        },
        advancedMetrics: {
            fields: ["vo2Max", "stressIndex", "heartRateVariability", "cardiacOutput", "bloodVolume", "totalBodyWater"],
            template: "advanced-section",
            showClassification: false
        },
        glucoseMetrics: {
            fields: ["hba1c", "diabetesControlScore"],
            template: "glucose-section",
            showClassification: false
        }
    },

    // Legacy configurations for backward compatibility
    as_hr_02: {
        sections: [
            "Overall Health Score",
            "Key Body Vitals", 
            "Fitness Levels",
            "Body Composition"
        ],
        fieldMappings: {
            "Overall Health Score": "accuracy",
            "Heart Rate": "vitalsMap.vitals.heart_rate",
            "Blood Pressure Systolic": "vitalsMap.vitals.bp_sys",
            "Blood Pressure Diastolic": "vitalsMap.vitals.bp_dia",
            "Cardiovascular Endurance": "exercises[?(@.id==235)].setList[0].time",
            "BMI": "bodyCompositionData.BMI",
            "Body Fat": "bodyCompositionData.BFC",
            "Wellness Score": "vitalsMap.wellness_score"
        }
    },
    as_card_01: {
        sections: [
            "Key Body Vitals",
            "Cardiovascular Endurance", 
            "Body Composition"
        ],
        fieldMappings: {
            "Heart Rate": "vitalsMap.vitals.heart_rate",
            "Cardiovascular Endurance": "exercises[?(@.id==235)].setList[0].time",
            "BMI": "bodyCompositionData.BMI"
        }
    }
};
