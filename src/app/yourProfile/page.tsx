'use client';

import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

const YourProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setUsername(data.user.username);
          setEmail(data.user.email);
        } else {
          setMessage('Failed to load user data');
        }
      } catch (error) {
        setMessage('Error loading user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password: password || undefined }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setMessage('Profile updated successfully!');
        setPassword(''); // Clear password field
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to update profile');
      }
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Please log in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--foreground)' }}>
          Your Profile
        </h1>
        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                borderColor: 'var(--foreground)',
                opacity: 0.8,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--foreground)';
                e.target.style.opacity = '1';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--foreground)';
                e.target.style.opacity = '0.8';
              }}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                borderColor: 'var(--foreground)',
                opacity: 0.8,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--foreground)';
                e.target.style.opacity = '1';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--foreground)';
                e.target.style.opacity = '0.8';
              }}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              New Password (leave blank to keep current)
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                borderColor: 'var(--foreground)',
                opacity: 0.8,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--foreground)';
                e.target.style.opacity = '1';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--foreground)';
                e.target.style.opacity = '0.8';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            style={{
              backgroundColor: 'var(--foreground)',
              color: 'var(--background)',
            }}
          >
            {updating ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default YourProfile;