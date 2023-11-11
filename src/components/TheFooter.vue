<template>
  <div class="foot-container">
    <b-row class="justify-content-md-center">
      <b-col cols="2">
        <b-img :src="require('@/assets/ssafy_logo.png')" sizes="3, 5"></b-img>
      </b-col>
      <b-col cols="2">
        <ul v-for="(content, index) in contents" :key="index">
          <li>{{ content }}</li>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      contents: ["싸피8기 Vue project", "팀장: 정우진", "팀원: 이영차"],
    };
  },
};
</script>

<style>
.foot-container {
  bottom: 0;
  width: 100%;
  background-color: antiquewhite;
}
</style>