# Dynamic Configuration System Guide

This guide explains how to use the dynamic configuration system for health assessment reports. The system allows you to add new assessment types, modify field mappings, and update classification ranges without changing any code.

## Overview

The dynamic configuration system consists of:

1. **Assessment Types Configuration** - Define different types of reports
2. **Field Mappings** - Map template placeholders to data paths
3. **Classification Ranges** - Define health metric ranges and their labels
4. **Section Configurations** - Configure report sections and their behavior

## Configuration Files

### Main Configuration: `assessment-backend/config/reportConfigs.js`

This file contains all configuration settings:

```javascript
module.exports = {
    // Assessment type definitions
    assessmentTypes: { ... },
    
    // Dynamic field mappings
    fieldMappings: { ... },
    
    // Classification ranges for metrics
    classificationRanges: { ... },
    
    // Section configurations
    sectionConfigs: { ... }
};
```

## Adding New Assessment Types

To add a new assessment type, update the `assessmentTypes` section:

```javascript
assessmentTypes: {
    // Existing types...
    
    new_assessment_type: {
        name: "Custom Assessment Report",
        template: "custom-template.html",
        sections: ["header", "customSection1", "customSection2"]
    }
}
```

### Required Properties:
- `name`: Display name for the assessment
- `template`: HTML template file name (must exist in `templates/` folder)
- `sections`: Array of section identifiers

## Field Mappings

Field mappings connect template placeholders to data paths in the session data:

```javascript
fieldMappings: {
    // Basic patient info
    patientName: "name",
    age: "age",
    
    // Nested data paths
    heartRate: "vitalsMap.vitals.heart_rate",
    
    // Array queries (using JSONPath-like syntax)
    exerciseTime: "exercises[?(@.id==235)].setList[0].time"
}
```

### Supported Path Formats:
- Simple paths: `"field"`
- Nested paths: `"parent.child.field"`
- Array queries: `"array[?(@.property==value)].field"`

## Classification Ranges

Define health metric ranges and their visual representation:

```javascript
classificationRanges: {
    heartRate: {
        low: { min: 0, max: 59, color: "#3b82f6", label: "Low" },
        normal: { min: 60, max: 100, color: "#10b981", label: "Normal" },
        high: { min: 101, max: 200, color: "#ef4444", label: "High" }
    }
}
```

### Range Properties:
- `min`: Minimum value (inclusive)
- `max`: Maximum value (inclusive)
- `color`: Hex color code for visual representation
- `label`: Display label for the range

## Template Placeholders

The system supports dynamic placeholders in HTML templates:

### Basic Placeholders:
```html
{{fieldName}} - Replaced with actual field value
```

### Dynamic Status Badges:
```html
{{fieldName_status}} - Generates colored status badge based on classification
```

### Dynamic Metric Bars:
```html
{{fieldName_bar}} - Generates visual metric bar with current value position
```

## API Endpoints

The system provides REST endpoints for configuration access:

### Get Assessment Types
```
GET /api/reports/assessment-types
```

Response:
```json
{
    "success": true,
    "assessmentTypes": [
        {
            "id": "as_hr_02",
            "name": "Comprehensive Health Report",
            "sections": ["header", "healthScore", "keyBodyVitals"]
        }
    ]
}
```

### Get Field Mappings
```
GET /api/reports/field-mappings/:assessmentType
```

Response:
```json
{
    "success": true,
    "fieldMappings": { ... },
    "classificationRanges": { ... },
    "sectionConfigs": { ... }
}
```

### Generate Report
```
POST /api/reports/generate-report
```

Request:
```json
{
    "session_id": "session_001",
    "assessment_type": "as_hr_02"
}
```

## Usage Examples

### Example 1: Adding a New Metric

1. Add field mapping:
```javascript
fieldMappings: {
    // ... existing mappings
    bloodSugar: "vitalsMap.vitals.blood_sugar"
}
```

2. Add classification ranges:
```javascript
classificationRanges: {
    // ... existing ranges
    bloodSugar: {
        low: { min: 0, max: 70, color: "#3b82f6", label: "Low" },
        normal: { min: 71, max: 140, color: "#10b981", label: "Normal" },
        high: { min: 141, max: 300, color: "#ef4444", label: "High" }
    }
}
```

3. Use in template:
```html
<div>Blood Sugar: {{bloodSugar}} mg/dL</div>
<div>Status: {{bloodSugar_status}}</div>
{{bloodSugar_bar}}
```

### Example 2: Creating a Custom Assessment Type

1. Create template file: `templates/pediatric-template.html`

2. Add assessment type:
```javascript
assessmentTypes: {
    pediatric_assessment: {
        name: "Pediatric Health Assessment",
        template: "pediatric-template.html",
        sections: ["header", "growth", "development"]
    }
}
```

3. Add specific field mappings:
```javascript
fieldMappings: {
    // ... existing mappings
    height: "measurements.height",
    weight: "measurements.weight",
    growthPercentile: "growth.percentile"
}
```

## Best Practices

1. **Naming Conventions**:
   - Use camelCase for field names
   - Use descriptive names for assessment types
   - Use consistent color schemes for similar metrics

2. **Data Validation**:
   - Always provide fallback values in templates
   - Test field mappings with actual data
   - Validate classification ranges don't overlap incorrectly

3. **Performance**:
   - Keep field mappings simple when possible
   - Avoid deeply nested array queries
   - Cache configuration data when needed

4. **Maintenance**:
   - Document custom field mappings
   - Version control configuration changes
   - Test new configurations thoroughly

## Troubleshooting

### Common Issues:

1. **Field returns null/undefined**:
   - Check field mapping path syntax
   - Verify data structure matches expected path
   - Add fallback values in template

2. **Classification not working**:
   - Ensure ranges don't have gaps
   - Check min/max values are correct
   - Verify metric name matches exactly

3. **Template not found**:
   - Check template file exists in `templates/` folder
   - Verify file name matches configuration
   - Ensure proper file permissions

### Testing Configuration:

Use the test script to validate your configuration:

```bash
node test-dynamic-config.js
```

This will show:
- Available assessment types
- Field mappings
- Classification ranges
- Sample field extraction
- Classification examples

## Migration Guide

To migrate from hardcoded to dynamic configuration:

1. Identify all hardcoded field mappings in your code
2. Move them to `fieldMappings` section
3. Replace direct data access with `configHelper.extractFieldValues()`
4. Update templates to use dynamic placeholders
5. Test thoroughly with existing data

This system provides complete flexibility for managing health assessment reports through configuration alone, enabling rapid deployment of new assessment types and metrics without code changes.