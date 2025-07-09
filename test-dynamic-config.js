// Test script to demonstrate dynamic configuration system
const configHelper = require('./assessment-backend/utils/configHelper');
const reportConfigs = require('./assessment-backend/config/reportConfigs');
const data = require('./assessment-backend/data/data');

console.log('=== Dynamic Configuration System Test ===\n');

// Test 1: Get available assessment types
console.log('1. Available Assessment Types:');
if (reportConfigs.assessmentTypes) {
    Object.entries(reportConfigs.assessmentTypes).forEach(([key, config]) => {
        console.log(`   - ${key}: ${config.name}`);
        console.log(`     Template: ${config.template}`);
        console.log(`     Sections: ${config.sections.join(', ')}\n`);
    });
} else {
    console.log('   No assessment types configured\n');
}

// Test 2: Field mappings
console.log('2. Available Field Mappings:');
if (reportConfigs.fieldMappings) {
    Object.entries(reportConfigs.fieldMappings).forEach(([field, path]) => {
        console.log(`   ${field}: ${path}`);
    });
    console.log('');
} else {
    console.log('   No field mappings configured\n');
}

// Test 3: Classification ranges
console.log('3. Classification Ranges:');
if (reportConfigs.classificationRanges) {
    Object.entries(reportConfigs.classificationRanges).forEach(([metric, ranges]) => {
        console.log(`   ${metric}:`);
        Object.entries(ranges).forEach(([category, range]) => {
            console.log(`     ${category}: ${range.min}-${range.max} (${range.label})`);
        });
        console.log('');
    });
} else {
    console.log('   No classification ranges configured\n');
}

// Test 4: Dynamic field extraction
console.log('4. Dynamic Field Extraction Test:');
if (data && data.length > 0) {
    const testSession = data[0];
    console.log(`   Using session: ${testSession.session_id}`);
    
    const testFields = ['patientName', 'healthScore', 'heartRate', 'bmi'];
    const extractedValues = configHelper.extractFieldValues(testSession, testFields);
    
    console.log('   Extracted values:');
    Object.entries(extractedValues).forEach(([field, value]) => {
        console.log(`     ${field}: ${value}`);
    });
    console.log('');
} else {
    console.log('   No test data available\n');
}

// Test 5: Classification test
console.log('5. Classification Test:');
const testValues = {
    heartRate: 75,
    bmi: 22.5,
    healthScore: 85
};

Object.entries(testValues).forEach(([metric, value]) => {
    const classification = configHelper.getClassification(metric, value);
    console.log(`   ${metric} (${value}): ${classification.label} (${classification.color})`);
});

console.log('\n=== Test Complete ===');