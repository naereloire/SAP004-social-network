import routes from "./routes.js";
import { addEventButtons } from "./pages/home/main.js"
import auth from "./authentication/main.js"

const btnLogout = document.querySelector('#logout');
const main = document.querySelector("#root");

btnLogout.addEventListener('click', function () {
    auth.logout()
    renderPage()
})

const init = () => window.addEventListener("hashchange", renderPage)

const renderPage = (event) => {
    main.innerHTML = " ";
    let page = validateHash(window.location.hash)
    //Busca se existe um usuário logado ou deslogado.
    firebase.auth().onAuthStateChanged((usuario) => {
        if (!usuario) {
            main.appendChild(routes['login']);
            auth.createBtnAuth()
            const btnLogIn = document.querySelector("#login-btn");
            btnLogIn.addEventListener('click', function (event) {
                event.preventDefault()
                auth.loginEmail()
            })

        }
        else {
            if (page == 'login') {
                page = 'home'
            }
            const navStyle = document.getElementsByClassName("hidden-nav")
            for (let element of navStyle) {
                element.style.display = "flex"
            }

            main.appendChild(routes[page]);
            addEventButtons(page);
        }

    })
}

window.addEventListener("hashchange", renderPage)

const validateHash = (hash) => hash === "" ? "home" : hash.replace("#", "")

window.addEventListener("load", (event) => {
    renderPage(event);
    init();
})

const sidebarAction = (event) => {
    event.currentTarget.id === "open-sidebar" ?
        document.getElementById("side-navigation").style.width = "250px" :
        document.getElementById("side-navigation").style.width = "0";
}

document.getElementById("close-sidebar").addEventListener("click", sidebarAction)
document.getElementById("open-sidebar").addEventListener("click", sidebarAction)







