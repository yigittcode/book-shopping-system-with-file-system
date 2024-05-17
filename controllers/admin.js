const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, imageUrl, description);
  product.save();
  res.redirect("/");
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const productID = req.params.productID;
  const product = await Product.findById(productID);
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product: product,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const productID = req.params.productID;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const updated = { title, price, imageUrl, description };
  await Product.setProduct(productID, updated); // or we can update save method in product model.
  res.redirect("/products");
};

exports.deleteProduct = async(req, res, next) =>{
  const productID = req.params.productID;
  const productPrice = (await Product.findById(productID)).price;
  await Cart.deleteCart(productID, productPrice, true);
  await Product.deleteProduct(productID,productPrice);

  res.redirect("/admin/products");  
}
