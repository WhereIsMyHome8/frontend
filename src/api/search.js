import { apiInstance } from "./index.js";

const api = apiInstance();

async function listSido(success, fail) {
  await api.get('/sido').then(success).catch(fail);
}

async function listGugun(code, success, fail) {
  await api.get(`gugun/${code}`).then(success).catch(fail);
}

async function listDong(code, success, fail) {
  await api.get(`dong/${code}`).then(success).catch(fail);
}

export { listSido, listGugun, listDong };