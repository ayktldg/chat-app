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
    chatRoom: {},
  },
  mutations: {
    SET_USER(state, payload) {
      state.currentUser = payload;
      payload ? (state.isLoggedIn = true) : (state.isLoggedIn = false);
    },

    SET_USERS(state, payload) {
      state.users = payload;
    },
    SET_CHATROOM(state, payload) {
      state.chatRoom = payload;
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
            chats: [],
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

    SET_USERS({ commit }) {
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            users.push(doc.data());
          });
          commit("SET_USERS", users);
        });
    },

    CREATE_CHATROOM({ getters }, payload) {
      const chatId = `${payload.id}${getters.getCurrentUser.uid}`;
      firebase
        .firestore()
        .collection("chatRooms")
        .doc(chatId)
        .set({
          id: chatId,
          users: [payload.id, getters.getCurrentUser.uid],
          messages: [],
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },

    OPEN_CHAT({ getters, commit }, payload) {
      firebase
        .firestore()
        .collection("chatRooms")
        .where("id", "in", [
          `${payload.id}${getters.getCurrentUser.uid}`,
          `${getters.getCurrentUser.uid}${payload.id}`,
        ])
        .onSnapshot((querySnapshot) => {
          var chat = {};
          querySnapshot.forEach((doc) => {
            chat = doc.data();
          });
          commit("SET_CHATROOM", chat);
          router.push({ name: "ChatRoom", params: { id: `${chat.id}` } });
        });
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    getCurrentUser: (state) => state.currentUser,
    getUsers: (state) => state.users,
    getChatRoom: (state) => state.chatRoom,
  },
  modules: {},
});
