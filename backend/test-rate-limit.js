// Test Rate Limiting Script
// Run this to verify rate limiting is working correctly

const axios = require('axios');

const API_URL = 'http://localhost:5000/api/date-planner';

const testData = {
  city: 'Mumbai',
  budget: 2000,
  dateType: 'romantic',
  partnerPersonality: 'foodie'
};

async function testRateLimit() {
  console.log('🧪 Testing Gemini AI Rate Limiting...\n');
  console.log('📊 Sending 20 requests to test 15 RPM limit\n');
  
  let successCount = 0;
  let rateLimitCount = 0;
  let errorCount = 0;

  for (let i = 1; i <= 20; i++) {
    try {
      const startTime = Date.now();
      const response = await axios.post(API_URL, testData);
      const duration = Date.now() - startTime;
      
      successCount++;
      console.log(`✅ Request ${i}: SUCCESS (${duration}ms)`);
      
    } catch (error) {
      if (error.response?.status === 429) {
        rateLimitCount++;
        const retryAfter = error.response.data.retryAfter;
        console.log(`⏱️  Request ${i}: RATE LIMITED (retry after: ${retryAfter})`);
      } else {
        errorCount++;
        console.log(`❌ Request ${i}: ERROR - ${error.message}`);
      }
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📈 Test Results:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ⏱️  Rate Limited: ${rateLimitCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  
  console.log('\n🎯 Expected Behavior:');
  console.log('   - First 15 requests: SUCCESS');
  console.log('   - Remaining 5 requests: RATE LIMITED');
  
  if (successCount === 15 && rateLimitCount === 5) {
    console.log('\n✅ RATE LIMITING WORKING CORRECTLY!');
  } else {
    console.log('\n⚠️  Unexpected results. Check server logs.');
  }
}

// Run test
console.log('⚡ Starting rate limit test...');
console.log('⚠️  Make sure your server is running on http://localhost:5000\n');

testRateLimit().catch(error => {
  console.error('\n❌ Test failed:', error.message);
  console.log('\n💡 Troubleshooting:');
  console.log('   1. Is the server running? (npm start)');
  console.log('   2. Is GEMINI_API_KEY set in .env?');
  console.log('   3. Is MongoDB running?');
});
