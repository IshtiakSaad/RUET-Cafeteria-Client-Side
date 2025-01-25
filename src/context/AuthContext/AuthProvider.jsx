import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// import { addUserToDatabase } from "../../utils/api";
import { auth } from "../../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:3000";
  const BASE_PHOTO = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "Anonymous",
          photoURL: currentUser.photoURL || BASE_PHOTO,
        };
  
        try {
            const response = await fetch(`${BASE_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to add/update user.");
            }
    
            console.log("User Synced with DB.", response);
        } catch (error) {
            console.error("Error adding/updating user:", error);
            throw error;
        }
      }
  
      setUser(currentUser); 
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  // Logout user
  const logoutUser = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;