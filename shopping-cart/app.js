const questionService = require("./services/questionService");
const logIn = require("./services/loginService");
const { displayAvailableBooks, addToCart, removeFromCart, displayCart } = require("./services/books");

let currentUser;

const aa = async () => {
  const action = await questionService(
    `What do you want to do? [${
      currentUser ? "logout/seeMyCart/addToCart/removeFromCart" : "login"
    }/seeBooks]?`
  );

  switch (action.toLowerCase()) {
    case "login":
      currentUser = await logIn();
      console.log(currentUser);
      break;
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

  return aa();
};

aa();
// (
//
// )();

// axios.get(' http://localhost:3000/users')
//     .then(function (response) {
//       // handle success
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .finally(function () {
//       // always executed
//     });

// (async () => {
//
//
//
//
//
//
//
//
//   console.log(users)
//
//
//
//   // const ans = await questionService("Are you sure you want to deploy to PRODUCTION? ");
//   //
//   // console.log(ans)
//   // const ans2 = await questionService("Are you sure you want to deploy to PRODUCTION? xxxxxxxx ");
//   // console.log(ans2)
//
//
// })();
