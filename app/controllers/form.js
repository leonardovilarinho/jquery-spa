var scope = {
    name : 'Leonardo',
    age: 20,

    submit : function (){
        Params.add( scope );
        console.debug(Params.all());
    },

    to : function() {
        To_route('sobre');
    }
};

Bind( {page: scope} );
