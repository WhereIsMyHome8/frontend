import { listApartment, dealInfoFilter } from "@/api/apt.js";

const aptStore = {
  namespaced: true,
  state: {
    aptlist: [],
    aptpositions: [],
    apt: "",
    aptCode: "0",
  },
  getters: {
    getaptCode(state) {
      return state.aptCode;
    },
  },

  mutations: {
    INIT_APT_LIST(state) {
      state.aptlist = [];
      state.aptpositions = [];
    },
    SEARCH_APT(state, data) {
      if (!data) return;
      data.forEach((apt) => {
        console.log(apt);
        let dealInfo = dealInfoFilter(apt);
        state.aptlist.push({
          aptName: apt.aptName,
          aptCode: apt.aptCode,
          dealInfo,
          buildYear: apt.buildYear,
          area: apt.area,
          jibun: apt.jibun,
        });
        state.aptpositions.push([Number(apt.lat), Number(apt.lng)]);
      });
    },
    SET_APT_CODE(state, data) {
      state.aptCode = data;
    },
  },

  actions: {
    searchApt({ commit }, payload) {
      listApartment(
        payload.type,
        payload.keyword,
        ({ data }) => {
          commit("INIT_APT_LIST");
          commit("SEARCH_APT", data);
        },
        () => {}
      );
    },
  },
};

export default aptStore;
