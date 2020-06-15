export default () => {
    const container = document.createElement("div");

    const template = `
        <form class="form-profile">
            <input id="name-profile"type="text" placeholder="Nome">
            <input id="last-name-profile"type="text" placeholder="Sobrenome">
            <input id="date-of-birth-profile"type="date" placeholder="Data de nascimento">
            <input id="city-profile"type="text" placeholder="Cidade">
            <div class="btn-display">
                <input id="back-btn-profile" type="button" value="Voltar">
                <input id="save-btn" type="button" value="Salvar">
            </div>
        </form>
    `
    container.innerHTML = template;
    return container
}
