function loadFormData(data) {
    $("[name='id']").val(data.id);
    $("[name='name'").val(data.name);
    $("[name='description']").val(data.description);
    $("[name='price']").val(data.price);
    $("[name='status']").val(data.status);
    $("[name='approved']").val(data.approved);
}
