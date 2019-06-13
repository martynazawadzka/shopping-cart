const express = require('express');
const { ObjectId } = require('mongodb');

const DATA_BASE = require('../consts/consts');
const dbService = require('../services/dbService');

const router = express.Router();


/* GET products listing. */
router.get('/', async function(req, res, next) {
    const db = await dbService();
    const books =await db.collection(DATA_BASE.COLLECTIONS.BOOKS).find().toArray();

    res.send(books);
});

/* GET product. */
router.get('/:id', async function(req, res, next) {
    const { id } = req.params;

    const db = await dbService();
    const book =await db.collection(DATA_BASE.COLLECTIONS.BOOKS).findOne({ _id: ObjectId(id) });

    res.send(book);
});

module.exports = router;
