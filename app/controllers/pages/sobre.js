$.getJSON('dados.json', function(json) {
    $('.template-empresas').template('nome-template');
    $.tmpl('nome-template', json.empresas).appendTo('.tabela-empresas');
});


$('.test').click(function() {
    alert('Teste com sucesso');
});
