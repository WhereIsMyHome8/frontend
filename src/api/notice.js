import { apiInstance } from "./index.js";

const api = apiInstance();

async function listNotice(success, fail) {
  await api.get("/notice/search").then(success).catch(fail);
}

async function detailNotice(num, success, fail) {
  await api.get(`/notice/${num}`).then(success).catch(fail);
}

async function addNotice(notice, success, fail) {
  await api.post("notice", notice).then(success).catch(fail);
}

async function modifyNotice(notice, success, fail) {
  await api.put("/notice", notice).then(success).catch(fail);
}

async function deleteNotice(num, success, fail) {
  await api.delete(`/notice/${num}`).then(success).catch(fail);
}

//공지사항 게시글의 댓글 보기!
async function listComment(num, success, fail) {
  await api.get(`/noticecomment/${num}`).then(success).catch(fail);
}
//공지사항 게시글에 댓글 추가!
async function addComment(comment, success, fail) {
  await api.post("/noticecomment", comment).then(success).catch(fail);
}

export {
  listNotice,
  detailNotice,
  addNotice,
  modifyNotice,
  deleteNotice,
  // completeNotice,
  listComment,
  addComment,
};
