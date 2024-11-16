"use client";

import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle');
    const [names, setNames] = useState<string[]>([]);
    const [filteredNames, setFilteredNames] = useState<string[]>([]);
    const [selectedName, setSelectedName] = useState<string>('');

    useEffect(() => {
        const fetchNames = async () => {
            const response = await fetch('/api/get-names');
            if (response.ok) {
                const data = await response.json();
                setNames(data.names);
                setFilteredNames(data.names);
            }
        };
        fetchNames();

        // Check for username and password in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const usernameFromUrl = urlParams.get('username');
        const passwordFromUrl = urlParams.get('password');

        if (usernameFromUrl && passwordFromUrl) {
            setUsername(usernameFromUrl);
            setPassword(passwordFromUrl);
            // Call a separate function to handle login after state is set
            handleLogin(usernameFromUrl, passwordFromUrl);
        }
    }, []);

    // New useEffect to log username and password when they change
    useEffect(() => {
        console.log("USERNAMEEE : ", username, "PASSWORDDD : ", password);
    }, [username, password]); // This will run whenever username or password changes

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
        setFilteredNames(names.filter(name => name.toLowerCase().startsWith(value.toLowerCase())));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        console.log("USERNAME : ", username, "PASSWORD : ", password)
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
      "name": "John Doe",
      "gender": "Male",
      "whatsappExtension": "+1",
      "whatsappNumber": "2345678901",
      "schoolOrganization": "Example School",
      "contactExtension": "+1",
      "contactNumber": "9876543210",
      "isWhatsappSameAsContact": false
    }
    const handleAttendanceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/get-names', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched names:', data.names);
            } else {
                console.error('Failed to fetch names:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching names:', error);
        }
    };

    const handleMarkAttendance = async () => {
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
                alert(data.message);
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error marking attendance:', error);
            alert('Failed to mark attendance');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto p-8 flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
                    
                    {!isLoggedIn ? (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-gray-700">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300 ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>

                            {submitStatus === 'success' && (
                                <p className="text-green-600 text-center">Login successful!</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-600 text-center">Invalid username or password.</p>
                            )}
                        </form>
                    ) : (
                        <form className="space-y-6" onSubmit={handleAttendanceSubmit}>
                            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Mark Attendance</h2>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={selectedName}
                                    onChange={handleNameChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                                    required
                                />
                                {filteredNames.length > 0 && (
                                    <ul className="absolute bg-white border border-gray-300 mt-1 max-h-60 overflow-auto">
                                        {filteredNames.map((name, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    setSelectedName(name);
                                                    setFilteredNames([]);
                                                }}
                                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                {name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button
                                type="submit"
                                onClick={handleMarkAttendance}
                                className="w-full bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300"
                            >
                                Mark Attendance
                            </button>
                        </form>
                    )}
                </div>
            </main>
            // ... existing footer ...
        </div>
    );
};

export default LoginPage;
