var product_endpoint = 'http://localhost:5000/api/product/'

function get_all() {
    $.ajax({
        type : 'GET',
        url : product_endpoint,
        dataType : 'json',
        success: (data) => {
            load_table(data);
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
        $('.btn-edit').click( (event)=>showForm(event) );
        $('.btn-delete').click( (event)=>btnDelete(event) );
    });
}

$(document).ready(() => get_all());
