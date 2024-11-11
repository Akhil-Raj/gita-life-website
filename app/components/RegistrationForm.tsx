import { useState } from 'react';

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

export default function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    whatsappExtension: '+91',
    whatsappNumber: '',
    schoolOrganization: '',
    contactExtension: '+91',
    contactNumber: '',
    isWhatsappSameAsContact: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

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
      return; // Don't submit if validation fails
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
        console.log('Registration successful');
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Show error message to user
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Show error message to user
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Event Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-gray-800">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded text-gray-700 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-1 text-gray-800">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded text-gray-700"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="whatsappNumber" className="block mb-1 text-gray-800">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                id="whatsappExtension"
                name="whatsappExtension"
                value={formData.whatsappExtension}
                onChange={handleChange}
                className="w-24 px-3 py-2 border rounded text-gray-700"
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
                className={`flex-1 px-3 py-2 border rounded text-gray-700 ${
                  errors.whatsappNumber ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.whatsappNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="flex items-center text-gray-800">
              <input
                type="checkbox"
                name="isWhatsappSameAsContact"
                checked={formData.isWhatsappSameAsContact}
                onChange={handleChange}
                className="mr-2"
              />
              WhatsApp number is same as contact number
            </label>
          </div>
          {!formData.isWhatsappSameAsContact && (
            <div className="mb-4">
              <label htmlFor="contactNumber" className="block mb-1 text-gray-800">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  id="contactExtension"
                  name="contactExtension"
                  value={formData.contactExtension}
                  onChange={handleChange}
                  className="w-24 px-3 py-2 border rounded text-gray-700"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                </select>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className={`flex-1 px-3 py-2 border rounded text-gray-700 ${
                    errors.contactNumber ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="schoolOrganization" className="block mb-1 text-gray-800">
              School/Organization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="schoolOrganization"
              name="schoolOrganization"
              value={formData.schoolOrganization}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded text-gray-700 ${
                errors.schoolOrganization ? 'border-red-500' : ''
              }`}
            />
            {errors.schoolOrganization && (
              <p className="text-red-500 text-sm mt-1">{errors.schoolOrganization}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
