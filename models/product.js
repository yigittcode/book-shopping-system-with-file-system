const fs = require("fs/promises");
const path = require("path");
const rootDir = require("../util/path");

const filePath = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  static async #findIndex(id) {
    try{
    let products = await Product.fetchAll();
    const index = products.findIndex((product) => {
      return product.id == id;
    });
    return index;}
    catch(err) {
      console.error(err);
    }
  }

  static async fetchAll() {
    try {
      let data = await fs.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      return [];
    }
  }

  async save() {
    try {
      this.id = Math.random();
      let products = await Product.fetchAll(); 
      products.push(this); 
      await Product.#writeToFile(products);
    } catch (error) {
      console.error(error);
    }
  }

  static async findById(id) {
    const products = await Product.fetchAll();
    return products.find((p) => p.id == id);
  }

  static async setProduct(id, newValue) {
    try {
      const index = await Product.#findIndex(id);
      const products = await Product.fetchAll();
      products[index].title = newValue.title;
      products[index].price = newValue.price;
      products[index].imageUrl = newValue.imageUrl;
      products[index].description = newValue.description;
      await Product.#writeToFile(products);
    } catch (err) {
      console.error(err);
    }
  }

  static async deleteProduct(id) {
    const index = await Product.#findIndex(id);
    console.log(index);
    const products = await Product.fetchAll();
    products.splice(index, 1);
    await Product.#writeToFile(products);
  }

  static async #writeToFile(products){
    await fs.writeFile(filePath, JSON.stringify(products));

  }
};