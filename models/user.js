// Mock user model
let users = [
  {
    id: 1,
    username: "johndoe",
    password: "password", // In production, use hashed passwords.
    twoFactorEnabled: false,
    twoFactorSecret: null,
  },
];

const getUserById = (id) => users.find((user) => user.id === id);
const updateUser = (id, updatedFields) => {
  const userIndex = users.findIndex((user) => user.id === id);
  users[userIndex] = { ...users[userIndex], ...updatedFields };
};

module.exports = { getUserById, updateUser };
