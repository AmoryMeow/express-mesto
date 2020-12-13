const exspress = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const pageNotFound = require('./routes/pageNotFound');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = exspress();

mongoose.connect('mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

app.use(exspress.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', pageNotFound);

app.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`);
});
