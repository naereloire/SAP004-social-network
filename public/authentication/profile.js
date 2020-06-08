export default() => {
    const container = document.createElement('div');

    `<h1 class="text-profile">Preencha os campos abaixo</h1>
    <form class="form-profile"></form>
    <input id="name" class="input-profile" type="text" placeholder="Nome">Nome</input>
    <input id="last-name" type="text" placeholder="Sobrenome">Sobrenome</input>
    <input id="email-profile" type="email" placeholder="Preencha o email">Email</input>
    <input id="password-profile" type="password">Senha</input>
    <input id= "date-profile" type="date">Data de Nascimento</input>
    <input id="local-profile" type="text">Cidade</input>
    <input type="button">Enviar</input>`

    return container;

}