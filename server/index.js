const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const enquiryRoutes = require('./routes/enquiryRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001;

// CORS Configuration - Allow all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.header('Access-Control-Expose-Headers', 'Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Also use cors package as backup
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  exposedHeaders: ["Authorization"]
}));

app.use(express.json());

// Test route to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);

// Public route for submitting enquiries (contact form) - no auth required
const Enquiry = require('./models/Enquiry');
app.post('/api/enquiries', async (req, res) => {
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

// Protected admin routes - require authentication
app.use('/api/enquiries', authMiddleware, enquiryRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project_germany', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Project Germany API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
