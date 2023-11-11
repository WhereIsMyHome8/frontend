import { apiInstance } from "./index.js"

const api = apiInstance();

async function listApartment(type, keyword, success, fail) {
  await api.get(`dealinfo/${type}/${keyword}`).then(success).catch(fail);
}

async function getApartByCode(aptCode, success, fail) {
  await api.get(`apt/${aptCode}`).then(success).catch(fail);
}

function dealInfoFilter(dealInfo) {
  let min = dealInfo.minDeal.replace(",", "");
  let max = dealInfo.maxDeal.replace(",", "");
  let arg1 = min / 10000 > 0 ? (min / 10000).toFixed() + "억 " : "";
  let arg2 = min % 10000 > 0 ? (min % 10000) + "만원" : "";
  let arg3 = max / 10000 > 0 ? (max / 10000).toFixed() + "억 " : "";
  let arg4 = max % 10000 > 0 ? (max % 10000) + "만원" : "";
  return arg1 + arg2 + " ~ " + arg3 + arg4;
}

async function getApartDeals(aptCode, success, fail) {
  await api.get(`apt/deal/${aptCode}`).then(success).catch(fail);
}


export { listApartment, getApartByCode,getApartDeals, dealInfoFilter };