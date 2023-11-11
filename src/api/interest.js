import { apiInstance } from "./index.js";

const api = apiInstance();

async function listInterest(code, success, fail) {
  await api.get(`interest/${code}`).then(success).catch(fail);
}

async function listDong(code, success, fail) {
  await api.get(`dong/${code}`).then(success).catch(fail);
}

async function addInterest(interestArea, success, fail) {
  await api.post('/interest', interestArea).then(success).catch(fail);
}
async function deleteOne(interestArea, success, fail) {
  await api.post('/interest/deleteone', interestArea).then(success).catch(fail);
}

export { listInterest,deleteOne, listDong, addInterest };
