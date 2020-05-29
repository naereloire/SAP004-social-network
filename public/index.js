// Este é o ponto de entrada de sua aplicação
import home from './pages/home/index.js';
import geek from './pages/geek/index.js';
import autocuidado from './pages/autocuidado/index.js';

const main = document.querySelector("#root");
const init = () => {
    window.addEventListener("hashchange", () => {
        main.innerHTML = " ";

        switch (window.location.hash) {
            case " ":
                main.appendChild(home());
                break;
            case "#geek":
                main.appendChild(geek());
                break;
            case "autocuidado":
                main.appendChild(autocuidado());
                break;
            default:
                main.appendChild(home());

        }
    })
}

window.addEventListener("load", () => {
    main.appendChild(home());
    init();
})


