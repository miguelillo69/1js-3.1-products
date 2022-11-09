'use strict'

const Category = require('./category.class');
const Product = require('./product.class');
const SERVER = 'http://localhost:3000'


class Store {

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.products = [];
        this.categories = [];
    }

    async loadData() {
        const response = await fetch(SERVER + "/categories")
        if (response.ok) {
            const categories = await response.json()
            categories.forEach(category => this.categories.push(new Category(category.id, category.name, category.description)));
        } else {
            throw Error('Error en la petición HTTP: ' + response.status + ' (' + response.statusText + ')');
        }


        const response2 = await fetch(SERVER + "/products")
        if (response2.ok) {
            const products = await response2.json()
            products.forEach(product => this.products.push(new Product(product.id, product.name, product.category, product.price, product.units)));
        } else {
            throw Error('Error en la petición HTTP: ' + response2.status + ' (' + response2.statusText + ')');
        }
    }

    async getCategoryById(id) {
        const response = await fetch(SERVER + "/categories/" + id)
        if (response.ok) {
            const categoria = await response.json()
            //idCategoria = categories.find(categoria => categoria.id === id);
            if (!categoria) {
                throw Error("No existe categoria");
            } else {
                return categoria;
            }
        } else {
            throw Error('Error en la petición HTTP: ' + response.status + ' (' + response.statusText + ')');
        }

    }

    async getCategoryByName(name) {
        const response = await fetch(SERVER + "/categories")
        if (response.ok) {
            const categories = await response.json()
            let name = name.toLocaleLowerCase();
            let nameCategoria = categories.find(categoria => categoria.name === name);
            if (!nameCategoria) {
                throw Error("No existe categoria");
            } else {
                return nameCategoria;
            }
        } else {
            throw Error('Error en la petición HTTP: ' + response.status + ' (' + response.statusText + ')');
        }
    }

    async getProductByName(name) {
        const response = await fetch(SERVER + "/products")
        if (response.ok) {
            const products = await response.json()
            const name = name.toLocaleLowerCase();
            let nameProduct = products.find(producto => producto.name.toLocaleLowerCase() === name);
            if (nameProduct) {
                return true;
            }
        } else {
            throw Error('Error en la petición HTTP: ' + response.status + ' (' + response.statusText + ')');
        }
    }

    async getProductById(id) {
        const response = await fetch(SERVER + "/products")
        if (response.ok) {
            const products = await response.json()
            const producto = products.find(producto => producto.id === id);
            if (!producto) {
                throw Error("No existe el producto");
            } else {
                return producto;
            }
        } else {
            throw Error('Error en la petición HTTP: ' + response.status + ' (' + response.statusText + ')');
        }
    }

    async getProductsByCategory(id) {
        const response = await fetch(SERVER + "/products")
        if (response.ok) {
            const products = await response.json()
            return products.filter(producto => producto.category === id);
        } else {
            throw Error('Error en la petición HTTP: ' + response.status + ' (' + response.statusText + ')');
        }
    }

    async addCategory(nombre, descripcion) {
        if (!nombre) {
            throw Error("No has añadido nombre");
        }
        try {
            await this.getCategoryByName(nombre);

        } catch {
            const formData = {
                name: nombre,
                description: descripcion || "No hay descripción",
            }

            const response = await fetch(SERVER + "/categories", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw ('Error en la petición HTTP: ' + response.status + ' (' + response.statusText + ')');
            }
            response = await response.json()
            let nuevaCategoria = new Category(response.id, response.nombre, response.descripcion);
            this.categories.push(nuevaCategoria);
            return nuevaCategoria;
        }
        throw Error("La categoría ya existe");
    }

    async addProduct(payload) {
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
        const formData = {
            name: payload.name,
            category: payload.category,
            price: payload.price,
            units: payload.units,
        }
        payload.category = parseInt(payload.category);
        let isCorrect = await this.getCategoryById(payload.category);
        if (!payload.category || !isCorrect) {
            throw Error("No has añadido categoria o no existe");
        }
        const response = await fetch(SERVER + "/products", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw Error('Error en la petición HTTP: ' + response.status + ' (' + response.statusText + ')');
        }
        let product = await response.json()
        let newProducto = new Product(product.id, product.name, product.category, product.price, product.units);
        this.products.push(newProducto);
        return newProducto;
    }

    async editProduct(payload) {
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
        const formData = {
            name: payload.name,
            category: payload.category,
            price: payload.price,
            units: payload.units,
        }
        payload.category = parseInt(payload.category);
        let isCorrect = await this.getCategoryById(payload.category);
        if (!payload.category || !isCorrect) {
            throw Error("No has añadido categoria o no existe");
        }
        const response = await fetch(SERVER + "/products/" + payload.id, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw Error('Error en la petición HTTP: ' + response.status + ' (' + response.statusText + ')');
        }else {
            const productoModificadoServer = response.json(); 
            const productoModificado = await this.getProductById(payload.id);
            productoModificado.name = productoModificadoServer.name;
            productoModificado.category = productoModificadoServer.category;
            productoModificado.price = productoModificadoServer.price;
            productoModificado.units = productoModificadoServer.units;
            return productoModificado;
        }
        
    }

    async delCategory(id) {
        await this.getCategoryById(id);
        if (this.getProductsByCategory(id).length) {
            throw "La categoria tiene productos";
        }
        let categoriaBorrada = this.categories.splice(this.categories.id - 1, 1);
        return categoriaBorrada[0];
    }

    async delProduct(id) {
        let productoBorrado = await this.getProductById(id);
        if (productoBorrado.units !== 0) {
            throw "No se puede borrar el producto, al tener unidades";
        }
        let prod = this.products.findIndex((elemento) => elemento.id === id);
        this.products.splice(prod, 1);
        return productoBorrado;
    }

    totalImport() {
        return this.products.reduce((total, prod) => total += prod.productImport(), 0);
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

    /*async idNuevaMax(clase) {
            const response = await fetch(SERVER + "/" + clase)
            if (response.ok) {
                const arrayId = response.json()
                let idMaxima = arrayId.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
                return idMaxima;
            } else {
                throw ('Error en la petición HTTP: ' + response.status + ' (' + response.statusText + ')');
            }
        }*/

    async subirProducto(id) {
        const productoModificado = await this.getProductById(id);
        productoModificado.units++;
        return productoModificado;
    }

    async bajarProducto(id) {
        const productoModificado = await this.getProductById(id);
        if (productoModificado.units <= 0) {
            throw "No hay unidades que borrar";
        }
        productoModificado.units--;
        return productoModificado;
    }
}

module.exports = Store

