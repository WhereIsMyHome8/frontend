<template>
  <b-container>
    <h1>Qna 상세정보</h1>
    <b-row no-gutters cols="4">
      <b-col cols="3">
        <b-input-group prepend="작성자">
          <b-form-input :value="qna.user_id" :disabled="true"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="5">
        <b-input-group prepend="작성시간">
          <b-form-input :value="qna.wdate" :disabled="true"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="3">
        <b-input-group prepend="조회수">
          <b-form-input :value="qna.count" :disabled="true"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="1" v-if="qna.done" class="bg-success text-white pt-2"
        >완료</b-col
      >
      <b-col cols="1" v-else class="bg-danger text-white pt-2">미완료</b-col>
    </b-row>
    <b-input-group prepend="제목">
      <b-form-input :value="qna.title" :disabled="true"></b-form-input>
    </b-input-group>
    <b-form-textarea
      id="textarea"
      rows="3"
      max-rows="6"
      :value="qna.content"
      :disabled="true"
    ></b-form-textarea>

    <div>
      <b-button variant="info" class="mt-3 mb-3" @click="moveRegister"
        >수정</b-button
      >
      <b-button to="/qna/list" class="ml-2">목록</b-button>
    </div>

    <b-input-group prepend="댓글추가" class="mt-3" v-if="isAdmin">
      <b-form-input v-model="comInput"></b-form-input>
      <b-input-group-append>
        <b-button @click="insertComment">추가</b-button>
      </b-input-group-append>
    </b-input-group>

    <b-table striped hover :items="commentList" :fields="fields"></b-table>
  </b-container>
</template>

<script type="text/javascript">
import { listComment, detailQna, addComment, completeQna } from "@/api/qna.js";

import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "qnaDetail",

  data() {
    return {
      qna: {},
      commentList: [],
      comInput: null,
      fields: [
        { key: "user_id", label: "작성자" },
        { key: "content", label: "내용" },
        { key: "wdate", label: "등록일" },
      ],
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    isAdmin() {
      if (this.userInfo != null && this.userInfo.id === "admin") return true;
      return false;
    },
  },
  created() {
    let num = this.$route.params.num;
    detailQna(
      num,
      ({ data }) => {
        this.qna = data;
      },
      () => {
        alert(`${num}번 게시물을 찾을 수 없습니다.`);
        this.$router.push({ name: "qnalist" });
      }
    );

    listComment(
      num,
      ({ data }) => {
        this.commentList = data;
      },
      () => {}
    );
  },
  methods: {
    moveRegister() {
      this.$router.push({
        name: "qnamodify",
        params: { type: "modify", num: this.qna.num },
      });
    },
    insertComment() {
      let num = this.qna.num;
      console.log(num);
      addComment(
        {
          qna_num: num,
          user_id: "ssafy",
          content: this.comInput,
        },
        () => {
          console.log("댓글 등록 성공!");
          this.qna.done = true;
          completeQna(
            this.qna,
            () => {},
            () => {}
          );
          listComment(
            num,
            ({ data }) => {
              this.commentList = data;
            },
            () => {}
          );
        },
        () => {
          alert("댓글 등록 실패!");
        }
      );
      this.comInput = "";
    },
  },
};
//삐빅 수요일입니다.
//삐빅 테스트용입니다.
//허허
</script>
