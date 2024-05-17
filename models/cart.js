const fs = require('fs/promises');
const rootDir = require('../util/path');
const path = require('path');

const filePath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    static async fetchAllCarts() {
        let cart = { products: [], totalPrice: 0 };
        try {
            const fileContent = await fs.readFile(filePath);
            cart = JSON.parse(fileContent);
        } catch (err) {
            console.error(err);
        }
        return cart;
    }

    static async addCart(id, price) {
        const updatedCart = await Cart.#analyzeCart(id, price);
        await Cart.#saveCart(updatedCart);
    }

    static async deleteCart(id, price, fullDelete = false) {
        let cart = await Cart.fetchAllCarts();
        const existingProductIndex = cart.products.findIndex((element) => element.id == id);
        if (existingProductIndex !== -1) {
            const existingProduct = cart.products[existingProductIndex];
            if (cart.products[existingProductIndex].quantity == 1 || fullDelete) {
                cart.products.splice(existingProductIndex, 1);
                cart.totalPrice -= (+price * existingProduct.quantity);
            } else {
                cart.products[existingProductIndex].quantity -= 1;
                cart.totalPrice -= +price;
            }
            await Cart.#saveCart(cart);
        }
    }

    static async #analyzeCart(id, price) {
        const cart = await Cart.fetchAllCarts();
        const existingProductIndex = cart.products.findIndex((element) => element.id == id);
        let updatedCart = { ...cart };
        if (existingProductIndex !== -1) {
            updatedCart = Cart.#updateExistingProduct(cart, existingProductIndex);
        } else {
            updatedCart = Cart.#addNewProduct(cart, id);
        }
        updatedCart.totalPrice += +price;
        return updatedCart;
    }

    static #updateExistingProduct(cart, existingProductIndex) {
        const updatedCart = { ...cart };
        updatedCart.products[existingProductIndex].quantity += 1;
        return updatedCart;
    }

    static #addNewProduct(cart, id) {
        const updatedCart = { ...cart };
        const newProduct = { id: id, quantity: 1 };
        updatedCart.products = [...cart.products, newProduct];
        return updatedCart;
    }

    static async #saveCart(cart) {
        try {
            await fs.writeFile(filePath, JSON.stringify(cart));
        } catch (err) {
            console.error(err);
        }
    }
};
