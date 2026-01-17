import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Project_Germany.png';
import { API_ENDPOINTS } from '../config/api';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('🔵 [Login] Form submitted');
        console.log('🔵 [Login] Form data:', formData);

        setLoading(true);
        setError('');

        const url = API_ENDPOINTS.AUTH.LOGIN;
        console.log('🔵 [Login] Making request to:', url);
        console.log('🔵 [Login] Request method: POST');
        console.log('🔵 [Login] Request body:', JSON.stringify(formData));

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('🔵 [Login] Response received');
            console.log('🔵 [Login] Response status:', response.status);
            console.log('🔵 [Login] Response ok:', response.ok);
            console.log('🔵 [Login] Response headers:', Object.fromEntries(response.headers.entries()));

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                try {
                    data = await response.json();
                    console.log('🔵 [Login] Response data:', data);
                } catch (jsonError) {
                    console.error('🔴 [Login] Error parsing JSON:', jsonError);
                    setError('Invalid response from server. Please try again.');
                    setLoading(false);
                    return;
                }
            } else {
                const text = await response.text();
                console.error('🔴 [Login] Non-JSON response:', text);
                setError(`Server error (${response.status}): ${text || 'Unknown error'}`);
                setLoading(false);
                return;
            }

            if (response.ok) {
                console.log('✅ [Login] Success! Logging in user');
                login(data.token, data.admin);
                navigate('/admin');
            } else {
                console.error('🔴 [Login] Error response:', data);
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('🔴 [Login] Fetch error:', error);
            console.error('🔴 [Login] Error name:', error.name);
            console.error('🔴 [Login] Error message:', error.message);
            console.error('🔴 [Login] Error stack:', error.stack);
            setError(`Failed to connect to server: ${error.message}. Please check your internet connection and make sure the server is running on port 6001.`);
        } finally {
            setLoading(false);
            console.log('🔵 [Login] Form submission completed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-gray-800 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img
                            src={logo}
                            alt="Project Germany Logo"
                            className="h-24 md:h-28 w-auto"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Admin Login</h1>
                    <p className="text-gray-600">Project Germany Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>Secure admin access only</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
