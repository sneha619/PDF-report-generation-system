// utils/configHelper.js
const reportConfigs = require('../config/reportConfigs');
const getValueByPath = require('./getValueByPath');

/**
 * Get classification for a given metric value
 * @param {string} metricName - Name of the metric
 * @param {number} value - Value to classify
 * @returns {object} Classification object with color, label, etc.
 */
function getClassification(metricName, value) {
    const ranges = reportConfigs.classificationRanges[metricName];
    if (!ranges) return { label: 'Unknown', color: '#6b7280' };
    
    for (const [key, range] of Object.entries(ranges)) {
        if (value >= range.min && value <= range.max) {
            return range;
        }
    }
    
    return { label: 'Out of Range', color: '#6b7280' };
}

/**
 * Extract dynamic field values from session data
 * @param {object} sessionData - Raw session data
 * @param {array} fieldNames - Array of field names to extract
 * @returns {object} Object with extracted values
 */
function extractFieldValues(sessionData, fieldNames) {
    const result = {};
    
    fieldNames.forEach(fieldName => {
        const fieldPath = reportConfigs.fieldMappings[fieldName];
        if (fieldPath) {
            result[fieldName] = getValueByPath(sessionData, fieldPath);
        }
    });
    
    return result;
}

/**
 * Generate metric bar HTML for visualization
 * @param {string} metricName - Name of the metric
 * @param {number} value - Current value
 * @param {number} maxValue - Maximum value for the bar
 * @returns {string} HTML string for metric bar
 */
function generateMetricBar(metricName, value, maxValue = 100) {
    const classification = getClassification(metricName, value);
    const percentage = Math.min((value / maxValue) * 100, 100);
    
    return `
        <div class="metric-bar" style="background: #f3f4f6; height: 8px; border-radius: 4px; margin-top: 8px; overflow: hidden;">
            <div class="metric-indicator" style="background: ${classification.color}; height: 100%; width: ${percentage}%; transition: width 0.3s ease;"></div>
        </div>
    `;
}

/**
 * Generate status badge HTML
 * @param {string} metricName - Name of the metric
 * @param {number} value - Current value
 * @returns {string} HTML string for status badge
 */
function generateStatusBadge(metricName, value) {
    const classification = getClassification(metricName, value);
    
    return `
        <span style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: ${classification.color}20; color: ${classification.color};">
            ${classification.label}
        </span>
    `;
}

/**
 * Process template with dynamic data
 * @param {string} template - HTML template string
 * @param {object} sessionData - Session data
 * @param {string} assessmentType - Type of assessment
 * @returns {string} Processed HTML
 */
function processTemplate(template, sessionData, assessmentType = 'as_hr_02') {
    const config = reportConfigs.assessmentTypes[assessmentType];
    if (!config) {
        throw new Error(`Assessment type ${assessmentType} not found in configuration`);
    }
    
    let processedTemplate = template;
    
    // Extract all field values
    const allFields = Object.keys(reportConfigs.fieldMappings);
    const fieldValues = extractFieldValues(sessionData, allFields);
    
    // Replace placeholders with actual values
    Object.entries(fieldValues).forEach(([fieldName, value]) => {
        const placeholder = new RegExp(`{{${fieldName}}}`, 'g');
        processedTemplate = processedTemplate.replace(placeholder, value || 'N/A');
    });
    
    // Generate dynamic metric bars and status badges
    const metricsWithBars = ['heartRate', 'respirationRate', 'bpSys', 'bpDia'];
    metricsWithBars.forEach(metricName => {
        const value = fieldValues[metricName];
        if (value) {
            const barPlaceholder = new RegExp(`{{${metricName}_bar}}`, 'g');
            const statusPlaceholder = new RegExp(`{{${metricName}_status}}`, 'g');
            
            processedTemplate = processedTemplate.replace(barPlaceholder, generateMetricBar(metricName, value));
            processedTemplate = processedTemplate.replace(statusPlaceholder, generateStatusBadge(metricName, value));
        }
    });
    
    return processedTemplate;
}

module.exports = {
    getClassification,
    extractFieldValues,
    generateMetricBar,
    generateStatusBadge,
    processTemplate
};