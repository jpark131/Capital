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

export async function updateUser() {
  const user = await getUserObject();
  delete user.categories;
  const userForDb = { ...user };
  delete userForDb._id;
  return http.put(`${endpoint}/me`, userForDb);
}

export default {
  register,
  getUserObject,
  getCategories,
  updateUser,
};
