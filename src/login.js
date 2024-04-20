import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
//import './loginpage.css';

const LoginPage = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Set the headers to match x-www-form-urlencoded
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            // Convert the data to x-www-form-urlencoded format
            const data = new URLSearchParams();
            data.append('username', email);
            data.append('password', password);

            // Make the POST request
            const response = await axios.post('http://localhost:8080/api/v1/bot/token', data, { headers });

            const { access_token, refresh_token } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            // Fetch user ID using username
            const username = email;
            const userResponse = await axios.get(`http://localhost:8080/api/v1/bot/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            const userId = userResponse.data.userId;
            localStorage.setItem('userId', userId);

            history.push('/main');
        } catch (error) {
            console.error('Error logging in:', error.message);
            setError('Failed to login. Please check your credentials.');
        }
        setLoading(false);
    };

    return (
        <html data-theme="light">
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="card w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-12"> {/* Added card class and styles */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl text-gray-800 dark:text-white font-semibold mb-3">Login</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm text-gray-700  font-medium"></label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email address"
                            value={email}
                            onChange={handleEmailChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black dark:text-black leading-tight focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 font-medium"></label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black dark:text-black leading-tight focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="continue-button mt-4 px-4 py-2 rounded-md bg-blue-500 text-white focus:outline-none hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Continue'}
                    </button>
                    {error && <div className="error-message text-red-500">{error}</div>}
                </form>
                <div className="signup-link mt-4 text-center text-gray-700 dark:text-gray-200">
                    Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
                </div>
            </div>
        </div>
        </html>
    );
};

export default LoginPage;
