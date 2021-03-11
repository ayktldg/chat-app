import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/css/tailwind.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('en', en);

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

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

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
