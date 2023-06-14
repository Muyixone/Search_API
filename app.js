require('dotenv').config();
const express = require('express');

const productRoute = require('./route/product_routes');
const notFound = require('./middlewares/not_found');
const errorHandler = require('./middlewares/error_handler');
const connectDB = require('./Db/connectDb');

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.status(404).send('Hello World!!!');
});
app.use('/api/v1/products', productRoute);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const startDbServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, console.log(`server listening on port ${port}!!!`));
  } catch (error) {
    console.log(error);
  }
};

startDbServer();
