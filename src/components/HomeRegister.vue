<template>
  <div class="form-signup">
    <h1>회원가입</h1>
    <b-input-group prepend="아이디">
      <b-form-input v-model="userid"></b-form-input>
    </b-input-group>
    <b-input-group prepend="비밀번호">
      <b-form-input v-model="userpwd"></b-form-input>
    </b-input-group>
    <b-input-group prepend="이름">
      <b-form-input v-model="username"></b-form-input>
    </b-input-group>
    <b-input-group prepend="이메일">
      <b-form-input v-model="emailfirst"></b-form-input>
      <b-input-group-text>@</b-input-group-text>
      <b-form-select v-model="emailsecond" :options="domains"></b-form-select>
    </b-input-group>
    <b-input-group prepend="전화번호">
      <b-form-input v-model="phone1"></b-form-input>
      <b-input-group-text>-</b-input-group-text>
      <b-form-input v-model="phone2"></b-form-input>
      <b-input-group-text>-</b-input-group-text>
      <b-form-input v-model="phone3"></b-form-input>
    </b-input-group>
    <b-button @click="register" varient="primary" class="mt-3"
      >회원가입</b-button
    >
  </div>
</template>

<script type="text/javascript">
import { signup } from "@/api/user";
// import { mapGetters } from "vuex";
export default {
  name: "HomeRegister",
  data() {
    return {
      username: "",
      userid: "",
      userpwd: "",
      emailfirst: "",
      emailsecond: "",
      phone1: "",
      phone2: "",
      phone3: "",
      domains: ["ssafy.com", "naver.com", "google.com"],
    };
  },
  methods: {
    register() {
      let user = {
        id: this.userid,
        pass: this.userpwd,
        name: this.username,
        email: this.emailfirst + "@" + this.emailsecond,
        phone: this.phone1 + "-" + this.phone2 + "-" + this.phone3,
      };
      if (user.id == "") alert("아이디를 입력해 주세요");
      else {
        signup(
          user,
          () => {
            alert("회원가입 성공!");
            this.$router.push({ name: "home" });
          },
          () => {
            alert("회원가입 실패:중복 id가 존재합니다");
          }
        );
      }
    },
  },
};
</script>

<style>
.form-signup {
  margin: auto;
  margin-top: 50px;
  width: 50%;
  padding: 10px;
  border: 1px solid rgb(190, 174, 101);
  border-radius: 30px;
}
</style>
