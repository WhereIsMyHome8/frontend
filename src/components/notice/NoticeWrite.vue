<template>
  <b-container>
    <b-row no-gutters>
      <b-col>
        <b-input-group prepend="num">
          <b-form-input v-model="notice.num" :disabled="true"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group prepend="작성자">
          <b-form-input
            v-model="notice.user_id"
            :disabled="true"
          ></b-form-input>
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group prepend="작성일">
          <b-form-input v-model="notice.wdate" :disabled="true"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group prepend="완료">
          <b-form-input
            :disabled="true"
            :value="notice.done ? 'Y' : 'N'"
          ></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-input-group prepend="제목">
          <b-form-input v-model="notice.title"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group prepend="조회수">
          <b-form-input :v-model="notice.count" :disabled="true"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-form-textarea
        id="textarea"
        v-model="notice.content"
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
        <b-button variant="success" v-else @click="addNotice">작성</b-button>
        <b-button
          variant="danger"
          v-if="type === 'modify'"
          @click="deleteNotice"
          >삭제</b-button
        >
        <b-button @click="goList">목록</b-button>
      </b-button-group>
    </b-row>
  </b-container>
</template>

<script>
import {
  addNotice,
  deleteNotice,
  modifyNotice,
  detailNotice,
} from "@/api/notice.js";
import { mapState } from "vuex";
const userStore = "userStore";
export default {
  name: "NoticeWrite",
  data() {
    return {
      type: "",
      notice: {
        num: "",
        user_id: "",
        title: "",
        content: "",
        wdate: "",
        count: 0,
        done: false,
      },
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    if (this.userInfo.id != "admin") {
      alert("권한이 없습니다!");
      this.$router.go(-1);
    }

    this.type = this.$route.params.type;
    this.notice.user_id = "admin";
    this.notice.wdate = this.getDate();

    let num = this.$route.params.num;
    if (num) {
      detailNotice(
        num,
        ({ data }) => {
          this.notice = data;
        },
        () => {
          alert(`${num}번 QnA가 존재하지 않습니다`);
          this.goList();
        }
      );
    }
  },
  methods: {
    getDate() {
      let fullDate = new Date();
      console.log(fullDate);
      let year = fullDate.getFullYear();
      let month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
      let day = ("0" + fullDate.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    addNotice() {
      addNotice(
        this.notice,
        () => {
          alert("등록 성공!");
          this.goList();
        },
        () => {
          alert("등록 실패!");
        }
      );
    },
    goList() {
      this.$router.push({ name: "noticelist" });
    },
    deleteNotice() {
      deleteNotice(
        this.notice.num,
        () => {
          alert("삭제 성공!");
          this.goList();
        },
        () => {
          alert("삭제 실패!");
        }
      );
    },
    modify() {
      modifyNotice(
        this.notice,
        () => {
          alert("수정 성공!");
          this.goList();
        },
        () => {
          alert("수정 실패!");
        }
      );
    },
  },
};
</script>

<style></style>
