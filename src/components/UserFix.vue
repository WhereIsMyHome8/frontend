<template>
  <div class="form-signup">
    <h1>회원정보 수정</h1>

    <b-input-group prepend="비밀번호">
      <b-form-input
        :value="user_data.pass"
        :disabled="false"
        v-model="user_data.pass"
      ></b-form-input>
    </b-input-group>
    <b-input-group prepend="이름">
      <b-form-input v-model="user_data.name"></b-form-input>
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
      >회원정보수정</b-button
    >
  </div>
</template>

<script type="text/javascript">
import { userUpdate } from "@/api/user";
import { mapState } from "vuex";

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
      user_data: null,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },

  created() {
    console.log(this.userInfo);
    this.user_data = this.userInfo;

    let firstemail = this.userInfo.email.split("@");
    this.emailfirst = firstemail[0];
    this.emailsecond = firstemail[1];

    let firstphone = this.userInfo.phone.split("-");
    this.phone1 = firstphone[0];
    this.phone2 = firstphone[1];
    this.phone3 = firstphone[2];
  },
  methods: {
    register() {
      let user = {
        id: this.user_data.id,
        pass: this.user_data.pass,
        name: this.user_data.name,
        email: this.emailfirst + "@" + this.emailsecond,
        phone: this.phone1 + "-" + this.phone2 + "-" + this.phone3,
      };

      userUpdate(
        user,
        () => {
          alert("회원정보수정 성공!");
          this.$router.push({ name: "home" });
        },
        () => {
          alert("회원정보수정 실패:포함되지 않은 항목이 존재 합니다");
        }
      );
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
