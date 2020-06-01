export default () => {
    const container = document.createElement("div");

    const template = `
    <h2>[Autocuidado]</h2>
    <p>
    Sobre autocuidado.
    </p> `;
    container.innerHTML = template;
    return container
}