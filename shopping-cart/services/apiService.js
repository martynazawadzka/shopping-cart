const axios = require("axios");
const API_URL = require("../consts/consts");

const getUsers = async () => {
  const users = await axios
    .get(`${API_URL}/users`)
    .then(response => response.data)
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
  return users;
};

const updateUserCart = async (userId, title, amount, isAddingToCart) => {
  const users = await axios
    .patch(`${API_URL}/my-cart/${userId}`, { title, isAddingToCart, amount })
    .then(response => response.data)
    .catch(function(e) {
      console.log('There was some problem');
      // console.log('apiservice', e);
      // return e;
      // if (status === 404){
      //   console.log("Wrong title!");
        // return 'Wrong title!';
      // }
    })
    .finally(function() {
      // always executed
    });
  return users;
};

const getBooks = async () => {
  const books = await axios
    .get(`${API_URL}/books`)
    .then(response => response.data)
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
  return books;
};

const getBook = async id => {
  const books = await axios
    .get(`${API_URL}/books/${id}`)
    .then(response => response.data)
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
  return books;
};

const getCart = async id => {
  const books = await axios
    .get(`${API_URL}/my-cart/${id}`)
    .then(response => response.data)
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
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
