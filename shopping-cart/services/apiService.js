const axios = require("axios");
const API_URL = require("../consts/consts");

const config = {
  headers: {'access-token': "alamakota"}
};

const getUsers = async () => {
  const users = await axios
    .get(`${API_URL}/users`,  config)
    .then(response => response.data)
    .catch(function() {
      console.log('There was some problem with getting users.');
    });
  return users;
};

const updateUserCart = async (userId, title, amount, isAddingToCart) => {
  const users = await axios
    .patch(`${API_URL}/my-cart/${userId}`, { title, isAddingToCart, amount }, config)
    .then(response => response.data)
    .catch(function() {
      console.log('There was some problem with updating cart.');
    });
  return users;
};

const getBooks = async () => {
  const books = await axios
    .get(`${API_URL}/books`, config)
    .then(response => response.data)
    .catch(function() {
      console.log('There was some problem with getting books.');
    });
  return books;
};

const getBook = async id => {
  const books = await axios
    .get(`${API_URL}/books/${id}`, config)
    .then(response => response.data)
    .catch(function() {
      console.log('There was some problem with getting book.');
    });
  return books;
};

const getCart = async id => {
  const books = await axios
    .get(`${API_URL}/my-cart/${id}`, config)
    .then(response => response.data)
    .catch(function() {
      console.log('There was some problem with getting cart.');
    });
  return books;
};

module.exports = {
  getUsers,
  getBooks,
  updateUserCart,
  getCart,
  getBook
};
