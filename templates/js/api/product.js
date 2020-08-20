var product_endpoint = 'http://localhost:5000/api/product/'

function getData(id = '') {
    $.ajax({
        type : 'GET',
        url : product_endpoint + id,
        dataType : 'json',
        success: (data) => {
            if (id !== '') {
                loadFormData(data);
            } else {
                load_table(data);
            }
        },
        error: (e) => {
            console.log('api erro')
        }
    });
};

function sendData(data, id = '') {
    console.log('sent', data);
}

function deleteData(id) {
    $.ajax({
        type : 'DELETE',
        url : product_endpoint + id,
        dataType : 'json',
        success: () => {
            getData();
        },
        error: (e) => {
            console.log('api erro')
        }
    });
}

function load_table(data) {
    data.forEach((item) => {
        data += `<tr>
            <td width="15%">${item['name']}</td>"
            <td>${item['description']}</td>"
            <td width="5%">${item['price']}</td>"
            <td width="10%">${item['status']}</td>"
            <td width="10%">${item['approved']}</td>"
            <td width="15%" data-id="${item['id']}">
                <a class='btn-edit' href="product/form.html">Editar</a> |
                <a class='btn-delete' href='#'>Deletar</a>
            </td>
        </tr>`;
    });

    $('table tbody').html(data).promise().done( () => {
        $('.btn-edit').click( (event)=> {
            showForm(event);
            id = getItemId(event);
            getData(id);
        } );
        $('.btn-delete').click( (event)=> {
            id = getItemId(event);
            answer = confirm('Deletar?')
            if (answer) {
                deleteData(id);
            }
        });
    });
}

function loadFormData(data) {
    $("[name='id']").val(data.id);
    $("[name='name'").val(data.name);
    $("[name='description']").val(data.description);
    $("[name='price']").val(data.price);
    $("[name='status']").val(data.status);
    $("[name='approved']").val(data.approved);
}

$(document).ready(() => getData());
