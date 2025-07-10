import { useState } from 'react';

/**
 * Custom hook for handling form state and validation
 * 
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function (optional)
 * @param {Function} onSubmit - Submit handler function
 * @returns {Object} Form state and handlers
 */
const useForm = (initialValues, validate, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form if validation function is provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      // Don't submit if there are validation errors
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      // You can handle submission errors here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  // Set a specific field value
  const setFieldValue = (field, value) => {
    setValues({
      ...values,
      [field]: value
    });
  };

  // Set a specific field error
  const setFieldError = (field, error) => {
    setErrors({
      ...errors,
      [field]: error
    });
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError
  };
};

export default useForm;