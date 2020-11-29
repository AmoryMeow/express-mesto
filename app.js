const exspress = require('express');
const path = require('path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const {PORT = 3000} = process.env;

const app = exspress();

app.use(exspress.static(path.join(__dirname,'public')));

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`);
})