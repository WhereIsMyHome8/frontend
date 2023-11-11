<template>
  <div class="form-container">
    <h1>회원검색</h1>
    <b-table striped hover :fields="fields" :items="items"></b-table>
    <b-container>
      <b-row class="justify-content-md-center">
        <b-input-group>
          <template #prepend>
            <b-form-select
              v-model="selected"
              :options="options"
            ></b-form-select>
          </template>
          <b-form-input
            v-model="input"
            @keyup.enter="search_user"
          ></b-form-input>
          <template #append>
            <b-button @click="search_user" variant="outline-secondary"
              >검색</b-button
            >
          </template>
        </b-input-group>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getUserAll, getUserOne } from "@/api/user";
export default {
  name: "UserSearch",
  components: {},
  data() {
    return {
      curPage: 1,
      input: "",
      items: [],
      fields: [
        { key: "id", label: "아이디" },
        { key: "name", label: "이름" },
        { key: "email", label: "이메일" },
      ],
      selected: null,
      options: [
        { value: null, text: "전체" },
        { value: "id", text: "아이디" },
        { value: "name", text: "이름" },
      ],
    };
  },
  created() {
    getUserAll(({ data }) => {
      console.log(data);
      this.items = data;
    });
  },

  methods: {
    search_user() {
      console.log(this.selected);
      console.log(this.input);
      if (this.selected == null) {
        getUserAll(({ data }) => {
          this.items = data;
        });
      } else {
        getUserOne(
          this.selected,
          this.input,
          ({ data }) => {
            console.log(data);
            this.items = data;
          },
          () => {
            alert("제대로 된 검색을 해주세요");
          }
        );
      }
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
