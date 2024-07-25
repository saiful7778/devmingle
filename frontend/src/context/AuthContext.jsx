import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAxios } from "@/hooks/useAxios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [loader, setLoader] = useState(false);
  const axios = useAxios();

  const register = async (email, pass) => {
    setLoader(true);
    const { createUserWithEmailAndPassword } = await import("firebase/auth");
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const googleAuth = async () => {
    setLoader(true);
    const { GoogleAuthProvider, signInWithPopup } = await import(
      "firebase/auth"
    );
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const login = async (email, pass) => {
    setLoader(true);
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    setLoader(true);
    const { signOut } = await import("firebase/auth");
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      (async () => {
        try {
          if (currentUser) {
            setUser(currentUser);
            const { data } = await axios.post("/api/auth/login", {
              userEmail: currentUser?.email,
            });
            setUserData(data.userData);
            setToken(data.token);
          } else {
            setUser(null);
            setUserData(null);
            setToken(null);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoader(false);
        }
      })();
    });

    return () => {
      unSubscribe();
    };
  }, [axios]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        token,
        loader,
        googleAuth,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
