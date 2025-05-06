'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import RegistrationForm from '../components/RegistrationForm';

const LoginAndAttendancePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [entries, setEntries] = useState<Array<{ name: string; contactNumbers: string[] }>>([]);
  const [filteredEntries, setFilteredEntries] = useState<Array<{ name: string; contactNumbers: string[] }>>([]);
  const [selectedName, setSelectedName] = useState<string>('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);

  useEffect(() => {
    const fetchNames = async () => {
      const response = await fetch('/api/get-attendance-list');
      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries);
      }
    };
    fetchNames();

    // Fetch full list and log it
    const fetchFullList = async () => {
      const response = await fetch('/api/get-full-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followupOwner: 'AAD' }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched full list:', data.entries); // Log the full list
      } else {
        console.error('Failed to fetch full list:', response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    };
    fetchFullList();

    // Check for username and password in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const usernameFromUrl = urlParams.get('username');
    const passwordFromUrl = urlParams.get('password');

    if (usernameFromUrl && passwordFromUrl) {
      setUsername(usernameFromUrl);
      setPassword(passwordFromUrl);
      handleLogin(usernameFromUrl, passwordFromUrl);
    }
  }, []);

  // New useEffect to log username and password when they change
  useEffect(() => {}, [username, password]); // This will run whenever username or password changes

  const handleLogin = async (username: string, password: string) => {
    // Simulate a form event
    const event = {
      preventDefault: () => {},
      currentTarget: {} as HTMLFormElement,
      target: {} as HTMLFormElement,
    } as unknown as React.FormEvent;

    await handleSubmit(event);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedName(value);
    setFilteredEntries(entries.filter((entry) => entry.name.toLowerCase().startsWith(value.toLowerCase())));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      console.log('Login successful');
      setIsLoggedIn(true);
      setSubmitStatus('success');
    } else {
      console.log('Login failed');
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const formData = {
    name: 'John Doe',
    gender: 'Male',
    whatsappExtension: '+1',
    whatsappNumber: '2345678901',
    schoolOrganization: 'Example School',
    contactExtension: '+1',
    contactNumber: '9876543210',
    isWhatsappSameAsContact: false,
  };
  const handleAttendanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/get-full-list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched attendance list:', data.entries);
      } else {
        console.error('Failed to fetch attendance list:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching attendance list:', error);
    }
  };

  const handleMarkAttendance = async () => {
    setIsMarkingAttendance(true); // Start loading
    try {
      const response = await fetch('/api/mark-present', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: selectedName }),
      });

      const data = await response.json();
      if (response.ok) {
        setNotification({ message: data.message, type: 'success' });
        setSelectedName(''); // Clear the name field
      } else {
        setNotification({ message: 'Error: ' + data.message, type: 'error' });
      }
      setIsMarkingAttendance(false); // Stop loading immediately after response
    } catch (error) {
      console.error('Error marking attendance:', error);
      setNotification({ message: 'Failed to mark attendance', type: 'error' });
      setIsMarkingAttendance(false); // Stop loading on error
    }

    // Clear only the notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleBlur = () => {
    // Use setTimeout to allow click events on the dropdown to fire first
    setTimeout(() => {
      setFilteredEntries([]);
    }, 200);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-8 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {notification && <div className={`mb-4 p-3 rounded ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{notification.message}</div>}
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>

          {!isLoggedIn ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block mb-2 text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800" required />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800" required />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className={`w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>

              {submitStatus === 'success' && <p className="text-green-600 text-center">Login successful!</p>}
              {submitStatus === 'error' && <p className="text-red-600 text-center">Invalid username or password.</p>}
            </form>
          ) : (
            <>
              <form className="space-y-6" onSubmit={handleAttendanceSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Mark Attendance</h2>
                <div>
                  <label htmlFor="name" className="block mb-2 text-gray-700">
                    Name
                  </label>
                  <input type="text" id="name" name="name" value={selectedName} onChange={handleNameChange} onBlur={handleBlur} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800" required />
                  {filteredEntries.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 mt-1 max-h-60 overflow-auto w-full z-10">
                      {filteredEntries.map((entry, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setSelectedName(entry.name);
                            setFilteredEntries([]);
                          }}
                          className="p-2 hover:bg-gray-200 cursor-pointer text-gray-900"
                        >
                          <span className="font-medium">{entry.name}</span>
                          {entry.contactNumbers.length > 0 && <span className="text-gray-500 text-sm ml-2">({entry.contactNumbers.join(', ')})</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button type="submit" onClick={handleMarkAttendance} disabled={isMarkingAttendance} className="w-full bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isMarkingAttendance ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Marking...
                    </span>
                  ) : (
                    'Mark Attendance'
                  )}
                </button>
              </form>

              <button onClick={() => setShowRegistrationForm(true)} className="w-full mt-4 bg-saffron text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-300">
                Register New User
              </button>
            </>
          )}
        </div>
      </main>

      {showRegistrationForm && <RegistrationForm onClose={() => setShowRegistrationForm(false)} isAttendancePage={true} />}
    </div>
  );
};

export default LoginAndAttendancePage;
