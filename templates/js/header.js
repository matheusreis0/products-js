$('.btn-menu').click( function(event){
    url = $(this).attr('href');
    event.preventDefault();
    $('#content').load(url);
});
$('.btn-logo').click( function(event){
    url = $(this).attr('href');
    event.preventDefault();
    $('body').load(url);
});
