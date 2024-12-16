"use client";

import React, { useState, useEffect } from 'react';
import RegistrationForm from '../components/RegistrationForm';

const AttendancePage = () => {
    const [name, setName] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [registrationMessage, setRegistrationMessage] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const phone = urlParams.get('phone');
        if (phone) {
            setPhoneNumber(phone);
            fetchNameFromPhone(phone);
        }
    }, []);

    const fetchNameFromPhone = async (phone: string) => {
        try {
            const response = await fetch(`/api/get-name-from-phone?phone=${phone}`);
            const data = await response.json();
            if (response.ok) {
                setName(data.name);
            } else {
                console.error(data.message);
                setName(null);
            }
        } catch (error) {
            console.error('Error fetching name:', error);
            setName(null);
        }
    };

    const handleMarkAttendance = async () => {
        if (!name || !phoneNumber) return; // Ensure name and phone number are available before marking attendance
        setIsMarkingAttendance(true);  // Start loading
        try {
            // const response = await fetch('/api/mark-present', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ name }),
            // });

            // const data = await response.json();
            // if (response.ok) {
                // New API call to mark registered
                const response = await fetch('/api/mark-registered', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ contact: phoneNumber }), // Send the phone number as contact
                });
                const data = await response.json();
                if (response.ok){
                setNotification({ message: data.message, type: 'success' });
                setName(null); // Clear the name field
                setRegistrationMessage('You have been registered!'); // Set the message after registration
                } else {
                    setNotification({ message: 'Error: ' + data.message, type: 'error' });
                }
            setIsMarkingAttendance(false);  // Stop loading immediately after response
        } catch (error) {
            console.error('Error marking attendance:', error);
            setNotification({ message: 'Failed to mark attendance', type: 'error' });
            setIsMarkingAttendance(false);  // Stop loading on error
        }

        // Clear only the notification after 3 seconds
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const handleRegistrationSuccess = () => {
        setRegistrationMessage('You have been registered!'); // Set the message after registration
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto p-8 flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    {registrationMessage ? (
                        <p className="mb-4 text-lg text-green-600">{registrationMessage}</p>
                    ) : (
                        <>
                            {notification && (
                                <div className={`mb-4 p-3 rounded ${
                                    notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {notification.message}
                                </div>
                            )}
                            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Mark Registration</h1>
                            
                            {name ? (
                                <div className="text-center">
                                    <p className="mb-4 text-lg text-black">Are you {name}?</p>
                                    <button
                                        onClick={handleMarkAttendance}
                                        disabled={isMarkingAttendance}
                                        className="w-full bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isMarkingAttendance ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Registering...
                                            </span>
                                        ) : (
                                            'Register'
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="mb-4 text-lg text-black">Loading your details...</p>
                                </div>
                            )}

                            <button
                                onClick={() => setShowRegistrationForm(true)}
                                className="w-full mt-4 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition duration-300"
                            >
                                {name ? `Not ${name}? Register yourself for MYF!` : 'Register New User'}
                            </button>
                        </>
                    )}
                </div>
            </main>

            {showRegistrationForm && (
                <RegistrationForm 
                    onClose={() => setShowRegistrationForm(false)} 
                    isAttendancePage={false}
                    onSuccess={handleRegistrationSuccess}
                />
            )}
        </div>
    );
};

export default AttendancePage;
