<template>
  <b-container>
    <b-row no-gutters>
      <b-col>
        <b-input-group prepend="num">
          <b-form-input v-model="question.num" :disabled="true"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group prepend="작성자">
          <b-form-input
            v-model="question.user_id"
            :disabled="true"
          ></b-form-input>
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group prepend="작성일">
          <b-form-input
            v-model="question.wdate"
            :disabled="true"
          ></b-form-input>
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group prepend="완료">
          <b-form-input
            :disabled="true"
            :value="question.done ? 'Y' : 'N'"
          ></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-input-group prepend="제목">
          <b-form-input v-model="question.title"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group prepend="조회수">
          <b-form-input
            v-model="question.count"
            :disabled="true"
          ></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-form-textarea
        id="textarea"
        v-model="question.content"
        placeholder="내용 입력..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-button-group>
        <b-button variant="info" v-if="type === 'modify'" @click="modify"
          >수정</b-button
        >
        <b-button variant="success" v-else @click="addQnA">작성</b-button>
        <b-button variant="danger" v-if="type === 'modify'" @click="deleteQnA"
          >삭제</b-button
        >
        <b-button @click="goList">목록</b-button>
      </b-button-group>
    </b-row>
  </b-container>
</template>

<script>
import { detailQna, addQna, deleteQna, modifyQna } from "@/api/qna.js";
import { mapGetters } from "vuex";

export default {
  name: "QnAWrite",
  data() {
    return {
      type: "",
      question: {
        num: 0,
        user_id: "",
        title: "",
        content: "",
        wdate: "",
        count: "0",
        done: false,
      },
    };
  },
  computed: {
    ...mapGetters("userStore", ["checkUserInfo"]),
  },
  created() {
    this.type = this.$route.params.type;
    this.question.user_id = this.checkUserInfo.id;
    let num = this.$route.params.num;
    if (num) {
      detailQna(
        num,
        ({ data }) => {
          if (this.checkUserInfo.id !== data.user_id) {
            alert("권한이 없습니다!");
            this.$router.go(-1);
          }
          this.question = data;
        },
        () => {
          alert(`${num}번 QnA가 존재하지 않습니다`);
          this.goList();
        }
      );
    } else this.question.wdate = this.getDate();
  },
  methods: {
    getDate() {
      let fullDate = new Date();
      let year = fullDate.getFullYear();
      let month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
      let day = ("0" + fullDate.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    addQnA() {
      addQna(
        this.question,
        () => {
          alert("등록 성공!");
          this.goList();
        },
        () => {
          alert("등록 실패!");
        }
      );
    },
    modify() {
      modifyQna(
        this.question,
        () => {
          alert("수정 성공!");
          this.goList();
        },
        () => {
          alert("수정 실패!");
        }
      );
    },
    deleteQnA() {
      deleteQna(
        this.question.num,
        () => {
          alert("삭제 성공!");
          this.goList();
        },
        () => {
          alert("수정 실패!");
        }
      );
    },
    goList() {
      this.$router.push({ name: "qnalist" });
    },
  },
};
</script>

<style>
</style>
