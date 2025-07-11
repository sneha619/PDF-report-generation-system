/**
 * Utility functions for handling route parameters with special characters like slashes
 */

/**
 * Encodes a file path for safe use in URL parameters
 * This prevents issues with slashes in file paths breaking route matching
 * 
 * @param {string} filePath - The file path to encode
 * @returns {string} - URL-safe encoded file path
 */
export const encodeFilePathForUrl = (filePath) => {
  return encodeURIComponent(filePath);
};

/**
 * Decodes a file path from URL parameters
 * 
 * @param {string} encodedFilePath - The encoded file path from URL parameters
 * @returns {string} - Original file path
 */
export const decodeFilePathFromUrl = (encodedFilePath) => {
  return decodeURIComponent(encodedFilePath);
};

/**
 * Example usage:
 * 
 * // In the component that navigates to the report view
 * import { encodeFilePathForUrl } from '../utils/routeHelpers';
 * 
 * const handleViewReport = () => {
 *   navigate(`/view-report/${encodeFilePathForUrl(filePath)}`);
 * };
 * 
 * // In the ViewReport component
 * import { decodeFilePathFromUrl } from '../utils/routeHelpers';
 * 
 * const ViewReport = () => {
 *   const { filePath } = useParams();
 *   const decodedFilePath = decodeFilePathFromUrl(filePath);
 *   // Use decodedFilePath to construct the full URL
 * };
 */