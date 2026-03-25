# Shipay Tech Challenge

### Respostas

### Desafio 2:

Existem algumas falhas criticas, no código, que não irão funcionar como esperado, como por exemplo:

```JavaScript
# linguagem: React
// UserManagement.js
...
  handleNameChange(event) {
    this.state.newUserName = event.target.value;
  }
...
```
- O código acima não irá atualizar o estado do componente, pois o estado deve ser atualizado usando o método `setState` do React. O código correto seria:

```JavaScript
# linguagem: React
// UserManagement.js
...
  handleNameChange(event) {
    this.setState((prevState) => ({ 
        ...prevState,
        newUserName: event.target.value 
    }));
  }
...
```
- O Método **addUser()** também está tentando atualizar o estado utilizando a mutação direta, o que não é reconhecido pelo React. Ou seja, não alteraria o estado, e provocaria um erro na ação. Nem mesmo com a utilização do método **forceUpdate()**, o código não funcionaria corretamente, além de ser uma prática não recomendada. O código correto seria:

```JavaScript
# linguagem: React
// UserManagement.js
...
addUser() {
    const newUser = {
      id: this.state.users.length + 1,
      name: this.state.newUserName,
      email: this.state.newUserEmail
    };

    this.setState((prevState) => ({
      ...prevState,
      users: [...prevState.users, newUser],
    }));

  }
...
```
 - O **input do nome** não sofreria atualização nenhuma pois, apesar de estar lendo o estado **newUserName**, não possivel o evento **onChange**. Sendo assim, quando o usuário digitar algo o campo permanecerá vazio. 

 ```JavaScript
# linguagem: React
// UserManagement.js
...
<input
    type="text"
    placeholder="Nome do usuário"
    value={this.state.newUserName}
    # onde está o onChange?
/>
...
```

- No mapeamento do array de usuários, o código não está utilizando a propriedade **key** do React, o que pode causar problemas de desempenho e renderização.

```JavaScript
# linguagem: React
// UserManagement.js
...
    {this.state.users.map((user) => (
        <li key="???"> /*falta a prop key*/
            {user.name} ({user.email})
        </li>
    ))}
...
```
#### Outros pontos a serem melhorados:

- O código não possui validação para os campos de entrada, o que pode levar a erros ou dados inválidos sendo adicionados à lista de usuários.

- Geração de Ids fracos, pois o id é gerado com base no tamanho do array de usuários, o que pode causar problemas se os usuários forem removidos ou se houver concorrência na adição de usuários. Neste caso usaria dados como **Date.now()** ou **uuid** para gerar ids únicos: **crypto.randomUUID()**

- Por último mas não menos importante, o código está fora do padrão de componentes funcionais do React, utilizando uma abordagem baseada em classes, o que é considerado obsoleto e não recomendado para novos projetos. A migração para componentes funcionais com hooks traria melhorias significativas em termos de legibilidade, manutenção e desempenho.

### Desafio 3:

O componente **ProductDisplay** está tentando iterar sobre alguma variavel, muito provavelmente que deve se chamar **products**, que recebe uma lista. Porém no momento em que o React tenta renderizar os componentes iterados, essa variavel está recebendo o valor ***null***. Isso pode ocorrer por diversos motivos, como por exemplo:

- A variavel **products** está sendo inicializada como ***null*** e durante a montagem do componente pode ter uma chamada para a API de busca de produtos que está sendo feita de forma assíncrona, e não existe uma abordagem de Loading para aguardar a resposta da API.

- A própria API de busca de produtos pode estar retornando um erro ou então um resultado ***null***, o que causaria o mesmo problema.

