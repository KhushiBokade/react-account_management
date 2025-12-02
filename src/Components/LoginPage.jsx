import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import logo from '../assets/img-1.png';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3"
         style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
      
      <div className="bg-white rounded-4 shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        
        {/* Logo & Title */}
        <div className="text-center mb-4">
          <img 
            src={logo} 
            alt="Logo" 
            className="rounded-circle border border-3 border-white shadow" 
            style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
          />
          <h4 className="mt-3 fw-bold text-dark">Welcome Back</h4>
          <small className="text-muted">Login to continue</small>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger small py-2 text-center mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="small">
          
          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="   Enter Your Gmail"
              className="form-control form-control-sm rounded-pill"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: '45px', fontSize: '14px' }}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 position-relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="   Password"
              className="form-control form-control-sm rounded-pill pe-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: '45px', fontSize: '14px' }}
              required
            />
            <button
              type="button"
              className="btn position-absolute end-0 top-50 translate-middle-y me-3 border-0 shadow-none"
              onClick={() => setShowPass(!showPass)}
              onMouseDown={(e) => e.preventDefault()}
              style={{ zIndex: 10, outline: 'none' }}
              tabIndex="-1"
            >
              {showPass ? <EyeOff className="text-muted" size={18} /> : <Eye className="text-muted" size={18} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-dark w-100 rounded-pill fw-bold"
            style={{ height: '48px', fontSize: '15px' }}
          >
            Login Now
          </button>
        </form>

        {/* Register Link - Exactly as you wanted */}
        <div className="text-center mt-4">
          <span className="text-gray small">Don't have an account? </span>
          <Link 
            to="/register" 
            className="text-gray fw-bold text-decoration-none"
            style={{ fontSize: '15px' }}
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}