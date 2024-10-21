"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('date-fns'),
    format = _require.format;

var productsData = {
  products: require('../model/products.json'),
  setProducts: function setProducts(data) {
    this.products = data;
  }
};

var getAllProducts = function getAllProducts(req, res) {
  res.json(productsData.products);
};

var getSingleProduct = function getSingleProduct(req, res) {
  var productId = parseInt(req.params.id);
  var product = productsData.products.find(function (product) {
    return product.id === productId;
  });

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
};

var createNewProduct = function createNewProduct(req, res) {
  var singleProduct = {
    id: productsData.products[productsData.products.length - 1].id + 1,
    product_name: req.body.name,
    product_version: req.body.version,
    product_company: req.body.company,
    product_created_time: format(new Date(), 'ddMMyyyy\tHH:mm:ss')
  };
  var validationRules = [{
    field: singleProduct.product_name,
    validate: function validate(value) {
      return !!value;
    },
    message: "Product name is required."
  }, {
    field: singleProduct.product_version,
    validate: function validate(value) {
      return !!value;
    },
    message: "Product version is required."
  }, {
    field: singleProduct.product_company,
    validate: function validate(value) {
      return !!value;
    },
    message: "Product company is required."
  }];

  for (var _i = 0, _validationRules = validationRules; _i < _validationRules.length; _i++) {
    var rule = _validationRules[_i];

    if (!rule.validate(rule.field)) {
      return res.status(400).json({
        "message": rule.message
      });
    }
  }

  productsData.setProducts([].concat(_toConsumableArray(productsData.products), [singleProduct]));
  res.status(201).json(productsData.products);
};

module.exports = {
  getAllProducts: getAllProducts,
  getSingleProduct: getSingleProduct,
  createNewProduct: createNewProduct
};