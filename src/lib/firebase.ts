import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDv2NNLC3WfUhr0QkLqTHCS7WWx--ANhBg",
  authDomain: "web-portfolio-e2835.firebaseapp.com",
  databaseURL:
    "https://web-portfolio-e2835-default-rtdb.firebaseio.com",
  projectId: "web-portfolio-e2835",
  storageBucket: "web-portfolio-e2835.appspot.com",
  messagingSenderId: "330466957562",
  appId: "1:330466957562:web:d48f3fe187735361259143",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const database = getDatabase(app);
