import * as firebase from "firebase/app";
import axios from "axios";

import "firebase/firebase-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqpKacik9nL9Fp57CTcgVOkafz8sWm0nM",
  authDomain: "makan-a9ad2.firebaseapp.com",
  databaseURL: "https://makan-a9ad2.firebaseio.com",
  projectId: "makan-a9ad2",
  storageBucket: "makan-a9ad2.appspot.com",
  messagingSenderId: "413586914362",
  appId: "1:413586914362:web:35f650f02ed27f41f34903",
};

firebase.initializeApp(firebaseConfig);

export default firebase.storage().ref();
