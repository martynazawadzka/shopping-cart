const express = require("express");
const {ObjectId} = require("mongodb");
const DATA_BASE = require("../consts/consts");
const dbService = require("../services/dbService");

const router = express.Router();

/* get user cart. */

router.get("/:id", async function (req, res, next) {
  const {id} = req.params;

  try {
    const db = await dbService();
    const user = await db
      .collection(DATA_BASE.COLLECTIONS.USERS)
      .findOne({_id: ObjectId(id)});

    res.send(user.cart);
  } catch (e) {
    console.log(e.message);
  }

});

/* Add book's id to user cart. */
router.patch("/:id", async function (req, res, next) {
  const {id} = req.params;
  const {title, isAddingToCart, amount} = req.body;

  try {
    const db = await dbService();

    const user = await db
      .collection(DATA_BASE.COLLECTIONS.USERS)
      .findOne({_id: ObjectId(id)});

    const book = await db
      .collection(DATA_BASE.COLLECTIONS.BOOKS)
      .findOne({Title: title});

    if (isAddingToCart) {

      if (!book) {
        res.send("Wrong title!");
        return;
      }

      if (amount > book.amount || book.amount <= 0 || book.amount - amount < 0) {
        res.send("We don't have enough books");
        return;
      }
      const bookInUserCart = user.cart.find(userBook => {
        return ObjectId(userBook.id).equals(ObjectId(book._id))
      });

      if (bookInUserCart) {

        const newAmount = +bookInUserCart.amount + +amount;

        await db.collection(DATA_BASE.COLLECTIONS.USERS).findOneAndUpdate(
          {_id: ObjectId(id)},
          {
            $set: {
              "cart.$[element].amount": newAmount
            }
          },
          {
            arrayFilters: [{"element.id": book._id}]
          }
        );
      } else {
        await db
          .collection(DATA_BASE.COLLECTIONS.USERS)
          .findOneAndUpdate(
            {_id: ObjectId(id)},
            {$push: {cart: {id: book._id, amount}}}
          );
      }
      await db
        .collection(DATA_BASE.COLLECTIONS.BOOKS)
        .findOneAndUpdate(
          {_id: ObjectId(book._id)},
          {$inc: {amount: -amount}}
        );
      res.sendStatus(200);
      return;
    }

    const bookInUserCart = user.cart.find(userBook => {
      return ObjectId(userBook.id).equals(ObjectId(book._id))
    });

    if (!bookInUserCart) {
      res.send("You don't have book like this in your cart!");
      return;
    }

    if (amount > bookInUserCart.amount) {
      res.send("You don't have so many books in your cart");
      return;
    }

    const newAmount = +bookInUserCart.amount - +amount;

    if (newAmount === 0) {
      await db.collection(DATA_BASE.COLLECTIONS.USERS).findOneAndUpdate(
        {_id: ObjectId(id)},
        {
          $pull: {
            'cart': {
              id: ObjectId(book._id)
            }
          }
        },
        {}
      );

    } else {
      await db.collection(DATA_BASE.COLLECTIONS.USERS).findOneAndUpdate(
        {_id: ObjectId(id)},
        {
          $set: {
            "cart.$[element].amount": newAmount
          }
        },
        {
          arrayFilters: [{"element.id": book._id}]
        }
      );
    }

    await db
      .collection(DATA_BASE.COLLECTIONS.BOOKS)
      .findOneAndUpdate(
        {_id: ObjectId(book._id)},
        {$inc: {amount: +amount}}
      );

    res.sendStatus(200);
  } catch (e) {
    console.log(e.message)
  }
});

module.exports = router;
