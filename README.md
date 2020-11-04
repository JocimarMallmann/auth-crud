# API Node, authentication + crud | Front-end Angular 10 | Database Mysql

##### Requisitos funcionais do sistema Node inclui:
- autenticação (login e logout)
- adicionar novos usuários
- listar usuários
- buscar usuário por id
- deletar usuários
- atualizar usuários
- buscar/filtrar usuário por nome
##### Segurança:
- função de hashing aplicada nas senhas.
- token de acesso, jsonwebtoken. (obs: tempo de expiração de 60 minutos, ainda não é aplicado refresh no token, por isso o tempo de expiração é alto).
- tokens de logout são adicionados numa blacklist na base de dados Redis, e não serão mais válidos.
- Não é possível adicionar o usuário com um e-mail já cadastrado na base.
- Rotas devidamente protegidas pelas estratégias de autenticação no servidor.
- No front-end as rotas estão protegidas de acordo. Se **não** estiver autenticado só é possível acessar a tela de login. E quando já autenticado, não é possível acessar a tela de login.

##### Rotas front-end
- /login
Efetua Login, ativa o componente de signin.

- /user/filter/:userName
Filtra por nome, ativa o componente de perfil do usuário exibindo suas informações.

- /dashboards
A primaira rota a ser carregada após o login, ativa o componente dashboards, onde busca a lista de usuários e ativa o componente list que exibe os dados numa tabela.

- dashboards/user/:id
Busca por id, ativa o componente user-form, podendo editar o usuário, (obs: Na tabela do componente list exibida no dashboards, existe uma coluna 'actions', nesta coluna tem os botões de 'Editar' e 'Deletar' usuário, levando pra essa respectiva rota).

- /dashboards/create-user
Rota para criar um novo usuário, ativa o componente create-user-form

- /not-found
Qualquer rota inválida, isto é, não existente, o sistema encaminhara para rota /not-found, ativando o respectivo componente not-found.

Observações adicionais: Apesar do sistema não ser muito pesado em tamanho, foi utilizada as técnicas de 'Code splitting' e 'Lazy loading', que, basicamente é o separamento dos módulos e o seu carregamento sob demanda.

##### Tecnologias utilizadas
- Back-end
Node.js, MySql

- Front-end
Angular 10, Sass

Observações adicionais: Projeto back-end desenvolvido utilizando o padrão arquitetural Model View Controler (MVC) e o padrão Data Access Object (DAO).

Por enquanto, não existem mensagens amigáveis para o usuário. É necessário o desenvolvedor analisar o console ou o banco de dados para se certificar do funcionamento.
