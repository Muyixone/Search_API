const products = require('../models/product');
const asyncWrapper = require('../middlewares/async-wrapper');

const getAllProducts = asyncWrapper(async (req, res) => {
  let match = {};

  let page = req.query.page || 1;
  let docsPerPage = 6;
  let limit = Number(req.query.limit) || docsPerPage;
  let skip = limit * (page - 1);

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

  // PAGINATION, AND SORTING
  let facet = {};
  facet.data = [{ $skip: skip }, { $limit: limit }, { $sort: { price: -1 } }];
  facet.dataInfo = [{ $group: { _id: null, count: { $sum: 1 } } }];

  let pipeline = [
    { $match: match },
    { $facet: facet },
    {
      $project: {
        data: '$data',
        page: `${page}`,
        totalDocs: { $first: '$dataInfo.count' },
      },
    },
  ];

  let product = await products.aggregate(pipeline);

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
