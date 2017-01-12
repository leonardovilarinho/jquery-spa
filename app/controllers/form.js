var scope = {
    name : 'Leonardo',
    age: 20,

    submit : function() {
        console.debug(scope.name);
    }
};

GDB( {page: scope} );
