import routes from "./routes.js";
import {addEventButtons} from "./pages/home/main.js"

const main = document.querySelector("#root");
const init = () => window.addEventListener("hashchange", renderPage)
const renderPage = () => {
    main.innerHTML = " ";
    const page = validateHash(window.location.hash)
    main.appendChild(routes[page]);
    addEventButtons(page)
}

const validateHash = (hash) => hash === "" ? "home" : hash.replace("#", "")

window.addEventListener("load", () => {
    renderPage();
    init();
})

const sidebarAction = (event) => {
    event.currentTarget.id === "open-sidebar" ?
        document.getElementById("side-navigation").style.width = "250px" :
        document.getElementById("side-navigation").style.width = "0";
}

document.getElementById("close-sidebar").addEventListener("click", sidebarAction)
document.getElementById("open-sidebar").addEventListener("click", sidebarAction)







