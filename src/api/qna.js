import { apiInstance } from "./index.js";

const api = apiInstance();

async function listQna(success, fail) {
  await api.get("/qna").then(success).catch(fail);
}

async function listUser(num, success, fail) {
  await api.get(`/qna/user/${num}`).then(success).catch(fail);
}

async function detailQna(num, success, fail) {
  await api.get(`/qna/${num}`).then(success).catch(fail);
}

async function addQna(qna, success, fail) {
  await api.post("qna", qna).then(success).catch(fail);
}

async function modifyQna(qna, success, fail) {
  await api.put("/qna", qna).then(success).catch(fail);
}

async function deleteQna(num, success, fail) {
  await api.delete(`/qna/${num}`).then(success).catch(fail);
}

async function completeQna(qna, success, fail) {
  await api.put("/qna/done", qna).then(success).catch(fail);
}

async function listComment(num, success, fail) {
  await api.get(`/comment/${num}`).then(success).catch(fail);
}

async function addComment(comment, success, fail) {
  await api.post("/comment", comment).then(success).catch(fail);
}

export {
  listQna,
  detailQna,
  listUser,
  addQna,
  modifyQna,
  deleteQna,
  completeQna,
  listComment,
  addComment,
};
