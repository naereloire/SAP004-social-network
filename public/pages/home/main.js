export default () => {
    const container = document.createElement("div");

    const template = `
    <h1>[girlyHub]</h1>
    <p>
    Bem vinda!
    </p> `;
    container.innerHTML = template;
    return container
}