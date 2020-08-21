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
                loadTable(data);
            }
        },
        error: (e) => {
            $('.msg.error').html('<p>Erro ao acessar API</p>');
        }
    });
};

function sendData(data, method, id = '') {
    $.ajax({
        type : method,
        url : product_endpoint + id,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: () => {
            getData();
        },
        error: (e) => {
            $('.msg.error').html('<p>Erro ao acessar API</p>');
        }
    });
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
            $('.msg.error').html('<p>Erro ao acessar API</p>');
        }
    });
}

function loadTable(data) {
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

$(document).ready(() => getData());
