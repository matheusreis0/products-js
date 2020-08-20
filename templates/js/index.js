function loadResource(url, selector){
    $(selector).load(url).promise().done(() => {
        index = url.indexOf('?')
        if(index!=-1){
            id = url.substring(index+4);
            findById(id);
        }
    });
}

function btnClick(event){
    event.preventDefault();
    url = $(event.target).attr('href');
    resource = '#form';
    loadResource(url, resource);
    $('#form').show(); 
}

$('.btn-new').click( (event) => btnClick(event) );
