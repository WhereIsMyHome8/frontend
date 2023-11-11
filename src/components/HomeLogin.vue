<template>
  <div class="form-container">
    <h1>로그인</h1>
    <b-input-group prepend="아이디">
      <b-form-input v-model="id"></b-form-input>
    </b-input-group>

    <b-input-group prepend="비밀번호">
      <b-form-input type="password" v-model="pass"></b-form-input>
    </b-input-group>

    <b-button
      class="mt-3"
      @click.stop="confirm({ id: id, pass: pass })"
      variant="primary"
    >
      로그인
    </b-button>
    &nbsp;&nbsp;
    <b-button class="mt-3" @click.stop="move_pwfind" variant="outline-primary">
      비밀번호찾기
    </b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const userStore = "userStore";
export default {
  name: "HomeLogin",
  components: {},
  data() {
    return {
      id: "",
      pass: "",
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userConfirm", "getUserInfo", "getInterestList"]),
    async confirm() {
      await this.userConfirm({ id: this.id, pass: this.pass });
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        await this.getInterestList();
        this.$router.go(-1);
      } else {
        alert("로그인 실패");
      }
    },
    move_pwfind() {
      this.$router.push({
        name: "move_find",
      });
    },
  },
};
</script>

<style>
.form-container {
  margin: auto;
  margin-top: 50px;
  padding: 10px;
  width: 40%;
  border: 1px solid rgb(190, 174, 101);
  border-radius: 30px;
}
.input-group-text {
  width: 90px;
}
</style>
