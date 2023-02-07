/**
 * AUTH SERVICE
 * Service responsible for user authentication. Using Firebase, if we want to change for Auth0, we'll just need to change here.
 */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  updateEmail,
} from "firebase/auth";

import firebase from "@/infra/firebase";

// register service
export const createUser = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(firebase.auth, email, password)
      .then(resolve)
      .catch(reject);
  });
};

// sign in service
export const signUserIn = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(firebase.auth, email, password)
      .then(resolve)
      .catch(reject);
  });
};

// sign out service
export const signUserOut = async () => {
  return new Promise((resolve, reject) => {
    firebaseSignOut(firebase.auth).then(resolve).catch(reject);
  });
};

// update user
export const updateUserProfile = async ({ username, email }) => {
  return new Promise((resolve, reject) => {
    const promises = [];
    if (email !== firebase.auth.currentUser.email) {
      promises.push(updateEmail(firebase.auth.currentUser, email));
    }
    if (username != firebase.auth.currentUser.displayName) {
      promises.push(
        updateProfile(firebase.auth.currentUser, { displayName: username })
      );
    }
    Promise.all(promises).then(resolve).catch(reject);
  });
};

// get current user (from https://github.com/firebase/firebase-js-sdk/issues/462)
export const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
