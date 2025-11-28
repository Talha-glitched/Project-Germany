const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// GET /api/enquiries - Get all enquiries with optional filters
router.get('/', async (req, res) => {
    try {
        const { status, interest, sortBy = 'createdAt', order = 'desc' } = req.query;

        let query = {};
        if (status) query.status = status;
        if (interest) query.interest = interest;

        const enquiries = await Enquiry.find(query)
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 });

        res.status(200).json(enquiries);
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// GET /api/enquiries/stats - Get analytics/statistics
router.get('/stats', async (req, res) => {
    try {
        const totalEnquiries = await Enquiry.countDocuments();
        const pendingEnquiries = await Enquiry.countDocuments({ status: 'pending' });
        const contactedEnquiries = await Enquiry.countDocuments({ status: 'contacted' });
        const resolvedEnquiries = await Enquiry.countDocuments({ status: 'resolved' });

        // Get enquiries by interest
        const byInterest = await Enquiry.aggregate([
            { $group: { _id: '$interest', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Get recent enquiries (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentEnquiries = await Enquiry.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        res.status(200).json({
            total: totalEnquiries,
            pending: pendingEnquiries,
            contacted: contactedEnquiries,
            resolved: resolvedEnquiries,
            byInterest,
            recentEnquiries
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// GET /api/enquiries/:id - Get single enquiry
router.get('/:id', async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }
        res.status(200).json(enquiry);
    } catch (error) {
        console.error('Error fetching enquiry:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// POST /api/enquiries - Submit a new enquiry
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, interest, message } = req.body;

        // Basic validation
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Please provide name, email, and phone.' });
        }

        const newEnquiry = new Enquiry({
            name,
            email,
            phone,
            interest,
            message,
        });

        const savedEnquiry = await newEnquiry.save();
        res.status(201).json(savedEnquiry);
    } catch (error) {
        console.error('Error saving enquiry:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// PUT /api/enquiries/:id - Update enquiry
router.put('/:id', async (req, res) => {
    try {
        const { name, email, phone, interest, message, status, notes } = req.body;

        const updatedEnquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, interest, message, status, notes },
            { new: true, runValidators: true }
        );

        if (!updatedEnquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        res.status(200).json(updatedEnquiry);
    } catch (error) {
        console.error('Error updating enquiry:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// DELETE /api/enquiries/:id - Delete enquiry
router.delete('/:id', async (req, res) => {
    try {
        const deletedEnquiry = await Enquiry.findByIdAndDelete(req.params.id);

        if (!deletedEnquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        res.status(200).json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
        console.error('Error deleting enquiry:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
