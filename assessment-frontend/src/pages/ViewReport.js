import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { decodeFilePathFromUrl } from '../utils/routeHelpers';

const ViewReport = () => {
  const { filePath } = useParams();
  const { API_URL } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Decode the file path using our utility function
  const decodedFilePath = decodeFilePathFromUrl(filePath);
  
  // Construct the full URL to the PDF
  // Remove '/api' from the API_URL to get the base URL
  const baseUrl = API_URL.replace('/api', '');
  const pdfUrl = `${baseUrl}${decodedFilePath}`;
  
  useEffect(() => {
    // Check if the PDF exists
    const checkPdfExists = async () => {
      try {
        const response = await fetch(pdfUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`PDF not found (${response.status})`);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error checking PDF:', err);
        setError('The requested report could not be found. It may have been deleted or moved.');
        setLoading(false);
      }
    };
    
    checkPdfExists();
  }, [pdfUrl]);
  
  const handleBackClick = () => {
    navigate('/dashboard');
  };
  
  const handleDownloadClick = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    
    // Extract filename from the path
    const filename = decodedFilePath.split('/').pop();
    link.download = filename;
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto h-screen">
        <div className="flex justify-center items-center p-8 text-indigo-800 font-medium">Loading report...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto h-screen">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Error Loading Report</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button onClick={handleBackClick} className="px-6 py-3 bg-indigo-800 hover:bg-indigo-900 text-white font-medium rounded-md transition-colors">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4 bg-white rounded-lg shadow-sm p-4">
        <button onClick={handleBackClick} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors">
          Back to Dashboard
        </button>
        <button onClick={handleDownloadClick} className="px-4 py-2 bg-indigo-800 hover:bg-indigo-900 text-white font-medium rounded-md transition-colors">
          Download PDF
        </button>
      </div>
      
      <div className="flex-grow bg-white rounded-lg shadow-md overflow-hidden">
        <iframe 
          src={`${pdfUrl}#view=FitH`} 
          title="Health Assessment Report"
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </div>
  );
};

export default ViewReport;