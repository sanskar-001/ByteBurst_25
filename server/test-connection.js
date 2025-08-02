/**
 * Test script to verify MongoDB connection and API endpoints
 * Run this to check if everything is working properly
 */

const mongoose = require('mongoose');
const fetch = require('node-fetch');
require('dotenv').config({ path: './config.env' });

const API_BASE_URL = 'http://localhost:5000/api';

async function testConnection() {
  console.log('🧪 Testing E-Waste Backend Connection...\n');

  // Test 1: Check if server is running
  console.log('1️⃣ Testing server health...');
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    
    if (healthResponse.ok) {
      console.log('✅ Server is running');
      console.log(`   Status: ${healthData.status}`);
      console.log(`   MongoDB: ${healthData.mongodb}`);
    } else {
      console.log('❌ Server health check failed');
      console.log(`   Error: ${healthData.message}`);
    }
  } catch (error) {
    console.log('❌ Cannot connect to server');
    console.log(`   Error: ${error.message}`);
    console.log('   Make sure the server is running: npm run dev');
    return;
  }

  // Test 2: Check MongoDB connection
  console.log('\n2️⃣ Testing MongoDB connection...');
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
    await mongoose.disconnect();
  } catch (error) {
    console.log('❌ MongoDB connection failed');
    console.log(`   Error: ${error.message}`);
    console.log('   Please check your MONGODB_URI in config.env');
    console.log('   Or follow the MongoDB setup guide');
  }

  // Test 3: Test registration endpoint
  console.log('\n3️⃣ Testing registration endpoint...');
  try {
    const testUser = {
      email: `test${Date.now()}@example.com`,
      password: 'TestPassword123!',
      displayName: 'Test User'
    };

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Registration endpoint working');
      console.log(`   User created: ${data.data.email}`);
    } else {
      console.log('❌ Registration endpoint failed');
      console.log(`   Error: ${data.message}`);
      if (data.errors) {
        data.errors.forEach(error => {
          console.log(`   - ${error.msg}`);
        });
      }
    }
  } catch (error) {
    console.log('❌ Registration test failed');
    console.log(`   Error: ${error.message}`);
  }

  console.log('\n🎯 Test Summary:');
  console.log('If you see ✅ for all tests, your backend is working correctly!');
  console.log('If you see ❌, follow the troubleshooting guide in MONGODB_SETUP.md');
}

// Run the test
testConnection().catch(console.error); 