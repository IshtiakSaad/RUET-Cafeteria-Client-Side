import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { signOut, onAuthStateChanged } from "firebase/auth";
// import { addUserToDatabase } from "../../utils/api";
import { auth } from "../../firebase/firebase.config";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:3000";
  const BASE_PHOTO =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const axiosPublic = useAxiosPublic();

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });

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

          console.log("User Synced with DB.");
        } catch (error) {
          console.error("Error adding/updating user:", error);
          throw error;
        }
      } else {
        // Do something.
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        localStorage.removeItem("access-token");
      }
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
