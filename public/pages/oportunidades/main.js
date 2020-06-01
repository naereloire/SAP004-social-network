export default () => {
    const container = document.createElement("div");

    const template = `
    <h1>[Oportunidades]</h1>
    <p>
    Oportunidades.
    </p> `;
    container.innerHTML = template;
    return container
}
