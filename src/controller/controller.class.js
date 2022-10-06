const Store = require('../model/store.class');
const View = require('../view/view.class');


class Controller {
    constructor() {
        this.store = new Store(1, 'Almacen ACME');
        this.view = new View();
    }

    init() {
        this.store.loadData();
        this.store.products.forEach(element => {
            this.view.renderProduct(element);
        });
        this.store.categories.forEach(element => {
            this.view.renderSelect(element);
        });
        this.view.renderTotal(this.store.totalImport());
    }

    addProductToStore(formData) {
        try {
            const prod = this.store.addProduct(formData);
            this.view.renderProduct(prod);
            this.view.renderTotal(this.store.totalImport());
        } catch (err) {
            this.view.renderMessageError(err);
        }
    }

    addCategoryToStore(payload) {
        try {
            const cat = this.store.addCategory(payload.name, payload.descripcion);
            this.view.renderSelect(cat);
        } catch (err) {
         this.view.renderMessageError(err);
        }
    }

    deleteProductFromStore(id) {
        try {
            const delProd = this.store.delProduct(id);
            this.view.deleteProduct(id);
        } catch (err) {
             this.view.renderMessageError(err);
        }
    }

    deleteCategoryFromStore(id) {
        try {
            const delCat = this.store.delCategory(id);
            this.view.deleteCategory(id);
        } catch (err) {
             this.view.renderMessageError(err);
        }
    }

    initView(formData) {
        try {
            const init = this.view.renderProductInit(formData);
        } catch (err) {
         this.view.renderMessageError(err)
        }
    }

    

}
    module.exports = Controller;