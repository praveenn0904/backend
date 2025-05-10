const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds
  socketTimeoutMS: 45000  // Timeout for the socket to be idle (in ms)
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');
const medicineRoute = require('./routes/medicineRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const resetPasswordRoute = require('./routes/resetpasswordRoute');
const billingRoute = require('./routes/invoiceRoute');

app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/medicine', medicineRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/reset-password', resetPasswordRoute);
app.use('/api/invoices', billingRoute);

// Health Check
app.get('/', (req, res) => {
  res.send('✅ Sre Amman Pharma Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
