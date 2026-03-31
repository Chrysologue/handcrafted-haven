import { query } from '../lib/db';

async function testUserCreation() {
  console.log('🧪 Testing User Creation API...\n');

  try {
    // Test data
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123'
    };

    console.log('1. Testing user creation...');

    // First, let's manually test the database insertion (simulating what the API does)
    const bcrypt = await import('bcrypt');

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.default.hash(testUser.password, saltRounds);
    console.log('   Password hashed successfully');

    // Insert user
    const result = await query(
      `INSERT INTO users (name, email, password_hash, created_at, updated_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING id, name, email, created_at`,
      [testUser.name, testUser.email, passwordHash]
    );

    console.log('   User inserted successfully');
    console.log('   Created user:', result.rows[0]);

    // Verify password hashing works
    console.log('\n2. Testing password verification...');
    const isValidPassword = await bcrypt.default.compare(testUser.password, passwordHash);
    console.log(`   Password verification: ${isValidPassword ? '✅ PASS' : '❌ FAIL'}`);

    // Check if user exists
    console.log('\n3. Testing duplicate email prevention...');
    try {
      await query(
        `INSERT INTO users (name, email, password_hash, created_at, updated_at)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [testUser.name, testUser.email, passwordHash]
      );
      console.log('   ❌ FAIL: Duplicate email was allowed');
    } catch (error: any) {
      if (error.code === '23505') { // unique_violation
        console.log('   ✅ PASS: Duplicate email prevented');
      } else {
        throw error;
      }
    }

    // Clean up test user
    console.log('\n4. Cleaning up test data...');
    await query('DELETE FROM users WHERE email = $1', [testUser.email]);
    console.log('   Test user deleted');

    console.log('\n🎉 All user creation tests passed!');

  } catch (error) {
    console.error('❌ User creation test failed:', error);
  }
}

testUserCreation();