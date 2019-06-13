// var createError = require('http-errors');
const express = require('express');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const myCartRouter = require('./routes/my-cart');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/my-cart', myCartRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;

// const questionService = require('./services/questionService');
// const dbService = require('./services/dbService');
// const DATA_BASE = require('./consts/consts');
//
//
