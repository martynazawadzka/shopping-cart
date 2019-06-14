const express = require('express');
const DATA_BASE = require('../consts/consts');
const dbService = require('../services/dbService');

const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const db = await dbService();
  const users =await db.collection(DATA_BASE.COLLECTIONS.USERS).find().toArray();
  res.send(users);
});

module.exports = router;

