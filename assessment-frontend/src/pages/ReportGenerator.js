import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ReportGenerator = () => {
  const { getAuthHeader, API_URL } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [sessionId, setSessionId] = useState('');
  const [assessmentType, setAssessmentType] = useState('as_hr_02');
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchAssessmentTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/report/assessment-types`, {
          headers: getAuthHeader()
        });
        setAssessmentTypes(response.data);
      } catch (err) {
        console.error('Error fetching assessment types:', err);
        // Fallback to default assessment type if API fails
        setAssessmentTypes([{ id: 'as_hr_02', name: 'Health Risk Assessment' }]);
      }
    };

    fetchAssessmentTypes();
  }, [API_URL, getAuthHeader]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/report/generate-report`,
        { session_id: sessionId, assessment_type: assessmentType },
        { headers: getAuthHeader() }
      );

      if (response.data && response.data.filePath) {
        setSuccess('Report generated successfully!');
        setTimeout(() => {
          navigate(`/view-report${response.data.filePath}`);
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Generate Health Assessment Report</h2>
        
        {error && <div className="p-4 mb-6 bg-red-100 text-red-800 border border-red-200 rounded-md">{error}</div>}
        {success && <div className="p-4 mb-6 bg-green-100 text-green-800 border border-green-200 rounded-md">{success}</div>}
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-6">
            <label htmlFor="sessionId" className="block mb-2 font-medium text-gray-700">Session ID</label>
            <input
              type="text"
              id="sessionId"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:border-indigo-800 focus:ring-2 focus:ring-indigo-100 outline-none transition-colors"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="Enter session ID"
              required
            />
            <small className="block mt-1 text-gray-500 text-sm">Enter the unique identifier for the assessment session.</small>
          </div>
          
          <div className="mb-6">
            <label htmlFor="assessmentType" className="block mb-2 font-medium text-gray-700">Assessment Type</label>
            <select
              id="assessmentType"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:border-indigo-800 focus:ring-2 focus:ring-indigo-100 outline-none transition-colors"
              value={assessmentType}
              onChange={(e) => setAssessmentType(e.target.value)}
              required
            >
              {assessmentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <small className="block mt-1 text-gray-500 text-sm">Select the type of assessment report to generate.</small>
          </div>
          
          <div className="flex justify-end gap-4 mt-8">
            <button 
              type="button" 
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors disabled:opacity-65 disabled:cursor-not-allowed"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 bg-indigo-800 hover:bg-indigo-900 text-white font-medium rounded-md transition-colors disabled:opacity-65 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </form>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-5">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Available Test Sessions</h3>
          <p className="text-gray-700 mb-3">For demonstration purposes, you can use the following session IDs:</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li><strong className="font-semibold">session123</strong> - Complete health assessment data</li>
            <li><strong className="font-semibold">session456</strong> - Partial health assessment data</li>
            <li><strong className="font-semibold">session789</strong> - Minimal health assessment data</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;