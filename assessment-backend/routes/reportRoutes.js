const express = require("express");
const router = express.Router();
const { generateReport, getAssessmentTypes, getFieldMappings } = require("../controllers/reportController");

router.post("/generate-report", generateReport);
router.get("/assessment-types", getAssessmentTypes);
router.get("/field-mappings/:assessmentType", getFieldMappings);

module.exports = router;
