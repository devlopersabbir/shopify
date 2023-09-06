import React, { createContext, useEffect, useReducer, useState } from 'react';

import app from '../../firebase/firebase.config'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'

export const AuthContext = createContext()
const auth = getAuth(app)

const initialState = {

  carts: false,

};
const UserContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userRole, setUserRole] = useState(null);
    const [cartState, cartDispatch] = useReducer(
      cartReducer,
      getInitialCartState()
    );
    // sign up
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signin
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // sign withgoogle

    const google = (googleProvider) => {
        return signInWithPopup(auth, googleProvider)
    }

    // signout

    const logOut = () => {
        return signOut(auth)
    }

    //update user

    const updateUser = userInfo => {
        return updateProfile(auth.currentUser, userInfo)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false)
                ;
        });

        return () => {
            return unsubscribe();
        }
    }, [])

//
useEffect(() => {
    if (user && user.email) {
      // Check if user is authenticated and has a UID
      console.log("Fetching user role for user ID:", user.uid);
      fetch(`http://localhost:5000/get-user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
          setUserRole(data.role || "Buyer");
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    } else {
      // If user is not authenticated or missing UID, assume the role is "Buyer"
      setUserRole("Buyer");
    }
  }, [user]);
  //cart
  // Save cart data to local storage
  function getInitialCartState() {
    const storedCartItems = localStorage.getItem("cartItems");
    return {
      ...initialState,
      cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
    };
  }
  // Cart container
  function cartReducer(state, action) {
    switch (action.type) {
      case "ADD_TO_CART":
  const updatedCartItems = [...state.cartItems];
  const existingItemIndex = updatedCartItems.findIndex(
    (item) => item._id === action.payload._id
  );

  if (existingItemIndex !== -1) {
    // If the item already exists, update its quantity
    updatedCartItems[existingItemIndex].quantity += 1;
  } else {
    // If the item is not in the cart, add it with quantity 1
    updatedCartItems.push({ ...action.payload, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

  return {
    ...state,
    cartItems: updatedCartItems,
  };



    const authInfo = { loading, user, createUser, updateUser, signIn, logOut, google,userRole,cartState,
      cartDispatch,
      handleCartDelete,
       }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default UserContext;