const questionService = require("./questionService");
const { getUsers } = require("./apiService");

const logIn = async () => {
  const login = await questionService("Login:");
  const password = await questionService("Password:");
  const users = await getUsers();

  const currentUser = users.find(user => user.name === login.toLowerCase());

  if (currentUser && currentUser.password === password) {
    return currentUser;
  } else {
    console.log(`Wrong credentials. Try again.`);
    return logIn();
  }
};

module.exports = logIn;
