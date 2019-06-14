const {getBooks, getBook, updateUserCart, getCart} = require("./apiService");
const questionService = require("./questionService");

const displayBooks = async (books) => {

  if (!books.length) {
    console.log('Your cart is empty');
    return;
  }

  console.log('Book list');

  for (let i = 0; i < books.length; i++) {
    if (books[i].amount > 0) {
      if (books[i].Title) {
        console.log(`${books[i].Title} | Amount: ${books[i].amount}`);
      } else {
        const bookFullData = await getBook(books[i].id);
        console.log(`${bookFullData.Title} | Amount: ${books[i].amount}`);
      }
    }
  }
};

const displayAvailableBooks = async () => {
  const books = await getBooks();

  await displayBooks(books);

  return books;
};


const displayCart = async userId => {
  const books = await getCart(userId);

  await displayBooks(books);

  return books;
};

const addToCart = async (userId) => {
  const title = await questionService("Title:");
  const amount = await questionService("How many books would you like to add?");
  const response = await updateUserCart(userId, title, amount, true);

  if (response !== 'OK') {
    console.log(response)
    return addToCart(userId);
  }

};

const removeFromCart = async userId => {

  try {

    const title = await questionService("Which book would you like to remove?");
    const amount = await questionService("How many books would you like to remove?");
    const response = await updateUserCart(userId, title, amount);

    if (response !== 'OK') {
      console.log(response);
      return removeFromCart(userId);
    }
  } catch (e) {
    console.log('AAAAAAAAAA')
  }
};


module.exports = {displayAvailableBooks, addToCart, removeFromCart, displayCart};
