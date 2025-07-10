import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser, getAuthHeader, API_URL } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [assessmentType, setAssessmentType] = useState('as_hr_02');
  const [assessmentTypes, setAssessmentTypes] = useState([
    { id: 'as_hr_02', name: 'Health & Fitness Assessment' },
    { id: 'as_card_01', name: 'Cardiac Assessment' }
  ]);

  // Assessment session mapping
  const sessionMapping = {
    'as_hr_02': 'session_001',
    'as_card_01': 'session_002'
  };

  useEffect(() => {
    // In a real app, you would fetch assessment types from the backend
    const fetchAssessmentTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/report/assessment-types`, {
          headers: getAuthHeader()
        });
        setAssessmentTypes(response.data);
      } catch (err) {
        console.error('Error fetching assessment types:', err);
        // Fallback to default assessment types if API fails
      }
    };

    fetchAssessmentTypes();
    
    // Set the initial sessionId based on the default assessmentType
    setSessionId(sessionMapping[assessmentType]);
  }, [API_URL, getAuthHeader, assessmentType, sessionMapping]);

  const [generatedFilePath, setGeneratedFilePath] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setGeneratedFilePath(null);
    
    // Validate that a session has been selected
    if (!sessionId) {
      setError('Please select an assessment type first');
      return;
    }
    
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/report/generate-report`,
        { session_id: sessionId, assessment_type: assessmentType },
        { headers: getAuthHeader() }
      );

      if (response.data && response.data.filePath) {
        setSuccess(true);
        setGeneratedFilePath(response.data.filePath);
        // Navigate to the report view page
        setTimeout(() => {
          // Ensure the filePath is properly encoded for URL parameters
          const encodedFilePath = encodeURIComponent(response.data.filePath);
          navigate(`/view-report/${encodedFilePath}`);
        }, 1500);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error generating report:', err);
      setError(err.response?.data?.error || 'Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Keep the user on the same page during loading

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-900 m-0">Welcome, {currentUser?.name || currentUser?.username || 'User'}</h1>
      </div>

      {error && <div className="p-4 mb-6 bg-red-100 text-red-800 border border-red-200 rounded-md">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Report Generator */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="text-blue-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-indigo-900">Assessment Report Generator</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">Generate professional PDF reports from your assessment data</p>
            
            {success && (
              <div className="p-4 mb-6 bg-green-50 text-green-800 border border-green-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Report generated successfully!</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/view-report/${encodeURIComponent(generatedFilePath)}`)} 
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors flex items-center"
                    disabled={!generatedFilePath}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Report
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Health & Fitness Assessment Card */}
              <div className={`border rounded-lg p-4 cursor-pointer transition-all ${assessmentType === 'as_hr_02' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => {
                  setAssessmentType('as_hr_02');
                  setSessionId(sessionMapping['as_hr_02']);
                }}>
                <div className="flex items-center mb-2">
                  <div className="text-blue-600 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Health & Fitness</h4>
                </div>
                <p className="text-xs text-gray-600">Comprehensive analysis of overall fitness, body composition, and exercise performance</p>
              </div>
              
              {/* Cardiac Assessment Card */}
              <div className={`border rounded-lg p-4 cursor-pointer transition-all ${assessmentType === 'as_card_01' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => {
                  setAssessmentType('as_card_01');
                  setSessionId(sessionMapping['as_card_01']);
                }}>
                <div className="flex items-center mb-2">
                  <div className="text-red-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Cardiac Assessment</h4>
                </div>
                <p className="text-xs text-gray-600">Detailed heart health metrics including heart rate variability, blood pressure, and cardiac output</p>
                <div className="mt-3">
                  <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors">Cardiac Metrics</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Preview</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Heart Rate */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm text-gray-600 mb-2">Heart Rate</h4>
                <div className="text-3xl font-bold mb-1">{sessionId === 'session_001' ? '75' : sessionId === 'session_002' ? '68' : '75'}</div>
                <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full inline-block">Normal</div>
              </div>
              
              {/* Blood Pressure */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm text-gray-600 mb-2">Blood Pressure</h4>
                <div className="text-3xl font-bold mb-1">{sessionId === 'session_001' ? '124/82' : sessionId === 'session_002' ? '118/75' : '124/82'}</div>
                <div className={`text-xs px-2 py-1 ${sessionId === 'session_002' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} rounded-full inline-block`}>{sessionId === 'session_002' ? 'Normal' : 'High'}</div>
              </div>
              
              {/* Oxygen */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm text-gray-600 mb-2">Oxygen</h4>
                <div className="text-3xl font-bold mb-1">{sessionId === 'session_001' ? '96%' : sessionId === 'session_002' ? '98%' : '96%'}</div>
                <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full inline-block">Normal</div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button 
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center justify-center disabled:bg-blue-500 disabled:cursor-not-allowed"
                disabled={loading || !sessionId}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </div>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate PDF Report
                  </>
                )}
              </button>
              
              {generatedFilePath && (
                <button 
                  onClick={() => navigate(`/view-report/${encodeURIComponent(generatedFilePath)}`)}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Report
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Selected Assessment Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="text-gray-700 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Selected Assessment</h2>
          </div>
          
          {sessionId ? (
            <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">
                {assessmentType === 'as_hr_02' ? 'Health & Fitness Assessment' : 'Cardiac Assessment'}
              </h3>
              <p className="text-sm text-blue-700 mb-1">
                <span className="font-medium">Session ID:</span> {sessionId}
              </p>
              <p className="text-sm text-blue-700">
                <span className="font-medium">Assessment Type:</span> {assessmentType}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 text-sm mb-4">Please select an assessment type from the left panel</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;