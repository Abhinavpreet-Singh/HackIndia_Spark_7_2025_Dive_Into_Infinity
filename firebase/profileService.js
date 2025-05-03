import { db, storage } from './config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const userProfilesCollection = 'userProfiles';

// Create or update a user profile
export const saveUserProfile = async (userId, profileData) => {
  try {
    // Check if profile already exists
    const profileRef = doc(db, userProfilesCollection, userId);
    const profileSnap = await getDoc(profileRef);
    
    // Set timestamp for update tracking
    const timestamp = new Date().toISOString();
    const dataWithTimestamp = { ...profileData, updatedAt: timestamp };
    
    if (profileSnap.exists()) {
      // Update existing profile
      await updateDoc(profileRef, dataWithTimestamp);
      return { ...profileSnap.data(), ...dataWithTimestamp };
    } else {
      // Create new profile with default fields
      const newProfile = {
        userId,
        displayName: '',
        bio: '',
        interests: [],
        hobbies: [],
        skills: [],
        photoURL: '',
        collaborationPreferences: [],
        completedProfile: false,
        createdAt: timestamp,
        ...dataWithTimestamp
      };
      
      await setDoc(profileRef, newProfile);
      return newProfile;
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

// Get a user profile by ID
export const getUserProfile = async (userId) => {
  try {
    const profileRef = doc(db, userProfilesCollection, userId);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      return profileSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Upload a profile image
export const uploadProfileImage = async (userId, file) => {
  try {
    // Create a unique filename with timestamp to avoid caching issues
    const timestamp = new Date().getTime();
    const fileExtension = file.name.split('.').pop();
    const filename = `${userId}_${timestamp}.${fileExtension}`;
    
    // Create a storage reference with the unique filename
    const storageRef = ref(storage, `profile_images/${filename}`);
    
    // Upload the file with metadata to ensure proper caching
    const metadata = {
      contentType: file.type,
      cacheControl: 'no-cache'
    };
    
    // Upload the file with metadata
    const snapshot = await uploadBytes(storageRef, file, metadata);
    
    // Get the download URL with cache busting query parameter
    const downloadURL = await getDownloadURL(snapshot.ref);
    const cachebustedURL = `${downloadURL}?t=${timestamp}`;
    
    // Update the user profile with the new image URL in Firestore
    await saveUserProfile(userId, { 
      photoURL: cachebustedURL,
      updatedAt: new Date().toISOString() 
    });
    
    return cachebustedURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

// Update user display name
export const updateUserDisplayName = async (user, displayName) => {
  try {
    // Update in auth
    await updateProfile(user, { displayName });
    
    // Update in profile
    await saveUserProfile(user.uid, { 
      displayName, 
      updatedAt: new Date().toISOString() 
    });
    
    return true;
  } catch (error) {
    console.error('Error updating display name:', error);
    throw error;
  }
};

// Update user profile photo
export const updateUserProfilePhoto = async (user, photoURL) => {
  try {
    // Update in auth with retry logic
    let retryAttempt = 0;
    const maxRetries = 3;
    
    while (retryAttempt < maxRetries) {
      try {
        await updateProfile(user, { photoURL });
        break; // If successful, exit the retry loop
      } catch (error) {
        retryAttempt++;
        if (retryAttempt === maxRetries) {
          throw error; // If we've tried enough times, rethrow the error
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // Explicitly update in Firestore to ensure consistency
    await saveUserProfile(user.uid, { 
      photoURL, 
      updatedAt: new Date().toISOString() 
    });
    
    return true;
  } catch (error) {
    console.error('Error updating profile photo:', error);
    throw error;
  }
};

// Update user interests
export const updateUserInterests = async (userId, interests) => {
  try {
    // Update in profile
    await saveUserProfile(userId, { 
      interests, 
      updatedAt: new Date().toISOString() 
    });
    
    return true;
  } catch (error) {
    console.error('Error updating interests:', error);
    throw error;
  }
};

// Check if a user has completed their profile
export const hasCompletedProfile = async (userId) => {
  try {
    const profile = await getUserProfile(userId);
    return profile && profile.completedProfile === true;
  } catch (error) {
    console.error('Error checking profile completion:', error);
    return false;
  }
};

// Available interests categories for the platform
export const interestCategories = [
  "Sports & Athletics",
  "Arts & Creative",
  "Technology & Programming",
  "Music & Performance",
  "Academic & Learning",
  "Games & Recreation",
  "Outdoor & Adventure",
  "Social & Community"
];

// Sample interests data by category
export const interestsByCategory = {
  "Sports & Athletics": [
    "Football", "Basketball", "Volleyball", "Tennis", "Swimming", 
    "Cricket", "Badminton", "Running", "Cycling", "Yoga", "Martial Arts"
  ],
  "Arts & Creative": [
    "Painting", "Drawing", "Photography", "Graphic Design", "Sculpture", 
    "Creative Writing", "Poetry", "Film Making", "Animation"
  ],
  "Technology & Programming": [
    "Web Development", "Mobile App Development", "Data Science", 
    "Artificial Intelligence", "Game Development", "Cybersecurity",
    "Robotics", "Blockchain"
  ],
  "Music & Performance": [
    "Singing", "Guitar", "Piano", "Drums", "Violin", "Dance", "Theater", 
    "DJ", "Band", "Music Production"
  ],
  "Academic & Learning": [
    "Study Groups", "Research", "Debates", "Language Learning", 
    "Literature", "Physics", "Mathematics", "Chemistry", "Biology", 
    "History", "Philosophy"
  ],
  "Games & Recreation": [
    "Video Games", "Board Games", "Chess", "Card Games", 
    "Puzzle Solving", "Esports", "Role-playing Games"
  ],
  "Outdoor & Adventure": [
    "Hiking", "Camping", "Fishing", "Rock Climbing", "Kayaking", 
    "Biking", "Bird Watching", "Photography", "Traveling"
  ],
  "Social & Community": [
    "Volunteering", "Cultural Clubs", "Environmental Groups", 
    "Social Justice", "Debate Teams", "Public Speaking", "Events Planning"
  ]
};

// Collaboration preferences
export const collaborationTypes = [
  "Study Partners", 
  "Project Collaborators", 
  "Workout Buddies",
  "Practice Partners",
  "Mentorship", 
  "Team Members",
  "Casual Meetups", 
  "Skill Exchange"
];