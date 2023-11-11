<template>
  <b-container>
    <h1>공지사항 상세정보</h1>
    <b-row no-gutters cols="4">
      <b-col cols="3">
        <b-input-group prepend="작성자">
          <b-form-input :value="notice.user_id" :disabled="true"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="5">
        <b-input-group prepend="작성시간">
          <b-form-input :value="notice.wdate" :disabled="true"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="4">
        <b-input-group prepend="조회수">
          <b-form-input :value="notice.count" :disabled="true"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>

    <!--댓글 달릴 부분이구나-->
    <b-input-group prepend="제목">
      <b-form-input :value="notice.title" :disabled="true"></b-form-input>
    </b-input-group>
    <b-form-textarea
      id="textarea"
      rows="3"
      max-rows="6"
      :value="notice.content"
      :disabled="true"
    ></b-form-textarea>

    <!-- 해당 부분은 로그인한 유저가 admin일시에만 보이도록 해야겠다  -->
    <div class="col-auto text-center">
      <button
        type="button"
        @click.stop="move_register"
        id="register"
        class="btn btn-success mb-3"
      >
        공지사항 수정
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        type="button"
        @click.stop="goList"
        id="register"
        class="btn btn-danger mb-3"
      >
        공지사항 목록
      </button>
    </div>
    <!-- 여기까지  -->
    <b-input-group prepend="댓글추가" class="mt-3">
      <b-form-input v-model="com_input"></b-form-input>
      <b-input-group-append>
        <b-button @click.stop="add_comment">추가</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-table striped hover :items="comment_list" :fields="fields"></b-table>
  </b-container>
</template>

<script type="text/javascript">
import { mapState } from "vuex";
const userStore = "userStore";
import { detailNotice, listComment, addComment } from "@/api/notice.js";

export default {
  name: "noticeDetail",

  data() {
    return {
      notice: {},
      comment_list: [],
      com_input: "",
      fields: [
        { key: "user_id", label: "작성자" },
        { key: "content", label: "내용" },
        { key: "wdate", label: "등록일" },
      ],
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },

  created() {
    let num = this.$route.params.num;
    detailNotice(
      num,
      ({ data }) => {
        this.notice = data;
        this.notice.user_id = "관리자";
      },
      () => {
        alert(`${num}번 게시물을 찾을 수 없습니다.`);
        this.$router.push({ name: "list" });
      }
    );
    listComment(
      num,
      ({ data }) => {
        this.comment_list = data;
      },
      () => {}
    );
  },
  methods: {
    move_register() {
      this.$router.push({
        name: "noticemodify",
        params: { type: "modify", num: this.notice.num },
      });
    },
    add_comment() {
      let num = this.notice.num;

      addComment(
        {
          notice_num: num,
          user_id: this.userInfo.id,
          content: this.com_input,
        },
        () => {
          listComment(
            num,
            ({ data }) => {
              this.comment_list = data;
            },
            () => {}
          );
        },
        () => {}
      );
      this.com_input = "";
    },

    goList() {
      this.$router.push({ name: "noticelist" });
    },
  },
};
//삐빅 수요일입니다.
//삐빅 테스트용입니다.
//허허
</script>
