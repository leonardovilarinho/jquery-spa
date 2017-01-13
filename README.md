# jquery-spa

Este foi desenvolvido para desenvolvedores que conhecem jQuery ou Javascript e não têm condições de apreder um framework Single Page Application, essa solução é desenvolvida utilizando o jQuery como base, e usufrui dos seguintes plugins:

- [GDB](https://github.com/JohnLouderback/GDB) - para o data binding
- [TMPL](https://github.com/BorisMoore/jquery-tmpl) - para template (faz condições e repetição de layout, visando não misturar JS e HTML)
- [PouchDB](https://github.com/pouchdb/pouchdb) - é uma biblioteca, tem o objetivo de ser como um banco de dados.

Requisitos:
- Navegador com suporte a [LocalStorage](http://www.w3schools.com/html/html5_webstorage.asp).
- Navegador com Javascript habilitado.

Seguimos com uma série de tópicos que visão como usar este.

### Configuração
Toda configuração possível se encontra no arquivo `config.js`:

    Config.debug = true; // modo de desenvolvimento ou não
    Config.dir_controllers = 'app/controllers/'; // diretório dos controladores
    Config.dir_views = 'views/'; // diretório das visões
    Config.dir_template = 'app/template/'; // diretório do template
    Config.homepage = 'home'; // página inicial

### Definindo template
No `index.html` você pode definir o layout da sua aplicação, deixamos algumas coisas disponíveis para facilitar o uso.

#### Onde as visões (views) vão ser colocadas
Para definir onde você irá colocar o conteúdo das visões, use o atributo `content`:

    <!doctype html>
    <html app-name='myApp'>
       <head>
           <script src='resources/kernel/jquery.min.js'></script>
           <script src='config.js'></script>
           <script src='app/app.js'></script>
       </head>

       <body>
          <div content></div>
       </body>
    </html>

#### Criando templates e extendendo um templates
Nas configurações, há a definição de um diretório para arquivos de template, é nessa pasta que colocamos arquivos como de um menu supoerior, exemplo arquivo `app/template/menu.html`:

    <ul class='nav nav-tabs'>
       <li><a href='#home'>Home</a></li>
       <li><a href='#form'>Form</a></li>
       <li><a href='#sobre'>Sobre</a></li>
    </ul>

Após termos um arquivo lá, podemos adiciona-lo ao nosso index usando o atributo `extends`:

    <!doctype html>
    <html app-name='myApp'>
       <head>
           <script src='resources/kernel/jquery.min.js'></script>
           <script src='config.js'></script>
           <script src='app/app.js'></script>
           <span extends='head'></span>
       </head>

       <body>
          <span extends='menu'></span>

          <div content></div>
       </body>
    </html>

### Tipos de usuários (para template)
Nessa nova versão, adicionamos tipos de usuários, para que você possa controlar facilmente seu template. Agora no diretório `template` temos subdiretórios para indicar layouts diferents para usuários diferentes, os arqivos na raiz do diretório `template` serão carregados quando não houver nenhum tipo de usuário definido (any).

Para trocar o usuário atual use:

    User( {key : 'value'} ); // onde o objeto no parametro pode ser dados como nome do usuario etc.
    User.type('teacher'); // mudando tipo de usuário para teacher

A partir dessa mudança, o tempate será o que está dentro do diretório `template/teacher`, para dizer novamente que ão há usuário ativo use:

    User.type('any'); // digo que nenhum usuario está logado

### Rotas
Precisamos da confirmação que uma rota existe, o arquivo `routes.json` é onde você nos informa isso. Parar criar uma rota, dentro das chaves iniciais `{}`, crie um atributo:

    "form": "form"

Criamos uma chamada `form`, ela aponta para a página `form.html` e `form.js` do seu diretório de visão e de controladores.

Para criar uma rota apontando para um subdiretório, usa-se:

    "sobre": "pages.sobre"
Indicamos o ponto (.) para dizer que estamos em um subdiretório, assim a rota `sobre` apotará para `diretorio_visoes/pages/sobre.html` e para `diretorio_controladores/pages/sobre.js`.

Por fim, podemos criar uma rota que não utiliza controlador, ideal para páginas estáticas, sem nenhuma ação:

    "home": "!home"

Adicionamos ponto de exclamação(!) ao caminho da rota para dizer que essa rota não tem um controlador.

### Redirecionando para outra rota

Um redirecionamento simples, pode ser feito com essa linha:

    To_route('nome-rota'); // use o nome da rota sem #

Acima vai para meusite.com#nome-rota.

#### Com parâmetro
Você pode adicionar parametros no redirecionamento de rotas com a classe `Params`:

    Params.add( {param : 'valor'} );

Adicionamos um array de parametros nessa classe, após essa chamada devemos trocar de rota com o `To_route`, quando essa troca for feita, pegamos os parâmetros com o seguinte comando:

    Params.all(); // Para pegar um array de objetos com todos parametros

    Params.get('param'); // Para pegar um parametro só

    Params.all().param; // Para pegar um parametro só (mais lento)

    Params.has('param'); // Verificar a existência de um parametro

**Obs: ** Os parametros tem vida útil de uma rota, ou seja, apos adicionar parametros, eles serão disponíveis apenas na primeira mudança de rota, após isso são apagados automaticamente.

### Aliases

Para deixar o código mais legível, criamos alguns atalhos para plugins e outros comandos, deixamos livre para usa-los:

#### WebStorage

Para usar `localStorage` e `sessionStorage`, pode-se usar:

    XXX.has('key'); // verifica se existe valor
    XXX.get('key'); // paga um valor
    XXX.destroy('key'); // apaga um valor

Onde `XXX` deve ser trocado por `Local` ou `Session`.

#### Ajax

Temos uma classe para uso simples do Ajax, exemplo de uso:

    new Ajax('minha url')
        .data( array-de-objetos )
        .type('get') // pode ser post delete pur head ou outros
        .send(function(result) { // caso de sucesso
            alert(result);
        }, function (error) { // caso de falha
            console.log(error);
        });

#### GDB (para data binding) ** USO OBRIGATÓRIO**

Para usar o data-binding do GDB, facilitamos um pouco para você, podendo ser feito simplesmente assim:

    var scope = {
        //... suas  definições aqui, funções e data ...
    };

    Bind( {page: scope} );

**Obs: ** nesse caso é obrigatório usar esse alias, para o correto funcionamento do framework.

#### TMPL (para facilitar condicionais e repetição)

Também modificamos um pouco a chamada desse plugin, com objetivo de facilitar, pode ser usado assim:

Visão de rota HTML:

    <script class='template-empresas' type='text/x-jquery-tmpl'> <!-- definindo template da tabela -->
        <tr>
            <td>${nome}</td>
            <td>${fundador}</td>
        </tr>
    </script>

    <!-- tabela a ser preencida -->
    <table class='table tabela-empresas'>
    </table>

Controlador da rota:

    // compila o template $('.template-empresas') com os dados de json.empresas
    var tmp = Template( $('.template-empresas'), json.empresas );
    // adiciona o conteudo compilado na tabela
    tmp.appendTo('.tabela-empresas');


### Links úteis

Deixamos aqui alguns links, onde você pode aprender mais sobre os terceiros usados:

- [Learn PouchDB](https://pouchdb.com/learn.html)
- [Templates e jQuery parte 1](https://tableless.com.br/templates-e-jquery-parte-1/)
- [Templates e jQuery parte 2](https://tableless.com.br/templates-e-jquery-parte-2/)
- [GDB Exemplos](http://gdb.thewebdev.guru)
