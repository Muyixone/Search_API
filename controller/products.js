const products = require('../models/product');
const asyncWrapper = require('../middlewares/async-wrapper');

const getAllProducts = asyncWrapper(async (req, res) => {
  let match = {};

  let page = req.query.page || 1;
  let docsPerPage = 2;
  let skip = docsPerPage * (page - 1);
  let limit = docsPerPage;

  // FILTER QUERIES
  // filter by name or company
  if (req.query.search) {
    match.$or = [
      { name: new RegExp(req.query.search, 'i') },
      { company: new RegExp(req.query.search, 'i') },
    ];
  }
  // filter by rating
  if (req.query.rating) {
    match.rating = +req.query.rating;
  }

  // filter by price
  if (req.query.price) {
    const priceToNumber = parseInt(req.query.price);
    const operator = req.query.operator;

    switch (operator) {
      case '<':
        match.price = { $lt: priceToNumber };
        break;
      case '>':
        match.price = { $gt: priceToNumber };
        break;
      case 'range':
        const minValue = parseInt(req.query.minValue);
        const maxValue = parseInt(req.query.maxValue);
        match.price = { $lte: maxValue, $gte: minValue };
        break;
      default:
        match.price = priceToNumber;
    }
  }

  // filter by featured
  if (req.query.featured) {
    match.featured = req.query.featured === 'true' ? true : false;
  }

  // PAGINATION
  let facet = {};
  facet.data = [{ $skip: skip }, { $limit: limit }];

  let product = await products.aggregate([
    { $match: match },
    { $facet: facet },
    {
      $project: {
        docs: '$data',
      },
    },
  ]);

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
