'use strict'

const Category = require('./category.class');
const Product = require('./product.class');
const data = require('./datosIni.json');

class Store {

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.products = [];
        this.categories = [];
    }

    loadData() {
        data.categories.forEach(category => this.categories.push(new Category(category.id,category.name,category.description)));
        data.products.forEach(product => this.products.push(new Product(product.id,product.name,product.category,product.price,product.units)));
    }

    getCategoryById(id) {
        let idCategoria = this.categories.find(categoria => categoria.id === id);
        if (!idCategoria) {
            throw Error("No existe categoria");
        }
        return idCategoria;
    }

    getCategoryByName(name) {
        name = name.toLocaleLowerCase();
        let nameCategoria = this.categories.find(categoria => categoria.name === name);
        if (!nameCategoria) {
            throw Error("No existe categoria");
        }
        return nameCategoria;
    }

    getProductById(id) {
        let producto = this.products.find(producto => producto.id === id);
        if (!producto) {
            throw Error("No existe el producto");
        }
        return producto;
    }

    getProductsByCategory(id) {
        return this.products.filter(producto => producto.category === id);
    }

    addCategory(nombre, descripcion) {
        if (!nombre) {
            throw Error("No has añadido nombre");
        }
        try {
            this.getCategoryByName(nombre);

        } catch {
            let nuevoId = this.idNuevaMax(this.categories);
            let nuevaCategoria = new Category(nuevoId, nombre, descripcion);
            this.categories.push(nuevaCategoria);
            return nuevaCategoria;
        }
        throw Error("La categoría ya existe");
    }

    addProduct(payload) {
        if (!payload.name) {
            throw Error("No has añadido name");
        }
        if (!payload.price || payload.price < 0 || isNaN(payload.price)) {
            throw Error("El precio no es correcto, o no lo has añadido");
        }
        if (payload.units) {
            if (!Number.isInteger(payload.units) || payload.units < 0) {
                throw Error("Has añadido un valor no entero o decimal");
            }
        }
        payload.category = parseInt(payload.category);
        if (!payload.category || !this.getCategoryById(payload.category)) {
            throw Error("No has añadido categoria o no existe");
        }
        let idProducto = this.idNuevaMax(this.products);
        let newProducto = new Product(idProducto, payload.name, payload.category, payload.price, payload.units);
        this.products.push(newProducto);
        return newProducto;
    }

    delCategory(id) {
        this.getCategoryById(id);
        if (this.getProductsByCategory(id).length) {
            throw "La categoria tiene productos";
        }
        let categoriaBorrada = this.categories.splice(this.categories.id - 1, 1);
        return categoriaBorrada[0];
    }

    delProduct(id) {
        let productoBorrado = this.getProductById(id);
        if (productoBorrado.units !== 0) {
            throw "No se puede borrar el producto, al tener unidades";
        }
        this.products.splice(this.products.id - 1, 1);
        return productoBorrado;
    }

    totalImport() {
        return this.products.reduce((total, prod) => total += prod.productImport(),0);
    }

    orderByUnitsDesc() {
        let productosOrdenadoUnidades = this.products.sort((producto1, producto2) => producto2.units - producto1.units);
        return productosOrdenadoUnidades;
    }

    orderByName() {
        let productosOrdenadoNombre = this.products.sort((producto1, producto2) => producto1.name.localeCompare(producto2.name));
        return productosOrdenadoNombre;
    }

    underStock(units) {
        let arrayBajoStock = this.products.filter(unidades => unidades.units < units);
        return arrayBajoStock;
    }

    toString() {
        return "Almacen " + this.id + " => " + this.products.length + " productos: " + this.totalImport() + " €\n - " +
            Product.toString + "\n";

    }

    idNuevaMax(array) {
        let idMaxima = array.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
        return idMaxima;
    }
}

module.exports = Store

