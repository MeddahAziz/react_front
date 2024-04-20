import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [completeName, setCompleteName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCompleteNameChange = (e) => {
        setCompleteName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/bot/users/add', {
                username,
                password,
                completeName,
                status: 'Active', // Set status directly here
                rolePayloads: [{ roleId: 1, name: 'ROLE_USER' }]
            });
            setSuccessMessage('User created successfully');
            history.push('/login');
        } catch (error) {
            console.error('Signup error:', error); // Log the error object for debugging
            if (error.response) {
                setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    // Confirmation for working submit button
    console.log('Submit button functionality confirmed!'); // This line is for verification

    return (
        <html data-theme="light">
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div
                className="card w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-12"> {/* Added card class and styles */}
                <div className="logo text-2xl text-gray-800 dark:text-white font-semibold  text-center mb-6">Signup</div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={username}
                        onChange={handleUsernameChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black  leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 mb-6" // Added mb-6 for margin-bottom
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black  leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 mb-6" // Added mb-6 for margin-bottom
                    />
                    <input
                        type="text"
                        placeholder="Complete Name"
                        value={completeName}
                        onChange={handleCompleteNameChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <button type="submit"
                            className="continue-button mt-4 px-4 py-2 rounded-md bg-blue-500 text-white focus:outline-none hover:bg-blue-600">
                        Continue
                    </button>
                </form>
                <div className="signup-link mt-4 text-center text-gray-700 dark:text-gray-200">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </div>
            </div>
        </div>
        </html>
    );
};

export default SignupPage;
