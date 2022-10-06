

class View {

    renderProduct(product) {
        const productUI = document.createElement('tr');
        productUI.id = product.id;
        productUI.innerHTML = `
<td>${product.id}</td>
<td>${product.name}</td>
<td>${product.category}</td>
<td>${product.units}</td>
<td>${product.price}</td>
<td>${product.productImport()}</td>
<td></td>`;
        const tbodyUI = document.querySelector('#almacen tbody');
        tbodyUI.appendChild(productUI);
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
        tfootUI.innerHTML = `<th>${importe} €</th>`;
    }


    renderSelect(category) {
        const categoryUI = document.createElement('option');
        categoryUI.value = `${category.id}_category`;
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
    //alert(message);
    }
}


module.exports = View;