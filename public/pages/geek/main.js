// import {} from '../data.js';

export default () => {
    const container = document.createElement("div");

    const template = `
    <h2 class="title-align">[Geek][Pagina em construção.]</h2>
    `;
    container.innerHTML = template;
    return container
}