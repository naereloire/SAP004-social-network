// import { greeting } from './data.js';

export default () => {
    const container = document.createElement("div");

    const template = `
    <div class="feed-style">
    <h1>HOME</h1>
    </div>
    `;
    container.innerHTML = template;
    return container
}