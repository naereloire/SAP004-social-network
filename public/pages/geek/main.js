export default () => {
    const container = document.createElement("div");

    const template = `
    <h2>[Mundo geek]</h2>
    <p>
    Sobre geek.
    </p> `;
    container.innerHTML = template;
    return container
}