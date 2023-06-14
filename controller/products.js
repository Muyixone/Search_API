const getAllProducts = (req, res) => {
  res.status(200).json({
    msg: 'Products available',
  });
};

const createProduct = (req, res) => {
  res.status(200).json({
    msg: 'Products created successfully',
  });
};

module.exports = {
  getAllProducts,
  createProduct,
};
