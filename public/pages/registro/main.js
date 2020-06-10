export default () => {
    const container = document.createElement("div");

    const template = `
        <h1 class="text-profile">Preencha os campos abaixo:</h1>
        <form class="form-profile">
            <input class="register" type="text" placeholder="Nome *" required>
            <input class="register" type="text" placeholder="Sobrenome *" required>
            <input class="register" type="date" placeholder="Data de nascimento *" required>
            <input id="email" class="register" type="email" placeholder="Email *" required>
            <input id="password" class="register" type="password" placeholder="Senha *" required>
            <input class="register" type="text" placeholder="Cidade *" required>
            <input id="btn-register" class="register" type="submit">
        </form>
    `
    container.innerHTML = template;
    return container
}
