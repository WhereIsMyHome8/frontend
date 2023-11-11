<template>
  <b-container fluid>
    <b-row cols="4" no-gutters>
      <b-col
        ><b-form-select
          v-model="sidoCode"
          :options="sidoList"
          @change="getGugun"
        ></b-form-select
      ></b-col>
      <b-col>
        <b-form-select
          v-model="gugunCode"
          :options="gugunList"
          @change="getDong"
        ></b-form-select
      ></b-col>
      <b-col
        ><b-form-select v-model="dongCode" :options="dongList"></b-form-select
      ></b-col>
      <b-col
        ><b-button
          block
          variant="outline-primary"
          @click="searchApt({ type: 'dong', keyword: dongCode })"
          >검색</b-button
        ></b-col
      >
    </b-row>
  </b-container>
</template>

<script>
import { listSido, listGugun, listDong } from "@/api/search";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      sidoCode: "",
      gugunCode: "",
      dongCode: "",
      sidoList: [],
      gugunList: [],
      dongList: [],
    };
  },
  created() {
    listSido(
      ({ data }) => {
        this.sidoList = [];
        data.forEach((element) => {
          this.sidoList.push({
            value: element.sidoCode,
            text: element.sidoName,
          });
        });
      },
      (err) => {
        console.log(err);
        alert("시도 리스트 불러오기 실패");
      }
    );
  },
  methods: {
    ...mapActions("aptStore", ["searchApt"]),
    getGugun() {
      listGugun(
        this.sidoCode,
        ({ data }) => {
          this.gugunList = [];
          data.forEach((element) => {
            this.gugunList.push({
              value: element.gugunCode,
              text: element.gugunName,
            });
          });
        },
        () => {}
      );
    },
    getDong() {
      listDong(
        this.gugunCode,
        ({ data }) => {
          this.dongList = [];
          data.forEach((element) => {
            this.dongList.push({
              value: element.dongCode,
              text: element.dongName,
            });
          });
        },
        () => {}
      );
    },
  },
};
</script>

<style>
.row {
  margin-top: 20px;
}
</style>
