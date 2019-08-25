import Vue from 'vue';
import Vuex from 'vuex';
import resource from '~/resource';
const applicationSettings = require('application-settings');

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        locale: applicationSettings.getString("locale", "ar"),
        token: applicationSettings.getString("token", ""),
        user: applicationSettings.getString("user", ""),
        event_should_change: null,
        events_should_change: null,
        search_mode: false
    },

    getters: {

        token(state) {
            return state.token;
        },

        user(state) {
            return state.user ? JSON.parse(state.user) : null;
        },

        locale(state) {
            return state.locale;
        },

        search_mode(state) {
            return state.search_mode;
        },

        events_should_change(state) {
            return state.events_should_change;
        },

        event_should_change(state) {
            return state.event_should_change;
        }
    },

    mutations: {

        token(state, token) {
            token = token ? token : "";
            state.token = token;
            applicationSettings.setString("token", token);
        },

        user(state, user) {
            user = user ? JSON.stringify(user) : "";
            state.user = user;
            applicationSettings.setString("user", user);
        },

        locale(state, locale) {
            locale = locale ? locale : "";
            state.locale = locale;
            applicationSettings.setString("local", locale);
        },

        search_mode(state, status) {
            state.search_mode = status;
        },

        event_should_change(state, event) {
            state.event_should_change = event;
        },

        events_should_change(state) {
            state.events_should_change = new Date();
        }
    },

    actions: {

        login(store, token) {

            store.commit("token", token);

            return resource.auth.get("/user", {}, {Authorization: "Bearer " + token})
                .then(data => {
                    store.commit("user", data);
                    store.commit("events_should_change");
                })
                .catch(error => {
                    console.log("Error" + error);
                });

        },

        logout(store) {
            store.commit("token", "");
            store.commit("user", "");
            store.commit("events_should_change");
        }
    }
});
