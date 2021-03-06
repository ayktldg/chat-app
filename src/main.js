import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/css/tailwind.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsSNibaYDFeGGBog7eyDWCipyIychKzh8",
  authDomain: "chat-app-78874.firebaseapp.com",
  projectId: "chat-app-78874",
  storageBucket: "chat-app-78874.appspot.com",
  messagingSenderId: "277088526062",
  appId: "1:277088526062:web:c09b662b773f9a09339dff",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
