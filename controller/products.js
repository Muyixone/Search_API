const products = require('../models/product');
const asyncWrapper = require('../middlewares/async-wrapper');

const getAllProducts = asyncWrapper(async (req, res) => {
  let match = {};

  if (req.query.name) {
    match.name = req.query.name;
  }
  if (req.query.featured) {
    match.featured = req.query.featured;
  }
  let product = await products.aggregate([{ $match: match }]);

  res.status(200).json({
    nbHits: product.length,
    data: {
      msg: 'Products available',
      product,
    },
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
