<template>
  <div class="form-container">
    <h1>비밀번호찾기</h1>
    <b-input-group prepend="아이디">
      <b-form-input v-model="id"></b-form-input>
    </b-input-group>

    <b-input-group prepend="이메일">
      <b-form-input v-model="emailfirst"></b-form-input>
      <b-input-group-text>@</b-input-group-text>
      <b-form-select v-model="emailsecond" :options="domains"></b-form-select>
    </b-input-group>

    <b-button @click="pwfind" class="mt-2">비밀번호 찾기</b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import Constant from "../util/Constant";
import { findpw } from "@/api/user";
export default {
  name: "HomeFind",
  components: {},
  data() {
    return {
      id: "",
      emailfirst: "",
      emailsecond: "",
      domains: ["ssafy.com", "naver.com", "google.com"],
    };
  },
  computed: {
    ...mapState("userStore", ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions("userStore", ["userConfirm", "getUserInfo"]),
    pwfind() {
      let email = this.emailfirst + "@" + this.emailsecond;
      findpw(
        { id: this.id, email },
        () => {
          alert("비밀번호 찾기 성공!");
          this.$router.push({
            name: "login",
          });
        },
        () => {
          alert("비밀번호 찾기 실패:아이디와 이메일을 다시 확인해 주세요");
        }
      );
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
