'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')

const myController = new Controller()
myController.init();

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {

  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    const id = Number(document.getElementById('newprod_id').value);
    const name = document.getElementById('newprod-name').value;
    const price = document.getElementById('newprod-price').value;
    const category = Number(document.getElementById('newprod-cat').value)
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
    event.preventDefault()
    const name = document.getElementById('newcat-name').value;
    const description = document.getElementById('newcat-description').value;
    myController.addCategoryToStore({ name, description });
    myController.ocultarBotonesInit();
    document.querySelector('.listCategory').classList.remove('oculto');
    document.getElementById('buttonCategorias').classList.add('active');
  });



  /*document.getElementById('del-prod').addEventListener('submit', (event) => {
    event.preventDefault();

    const idProducto = Number(document.getElementById('delprod-id').value);

    myController.deleteProductFromStore(idProducto);
  });

  document.getElementById('del-cat').addEventListener('submit', (event) => {
    event.preventDefault();

    const idCategoria = Number(document.getElementById('delcat-id').value);

    myController.deleteCategoryFromStore(idCategoria);
  });*/


});


