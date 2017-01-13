function Params() {};

Params.add = function (__values) {
    if( typeof __values === 'object') {
        $.each(__values, function(index, value) {
            if( typeof value === 'object' )
                Local.set('jquery_spa_params_' + index, JSON.stringify(value));
            else if(typeof value != "function")
                Local.set('jquery_spa_params_' + index, value);
        });
    }
    return this;
};

Params.get = function (__key) {

    if( Local.has('jquery_spa_params_' + __key) ) {
        try
        {
           var json = JSON.parse(Local.get('jquery_spa_params_' + __key));
           return json;
        }
        catch(e)
        {
           return Local.get('jquery_spa_params_' + __key) || null;
        }
    }
    return null;
};

Params.has = function (__key) {
    return Local.has('jquery_spa_params_' + __key);
}

Params.all = function () {

    var values = {}, keys = Object.keys(localStorage), i = keys.length;

    while ( i-- ) {
        if(keys[i].indexOf('jquery_spa_params_') !== -1) {
            var k = keys[i].replace('jquery_spa_params_', '');
            values[k] = Params.get(k);
        }
    }
    return values;
};


Params.clear = function () {

    var keys = Object.keys(localStorage), i = keys.length;

    while ( i-- ) {
        if(keys[i].indexOf('jquery_spa_params_') !== -1) {
            Local.destroy(keys[i]);
        }
    }
};


Params.destroy = function (__key) {

    Local.destroy('jquery_spa_params_' + __key);
};
