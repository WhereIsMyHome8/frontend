<template>
  <b-container>
    <h1>유저 상세정보</h1>
    <b-avatar
      variant="info"
      src="https://placekitten.com/300/300"
      class="mr-10"
      size="12rem"
    ></b-avatar>
    <span class="mr-auto"> {{ checkUserInfo.name }}</span>
    <br />
    <br />
    <button class="btn btn-primary" @click="moveFix">회원정보 수정</button>
    <!-- <b-badge>{{}}</b-badge> -->
    <b-row no-gutters cols="4">
      <b-col cols="5">
        <h1>qna게시판 목록</h1>s
        <b-table
          striped
          hover
          :per-page="perPage"
          @row-clicked="moveDetail"
          :fields="fields"
          :items="QnA_list"
          :current-page="curPage"
        >
        </b-table>
        <b-pagination
          :total-rows="QnA_list.length"
          v-model="curPage"
          :per-page="perPage"
          align="center"
          limit="4"
        ></b-pagination>
      </b-col>
      <b-col cols="2"></b-col>
      <b-col cols="5">
        <h1>관심 아파트 목록</h1>
        <b-table
          striped
          hover
          :fields="fields1"
          :per-page="perPage"
          :current-page="curPage1"
          :items="checkInterestList"
        >
          <template v-slot:cell(actions)="{ item }">
            <span><b-button @click="deleteint(item)">삭제</b-button></span>
          </template>
        </b-table>
        <b-pagination
          :total-rows="checkInterestList.length"
          v-model="curPage1"
          :per-page="perPage"
          align="center"
          limit="4"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script type="text/javascript">
import { listUser } from "@/api/qna.js";
import { listInterest, deleteOne } from "@/api/interest.js";
import { mapGetters, mapActions } from "vuex";
const userStore = "userStore";

export default {
  name: "userInform",

  data() {
    return {
      notice: {},
      QnA_list: [],
      curPage: 1,
      curPage1: 1,
      perPage: 3,
      fields: [
        { key: "num", label: "글번호" },
        { key: "title", label: "제목" },
        { key: "content", label: "내용" },
        { key: "wdate", label: "작성일" },
      ],
      fields1: [{ key: "aptName", label: "아파트 이름" }, "actions"],
    };
  },
  computed: {
    ...mapGetters(userStore, ["checkUserInfo", "checkInterestList"]),
  },
  created() {
    listUser(
      this.checkUserInfo.id,
      ({ data }) => {
        this.QnA_list = data;
      },
      () => {
        alert("QnA 리스트 가져오기 실패");
      }
    );
    listInterest(
      this.checkUserInfo.id,
      ({ data }) => {
        this.Interest_list = data;
      },
      () => {
        alert("관심 아파트 리스트 가져오기 실패");
      }
    );
  },

  methods: {
    ...mapActions("userStore", ["getInterestList"]),
    moveDetail(item) {
      this.$router.push({ name: "qnadetail", params: { num: item.num } });
    },
    deleteint(item) {
      deleteOne(
        { userId: this.checkUserInfo.id, aptCode: item.aptCode, aptName: "" },
        () => {
          this.getInterestList();
        },
        () => {
          alert("관심 아파트 리스트 가져오기 실패");
        }
      );
    },
    moveFix() {
      this.$router.push({ name: "userFix" });
    },
  },
};
</script>
