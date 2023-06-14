const products = require('../models/product');
const asyncWrapper = require('../middlewares/async-wrapper');

const getAllProducts = asyncWrapper(async (req, res) => {
  const product = await products.find({});
  res.status(200).json({
    msg: 'Products available',
    product,
  });
});

const createProduct = asyncWrapper(async (req, res) => {
  const product = await products.create(req.body);
  res.status(200).json({
    msg: 'Products created successfully',
    product,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
};
