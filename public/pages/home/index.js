export default () => {
    const container = document.createElement("div");

    const template = `
    <h2>Uma Pagina só para meninas</h2>
    <p>
    abc abc abc
    </p> `;
    container.innerHTML = template;
    return container
}