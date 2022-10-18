'use strict'

const Store = require('../model/store.class');
const View = require('../view/view.class');


class Controller {
    constructor() {
        this.store = new Store(1, 'Almacen ACME');
        this.view = new View();
    }

    init() {
        this.botonesHeader();
        this.store.loadData();
        this.store.products.forEach(element => {
            this.view.renderProduct(element);
            this.botonesPagina(element);
            const botonDisabled = document.getElementById(`botonBajar_${element.id}`);
            element.units < 1 ? botonDisabled.disabled = true : botonDisabled.disabled = false;
        });

        this.store.categories.forEach(element => {
            this.view.renderSelect(element);
        });
        this.view.renderTotal(this.store.totalImport());
        this.store.categories.forEach(element => {
            this.view.renderCategory(element);
            this.view.renderBotonesCategory(element);
            this.botonesCategoria(element);
        });
        this.ocultarBotonesInit();
        document.querySelector('.tablaProduct').classList.remove('oculto');
        document.getElementById('buttonProductos').classList.add('active');
    }

    addProductToStore(formData) {
        try {
            const prod = this.store.addProduct(formData);
            this.view.renderProduct(prod);
            this.botonesPagina(prod);
            const botonDisabled = document.getElementById(`botonBajar_${prod.id}`);
            prod.units < 1 ? botonDisabled.disabled = true : botonDisabled.disabled = false;
            this.view.renderTotal(this.store.totalImport());
        } catch (err) {
            this.view.renderMessageError(err);
        }
    }

    editProductToStore(formData) {
        try {
            const prod = this.store.editProduct(formData);
            this.view.renderProductEditado(prod);
            if (formData.units > 0) {
                document.getElementById(`botonBajar_${formData.id}`).disabled = false;
            }
            this.view.renderTotal(this.store.totalImport());
        } catch (err) {
            this.view.renderMessageError(err);
        }
    }

    subirUnidadesProductToStore(payload, id) {
        const subirUnidades = this.store.subirProducto(id);
        this.view.renderProductEditado(payload);
        this.view.renderTotal(this.store.totalImport());
        document.getElementById(`botonBajar_${payload.id}`).disabled = false;
    }

    bajarUnidadesProductToStore(payload, id) {
        try {
            const bajarUnidades = this.store.bajarProducto(id);
            this.view.renderProductEditado(payload);
            this.view.renderTotal(this.store.totalImport());
            if (payload.units === 0) {
                document.getElementById(`botonBajar_${payload.id}`).disabled = true;
            }

        } catch (err) {
            this.view.renderMessageError(err)
        }
    }

    addCategoryToStore(payload) {
        try {
            const cat = this.store.addCategory(payload.name, payload.descripcion);
            this.view.renderSelect(cat);
            this.view.renderCategory(cat);
            this.botonesCategoria(cat);
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

    botonesPagina(element) {
        const that = this;
        const botonDel = document.getElementById(`botonRemove_${element.id}`);
        botonDel.addEventListener('click', () => {
            that.deleteProductFromStore(element.id);
        });
        const botonEdit = document.getElementById(`botonEditar_${element.id}`);
        botonEdit.addEventListener('click', () => {
            that.view.prepararFormularioEditar(element);
            this.ocultarBotonesInit()
            document.querySelector('.newProduct').classList.remove('oculto');
            document.getElementById('buttonAñadirProducto').classList.add('active');
        });
        const botonSubir = document.getElementById(`botonSubir_${element.id}`);
        botonSubir.addEventListener('click', () => {
            that.subirUnidadesProductToStore(element, element.id);
        });
        const botonBajar = document.getElementById(`botonBajar_${element.id}`);
        botonBajar.addEventListener('click', () => {
            that.bajarUnidadesProductToStore(element, element.id);
        });
    }

    botonesHeader() {
        const botonCategorias = document.getElementById('buttonCategorias');
        botonCategorias.addEventListener('click', () => {
            this.ocultarBotonesInit();
            document.querySelector('.listCategory').classList.remove('oculto');
            document.getElementById('buttonCategorias').classList.add('active');

        });

        const botonAnyadirProducto = document.getElementById('buttonAñadirProducto');
        botonAnyadirProducto.addEventListener('click', () => {
            this.ocultarBotonesInit();
            document.querySelector('.newProduct').classList.remove('oculto');
            document.getElementById('buttonAñadirProducto').classList.add('active');
        });

        const botonAnyadirCategory = document.getElementById('buttonAñadirCategoria');
        botonAnyadirCategory.addEventListener('click', () => {
            this.ocultarBotonesInit();
            document.querySelector('.newCat').classList.remove('oculto');
            document.getElementById('buttonAñadirCategoria').classList.add('active');
        });

        const botonProductos = document.getElementById('buttonProductos');
        botonProductos.addEventListener('click', () => {
            this.ocultarBotonesInit();
            document.querySelector('.tablaProduct').classList.remove('oculto');
            document.getElementById('buttonProductos').classList.add('active');
        });

        const botonSobreNosotros = document.getElementById('buttonSobreNosotros');
        botonSobreNosotros.addEventListener('click', () => {
            this.ocultarBotonesInit();
            document.querySelector('.sobreNosotros').classList.remove('oculto');
            document.getElementById('buttonSobreNosotros').classList.add('active');

        });
    }

    botonesCategoria(payload) {
        const that = this;
        const botonBorrarCat = document.getElementById(`botonRemove_${payload.id}`);
        botonBorrarCat.addEventListener('click', () => {
            that.deleteCategoryFromStore(payload.id);
        })
    }

    ocultarBotonesInit() {
        document.querySelector('.listCategory').classList.add('oculto');
        document.querySelector('.tablaProduct').classList.add('oculto');
        document.querySelector('.newProduct').classList.add('oculto');
        document.querySelector('.newCat').classList.add('oculto');
        document.querySelector('.sobreNosotros').classList.add('oculto');
        document.getElementById('buttonCategorias').classList.remove('active');
        document.getElementById('buttonProductos').classList.remove('active');
        document.getElementById('buttonAñadirProducto').classList.remove('active');
        document.getElementById('buttonAñadirCategoria').classList.remove('active');
        document.getElementById('buttonSobreNosotros').classList.remove('active');
    }

}
module.exports = Controller;