import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZu2OqnODEM-BMSjOWTYxWXHicjgoUyLc",
  authDomain: "city-smart-parking.firebaseapp.com",
  databaseURL: "https://city-smart-parking-default-rtdb.firebaseio.com",
  projectId: "city-smart-parking",
  storageBucket: "city-smart-parking.appspot.com",
  messagingSenderId: "891481536034",
  appId: "1:891481536034:web:3cdd91a366f012fd8ebc7b",
};


const app = initializeApp(firebaseConfig);
export default app;