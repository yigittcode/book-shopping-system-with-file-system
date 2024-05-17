"use strict";

var express = require('express');

var Product = require('../models/product');

var path = require('../util/path');

var Cart = require('../models/cart');

exports.getProducts = function _callee(req, res, next) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.fetchAll());

        case 3:
          products = _context.sent;
          // Asenkron veri alımı için await kullanıyoruz
          res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0); // Hata durumunda hata yönetimini gerçekleştiriyoruz

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getIndex = function _callee2(req, res, next) {
  var products;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.fetchAll());

        case 3:
          products = _context2.sent;
          // Asenkron veri alımı için await kullanıyoruz
          res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0); // Hata durumunda hata yönetimini gerçekleştiriyoruz

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getProductDetail = function _callee3(req, res, next) {
  var id, targetObject;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.productID;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.findById(id));

        case 3:
          targetObject = _context3.sent;
          res.render('shop/product-detail', {
            path: "",
            pageTitle: targetObject.title,
            product: targetObject
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getCart = function _callee4(req, res, next) {
  var cartObj, allProductsInCart, totalPrice, cartList, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, product, productInfo;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Cart.fetchAllCarts());

        case 2:
          cartObj = _context4.sent;
          allProductsInCart = cartObj.products;
          totalPrice = cartObj.totalPrice;
          cartList = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 9;
          _iterator = allProductsInCart[Symbol.iterator]();

        case 11:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context4.next = 22;
            break;
          }

          product = _step.value;
          _context4.next = 15;
          return regeneratorRuntime.awrap(Product.findById(product.id));

        case 15:
          _context4.t0 = _context4.sent;
          _context4.t1 = product.quantity;
          productInfo = {
            productItem: _context4.t0,
            quantity: _context4.t1
          };
          cartList.push(productInfo);

        case 19:
          _iteratorNormalCompletion = true;
          _context4.next = 11;
          break;

        case 22:
          _context4.next = 28;
          break;

        case 24:
          _context4.prev = 24;
          _context4.t2 = _context4["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context4.t2;

        case 28:
          _context4.prev = 28;
          _context4.prev = 29;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 31:
          _context4.prev = 31;

          if (!_didIteratorError) {
            _context4.next = 34;
            break;
          }

          throw _iteratorError;

        case 34:
          return _context4.finish(31);

        case 35:
          return _context4.finish(28);

        case 36:
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            prods: cartList,
            totalPrice: totalPrice
          });

        case 37:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[9, 24, 28, 36], [29,, 31, 35]]);
};

exports.getOrders = function (req, res, next) {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = function (req, res, next) {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postAddCart = function _callee5(req, res, next) {
  var productID, targetObject;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          productID = req.body.productID;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.findById(productID));

        case 3:
          targetObject = _context5.sent;
          Cart.addCart(productID, targetObject.price);
          res.redirect('/cart');

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.removeFromCart = function _callee6(req, res, next) {
  var id, price;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.productID;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Product.findById(id));

        case 3:
          price = _context6.sent.price;
          _context6.next = 6;
          return regeneratorRuntime.awrap(Cart.deleteCart(id, price));

        case 6:
          res.redirect('/cart');

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
};