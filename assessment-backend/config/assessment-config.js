// Server-side configuration for different assessment types

/**
 * Helper function to get nested value from object using path string
 * @param {Object} obj - The object to traverse
 * @param {string} path - Dot-separated path string (e.g., "vitalsMap.vitals.heart_rate")
 * @returns {*} The value at the specified path or undefined
 */
export function getValueByPath(obj, path) {
  const keys = path.split(".")
  return keys.reduce((o, key) => {
    if (o === null || o === undefined) return undefined

    // Handle array access with index
    if (key.includes("[") && key.includes("]")) {
      const arrayName = key.split("[")[0]
      const index = Number.parseInt(key.split("[")[1].split("]")[0])
      return o[arrayName] ? o[arrayName][index] : undefined
    }

    return o[key]
  }, obj)
}

/**
 * Helper function to find exercise by ID
 * @param {Array} exercises - Array of exercise objects
 * @param {number} id - Exercise ID to find
 * @returns {Object|undefined} Exercise object or undefined if not found
 */
export function findExerciseById(exercises, id) {
  return exercises.find((exercise) => exercise.id === id)
}

// Configuration for different assessment types
export const assessmentConfigs = {
  // Health & Fitness Assessment
  as_hr_02: {
    title: "Health & Fitness Assessment",
    sections: [
      {
        title: "Overall Health Score",
        fields: [
          {
            path: "accuracy",
            label: "Overall Health Score",
            unit: "%",
            formatter: (value) => {
              const score = Number.parseFloat(value)
              return score ? score.toFixed(1) : "N/A"
            },
          },
        ],
        classificationRanges: [
          {
            field: "accuracy",
            ranges: [
              { min: 0, max: 40, label: "Poor", color: "red" },
              { min: 40, max: 60, label: "Fair", color: "yellow" },
              { min: 60, max: 80, label: "Good", color: "blue" },
              { min: 80, max: 100, label: "Excellent", color: "green" },
            ],
          },
        ],
      },
      {
        title: "Key Body Vitals",
        fields: [
          { path: "vitalsMap.vitals.heart_rate", label: "Heart Rate", unit: "bpm" },
          { path: "vitalsMap.vitals.bp_sys", label: "Blood Pressure (Systolic)", unit: "mmHg" },
          { path: "vitalsMap.vitals.bp_dia", label: "Blood Pressure (Diastolic)", unit: "mmHg" },
          { path: "vitalsMap.vitals.oxy_sat_prcnt", label: "Oxygen Saturation", unit: "%" },
          { path: "vitalsMap.vitals.resp_rate", label: "Respiratory Rate", unit: "breaths/min" },
        ],
        classificationRanges: [
          {
            field: "vitalsMap.vitals.heart_rate",
            ranges: [
              { min: 0, max: 60, label: "Low", color: "blue" },
              { min: 60, max: 100, label: "Normal", color: "green" },
              { min: 100, max: 999, label: "High", color: "red" },
            ],
          },
          {
            field: "vitalsMap.vitals.bp_sys",
            ranges: [
              { min: 0, max: 120, label: "Normal", color: "green" },
              { min: 120, max: 140, label: "Elevated", color: "yellow" },
              { min: 140, max: 999, label: "High", color: "red" },
            ],
          },
          {
            field: "vitalsMap.vitals.bp_dia",
            ranges: [
              { min: 0, max: 80, label: "Normal", color: "green" },
              { min: 80, max: 90, label: "Elevated", color: "yellow" },
              { min: 90, max: 999, label: "High", color: "red" },
            ],
          },
        ],
      },
      {
        title: "Heart Health",
        fields: [
          { path: "vitalsMap.metadata.heart_scores.stress_index", label: "Stress Index" },
          { path: "vitalsMap.metadata.heart_scores.sdnn", label: "SDNN", unit: "ms" },
          { path: "vitalsMap.metadata.heart_scores.rmssd", label: "RMSSD", unit: "ms" },
          { path: "vitalsMap.metadata.heart_scores.pNN50_per", label: "pNN50", unit: "%" },
        ],
      },
      {
        title: "Stress Level",
        fields: [
          {
            path: "vitalsMap.metadata.heart_scores.stress_index",
            label: "Stress Index",
            formatter: (value) => {
              const num = Number.parseFloat(value)
              if (num <= 1.5) return "Low"
              if (num <= 3.0) return "Moderate"
              return "High"
            },
          },
        ],
      },
      {
        title: "Fitness Levels",
        fields: [
          {
            path: "exercises",
            label: "Cardiovascular Endurance",
            formatter: (exercises) => {
              const jogTest = findExerciseById(exercises, 235)
              return jogTest ? `${jogTest.setList[0].time} seconds` : "N/A"
            },
          },
          {
            path: "exercises",
            label: "Strength",
            formatter: (exercises) => {
              const squatTest = findExerciseById(exercises, 259)
              return squatTest ? `${squatTest.correctReps} reps` : "N/A"
            },
          },
          {
            path: "exercises",
            label: "Flexibility",
            formatter: (exercises) => {
              const flexTest = findExerciseById(exercises, 281)
              if (!flexTest) return "N/A"
              const distanceField = flexTest.setList[0]?.additionalFields?.find((f) => f.fieldName === "Distance")
              return distanceField ? `${Number.parseFloat(distanceField.fieldValue).toFixed(1)} cm` : "N/A"
            },
          },
        ],
      },
      {
        title: "Posture",
        fields: [
          {
            path: "exercises",
            label: "Frontal View Analysis",
            formatter: (exercises) => {
              const frontalView = findExerciseById(exercises, 73)
              return frontalView && frontalView.analysisList
                ? frontalView.analysisList.join("; ")
                : "No analysis available"
            },
          },
          {
            path: "exercises",
            label: "Side View Analysis",
            formatter: (exercises) => {
              const sideView = findExerciseById(exercises, 74)
              return sideView && sideView.analysisList ? sideView.analysisList.join("; ") : "No analysis available"
            },
          },
        ],
      },
      {
        title: "Body Composition",
        fields: [
          { path: "bodyCompositionData.BMI", label: "BMI" },
          { path: "bodyCompositionData.BFC", label: "Body Fat %", unit: "%" },
          { path: "bodyCompositionData.FM", label: "Fat Mass", unit: "kg" },
          { path: "bodyCompositionData.LM", label: "Lean Mass", unit: "kg" },
          { path: "bodyCompositionData.BMR", label: "Basal Metabolic Rate", unit: "kcal/day" },
        ],
        classificationRanges: [
          {
            field: "bodyCompositionData.BMI",
            ranges: [
              { min: 0, max: 18.5, label: "Underweight", color: "blue" },
              { min: 18.5, max: 25, label: "Normal", color: "green" },
              { min: 25, max: 30, label: "Overweight", color: "yellow" },
              { min: 30, max: 999, label: "Obese", color: "red" },
            ],
          },
        ],
      },
    ],
  },

  // Cardiac Assessment
  as_card_01: {
    title: "Cardiac Assessment",
    sections: [
      {
        title: "Overall Health Score",
        fields: [
          {
            path: "accuracy",
            label: "Cardiac Health Score",
            unit: "%",
            formatter: (value) => {
              const score = Number.parseFloat(value)
              return score ? score.toFixed(1) : "N/A"
            },
          },
        ],
        classificationRanges: [
          {
            field: "accuracy",
            ranges: [
              { min: 0, max: 30, label: "Critical", color: "red" },
              { min: 30, max: 50, label: "Poor", color: "yellow" },
              { min: 50, max: 70, label: "Fair", color: "blue" },
              { min: 70, max: 100, label: "Good", color: "green" },
            ],
          },
        ],
      },
      {
        title: "Key Body Vitals",
        fields: [
          { path: "vitalsMap.vitals.heart_rate", label: "Heart Rate", unit: "bpm" },
          { path: "vitalsMap.vitals.bp_sys", label: "Blood Pressure (Systolic)", unit: "mmHg" },
          { path: "vitalsMap.vitals.bp_dia", label: "Blood Pressure (Diastolic)", unit: "mmHg" },
          { path: "vitalsMap.vitals.oxy_sat_prcnt", label: "Oxygen Saturation", unit: "%" },
          { path: "vitalsMap.metadata.cardiovascular.cardiac_out", label: "Cardiac Output", unit: "L/min" },
          { path: "vitalsMap.metadata.cardiovascular.map", label: "Mean Arterial Pressure", unit: "mmHg" },
        ],
      },
      {
        title: "Cardiovascular Endurance",
        fields: [
          {
            path: "exercises",
            label: "Jog Test Duration",
            formatter: (exercises) => {
              const jogTest = findExerciseById(exercises, 235)
              return jogTest ? `${jogTest.setList[0].time} seconds` : "N/A"
            },
          },
          { path: "vitalsMap.metadata.physiological_scores.vo2max", label: "VO2 Max", unit: "ml/kg/min" },
          { path: "vitalsMap.metadata.heart_scores.HRMax", label: "Maximum Heart Rate", unit: "bpm" },
          { path: "vitalsMap.metadata.heart_scores.HRR", label: "Heart Rate Reserve", unit: "bpm" },
        ],
      },
      {
        title: "Body Composition",
        fields: [
          { path: "bodyCompositionData.BMI", label: "BMI" },
          { path: "bodyCompositionData.BFC", label: "Body Fat %", unit: "%" },
          { path: "bodyCompositionData.WHR", label: "Waist-Hip Ratio" },
        ],
      },
    ],
  },
}

/**
 * Get configuration for an assessment type
 * @param {string} assessmentId - The assessment type ID
 * @returns {Object} Assessment configuration object
 * @throws {Error} If configuration for assessment type is not found
 */
export function getAssessmentConfig(assessmentId) {
  const config = assessmentConfigs[assessmentId]
  if (!config) {
    throw new Error(`Configuration for assessment type ${assessmentId} not found`)
  }
  return config
}
