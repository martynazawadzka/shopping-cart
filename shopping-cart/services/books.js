const { getBooks, getBook, updateUserCart, getCart } = require("./apiService");
const questionService = require("./questionService");

const displayBooks = async (books) => {
    console.log('Book list');

    for(let i = 0; i < books.length; i++) {
        if (books[i].amount > 0) {
            if(books[i].Title){
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

const addToCart = async userId => {
  // console.log("Available books:");
  // const books = await displayAvailableBooks();
  const title = await questionService("Title:");
  const amount = await questionService("How many books would you like to add?");
  // const book = books.find(book => book.Title === title);

  // if (book && amount <= book.amount && book.amount > 0) {
        const response = await updateUserCart(userId, title, amount, true);

        if(response !== 'OK') {
            console.log(response)
            return addToCart(userId);
        }

    // return;
  // }

  // console.log(
  //   book ? "We don't have enough books. Choose smaller amount" : "Wrong title!"
  // );
};

const removeFromCart = async userId => {
    const myCart = await displayCart(userId);
    const title = await questionService("Which book would you like to remove?");
    const amount = await questionService("How many books would you like to remove?");
    const allBooks = await getBooks();
    const bookToRemove = allBooks.find((book) => book.Title === title);

    if (bookToRemove) {
        const bookToRemoveAmount = myCart.find((book) => book.id === bookToRemove._id).amount;
        if (bookToRemove && amount <= bookToRemoveAmount && bookToRemoveAmount > 0) {
            updateUserCart(userId, bookToRemove.id, amount);
            return;
        }
    }

    console.log(
        bookToRemove ? "You have fewer books than you want to delete" : "Wrong title!"
    );
    return removeFromCart(userId);
};


module.exports = { displayAvailableBooks, addToCart, removeFromCart, displayCart };
