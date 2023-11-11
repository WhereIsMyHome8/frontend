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
      <template #cell(done)="data">
        <div v-if="data.item.done">
          <b-icon icon="check" scale="2" variant="success"></b-icon>
        </div>
        <div v-else>
          <b-icon icon="x" scale="2" variant="danger"></b-icon>
        </div>
      </template>
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
import { listQna } from "@/api/qna.js";

export default {
  name: "QnAList",
  data() {
    return {
      items: [],
      curPage: 1,
      fields: [
        { key: "num", label: "글번호" },
        { key: "user_id", label: "작성자" },
        { key: "title", label: "제목" },
        { key: "wdate", label: "작성일" },
        { key: "count", label: "조회수" },
        { key: "done", label: "완료" },
      ],
    };
  },
  created() {
    listQna(
      ({ data }) => {
        this.items = data;
      },
      () => {
        alert("QnA 리스트 가져오기 실패");
      }
    );
  },
  methods: {
    moveDetail(item) {
      this.$router.push({ name: "qnadetail", params: { num: item.num } });
    },
    moveWrite() {
      this.$router.push({ name: "qnawrite", params: { type: "write" } });
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
