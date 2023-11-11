import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post("/user", JSON.stringify(user)).then(success).catch(fail);
}

async function signup(user, success, fail) {
  await api.post("/user/new", user).then(success).catch(fail);
}
async function findpw(user, success, fail) {
  await api.post("/user/sendmail", user).then(success).catch(fail);
}

async function findById(id, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/inform/${id}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] =
    sessionStorage.getItem("refresh-token");
  await api.post("/refresh", user).then(success).catch(fail);
}

async function logout(id, success, fail) {
  await api.get(`/user/${id}`).then(success).catch(fail);
}
async function userUpdate(user, success, fail) {
  await api.put("/user",user).then(success).catch(fail);
}

async function getInterestApartment(id, success, fail) {
  await api.get(`/interest/${id}`).then(success).catch(fail);
}

async function getUserAll( success, fail) {
  await api.get(`/user/inform/all/`).then(success).catch(fail);
}

async function getUserOne(type,parameter, success, fail) {
  await api.get(`/user/inform/${type}/${parameter}`).then(success).catch(fail);
}

async function kakaologin( success, fail) {
  await api.get("/kakao").then(success).catch(fail);
}

export { login,userUpdate,getUserOne, signup,getUserAll, findpw, findById, tokenRegeneration, logout, getInterestApartment,kakaologin };

