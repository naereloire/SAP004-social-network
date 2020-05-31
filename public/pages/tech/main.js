// import { greeting } from './data.js';

export default () => {
    const container = document.createElement("div");

    const template = `
    <h1>[girlTech]</h1>
    <p>
    Sobre tech.
    </p> `;
    container.innerHTML = template;
    return container
}