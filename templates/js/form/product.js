var product_obj = {};

function loadFormData(data) {
    product_obj = data;
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

    obj['origin'] = product_obj.origin ? product_obj.origin : 'empty';
    obj['sku'] = product_obj.sku ? product_obj.sku : 'empty';
    obj['seller_id'] = product_obj.seller_id ? product_obj.seller_id : '61bd5305-e295-4a13-9dc4-d46e0502edb4';
    obj['product_code'] = product_obj.product_code ? product_obj.product_code : 'empty';
    obj['gtin'] = product_obj.gtin ? product_obj.gtin : 'empty';
    obj['brand'] = product_obj.brand ? product_obj.brand : 'empty';
    obj['free_shipping'] = product_obj.free_shipping ? product_obj.free_shipping : false;
    obj['group_id'] = product_obj.group_id ? product_obj.group_id : 'empty';
    obj['tax_information_id'] = product_obj.tax_information_id ? product_obj.tax_information_id : '61bd5305-e295-4a13-9dc4-d46e0502edb4';
    obj['rejection_reasons'] = product_obj.rejection_reasons ? product_obj.rejection_reasons : {};
    obj['active'] = product_obj.active ? product_obj.active : false;
    obj['part_number'] = product_obj.part_number ? product_obj.part_number : 'empty';
    obj['in_campaign'] = product_obj.in_campaign ? product_obj.in_campaign : false;
    obj['odin'] = product_obj.odin ? product_obj.odin : 'empty';
    obj['waiting_invoice'] = product_obj.waiting_invoice ? product_obj.waiting_invoice : false;
    obj['controller_gtin_id'] = product_obj.controller_gtin_id ? product_obj.controller_gtin_id : '61bd5305-e295-4a13-9dc4-d46e0502edb4';
    obj['currency'] = product_obj.currency ? product_obj.currency : 'BRL';
    obj['offer'] = product_obj.offer ? product_obj.offer : obj.price;

    return obj;
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
