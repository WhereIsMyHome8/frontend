<template>
  <div class="container">
    <b-button variant="info" @click="moveWrite" class="float-right"
      >글작성</b-button
    >
    <b-table
      striped
      hover
      :fields="fields"
      :items="items"
      @row-clicked="moveDetail"
    >
    </b-table>
    <b-pagination
      :total-rows="items.length"
      v-model="curPage"
      align="center"
      limit="10"
    ></b-pagination>
  </div>
</template>

<script>
import { listNotice } from "@/api/notice.js";

export default {
  name: "NoticeList",
  data() {
    return {
      items: [],
      curPage: 1,
      fields: [
        { key: "num", label: "글번호" },
        { key: "title", label: "제목" },
        { key: "content", label: "내용" },
        { key: "wdate", label: "작성일" },
        { key: "count", label: "조회수" },
      ],
    };
  },

  created() {
    listNotice(
      ({ data }) => {
        console.log(data);
        this.items = data;
      },
      () => {
        alert("공지사항 리스트 가져오기 실패");
      }
    );
  },
  methods: {
    moveDetail(item) {
      console.log(item.num);
      this.$router.push({ name: "noticedetail", params: { num: item.num } });
    },
    moveWrite() {
      this.$router.push({ name: "noticewrite", params: { type: "write" } });
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  margin: auto;
  margin-top: 10px;
}
</style>
