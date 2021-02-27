import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    currentUser: null,
    isLoggedIn: false,
  },
  mutations: {
    SET_USER(state, payload) {
      state.currentUser = payload;
      payload ? (state.isLoggedIn = true) : (state.isLoggedIn = false);
    },

    SET_USERS(state, payload) {
      state.users = payload
    },
  },
  actions: {
    LOGIN() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },

    LOGOUT() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CHECK_USER_STATUS({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const setUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            messages: [],
          };
          firebase
            .firestore()
            .collection("users")
            .doc(setUser.id)
            .set(setUser)
            .then(() => {
              commit("SET_USER", user);
              router.push("/Stream");
            });
        } else {
          commit("SET_USER", user);
        }
      });
    },

    SET_USERS({ commit, getters }) {
      console.log(getters.getCurrentUser.uid)
      firebase
        .firestore()
        .collection("users").where("id", "!=", `${getters.getCurrentUser.uid}`)
        .onSnapshot((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            users.push(doc.data());
          });
          commit("SET_USERS", users)
        });
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    getCurrentUser: (state) => state.currentUser,
    getUsers: (state) => state.users,
  },
  modules: {},
});
