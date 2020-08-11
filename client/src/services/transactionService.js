import http from "./httpService";
import config from "../config.json";

const endpoint = `/transactions`;

export async function saveTransaction(transaction) {
  transaction.date = new Date(transaction.date);
  if (transaction._id) {
    //update db
  }
  const { data } = await http.post(endpoint, transaction);
  return data;
}

export async function getTransaction(transactionId) {
  const { data: transaction } = await http.get(`${endpoint}/${transactionId}`);
  return transaction;
}
