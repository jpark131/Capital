import http from "./httpService";

const endpoint = "/users";

export function register(user) {
  return http.post(endpoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

export async function getUserObject() {
  try {
    const { data: user } = await http.get(endpoint + "/me");
    return user;
  } catch (ex) {}
}

export async function getCategories() {
  let categories = [];
  const user = await getUserObject();
  let index;
  for (let t of user.transactions) {
    if (!categories.some((c) => c.name === t.category)) {
      categories.push({ name: t.category, amount: t.amount });
    } else {
      index = categories.findIndex((c) => c.name === t.category);
      categories[index].amount += t.amount;
    }
  }
  return categories;
}

export async function addTransactionToUser(transactionId) {
  const user = await getUserObject();
  user.transactions.push(transactionId);
  delete user._id;
  delete user.__v;
  return http.put(`${endpoint}/me`, user);
}

export async function changeProfile(info) {
  const newInfo = { ...info };
  const user = await getUserObject();
  delete user._id;
  delete user.__v;
  user.name = newInfo.name;
  user.email = newInfo.email;
  user.budget = newInfo.budget;
  return http.put(`${endpoint}/me`, user);
}

export async function changePassword(password) {
  const user = await getUserObject();
  delete user._id;
  delete user.__v;

  user.password = password;

  return http.put(`${endpoint}/me/password`, user);
}

export default {
  register,
  getUserObject,
  getCategories,
  addTransactionToUser,
  changeProfile,
  changePassword,
};
