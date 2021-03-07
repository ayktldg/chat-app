import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import VuexPersistence from "vuex-persist";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {},
    users: [],
    chatRoom: {},
    messages: [],
  },
  mutations: {
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload;
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
    REGISTER(context, payload) {
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
              router.push("/Stream");
            });
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    },

    LOGIN(context, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => router.push("/stream"))
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
        if (user) {
          const userId = user.uid;
          firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .onSnapshot((doc) => {
              commit("SET_CURRENT_USER", doc.data());
            });
        } else {
          commit("SET_CURRENT_USER", {});
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

    CREATE_CHATROOM({ getters, dispatch }, payload) {
      const chatId = `${payload.id}${getters.getCurrentUser.id}`;
      firebase
        .firestore()
        .collection("chatRooms")
        .doc(chatId)
        .set({
          id: chatId,
          users: [payload.id, getters.getCurrentUser.id],
        })
        .then(() => {
          console.log("Document successfully written!");
          dispatch("ADD_CHAT_INFO_TO_USER", { user: payload, chatId: chatId });
          router.push({ name: "ChatRoom", params: { id: `${chatId}` } });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },

    ADD_CHAT_INFO_TO_USER({ getters }, payload) {
      firebase
        .firestore()
        .collection("users")
        .doc(`${getters.getCurrentUser.id}`)
        .update({
          chats: firebase.firestore.FieldValue.arrayUnion(`${payload.chatId}`),
        });
      firebase
        .firestore()
        .collection("users")
        .doc(`${payload.user.id}`)
        .update({
          chats: firebase.firestore.FieldValue.arrayUnion(`${payload.chatId}`),
        });
    },

    OPEN_CHAT({ getters, commit, dispatch }, payload) {
      firebase
        .firestore()
        .collection("chatRooms")
        .where("id", "in", [
          `${payload.id}${getters.getCurrentUser.id}`,
          `${getters.getCurrentUser.id}${payload.id}`,
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
    getCurrentUser: (state) => state.currentUser,
    getUsers: (state) => state.users,
    getChatInfo: (state) => state.chatRoom,
    getMessages: (state) => state.messages,
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
