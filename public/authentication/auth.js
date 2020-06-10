export default {
    createBtnAuth: function () {
        let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

        let config = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    window.location.href = "/#"
                    return true
                }
            },
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID
            ],
            signInFlow: 'popup'
        };

        ui.start('#firebaseui-auth', config)
    },

    logout: function () {
        firebase.auth().signOut().then(() => {
            const navStyle = document.getElementsByClassName("hidden-nav")
            for (let element of navStyle){
                element.style.display = "none"
            }
            document.getElementById("side-navigation").style.width = "0";
            window.location.href = "/#login"
        }).catch(erro => {
            return erro
        })

    },

    loginEmail: function () {
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "/#"
        }).catch(erro => {
            alert("Usuário ou Senha incorreta")
        });;
    },

    createLogin: function(){
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            alert("Usuário criado com sucesso!")
            window.location.href = "/#"
        })
        .catch(error => {
            console.log(error)
        })
    }
}
