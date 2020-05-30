export default () => {
    const container = document.createElement("div");

    const template = `
    <h1>[Segurança]</h1>
    <p>
    Sobre segurança.
    </p> `;
    container.innerHTML = template;
    return container
}