import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaEdit, FaSave, FaTimes, FaChartBar, FaEnvelope, FaPhone, FaClock, FaSignOutAlt, FaEye, FaStickyNote, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { callHttpAction } from '../convex/httpActions';

const AdminDashboard = () => {
    const { token, logout } = useAuth();
    const [enquiries, setEnquiries] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [filter, setFilter] = useState('all');
    const [viewingEnquiry, setViewingEnquiry] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        fetchEnquiries();
        fetchStats();
    }, []);

    const getAuthHeaders = () => ({
        'Authorization': `Bearer ${token}`,
    });

    const fetchEnquiries = async () => {
        try {
            const response = await callHttpAction('enquiries:list', {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            setEnquiries(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching enquiries:', error);
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await callHttpAction('enquiries:stats', {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

        try {
            await callHttpAction('enquiries:remove', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: { id },
            });
            fetchEnquiries();
            fetchStats();
        } catch (error) {
            console.error('Error deleting enquiry:', error);
        }
    };

    const handleEdit = (enquiry) => {
        setEditingId(enquiry._id);
        setEditForm(enquiry);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleSave = async () => {
        try {
            await callHttpAction('enquiries:update', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: {
                    id: editingId,
                    ...editForm,
                },
            });
            setEditingId(null);
            setEditForm({});
            fetchEnquiries();
            fetchStats();
        } catch (error) {
            console.error('Error updating enquiry:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleViewDetails = (enquiry) => {
        setViewingEnquiry(enquiry);
        setShowDetailsModal(true);
    };

    const closeDetailsModal = () => {
        setShowDetailsModal(false);
        setViewingEnquiry(null);
    };

    const filteredEnquiries = filter === 'all'
        ? enquiries
        : enquiries.filter(e => e.status === filter);

    const formatDate = (timestamp) => {
        // Convex uses number timestamps (milliseconds)
        const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600">Manage enquiries and view analytics</p>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Enquiries</p>
                                    <p className="text-3xl font-bold text-primary">{stats.total}</p>
                                </div>
                                <FaChartBar className="text-4xl text-secondary" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Pending</p>
                                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                                </div>
                                <FaClock className="text-4xl text-yellow-500" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Contacted</p>
                                    <p className="text-3xl font-bold text-blue-600">{stats.contacted}</p>
                                </div>
                                <FaEnvelope className="text-4xl text-blue-500" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Resolved</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
                                </div>
                                <FaPhone className="text-4xl text-green-500" />
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Interest Distribution */}
                {stats && stats.byInterest && (
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
                        <h2 className="text-xl font-bold text-primary mb-4">Enquiries by Interest</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.byInterest.map((item, index) => (
                                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-2xl font-bold text-secondary">{item.count}</p>
                                    <p className="text-sm text-gray-600">{item._id}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mb-6">
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('contacted')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'contacted' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Contacted
                        </button>
                        <button
                            onClick={() => setFilter('resolved')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'resolved' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Resolved
                        </button>
                    </div>
                </div>

                {/* Enquiries Table */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredEnquiries.map((enquiry) => (
                                    <tr key={enquiry._id} className="hover:bg-gray-50">
                                        {editingId === enquiry._id ? (
                                            <>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={editForm.name}
                                                        onChange={handleInputChange}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={editForm.email}
                                                        onChange={handleInputChange}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded mb-1"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={editForm.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        name="interest"
                                                        value={editForm.interest}
                                                        onChange={handleInputChange}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded"
                                                    >
                                                        <option>German Consultancy</option>
                                                        <option>University Selection</option>
                                                        <option>Application Assistance</option>
                                                        <option>Visa Support</option>
                                                        <option>Accommodation</option>
                                                        <option>Language Courses</option>
                                                        <option>Career Guidance</option>
                                                        <option>Other</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        name="status"
                                                        value={editForm.status}
                                                        onChange={handleInputChange}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="contacted">Contacted</option>
                                                        <option value="resolved">Resolved</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <textarea
                                                        name="notes"
                                                        value={editForm.notes || ''}
                                                        onChange={handleInputChange}
                                                        placeholder="Add notes to track progress..."
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                        rows="3"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {formatDate(enquiry.createdAt)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={handleSave}
                                                            className="text-green-600 hover:text-green-800"
                                                        >
                                                            <FaSave size={18} />
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="text-gray-600 hover:text-gray-800"
                                                        >
                                                            <FaTimes size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                                                    {enquiry.message && (
                                                        <div className="text-xs text-gray-500 mt-1">{enquiry.message.substring(0, 50)}...</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{enquiry.email}</div>
                                                    <div className="text-sm text-gray-500">{enquiry.phone}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-900">{enquiry.interest}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${enquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        enquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-green-100 text-green-800'
                                                        }`}>
                                                        {enquiry.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {enquiry.notes ? (
                                                        <div className="flex items-center gap-2">
                                                            <FaStickyNote className="text-blue-500" size={14} />
                                                            <span className="text-xs text-gray-600 truncate max-w-[150px]" title={enquiry.notes}>
                                                                {enquiry.notes.substring(0, 30)}...
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">No notes</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {formatDate(enquiry.createdAt)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleViewDetails(enquiry)}
                                                            className="text-green-600 hover:text-green-800"
                                                            title="View Details"
                                                        >
                                                            <FaEye size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(enquiry)}
                                                            className="text-blue-600 hover:text-blue-800"
                                                            title="Edit"
                                                        >
                                                            <FaEdit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(enquiry._id)}
                                                            className="text-red-600 hover:text-red-800"
                                                            title="Delete"
                                                        >
                                                            <FaTrash size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Details Modal */}
                {showDetailsModal && viewingEnquiry && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-primary">Enquiry Details</h2>
                                    <button
                                        onClick={closeDetailsModal}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <FaTimes size={24} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Personal Information */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <FaUser className="text-primary" />
                                            Personal Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Full Name</p>
                                                <p className="text-base font-medium text-gray-900">{viewingEnquiry.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Email</p>
                                                <p className="text-base font-medium text-gray-900">{viewingEnquiry.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Phone</p>
                                                <p className="text-base font-medium text-gray-900">{viewingEnquiry.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Interest</p>
                                                <p className="text-base font-medium text-gray-900">{viewingEnquiry.interest}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Date */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <FaChartBar className="text-primary" />
                                            Status & Timeline
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Status</p>
                                                <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${viewingEnquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    viewingEnquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}>
                                                    {viewingEnquiry.status.charAt(0).toUpperCase() + viewingEnquiry.status.slice(1)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                                    <FaCalendarAlt />
                                                    Submitted Date
                                                </p>
                                                <p className="text-base font-medium text-gray-900">{formatDate(viewingEnquiry.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    {viewingEnquiry.message && (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <FaEnvelope className="text-primary" />
                                                Message
                                            </h3>
                                            <p className="text-base text-gray-700 whitespace-pre-wrap">{viewingEnquiry.message}</p>
                                        </div>
                                    )}

                                    {/* Notes */}
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <FaStickyNote className="text-blue-600" />
                                            Admin Notes
                                        </h3>
                                        {viewingEnquiry.notes ? (
                                            <p className="text-base text-gray-700 whitespace-pre-wrap bg-white p-3 rounded border border-blue-200">{viewingEnquiry.notes}</p>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">No notes added yet. Click Edit to add notes and track progress.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3 justify-end">
                                    <button
                                        onClick={() => {
                                            closeDetailsModal();
                                            handleEdit(viewingEnquiry);
                                        }}
                                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                                    >
                                        <FaEdit />
                                        Edit Enquiry
                                    </button>
                                    <button
                                        onClick={closeDetailsModal}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
