function loadResource(url, selector){
    $(selector).load(url).promise().done(() => {
        index = url.indexOf('?')
        if(index!=-1){
            id = url.substring(index+4);
            findById(id);
        }
    });
}

function showForm(event){
    event.preventDefault();
    url = $(event.target).attr('href');
    resource = '#form';
    loadResource(url, resource);
    $('#form').show(); 
}

function closeForm(event){
    event.preventDefault();
    $('#form').html(''); 
}

function btnDelete(event) {
    event.preventDefault();
    let id = $(event.target).parent().data("id");
    return id;
}

function getItemId(event) {
    event.preventDefault();
    let id = $(event.target).parent().data("id");
    return id;
}

$(document).ready(() => {
    $('.btn-new').click( (event) => showForm(event) );
});
