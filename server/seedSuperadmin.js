require('dotenv').config({ path: '../.env' }); // Load environment variables from the parent folder

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./src/models/User'); // ✅ Corrected path to User model

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  const existing = await User.findOne({ email: 'superadmin@example.com' });
  if (existing) {
    console.log('❌ Superadmin already exists.');
    return mongoose.disconnect();
  }

  const hashedPassword = await bcrypt.hash('superadminpassword', 10);

  await User.create({
    firstName: 'Super',
    lastName: 'Admin',
    email: 'superadmin@example.com',
    password: hashedPassword,
    role: 'SUPERADMIN',
    isEmailVerified: true,
    companyName: 'Super Company',
    companyAddress: '123 Super Street',
    contactNumber: '+639123456789'
  });

  console.log('✅ Superadmin created successfully.');
  mongoose.disconnect();
})
.catch((err) => {
  console.error('❌ Error connecting or creating superadmin:', err);
  mongoose.disconnect();
});
