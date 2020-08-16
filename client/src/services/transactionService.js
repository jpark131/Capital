import http from "./httpService";

const endpoint = `/transactions`;

export async function saveTransaction(transaction, Id) {
  transaction.date = new Date(transaction.date + "T00:00:00");
  if (Id !== "new") {
    const transactionForDb = { ...transaction };
    delete transactionForDb._id;
    return http.put(`${endpoint}/${Id}`, transactionForDb);
  }
  const { data } = await http.post(endpoint, transaction);
  return data;
}

export async function getTransaction(transactionId) {
  const { data: transaction } = await http.get(`${endpoint}/${transactionId}`);
  return transaction;
}

export async function deleteTransaction(transactionId) {
  return await http.delete(`${endpoint}/${transactionId}`);
}
