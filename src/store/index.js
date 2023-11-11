import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import userStore from "@/store/modules/userStore";
import aptStore from "@/store/modules/aptStore"

// import Constant from "../util/Constant";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    aptStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
