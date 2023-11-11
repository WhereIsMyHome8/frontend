<template>
  <div class="container-fluid text-center">
    <b-nav align="end" tyep="dark" variant="dark" align-v="center">
      <b-nav-text v-if="userInfo != null"
        >안녕하세요 <span class="userid">{{ userInfo.id }}</span> 님</b-nav-text
      >
      <b-nav-item v-if="userInfo != null" @click="userInform"
        >회원정보</b-nav-item
      >
      <b-nav-item
        v-if="userInfo != null && userInfo.id == 'admin'"
        @click="userSearch"
        >회원검색</b-nav-item
      >
      <b-nav-item to="/login" v-if="!isLogin">로그인</b-nav-item>
      <b-nav-item @click="logout" v-else>로그아웃</b-nav-item>
      <b-nav-item to="/signup" v-if="!isLogin">회원가입</b-nav-item>
      <b-nav-item to="/notice/list">공지사항</b-nav-item>
      <!-- <b-nav-item @click="kLoginBtn">카카오로그인</b-nav-item> -->
      <b-nav-item to="/qna">QnA</b-nav-item>
    </b-nav>
    <div class="img-container" @click="moveHome">
      <h1>Give Me Home</h1>
      <br />
      <font size="3em">우리를 위한 집</font>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import { kakaologin } from "@/api/user.js";
const userStore = "userStore";

export default {
  name: "TheHeader",
  data() {
    return {
      id: "a",
    };
  },
  created() {
    const script = document.createElement("script");

    script.onload = () => window.Kakao.init(process.env.VUE_APP_KAKAO_MAP_KEY);
    // window.Kakao.init(process.env.VUE_APP_KAKAO_MAP_KEY);
    // script.src = `"https://developers.kakao.com/sdk/js/kakao.js"`;

    // document.head.appendChild(script);
  },
  methods: {
    ...mapActions(userStore, ["userLogout"]),
    moveHome() {
      if (this.$router.currentRoute.name === "home") {
        this.$router.go(this.$router.currentRoute);
      } else {
        this.$router.push({ name: "home" });
      }
    },
    userInform() {
      this.$router.push({ name: "userinform" });
    },
    userSearch() {
      this.$router.push({ name: "usersearch" });
    },
    logout() {
      this.userLogout().then(() => {
        this.moveHome();
      });
    },
    //   loginWithKakao() {
    //     window.Kakao.Auth.authorize({
    //       redirectUri: "http://localhost:8080",
    //       //  redirectUri: "https://developers.kakao.com/tool/demo/oauth",
    //       state: "userme",
    //     });
    //   },
    //   requestUserInfo() {
    //     window.Kakao.API.request({
    //       url: "/v2/user/me",
    //     })
    //       .then(function (res) {
    //         alert(JSON.stringify(res));
    //       })
    //       .catch(function (err) {
    //         alert("failed to request user information: " + JSON.stringify(err));
    //       });
    //   },
    // kLoginBtn() {
    //   kakaologin((data) => {
    //     console.log("전");
    //     console.log(data);

    //     // sdk초기화여부판단
    //     if (!window.Kakao.isInitialized()) {
    //       window.Kakao.init(process.env.VUE_APP_KAKAO_MAP_KEY); // Kakao Developers에서 요약 정보 -> JavaScript 키
    //       console.log(window.Kakao.isInitialized());
    //     }
    //     if (!window.Kakao.Auth.getAccessToken()) {
    //       // window.Kakao.Auth.login({
    //       //   success: (res) => {
    //       //     console.log(res);
    //       //   },
    //       //   fail: (error) => {
    //       //     console.log(error);
    //       //   },
    //       // });
    //       this.loginWithKakao();
    //     }
    //   });
    // },
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },
};
</script>

<style>
.img-container {
  height: 200px;
  background-size: cover;
  background-position: center;
  background-image: url("@/assets/main.jpg");
}
.userid {
  color: red;
  font-weight: bold;
}
</style>
