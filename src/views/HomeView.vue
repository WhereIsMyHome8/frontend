<template>
  <div>
    <home-search></home-search>
    <home-result></home-result>
  </div>
</template>

<script>
import HomeSearch from "@/components/HomeSearch.vue";
import HomeResult from "@/components/HomeResult.vue";

export default {
  name: "HomeView",
  components: {
    HomeSearch,
    HomeResult,
  },
};
</script>
