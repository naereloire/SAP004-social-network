export default () => {
    const container = document.createElement("div");

    const template = `
        <form class="form-profile">
            <input type="text" placeholder="Nome *" required>
            <input type="text" placeholder="Sobrenome *" required>
            <input type="date" placeholder="Data de nascimento *" required>
            <input id="email" type="email" placeholder="Email *" required>
            <input id="password" type="password" placeholder="Senha *" required>
            <input type="text" placeholder="Cidade *" required>
            <div class="btn-display">
                <input id="back-btn" type="button" value="Voltar">
                <input id="btn-register" type="button" value="Salvar">
            </div>
        </form>
    `
    container.innerHTML = template;
    return container
}
