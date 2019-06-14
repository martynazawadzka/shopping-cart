const express = require('express');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const myCartRouter = require('./routes/my-cart');
const authMiddleware = require('./middleware/auth.js');

const app = express();
const port = 3000;

app.use(authMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/my-cart', myCartRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));




