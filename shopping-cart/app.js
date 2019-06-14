const questionService = require("./services/questionService");
const logIn = require("./services/loginService");
const {displayAvailableBooks, addToCart, removeFromCart, displayCart} = require("./services/books");

let currentUser;

const handleActions = async () => {

  const action = await questionService(
    `What do you want to do? [${
      currentUser ? "logout/seeMyCart/addToCart/removeFromCart" : "login"
      }/seeBooks]?`
  );

  if (!currentUser) {
    switch (action.toLowerCase()) {
      case "login":
        currentUser = await logIn();
        break;
      case "seebooks":
        await displayAvailableBooks();
        break;
      default:
        console.log("Wrong action");
    }
  } else {
    switch (action.toLowerCase()) {
      case "logout":
        console.log("You have been logged out");
        return;
      case "seebooks":
        await displayAvailableBooks();
        break;
      case "addtocart":
        await addToCart(currentUser._id);
        break;
      case "removefromcart":
        await removeFromCart(currentUser._id);
        break;
      case "seemycart":
        await displayCart(currentUser._id);
        break;

      default:
        console.log("Wrong action");
    }
  }


  return handleActions();
};

handleActions();
