import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? 'http://localhost:8081/api/auth/login' : 'http://localhost:8081/api/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong!');

      if (isLogin) {
        // Fixed: changed data.accessToken to data.token
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        alert('Registration successful! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div style={styles.container}>
      {!token ? (
        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p style={styles.subtitle}>{isLogin ? 'Please enter your details to sign in' : 'Register to get started with AuthSystem'}</p>
          </div>

          {error && <div style={styles.errorAlert}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            {!isLogin && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            )}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.primaryButton}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div style={styles.switchText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span style={styles.link} onClick={() => { setIsLogin(!isLogin); setError(''); }}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </span>
          </div>
        </div>
      ) : (
        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.title}>Dashboard 🎉</h2>
            <p style={styles.subtitle}>You are successfully authenticated.</p>
          </div>
          <div style={styles.tokenBox}>
            <strong>Active JWT Token:</strong>
            <p style={styles.tokenText}>{token}</p>
          </div>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout Session
          </button>
        </div>
      )}
    </div>
  );
}

// Inline Styles for Modern Look
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
  },
  card: {
    background: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '420px',
  },
  header: {
    marginBottom: '24px',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 8px 0',
    color: '#1a202c',
    fontSize: '24px',
    fontWeight: '700',
  },
  subtitle: {
    margin: 0,
    color: '#718096',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#4a5568',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #cbd5e0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  primaryButton: {
    marginTop: '8px',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: '#5a67d8',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: '#e53e3e',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
  },
  errorAlert: {
    background: '#fff5f5',
    color: '#c53030',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '16px',
    border: '1px solid #feb2b2',
  },
  switchText: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#718096',
  },
  link: {
    color: '#5a67d8',
    fontWeight: '600',
    cursor: 'pointer',
  },
  tokenBox: {
    background: '#f7fafc',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '12px',
    color: '#4a5568',
    wordBreak: 'break-all',
    maxHeight: '100px',
    overflowY: 'auto',
  }
};