const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const updateAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project_germany', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Find existing admin (get the first one, or create if none exists)
        let admin = await Admin.findOne();

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('mhndxb', salt);

        if (admin) {
            // Update existing admin
            admin.username = 'huzaifa';
            admin.password = hashedPassword;
            // Keep existing email if it exists
            if (!admin.email) {
                admin.email = 'huzaifa@projectgermany.com';
            }
            await admin.save();
            console.log('✅ Admin updated successfully!');
            console.log('   Username: huzaifa');
            console.log('   Password: mhndxb');
        } else {
            // Create new admin if none exists
            admin = new Admin({
                username: 'huzaifa',
                password: hashedPassword,
                email: 'huzaifa@projectgermany.com',
            });
            await admin.save();
            console.log('✅ Admin created successfully!');
            console.log('   Username: huzaifa');
            console.log('   Password: mhndxb');
        }

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating admin:', error);
        process.exit(1);
    }
};

// Run the script
updateAdmin();

