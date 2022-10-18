'use strict'


class View {

    renderProduct(product) {
        const productUI = document.createElement('tr');
        productUI.id = product.id;
        productUI.innerHTML = `
<td>${product.id}</td>
<td>${product.name}</td>
<td>${product.category}</td>
<td>${product.units}</td>
<td>${product.price} €/u</td>
<td>${product.productImport().toFixed(2)} €</td>
<td>
${this.renderBotones(product)}
</td>
`;
        const tbodyUI = document.querySelector('#almacen tbody');
        tbodyUI.appendChild(productUI);

    }

    renderCategory(category) {
        const categoryUI = document.createElement('tr');
        categoryUI.id = category.id;
        categoryUI.innerHTML = `
<td>${category.id}</td>
<td>${category.name}</td>
<td>
${this.renderBotonesCategory(category)}
</td>
`;
        const tcategoryUI = document.getElementById('pppp');
        tcategoryUI.appendChild(categoryUI);

    }

    renderProductEditado(product) {
        const borrarFormulario = document.getElementById('new-prod');
        const productoModificado = document.getElementById(product.id);
        productoModificado.children[1].innerHTML = product.name;
        productoModificado.children[4].innerHTML = `${product.price} €`;
        productoModificado.children[2].innerHTML = product.category;
        productoModificado.children[3].innerHTML = product.units;
        productoModificado.children[5].innerHTML = `${product.productImport().toFixed(2)}€/u`;
        document.getElementById('tabla_prod').textContent = "Añadir producto";
        document.getElementById('boton_añadir_modificar').textContent = "Añadir";
        borrarFormulario.reset();
    }

    deleteProduct(id) {
        const borrarProduct = document.getElementById(id);
        borrarProduct.parentNode.removeChild(borrarProduct);
    }

    deleteCategory(id) {
        const borrarCategory = document.getElementById(`${id}_category`);
        borrarCategory.remove(borrarCategory);
    }


    renderTotal(importe) {
        const tfootUI = document.querySelector('#total-import');
        tfootUI.innerHTML = `<th>${importe.toFixed(2)} €</th>`;
    }


    renderSelect(category) {
        const categoryUI = document.createElement('option');
        categoryUI.value = category.id;
        categoryUI.id = `${category.id}_category`;
        categoryUI.innerHTML = category.name;
        const optionUI = document.querySelector('#new-prod select');
        optionUI.appendChild(categoryUI);
    }


    renderMessageError(message) {
        const errorUI = document.createElement('div');
        errorUI.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
                ${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    onclick="this.parentElement.remove()"></button>
            </div>`;
        const messageUI = document.getElementById(`messages`);
        messageUI.appendChild(errorUI);

        setTimeout(() => errorUI.remove(), 3000);
    }

    prepararFormularioEditar(producte) {
        document.getElementById('añadirProducto').textContent = "Modificar producto";
        document.getElementById('tabla_prod').textContent = "Modificar producto";
        document.getElementById('newprod_id').value = producte.id;
        document.getElementById('newprod-name').value = producte.name;
        document.getElementById('newprod-price').value = producte.price;
        document.getElementById('newprod-cat').value = producte.category;
        document.getElementById('newprod-units').value = producte.units;
        document.getElementById('boton_añadir_modificar').textContent = "Modificar";

    }

    renderBotones(product) {
        return `<button value="${product.id}" id="botonSubir_${product.id}"><span class="material-icons-outlined">upload</span></button>
<button disabled value="${product.id}" id="botonBajar_${product.id}"><span class="material-icons-outlined">download</span></button>
<button value="${product.id}" id="botonEditar_${product.id}"><span class="material-icons-outlined">edit</span></button>
<button value="${product.id}" id="botonRemove_${product.id}" style="background-color:red; color:white"><span class="material-icons-outlined">delete</span></button>`
    }

    renderBotonesCategory(category) {
        return `<button value="${category.id}" id="botonEditar_${category.id}"><span class="material-icons-outlined">edit</span></button>
<button value="${category.id}" id="botonRemoveCat_${category.id}" style="background-color:red; color:white"><span class="material-icons-outlined">delete</span></button>`
    }

}


module.exports = View;