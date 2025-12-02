/* eslint-disable no-undef */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Camera, Eye, EyeOff } from 'lucide-react';
import defaultProfile from '../assets/img-2.png';

export default function Dashboard() {
  const { currentUser, logout, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    profilePic: currentUser?.profilePic || defaultProfile
  });

  const [pass, setPass] = useState({ current: '', new: '', confirm: '' });
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const showMessage = (message, type = 'success') => {
    setMsg(message);
    setMsgType(type);
    setTimeout(() => { setMsg(''); setMsgType(''); }, 3000);
  };

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPic = reader.result;
        setFormData(prev => ({ ...prev, profilePic: newPic }));
        updateProfile({ profilePic: newPic });
        showMessage('Photo updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    if (!formData.fullName || !formData.email) {
      showMessage('Name and Email are required', 'error');
      return;
    }
    const result = updateProfile({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      profilePic: formData.profilePic
    });
    if (result?.success !== false) {
      setIsEditing(false);
      showMessage('Profile saved successfully!', 'success');
    } else {
      showMessage(result.message || 'Failed to update profile', 'error');
    }
  };

  const changePasswordNow = () => {
    if (!pass.current || !pass.new || !pass.confirm) {
      showMessage('All password fields are required', 'error');
      return;
    }
    if (pass.new.length < 6) {
      showMessage('New password must be at least 6 characters', 'error');
      return;
    }
    if (pass.new !== pass.confirm) {
      showMessage('New passwords do not match', 'error');
      return;
    }

    const result = changePassword(pass.current, pass.new);
    if (result?.success) {
      showMessage('Password changed! Logging out...', 'success');
      setPass({ current: '', new: '', confirm: '' });
      setShowPassForm(false);
      setTimeout(() => { logout(); navigate('/login'); }, 2000);
    } else {
      showMessage(result?.message || 'Wrong current password', 'error');
    }
  };

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

      <div className="min-vh-100 bg-light">

        <div className="text-white text-center py-3"
             style={{
               background: 'linear-gradient(135deg, #667eea, #764ba2)',
               minHeight: '100px', maxHeight: '220px'
             }}>
          <div className="position-relative d-inline-block">
            <img
              src={formData.profilePic}
              alt="Profile"
              className="rounded-circle border border-5 border-white shadow-lg"
              width="110"
              height="110"
              style={{ objectFit: 'cover' }}
            />
            {isEditing && (
              <>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="btn btn-light rounded-circle position-absolute bottom-0 end-0 shadow d-flex align-items-center justify-content-center"
                  style={{ width: '44px', height: '44px' }}
                >
                  <Camera size={22} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={uploadPhoto}
                  accept="image/*"
                  className="d-none"
                />
                </>
            )}
          </div>
          <h3 className="mt-4 fw-bold">Welcome {formData.fullName || 'User'}</h3>
        </div>

        <div className="container mt-5 pb-5" style={{ maxWidth: '600px', marginTop: '-60px' }}>
          {/* Message */}
          {msg && (
            <div className={`alert ${msgType === 'success' ? 'alert-success' : 'alert-danger'} text-center mb-4`}>
              {msg}
            </div>
          )}

          {/* Edit Button */}
          <div className="text-end mb-3">
            {isEditing ? (
              <div className="btn-group">
                <button onClick={saveProfile} className="btn btn-success">Save</button>
                <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn btn-outline-primary px-4 rounded-pill">
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="mb-4 fw-bold">Profile Information</h5>
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input type="text" className="form-control" value={formData.fullName} readOnly={!isEditing}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))} />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control" value={formData.email} readOnly={!isEditing}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Phone</label>
                <input type="text" className="form-control" value={formData.phone || ''} placeholder="Not added"
                  readOnly={!isEditing}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
              </div>
            </div>
          </div>

          {/* Change Password */}
          {!showPassForm ? (
            <button onClick={() => setShowPassForm(true)} className="btn btn-warning w-100 mb-4 fw-bold rounded-pill">
              Change Password
            </button>
          ) : (
            <div className="card border-warning mb-4 shadow">
              <div className="card-body">
                <h5 className="text-warning fw-bold mb-4">Change Password</h5>

                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <div className="input-group">
                    <input type={showPass.current ? 'text' : 'password'} className="form-control"
                      value={pass.current} onChange={(e) => setPass(prev => ({ ...prev, current: e.target.value }))} />
                    <button className="btn btn-outline-secondary" type="button"
                      onClick={() => setShowPass(prev => ({ ...prev, current: !prev.current }))}>
                      {showPass.current ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <div className="input-group">
                    <input type={showPass.new ? 'text' : 'password'} className="form-control"
                      value={pass.new} onChange={(e) => setPass(prev => ({ ...prev, new: e.target.value }))} />
                    <button className="btn btn-outline-secondary" type="button"
                      onClick={() => setShowPass(prev => ({ ...prev, new: !prev.new }))}>
                      {showPass.new ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirm New Password</label>
                  <div className="input-group">
                    <input type={showPass.confirm ? 'text' : 'password'} className="form-control"
                      value={pass.confirm} onChange={(e) => setPass(prev => ({ ...prev, confirm: e.target.value }))} />
                    <button className="btn btn-outline-secondary" type="button"
                      onClick={() => setShowPass(prev => ({ ...prev, confirm: !prev.confirm }))}>
                      {showPass.confirm ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button onClick={changePasswordNow} className="btn btn-danger flex-fill">Update</button>
                  <button onClick={() => { setShowPassForm(false); setPass({ current: '', new: '', confirm: '' }); }} className="btn btn-secondary">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Logout */}
          <div className="text-center ">
            <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-outline-danger px-5 py-2 rounded-pill ">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}