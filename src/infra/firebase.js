import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// firebase config
const config = {
  apiKey: "AIzaSyB4K3xijcALPyI4Rz_3emzRWa__HSz6evA",
  authDomain: "gh-gitbar.firebaseapp.com",
  projectId: "gh-gitbar",
  storageBucket: "gh-gitbar.appspot.com",
  messagingSenderId: "454692550816",
  appId: "1:454692550816:web:6b138d26ee077deb5a31c5",
};

const app = initializeApp(config);

// firebase authentication
const auth = getAuth(app);

export default {
  auth,
};
