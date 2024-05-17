const express = require('express');
const Product = require('../models/product');
const path = require('../util/path');
const Cart = require('../models/cart');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll(); // Asenkron veri alımı için await kullanıyoruz
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  } catch (error) {
    console.log(error); // Hata durumunda hata yönetimini gerçekleştiriyoruz
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll(); // Asenkron veri alımı için await kullanıyoruz
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  } catch (error) {
    console.log(error); // Hata durumunda hata yönetimini gerçekleştiriyoruz
  }
};
exports.getProductDetail = async(req,res,next) =>{
 const id  = req.params.productID;
const targetObject = await Product.findById(id);
res.render('shop/product-detail', {path: "", pageTitle: targetObject.title, product : targetObject});

}



exports.getCart =async (req, res, next) => {
  const cartObj = await Cart.fetchAllCarts();
  const allProductsInCart = cartObj.products;
  const totalPrice = cartObj.totalPrice;
  const cartList = [];
  for (let product of allProductsInCart){
    const productInfo = {productItem : await Product.findById(product.id), quantity : product.quantity}
    cartList.push(productInfo);
  }
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    prods : cartList,
    totalPrice: totalPrice
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postAddCart =async (req,res,next) => {
const productID = req.body.productID;
const targetObject =await Product.findById(productID);
Cart.addCart(productID,targetObject.price);
res.redirect('/cart' );
}

exports.removeFromCart =async (req,res,next) =>{
  const id  = req.params.productID;
  const price = (await Product.findById(id)).price;
  await Cart.deleteCart(id,price);
  res.redirect('/cart');
}