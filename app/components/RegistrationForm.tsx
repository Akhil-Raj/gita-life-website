"use client";

import { useState, useEffect } from 'react';

interface FormData {
  name: string;
  gender: 'male' | 'female' | 'other' | '';
  whatsappExtension: string;
  whatsappNumber: string;
  schoolOrganization: string;
  contactExtension: string;
  contactNumber: string;
  isWhatsappSameAsContact: boolean;
}

interface FormErrors {
  name?: string;
  gender?: string;
  whatsappNumber?: string;
  contactNumber?: string;
  schoolOrganization?: string;
}

interface RegistrationFormProps {
  onClose: () => void;
}

interface Notification {
  message: string;
  type: 'success' | 'error';
}

export default function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    whatsappExtension: '+91',
    whatsappNumber: '',
    schoolOrganization: '',
    contactExtension: '+1',
    contactNumber: '',
    isWhatsappSameAsContact: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000); // Dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation (only letters, spaces, and basic punctuation)
    if (!/^[a-zA-Z\s'.,-]{2,50}$/.test(formData.name.trim())) {
      newErrors.name = 'Name should be 2-50 characters long and contain only letters';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    // WhatsApp number validation (10 digits)
    if (!/^\d{10}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'WhatsApp number should be exactly 10 digits';
    }

    // Contact number validation (if different from WhatsApp)
    if (!formData.isWhatsappSameAsContact) {
      if (!formData.contactNumber) {
        newErrors.contactNumber = 'Contact number is required';
      } else if (!/^\d{10}$/.test(formData.contactNumber)) {
        newErrors.contactNumber = 'Contact number should be exactly 10 digits';
      }
    }

    // School/Organization validation (allow letters, numbers, spaces, and basic punctuation)
    const schoolOrgTrimmed = formData.schoolOrganization.trim();
    if (!schoolOrgTrimmed) {
      newErrors.schoolOrganization = 'School/Organization is required';
    } else if (!/^[a-zA-Z0-9\s'.,-]{2,100}$/.test(schoolOrgTrimmed)) {
      newErrors.schoolOrganization = 'Please enter a valid school or organization name (2-100 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Clear error when field is being edited
    setErrors(prev => ({ ...prev, [name]: undefined }));

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prevData => ({
        ...prevData,
        [name]: checked,
        ...(name === 'isWhatsappSameAsContact' && checked
          ? { contactNumber: prevData.whatsappNumber, contactExtension: prevData.whatsappExtension }
          : {}),
      }));
    } else if (name === 'whatsappNumber' || name === 'contactNumber') {
      // Only allow digits in phone number fields
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prevData => ({
        ...prevData,
        [name]: sanitizedValue,
        ...(name === 'whatsappNumber' && prevData.isWhatsappSameAsContact
          ? { contactNumber: sanitizedValue }
          : {}),
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
        ...(name.includes('whatsapp') && prevData.isWhatsappSameAsContact
          ? {
              contactNumber: name === 'whatsappNumber' ? value : prevData.contactNumber,
              contactExtension: name === 'whatsappExtension' ? value : prevData.contactExtension,
            }
          : {}),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('/api/submit-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({
          message: 'Registration successful! Thank you for registering.',
          type: 'success'
        });
        console.log('Registration successful');
        // Delay the close action to allow the notification to be visible
        setTimeout(() => {
          onClose();
        }, 2000); // Wait 2 seconds before closing
      } else {
        const errorData = await response.json();
        setNotification({
          message: 'Registration failed. Please try again later.',
          type: 'error'
        });
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      setNotification({
        message: 'An error occurred while submitting the form. Please try again later.',
        type: 'error'
      });
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      {notification && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg max-w-md z-[10000] ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
          role="alert"
        >
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p>{notification.message}</p>
            <button
              onClick={() => setNotification(null)}
              className="ml-auto pl-3"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm">
        <div 
          className="bg-white rounded-xl w-full max-w-2xl relative shadow-2xl transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2 backdrop-blur-sm transition-all duration-300 z-10 shadow-lg"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header Section */}
          <div className="bg-saffron text-white p-6 rounded-t-xl">
            <h2 className="text-2xl font-bold">Event Registration</h2>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-800 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Gender Field */}
              <div>
                <label htmlFor="gender" className="block mb-2 text-gray-800 font-medium">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* WhatsApp Number Field */}
              <div>
                <label htmlFor="whatsappNumber" className="block mb-2 text-gray-800 font-medium">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <select
                    id="whatsappExtension"
                    name="whatsappExtension"
                    value={formData.whatsappExtension}
                    onChange={handleChange}
                    className="w-28 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <input
                    type="tel"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    required
                    className={`flex-1 px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300 ${
                      errors.whatsappNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.whatsappNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>
                )}
              </div>

              {/* Checkbox for same number */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isWhatsappSameAsContact"
                  checked={formData.isWhatsappSameAsContact}
                  onChange={handleChange}
                  className="w-4 h-4 text-saffron border-gray-300 rounded focus:ring-saffron"
                />
                <label className="ml-2 text-gray-700">
                  WhatsApp number is same as contact number
                </label>
              </div>

              {/* Contact Number Field (conditional) */}
              {!formData.isWhatsappSameAsContact && (
                <div>
                  <label htmlFor="contactNumber" className="block mb-2 text-gray-800 font-medium">
                    Contact Number / Alternate Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <select
                      id="contactExtension"
                      name="contactExtension"
                      value={formData.contactExtension}
                      onChange={handleChange}
                      className="w-28 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                      className={`flex-1 px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300 ${
                        errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
                  )}
                </div>
              )}

              {/* School/Organization Field */}
              <div>
                <label htmlFor="schoolOrganization" className="block mb-2 text-gray-800 font-medium">
                  School/Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="schoolOrganization"
                  name="schoolOrganization"
                  value={formData.schoolOrganization}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300 ${
                    errors.schoolOrganization ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.schoolOrganization && (
                  <p className="text-red-500 text-sm mt-1">{errors.schoolOrganization}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-saffron text-white rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
