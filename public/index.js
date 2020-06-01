 import routes from './routes.js'; 

const main = document.querySelector('#root').appendChild(routes["login"]);



const init = () => {
    window.addEventListener("hashchange", () => {/* console.log(window.location.hash) */
     
            main.innerHTML = " ";

           switch (window.location.hash) {
                case " ": 
                     main.appendChild(routes["home"]);
             
                    break;

                case "#tech":
                    main.appendChild(routes["tech"])
                    break;

                case "#autocuidado":
                    main.appendChild(routes["autocuidado"])
                    break;

                case "#segurança":
                    main.appendChild(routes["segurança"])
                    break;
 
                case "#oportunidades":
                    main.appendChild(routes["oportunidades"])
                    break;

                    default:
                        main.appendChild(routes["home"]);


            } 
        }
    )}

    window.addEventListener("load", () => {
        main.appendChild(routes["login"]);
        init()
    })