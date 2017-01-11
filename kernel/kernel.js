$(function ()
{
    document.__defineGetter__("cookie", function() { return '';} );
    document.__defineSetter__("cookie", function() {} );

    $('*[extends]').each(function(){
        $(this).load('app/template/' + $(this).attr('extends') + '.html');
    });

    $(window).on('hashchange', hashchanged);
    hashchanged();
});

function hashchanged()
{
    var app = '.' + $('html').attr('app-name');
    var content = $('*[content]');

    var route = location.hash.replace(/[#\/]/g, '') || 'home';
    var routes = null;

    $.getJSON('routes.json', function(data) {
        routes = data;
        route = defineRoute(routes, route);

        if(route == null) {
           console.log('Rota não foi definida');
           return;
        }

        content.load('app/views/' + route.replace('!', '') + '.html');


        var first = route.substring(0, 1);
        if(first != '!')
           $.getScript('app/controllers/' + route + '.js', function(){});

    }).error(function() {
        console.log('Há algum erro no arquivo de rotas');
    });
}

function defineRoute(routes, route_p)
{
    var routes_key = Object.keys(routes);
    var routes_values = Object.values(routes);

    for (var i = 0; i < routes_key.length; i++)
        if(route_p == routes_key[i])
            return routes_values[i].replace('.', '/');

    return null;
}
