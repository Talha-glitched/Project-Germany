// API Configuration
// In Vite, environment variables must be prefixed with VITE_ to be exposed to the client
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6001';

export const API_ENDPOINTS = {
    BASE_URL: API_BASE_URL,
    AUTH: {
        LOGIN: `${API_BASE_URL}/api/auth/login`,
        REGISTER: `${API_BASE_URL}/api/auth/register`,
        VERIFY: `${API_BASE_URL}/api/auth/verify`,
    },
    ENQUIRIES: {
        BASE: `${API_BASE_URL}/api/enquiries`,
        STATS: `${API_BASE_URL}/api/enquiries/stats`,
        BY_ID: (id) => `${API_BASE_URL}/api/enquiries/${id}`,
    },
};

export default API_ENDPOINTS;

