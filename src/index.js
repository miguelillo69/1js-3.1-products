'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')

const myController = new Controller()
myController.init();

window.addEventListener('load', () => {

  /*const nombreForm = document.getElementById('newprod-name');
  const nombre = document.getElementById('newprod-name').value;
  const nombreFormError = nombreForm.nextElementSibling;
  nombreForm.addEventListener('blur', () => {
    if (!nombreForm.checkValidity()) {
      nombreFormError.textContent = nombreForm.validationMessage;
    } else {
      nombreFormError.textContent = null;
    }
    if (condition) {
    } else {
    }
  });
  const categoriaForm = document.getElementById('newprod-cat');
  const categoriaFormError = categoriaForm.nextElementSibling;
  categoriaForm.addEventListener('blur', () => {
    if (!categoriaForm.checkValidity()) {
      categoriaFormError.textContent = categoriaForm.validationMessage;
    } else {
      categoriaFormError.textContent = null;
    }
  });

  const unitsForm = document.getElementById('newprod-units');
  const unitsFormError = unitsForm.nextElementSibling;
  unitsForm.addEventListener('blur', () => {
    if (!unitsForm.checkValidity()) {
      unitsFormError.textContent = unitsForm.validationMessage;
    } else {
      unitsFormError.textContent = null;
    }
  });

  const priceForm = document.getElementById('newprod-price');
  const priceFormError = priceForm.nextElementSibling;
  priceForm.addEventListener('blur', () => {
    if (!priceForm.checkValidity()) {
      priceFormError.textContent = priceForm.validationMessage;
    } else {
      priceFormError.textContent = null;
    }
  });

  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault();

    const id = Number(document.getElementById('newprod_id').value);
    const name = document.getElementById('newprod-name').value;
    const price = document.getElementById('newprod-price').value;
    const category = Number(document.getElementById('newprod-cat').value);
    const units = Number(document.getElementById('newprod-units').value);
    if (!id) {
      myController.addProductToStore({ name, price, category, units });
      myController.ocultarBotonesInit();
      document.querySelector('.tablaProduct').classList.remove('oculto');
      document.getElementById('buttonProductos').classList.add('active');
    } else {
      myController.editProductToStore({ id, name, price, category, units });
      myController.ocultarBotonesInit();
      document.querySelector('.tablaProduct').classList.remove('oculto');
      document.getElementById('buttonProductos').classList.add('active');
    }
  });

  document.getElementById('new-cat').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('newcat-name').value;
    const description = document.getElementById('newcat-description').value;
    myController.addCategoryToStore({ name, description });
    myController.ocultarBotonesInit();
    document.querySelector('.listCategory').classList.remove('oculto');
    document.getElementById('buttonCategorias').classList.add('active');
  });*/
});

