/**
 * AUTH SERVICE
 * Service responsible for user authentication. Using Firebase, if we want to change for Auth0, we'll just need to change here.
 */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";

import firebase from "@/infra/firebase";

// register service
export const createUser = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(firebase.auth, email, password)
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
};

// sign in service
export const signUserIn = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(firebase.auth, email, password)
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
};

// sign out service
export const signUserOut = async () => {
  return new Promise((resolve, reject) => {
    firebaseSignOut(firebase.auth)
      .then((res) => resolve(res))
      .catch((e) => reject(e));
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
