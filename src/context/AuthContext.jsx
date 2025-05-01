import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  loginWithEmailAndPassword, 
  registerWithEmailAndPassword, 
  signInWithGoogle, 
  signInWithGithub,
  logoutUser, 
  resetPassword,
  onAuthStateChange
} from '../../firebase/authService';
import { getUserProfile } from '../../firebase/profileService';
import Loader from '../components/Loader';

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login with email and password
  const login = async (email, password) => {
    try {
      const user = await loginWithEmailAndPassword(email, password);
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Register with email and password
  const register = async (email, password, displayName) => {
    try {
      const user = await registerWithEmailAndPassword(email, password, displayName);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Sign in with GitHub
  const loginWithGithub = async () => {
    try {
      const user = await signInWithGithub();
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      setUserProfile(null);
      return true;
    } catch (error) {
      throw error;
    }
  };

  // Password reset
  const forgotPassword = async (email) => {
    try {
      await resetPassword(email);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    register,
    loginWithGoogle,
    loginWithGithub,
    logout,
    forgotPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);