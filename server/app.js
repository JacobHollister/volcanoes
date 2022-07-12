const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const helmet = require('helmet')
const connectDB = require('./db/connect')

const usersRouter = require('./routes/users');
const countriesRouter = require('./routes/countries');
const volcanoRouter = require('./routes/volcano');
const volcanoesRouter = require('./routes/volcanoes');

const app = express();

app.use(helmet())

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'img-src': ['*'],
    },
  })
)

app.use(logger('common'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', usersRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/volcanoes', volcanoesRouter);
app.use('/api/volcano', volcanoRouter);

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Server not set to production'))
}

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error){
    console.log(error)
  }
}

start()
// module.exports = app;
