/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user');
      }
    }
    setLoading(false);
  }, []);

  // REGISTER + AUTO LOGIN (THIS IS THE KEY FIX)
  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password, // In real app, hash this!
      phone: userData.phone || '',
      profilePic: userData.profilePic || null,
      createdAt: new Date().toISOString()
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // AUTO LOGIN - Set as current user
    const loggedInUser = { ...newUser };
    delete loggedInUser.password; // Never keep password in session

    setCurrentUser(loggedInUser);
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

    return { success: true, user: loggedInUser };
  };

  // LOGIN
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    const loggedInUser = { ...user };
    delete loggedInUser.password;

    setCurrentUser(loggedInUser);
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

    return { success: true, user: loggedInUser };
  };

  // LOGOUT
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // UPDATE PROFILE
  const updateProfile = (updates) => {
    if (!currentUser) return { success: false, message: 'Not authenticated' };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) return { success: false, message: 'User not found' };

    const updatedFullUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedFullUser;
    localStorage.setItem('users', JSON.stringify(users));

    const updatedSessionUser = { ...updatedFullUser };
    delete updatedSessionUser.password;

    setCurrentUser(updatedSessionUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedSessionUser));

    return { success: true };
  };

  // CHANGE PASSWORD (WORKS GLOBALLY)
  const changePassword = (currentPassword, newPassword) => {
    if (!currentUser) return { success: false, message: 'Not logged in' };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) return { success: false, message: 'User not found' };

    const user = users[userIndex];

    if (user.password !== currentPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }

    users[userIndex] = { ...user, password: newPassword };
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true, message: 'Password changed successfully!' };
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    updateProfile,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}