import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import logo from '../assets/img-1.png';
import { Eye, EyeOff } from 'lucide-react';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const err = {};

    if (!formData.fullName.trim()) err.fullName = 'Full name is required';
    if (!formData.email) err.email = 'Email is required';
    else if (!formData.email.endsWith('@gmail.com')) err.email = 'Only Gmail accounts allowed';

    if (formData.password.length < 8) err.password = 'Password must be 8+ characters';
    else if (!/(?=.*[A-Z])/.test(formData.password)) err.password = 'Must contain uppercase letter';
    else if (!/(?=.*[0-9])/.test(formData.password)) err.password = 'Must contain a number';
    else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) err.password = 'Must contain special character (!@#$%^&*)';

    if (formData.password !== formData.confirmPassword) err.confirm = 'Passwords do not match';

    if (!terms) err.terms = 'You must agree to terms & conditions';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      return;
    }

    const result = register({
      fullName: formData.fullName.trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      phone: '' // optional
    });

    if (result.success) {
      // Auto-login already done inside register() → just redirect
      navigate('/dashboard', { replace: true });
    } else {
      setErrors({ email: result.message || 'Email already registered' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3"
         style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
      
      <div className="bg-white rounded-4 shadow-lg p-5" style={{ maxWidth: '420px', width: '100%' }}>
        
        {/* Logo & Title */}
        <div className="text-center mb-4">
          <img 
            src={logo} 
            alt="Logo" 
            className="rounded-circle border border-4 border-white shadow-lg"
            style={{ width: '90px', height: '90px', objectFit: 'cover' }} 
          />
          <h3 className="mt-3 fw-bold text-dark">Create Account</h3>
          <p className="text-muted small">Join us — it's quick and free!</p>
        </div>

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>

          {/* Full Name */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Full Name"
              className={`form-control rounded-pill ${errors.fullName ? 'is-invalid' : ''}`}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              disabled={isLoading}
              style={{ height: '50px' }}
            />
            {errors.fullName && <div className="invalid-feedback ms-3">{errors.fullName}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Your Gmail Address"
              className={`form-control rounded-pill ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isLoading}
              style={{ height: '50px' }}
            />
            {errors.email && <div className="invalid-feedback ms-3">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Create Password"
              className={`form-control rounded-pill pe-5 ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={isLoading}
              style={{ height: '50px' }}
            />
            <button
              type="button"
              className="btn position-absolute end-0 top-50 translate-middle-y me-3"
              onClick={() => setShowPass(!showPass)}
              disabled={isLoading}
            >
              {showPass ? <EyeOff size={20} className="text-muted" /> : <Eye size={20} className="text-muted" />}
            </button>
            {errors.password && <div className="invalid-feedback ms-3">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Confirm Password"
              className={`form-control rounded-pill ${errors.confirm ? 'is-invalid' : ''}`}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              disabled={isLoading}
              style={{ height: '50px' }}
            />
            {errors.confirm && <div className="invalid-feedback ms-3">{errors.confirm}</div>}
          </div>

          {/* Terms */}
          <div className="mb-4 form-check">
            <input
              type="checkbox"
              className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
              id="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              disabled={isLoading}
            />
            <label className="form-check-label small text-muted" htmlFor="terms">
              I agree to the <a href="#" className="text-decoration-none fw-bold">Terms</a> and{' '}
              <a href="#" className="text-decoration-none fw-bold">Privacy Policy</a>
            </label>
            {errors.terms && <div className="invalid-feedback d-block small ms-4">{errors.terms}</div>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-dark w-100 rounded-pill fw-bold shadow-lg"
            style={{ height: '55px', fontSize: '16px' }}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm me-2" /> 
            ) : null}
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-0">
            Already have an account?{' '}
            <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#667eea' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}