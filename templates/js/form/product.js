function loadFormData(data) {
    $("[name='id']").val(data.id);
    $("[name='name'").val(data.name);
    $("[name='description']").val(data.description);
    $("[name='price']").val(data.price);
    $("[name='status']").val(data.status);
    $("[name='approved']").prop('checked', data.approved);
}

function toJson(data) {
    let obj = {};
    obj['id'] = data[0].value;
    obj['name'] = data[1].value;
    obj['description'] = data[2].value;
    obj['price'] = parseFloat(data[3].value);
    obj['status'] = data[4].value;
    obj['approved'] = data[5] !== undefined ? true : false;

    obj['origin'] = 'empty';
    obj['sku'] = 'empty';
    obj['seller_id'] = 'empty';
    obj['product_code'] = 'empty';
    obj['gtin'] = 'empty';
    obj['brand'] = 'empty';
    obj['free_shipping'] = false;
    obj['group_id'] = 'empty';
    obj['tax_information_id'] = 'empty';
    obj['rejection_reasons'] = 'empty';
    obj['active'] = false;
    obj['part_number'] = 'empty';
    obj['in_campaign'] = false;
    obj['odin'] = 'empty';
    obj['waiting_invoice'] = false;
    obj['controller_gtin_id'] = 'empty';
    obj['currency'] = 'BRL';
    obj['offer'] = 0;

    return obj
}

function sendDataToApi(values) {
    data = toJson(values);
    id = data.id;
    delete data.id;

    if (id) {
        sendData(data, 'PUT', id);
    } else {
        sendData(data, 'POST');
    }
}

$('form').submit( (event) => {
    event.preventDefault();
    let message = '';
    let values = $(event.target).serializeArray();

    $('.msg-error').html('');

    values.forEach(e => {
        $("[name='"+e['name']+"']").removeClass('input-error');
        if(e['value'].trim() == '' && e['name'] != 'id') {
            message += '<p>* O campo '+e['name']+' precisa ser preenchido! </p>';
            $("[name='"+e['name']+"']").addClass('input-error');
        }
    });
    $('.msg-error').html(message);

    if (message == '') {
        sendDataToApi(values);
    }
});

$(document).ready(() => {
    $('.btn-close').click( () => closeForm(event));
});
