import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { query } from '../../../lib/db';
import { UserFormData } from '../../../types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body: UserFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    // Basic validation
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [body.email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    // Insert user into database
    const result = await query(
      `INSERT INTO users (name, email, password_hash, created_at, updated_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING id, name, email, created_at`,
      [body.name, body.email, passwordHash]
    );

    const newUser = result.rows[0];

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.created_at,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}