A Solução para este problema seria manter sempre o estado de um componente consistente, ou seja, se a variável **products** é esperada para ser uma lista, ela deve ser inicializada como uma lista vazia, e durante a chamada da API, o estado deve ser atualizado com os dados recebidos. Além disso, é importante implementar um estado de Loading para garantir que o componente só tente renderizar os produtos quando os dados estiverem disponíveis.
Outro ponto importante seria implementar um tratamento de erros para lidar com possíveis falhas na chamada da API, garantindo que o componente possa exibir uma mensagem de erro ou um estado alternativo caso a busca por produtos falhe. E também um componente de fallback para o caso de a lista de produtos estar vazia, garantindo que o usuário tenha uma experiência consistente mesmo quando não houver produtos para exibir.

### Desafio 4:

Para a autenticação de usuários, uma abordagem comum é utilizar tokens JWT (JSON Web Tokens). O processo de autenticação pode ser dividido em algumas etapas:

1. O usuário envia suas credenciais (como nome de usuário e senha) para o servidor através de uma requisição de login.

2. O servidor valida as credenciais e, se forem válidas, gera um token JWT contendo informações do usuário e um tempo de expiração.

3. Como a autencticação está sendo feita do lado do servidor, o tokent JWT seria enviado para um cache como o Redis, por exemplo, garantindo que o token, o refresh token e o tempo de expiração sejam armazenados de forma segura e em um cenário onde o os ambientes estão dockerizados, o servidor verifica a existência e validade do token no cache antes de conceder acesso aos recursos protegidos. Para a revalidação do token, utilizaria o axios, por exemplo, para fazer uma requisição de um novo token caso receba algum erro de "não autorizado 401" durante as requisições, garantindo que o usuário possa continuar utilizando a aplicação sem precisar fazer login novamente. O armazenamento do token no cache também aumenta a permance reduzindo o numero de requisições a api de autenticação.

Para resolver a questão dos multiplas requisições, considerando que o 'Bearer token' estivesse armazenado num serviço de cache, eu aplicaria uma abordagem de API Gateway, para centralizar todas as API's do sistema(Carrinho, Produtos, Checkout, etc...), simplificando assim a implementação e manutenção da api e também o seu versionamento, para lidar com 'Rollbacks' em caso de falhas durante a implementação de novas versões.

### Desafio 5:

Eu resolveria o problema implementando um BFF para cada plataforma (web, mobile e SmartTv) garantindo que cada BFF seja responsável por lidar com as necessidades de cada uma delas. Utilizaria essa abordagem para evitar a complexidade de lidar com multiplas plataformas em um unico backend, e para que uma entrega de uma nova funcionalidade para uma plataforma não interfira na entrega das outras.

Se tradando das responsabilidades para cada funcionalidade:

A - A lógica para renderizar os botões e layout da interface ficariam no cliente. O BFF seria responsável apenas por fornecer os dados necessários para a renderização;

B - A lógica para juntar os dados de 2 microserviços diferentes ficaria a cargo do BFF, neste caso no BFF da WEB, garantindo que o cliente receba os dados já processados e prontos para serem exibidos;

C - A lógica para entregar uma lista simplificada de lançamentos, para o Mobile, ficaria no BFF do Mobile. Filtrando o excesso de dados do microserviço de catálogos. 

D - A lógica para salvar quanto tempo o usuário ficou assistindo a um determinado conteúdo, ficaria a cargo do próprio microserviço, por ser um dado universal, não teria necessidade de ser processado por um BFF específico. Cada BFF, neste caso, atuaria apenas como um intermediário para enviar os dados para o microserviço.

E - A lógica para renderização de um conteúdo específico para Mobile, seria compartilhada entre do Microserviço de Streaming e o Player do Mobile. O BFF do mobile, assim como na proposta anterior, seria responsável apenas pelo fornecimento dos dados. Pelo que pesquisei (até então isso era uma novidade para mim) ao reproduzir um streaming, o microserviço de streming entrega um manifesto para o player, e o player é que decide o que pede para o MS, de acordo com a qualidade de conexão.

F - A logica de validação de formato do e-email no formulário de cadastro do cliente Web, ficaria a cargo do cliente Web, fazendo o tempo de resposta ser instantaneo, o que evita necessidade de requisições desnecessárias para o servidor e também melhora a experiência do usuário.