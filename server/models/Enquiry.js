const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    interest: {
        type: String,
        enum: ['German Consultancy', 'University Selection', 'Application Assistance', 'Visa Support', 'Accommodation', 'Language Courses', 'Career Guidance', 'Other'],
        default: 'Other',
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'resolved'],
        default: 'pending',
    },
    notes: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Enquiry', enquirySchema);
