// Test script to verify user creation API
// Run this with: node test_user_creation.js

const testUser = {
  clerk_id: "user_test_123",
  email: "test@example.com",
  first_name: "Test",
  last_name: "User"
};

async function testUserCreation() {
  try {
    console.log('Testing user creation API...');
    
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ User created successfully:', result.data);
    } else {
      console.log('❌ Failed to create user:', result.error);
    }
  } catch (error) {
    console.error('❌ Error testing user creation:', error);
  }
}

// Only run if this file is executed directly
if (typeof window === 'undefined') {
  testUserCreation();
} 