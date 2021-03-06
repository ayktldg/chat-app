import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import VuexPersistence from 'vuex-persist'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    isLoggedIn: false,
    users: [],
    chatRoom: {},
    messages: [],
  },
  mutations: {
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload;
      payload ? (state.isLoggedIn = true) : (state.isLoggedIn = false);
    },

    SET_USERS(state, payload) {
      state.users = payload;
    },
    SET_CHATROOM(state, payload) {
      state.chatRoom = payload;
    },
    SET_MESSAGES(state, payload) {
      state.messages = payload;
    },
  },
  actions: {
    REGISTER({ dispatch }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const setUser = {
            id: user.uid,
            name: payload.name,
            email: user.email,
            chats: [],
          };
          firebase
            .firestore()
            .collection("users")
            .doc(setUser.id)
            .set(setUser)
            .then(() => {
              dispatch("USER_STATUS");
              router.push("/Stream");
            });
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    },

    LOGIN({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          const user = userCredential.user;
          commit("SET_CURRENT_USER", user);
          router.push("/Stream");
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
        });
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

    USER_STATUS({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        commit("SET_CURRENT_USER", user);      
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

    CREATE_CHATROOM({ getters, dispatch }, payload) {
      const chatId = `${payload.id}${getters.getCurrentUser.uid}`;
      firebase
        .firestore()
        .collection("chatRooms")
        .doc(chatId)
        .set({
          id: chatId,
          users: [payload.id, getters.getCurrentUser.uid],
        })
        .then(() => {
          console.log("Document successfully written!");
          dispatch("ADD_CHAT_INFO_TO_USER", payload);
          router.push({ name: "ChatRoom", params: { id: `${chatId}` } });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },

    ADD_CHAT_INFO_TO_USER({ getters }, payload) {
      const chatId = `${payload.id}${getters.getCurrentUser.uid}`;
      firebase
        .firestore()
        .collection("users")
        .doc(`${getters.getCurrentUser.uid}`)
        .update({
          chats: firebase.firestore.FieldValue.arrayUnion(`${chatId}`),
        });
      firebase
        .firestore()
        .collection("users")
        .doc(`${payload.id}`)
        .update({
          chats: firebase.firestore.FieldValue.arrayUnion(`${chatId}`),
        });
    },

    OPEN_CHAT({ getters, commit, dispatch }, payload) {
      firebase
        .firestore()
        .collection("chatRooms")
        .where("id", "in", [
          `${payload.id}${getters.getCurrentUser.uid}`,
          `${getters.getCurrentUser.uid}${payload.id}`,
        ])
        .onSnapshot((querySnapshot) => {
          let chat = {};
          querySnapshot.forEach((doc) => {
            chat = doc.data();
          });
          commit("SET_CHATROOM", chat);
          dispatch("SET_MESSAGES", chat.id);
          router.push({ name: "ChatRoom", params: { id: `${chat.id}` } });
        });
    },

    SET_MESSAGES({ commit }, payload) {
      firebase
        .firestore()
        .collection("chatRooms")
        .doc(payload)
        .collection("messages")
        .orderBy("time")
        .onSnapshot((querySnapshot) => {
          var messages = [];
          querySnapshot.forEach((doc) => {
            messages.push(doc.data());
          });
          commit("SET_MESSAGES", messages);
        });
    },

    SEND_MESSAGE(context, payload) {
      firebase
        .firestore()
        .collection("chatRooms")
        .doc(payload.chat.id)
        .collection("messages")
        .add({
          message: payload.message,
          sender: payload.sender,
          time: firebase.firestore.Timestamp.fromDate(new Date()),
        });
    },

    
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    getCurrentUser: (state) => state.currentUser,
    getUsers: (state) => state.users,
    getChatInfo: (state) => state.chatRoom,
    getMessages: (state) => state.messages,
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
