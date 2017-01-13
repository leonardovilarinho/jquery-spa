function Bind( param ) {
    Config.load_gdb = new GDB( param );
    Config.load_gdb.render();
};

function Template(template, data) {
    template.template('template-name');
    return $.tmpl('template-name', data);
};


function To_route(route) {
    Local.set('jquery_spa_hash_changed', Date.now());
    location.hash = '#' + route;
}
