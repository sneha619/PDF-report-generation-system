const data = require("../data/data");
const configs = require("../config/reportConfigs");
const getValueByPath = require("../utils/getValueByPath");
const generatePDF = require("../utils/generatePDF");
const configHelper = require("../utils/configHelper");
const fs = require("fs");
const path = require("path");

exports.generateReport = async (req, res) => {
  try {
    const { session_id, assessment_type = 'as_hr_02' } = req.body;
    const record = data.find(d => d.session_id === session_id);
    if (!record) return res.status(404).json({ error: "Session not found" });

    // Get assessment configuration
    const assessmentConfig = configs.assessmentTypes?.[assessment_type];
    if (!assessmentConfig) {
      return res.status(400).json({ error: `Assessment type ${assessment_type} not supported` });
    }

    // Ensure reports directory exists
    const reportsDir = path.join(__dirname, "../reports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Read HTML template
    const templatePath = path.join(__dirname, "../templates", assessmentConfig.template);
    let html = fs.readFileSync(templatePath, 'utf8');

    // Process template with dynamic configuration
    html = configHelper.processTemplate(html, record, assessment_type);

    const pdfFilename = `${assessment_type}_${session_id}_${Date.now()}.pdf`;
    await generatePDF(html, pdfFilename);
    
    // Create a URL for the frontend to access
    const filePath = `/reports/${pdfFilename}`;
    res.json({ 
      success: true, 
      message: "PDF generated", 
      filePath,
      assessmentType: assessment_type,
      reportName: assessmentConfig.name
    });
  } catch (error) {
    console.error("Report generation error:", error);
    res.status(500).json({ error: "Failed to generate report: " + error.message });
  }
};

// New endpoint to get available assessment types
exports.getAssessmentTypes = (req, res) => {
  try {
    const types = Object.entries(configs.assessmentTypes || {}).map(([key, config]) => ({
      id: key,
      name: config.name,
      sections: config.sections
    }));
    
    // Return just the array of types for frontend compatibility
    res.json(types);
  } catch (error) {
    console.error('Error getting assessment types:', error);
    res.status(500).json({ error: 'Failed to get assessment types' });
  }
};

// New endpoint to get field mappings and configurations
exports.getFieldMappings = (req, res) => {
  try {
    const { assessmentType } = req.params;
    const config = configs.assessmentTypes?.[assessmentType];
    
    if (!config) {
      return res.status(404).json({ error: 'Assessment type not found' });
    }
    
    res.json({ 
      success: true, 
      fieldMappings: configs.fieldMappings || {},
      classificationRanges: configs.classificationRanges || {},
      sectionConfigs: configs.sectionConfigs || {}
    });
  } catch (error) {
    console.error('Error getting field mappings:', error);
    res.status(500).json({ error: 'Failed to get field mappings' });
  }
};
