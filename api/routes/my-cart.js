const express = require("express");
const { ObjectId } = require("mongodb");
const DATA_BASE = require("../consts/consts");
const dbService = require("../services/dbService");

const router = express.Router();

router.get("/:id", async function(req, res, next) {
  const { id } = req.params;

  const db = await dbService();
  const user = await db
    .collection(DATA_BASE.COLLECTIONS.USERS)
    .findOne({ _id: ObjectId(id) });

  res.send(user.cart);
});

/* Add book's id to user cart. */
router.patch("/:id", async function(req, res, next) {
  const db = await dbService();
  const { id } = req.params;
  const { title, isAddingToCart, amount } = req.body;
  // const { bookId, isAddingToCart, amount } = req.body;

  if (isAddingToCart) {
    const user = await db
      .collection(DATA_BASE.COLLECTIONS.USERS)
      .findOne({ _id: ObjectId(id) });

    const book = await db
      .collection(DATA_BASE.COLLECTIONS.BOOKS)
      .findOne({ Title: title });

    if (!book) {
      res.send("Wrong title!");
    }

    if (book && amount > book.amount && book.amount <= 0) {
      res.send("We don't have enough books");
    }
    const userHasBook = user.cart.find(userBook => {
      console.log(userBook.id)
      console.log(book._id)
      console.log(userBook.id === book._id)
      return userBook.id === book._id

    });
    console.log(userHasBook);
    console.log(book._id);


    if (userHasBook) {
      const newAmount = +book.amount + +amount;

      await db.collection(DATA_BASE.COLLECTIONS.USERS).findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: {
            "cart.$[element].amount": newAmount
          }
        },
        {
          arrayFilters: [{ "element.id": book._id }]
        }
      );
    } else {
      await db
        .collection(DATA_BASE.COLLECTIONS.USERS)
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $push: { cart: { id: book._id, amount } } }
        );
    }
    await db
      .collection(DATA_BASE.COLLECTIONS.BOOKS)
      .findOneAndUpdate(
        { _id: ObjectId(book._id) },
        { $inc: { amount: -amount } }
      );
    res.sendStatus(200);
  }
  // }
  // res.sendStatus(200);
  // const book = user.cart.find(book => book.id === bookId);

  // if (book) {
  //   const newAmount = +book.amount + +amount;
  //
  //   await db.collection(DATA_BASE.COLLECTIONS.USERS).findOneAndUpdate(
  //     { _id: ObjectId(id) },
  //     {
  //       $set: {
  //         "cart.$[element].amount": newAmount
  //       }
  //     },
  //     {
  //       arrayFilters: [{ "element.id": bookId }]
  //     }
  //   );
  // } else {
  //   await db
  //     .collection(DATA_BASE.COLLECTIONS.USERS)
  //     .findOneAndUpdate(
  //       { _id: ObjectId(id) },
  //       { $push: { cart: { id: bookId, amount } } }
  //     );
  // }
  // await db
  //   .collection(DATA_BASE.COLLECTIONS.BOOKS)
  //   .findOneAndUpdate(
  //     { _id: ObjectId(bookId) },
  //     { $inc: { amount: -amount } }
  //   );
  // res.sendStatus(200);
  // return;
  // }

  // const user = await db
  //     .collection(DATA_BASE.COLLECTIONS.USERS)
  //     .findOne({ _id: ObjectId(id) });
  //
  // const book = user.cart.find(book => book.id === bookId);
  // //
  // // if (book) {
  //   const newAmount = +book.amount + +amount;
  // //
  //   await db.collection(DATA_BASE.COLLECTIONS.USERS).findOneAndUpdate(
  //       { _id: ObjectId(id) },
  //       {
  //         $set: {
  //           "cart.$[element].amount": newAmount
  //         }
  //       },
  //       {
  //         arrayFilters: [{ "element.id": bookId }]
  //       }
  //   );
  // } else {
  //   await db
  //       .collection(DATA_BASE.COLLECTIONS.USERS)
  //       .findOneAndUpdate(
  //           { _id: ObjectId(id) },
  //           { $push: { cart: { id: bookId, amount } } }
  //       );
  // }
  // await db
  //     .collection(DATA_BASE.COLLECTIONS.BOOKS)
  //     .findOneAndUpdate(
  //         { _id: ObjectId(bookId) },
  //         { $inc: { Amount: -amount } }
  //     );
  // res.sendStatus(200);
  // return;
  //
  // res.send(users);
});

module.exports = router;
