
$.getJSON('example/dados.json', function(json) {
    Template( $('.template-empresas'), json.empresas ).appendTo('.tabela-empresas');
});


$('.test').click(function() {
    new Ajax('example/ajax.php')
        .data( {message: 'messagem'} )
        .type('get')
        .send(function(result) {
            alert(result);
        }, function (error) {
            console.log(error);
        });
});


Session.set('item', 'valor');

console.log(Session.get('item'));

console.log(Session.has('item'));

if(Params.has('name')) {
    console.log('encontrou');
    $('.params').text('Parametros: ' + Params.all().name + ' | ' + Params.all().age);
}

var scope = {

    toCorporation : function() {
        console.log('trocando');
        User( null);
        User.type('any');
    }
};

Bind( {page: scope} );
