import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadProfileImage, updateUserDisplayName, updateUserProfilePhoto, updateUserInterests } from '../../firebase/profileService';
import { FaUser, FaCamera, FaPencilAlt, FaCheck, FaTimes, FaGavel, FaArrowLeft, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, userProfile, refreshUserData } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Available legal interest options
  const legalInterests = [
    "Criminal Law", "Civil Law", "Constitutional Law", "Corporate Law", 
    "Environmental Law", "Family Law", "Human Rights", "Intellectual Property", 
    "International Law", "Labor Law", "Tax Law", "Real Estate Law",
    "Immigration Law", "Cyber Law", "Medical Law", "Banking & Finance",
    "Competition Law", "Consumer Protection", "Alternative Dispute Resolution"
  ];

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
    }
    
    if (userProfile?.interests) {
      setSelectedInterests(userProfile.interests);
    }
  }, [currentUser, userProfile]);

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = async () => {
    if (!displayName.trim()) {
      setError('Name cannot be empty');
      return;
    }

    try {
      setError('');
      await updateUserDisplayName(currentUser, displayName);
      await refreshUserData();
      setIsEditingName(false);
      setSuccessMessage('Name updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error updating name:', error);
      setError('Failed to update name. Please try again.');
    }
  };

  const handleNameCancel = () => {
    setDisplayName(currentUser.displayName || '');
    setIsEditingName(false);
    setError('');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setError('');
      
      // Create a temporary object URL for immediate visual feedback
      const tempURL = URL.createObjectURL(file);
      const profilePicElement = document.getElementById('profile-picture');
      if (profilePicElement && profilePicElement.tagName === 'IMG') {
        profilePicElement.src = tempURL;
      }
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const photoURL = await uploadProfileImage(currentUser.uid, file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Update the auth profile with the new photo URL
      await updateUserProfilePhoto(currentUser, photoURL);
      await refreshUserData();
      setSuccessMessage('Profile picture updated successfully!');
      
      // Revoke the temporary URL to free memory
      URL.revokeObjectURL(tempURL);
      
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(item => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleAddCustomInterest = () => {
    if (newInterest.trim() && !selectedInterests.includes(newInterest.trim())) {
      setSelectedInterests(prev => [...prev, newInterest.trim()]);
      setNewInterest('');
      setIsAddingInterest(false);
    }
  };

  const handleUpdateInterests = async () => {
    try {
      setError('');
      await updateUserInterests(currentUser.uid, selectedInterests);
      await refreshUserData();
      setSuccessMessage('Interests updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error updating interests:', error);
      setError('Failed to update interests. Please try again.');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#f3eee5] pt-24 sm:pt-28 px-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 max-w-md w-full text-center">
          <p className="text-xl text-[#251c1a]">Please log in to view your profile</p>
          <Link 
            to="/login" 
            className="mt-4 inline-block bg-[#251c1a] text-white px-6 py-2 rounded-lg"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3eee5] pt-24 sm:pt-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#251c1a] to-[#3b2a25] relative h-48 sm:h-64">
            <div className="absolute top-6 left-6">
              <Link to="/dashboard" className="text-[#f3eee5] hover:text-[#c8a27c] transition-colors flex items-center group">
                <FaArrowLeft className="mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-[#c8a27c]/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaGavel className="text-[#f3eee5] text-4xl" />
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#251c1a]/40 to-transparent"></div>
          </div>
          
          <div className="relative px-6 sm:px-8 pb-8">
            {/* Profile Picture */}
            <div className="relative mx-auto -mt-16 w-32 h-32 rounded-full border-4 border-white shadow-lg bg-[#f3eee5]">
              <div className="w-full h-full rounded-full overflow-hidden">
                {currentUser.photoURL ? (
                  <img 
                    id="profile-picture"
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#251c1a]/10">
                    <FaUser className="text-4xl text-[#251c1a]/40" id="profile-picture" />
                  </div>
                )}
              </div>
              
              <button 
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#c8a27c] rounded-full text-white flex items-center justify-center shadow-lg hover:bg-[#b08e69] transition-colors"
                disabled={isUploading}
                title="Upload profile picture"
              >
                <FaCamera />
              </button>
              
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/gif, image/webp"
                disabled={isUploading}
              />
              
              {isUploading && (
                <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center bg-black/30">
                  <div className="w-full h-1.5 bg-[#f3eee5]/30 absolute bottom-0">
                    <div 
                      className="h-full bg-[#c8a27c]" 
                      style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease-out' }}
                    ></div>
                  </div>
                  <span className="text-white font-medium text-sm">{uploadProgress}%</span>
                </div>
              )}
            </div>
            
            {/* User Information */}
            <div className="mt-6 text-center">
              <div className="flex justify-center items-center">
                {isEditingName ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="border border-[#c8a27c]/30 rounded-lg px-3 py-2 text-xl font-semibold text-[#251c1a] text-center focus:outline-none focus:ring-2 focus:ring-[#c8a27c]"
                      placeholder="Your name"
                      autoFocus
                    />
                    <button
                      onClick={handleNameSave}
                      className="w-8 h-8 bg-[#c8a27c] text-white rounded-full flex items-center justify-center hover:bg-[#b08e69] transition-colors"
                      title="Save"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={handleNameCancel}
                      className="w-8 h-8 bg-[#251c1a] text-white rounded-full flex items-center justify-center hover:bg-[#3b2a25] transition-colors"
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-[#251c1a]">
                      {currentUser.displayName || 'No name set'}
                    </h1>
                    <button
                      onClick={handleNameEdit}
                      className="ml-2 text-[#c8a27c] hover:text-[#b08e69] transition-colors"
                      title="Edit name"
                    >
                      <FaPencilAlt />
                    </button>
                  </div>
                )}
              </div>
              
              <p className="mt-1 text-[#251c1a]/70">{currentUser.email}</p>
            </div>
            
            {/* Account Info */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-[#251c1a] flex items-center">
                <span className="bg-[#c8a27c]/20 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <FaUser className="text-[#c8a27c]" />
                </span>
                Account Information
              </h2>
              <div className="bg-[#f9f6f1] rounded-lg p-6 space-y-4 border border-[#c8a27c]/20">
                <div className="flex justify-between items-center border-b border-[#c8a27c]/10 pb-3">
                  <span className="text-[#251c1a]/70 font-medium">Member since</span>
                  <span className="font-semibold text-[#251c1a] bg-[#c8a27c]/10 px-3 py-1 rounded-full text-sm">
                    {userProfile?.createdAt 
                      ? new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#251c1a]/70 font-medium">Account type</span>
                  <span className="font-semibold text-[#251c1a] bg-[#c8a27c]/10 px-3 py-1 rounded-full text-sm flex items-center">
                    {userProfile?.accountType === 'google' 
                      ? 'Google Login'
                      : userProfile?.accountType === 'github'
                      ? 'GitHub Login'
                      : 'Email Login'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Legal Interest Areas */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-[#251c1a] flex items-center">
                <span className="bg-[#c8a27c]/20 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <FaGavel className="text-[#c8a27c]" />
                </span>
                Legal Interest Areas
              </h2>
              <div className="bg-[#f9f6f1] rounded-lg p-6 border border-[#c8a27c]/20">
                <p className="text-[#251c1a]/70 mb-4">Select your legal interests to personalize your experience:</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {legalInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-2 text-sm rounded-full transition-all ${
                        selectedInterests.includes(interest)
                          ? 'bg-[#c8a27c] text-white font-medium'
                          : 'bg-[#c8a27c]/10 text-[#251c1a] hover:bg-[#c8a27c]/20'
                      }`}
                    >
                      {interest}
                      {selectedInterests.includes(interest) && <span className="ml-2">✓</span>}
                    </button>
                  ))}
                  
                  {/* Custom interest entry */}
                  {isAddingInterest ? (
                    <div className="flex items-center space-x-2 min-w-[200px]">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        className="flex-1 border border-[#c8a27c]/30 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8a27c]"
                        placeholder="Add custom interest"
                        autoFocus
                      />
                      <button
                        onClick={handleAddCustomInterest}
                        className="w-7 h-7 bg-[#c8a27c] text-white rounded-full flex items-center justify-center hover:bg-[#b08e69] transition-colors"
                        disabled={!newInterest.trim()}
                      >
                        <FaCheck className="text-xs" />
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingInterest(false);
                          setNewInterest('');
                        }}
                        className="w-7 h-7 bg-[#251c1a] text-white rounded-full flex items-center justify-center hover:bg-[#3b2a25] transition-colors"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingInterest(true)}
                      className="px-3 py-2 text-sm rounded-full bg-[#251c1a]/10 text-[#251c1a] hover:bg-[#251c1a]/20 flex items-center"
                    >
                      <FaPlus className="mr-1 text-xs" /> Add Custom
                    </button>
                  )}
                </div>
                
                {/* Update button */}
                <button
                  onClick={handleUpdateInterests}
                  className="w-full bg-[#c8a27c] text-white py-2.5 rounded-lg hover:bg-[#b08e69] transition-colors font-medium flex items-center justify-center"
                  disabled={selectedInterests.length === 0}
                >
                  Update Interests
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="mt-8 flex justify-between">
              <button 
                onClick={() => navigate('/dashboard')} 
                className="px-6 py-3 bg-[#251c1a]/10 text-[#251c1a] rounded-lg hover:bg-[#251c1a]/20 transition-colors flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Cancel
              </button>
              
              <button 
                onClick={() => navigate('/dashboard')} 
                className="px-6 py-3 bg-[#251c1a] text-white rounded-lg hover:bg-[#3b2a25] transition-colors"
              >
                Save & Return to Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;