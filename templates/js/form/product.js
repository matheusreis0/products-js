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
    return obj
}

$('form').submit( (event) => {
    event.preventDefault();
    let values = $(event.target).serializeArray();
    data = toJson(values);
    id = data.id;
    delete data.id;

    if (id) {
        sendData(data, 'PUT', id);
    } else {
        sendData(data, 'POST');
    }
});
