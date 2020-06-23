/* global firebase, firebaseui, document, window, alert */
import { saveProviderUser } from '../pages/perfil/data.js';

export default {
  createBtnAuth() {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

    const config = {
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          saveProviderUser(authResult.user.uid, authResult.user.displayName);
          window.location.href = '/#';
          return true;
        },
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'popup',
    };

    ui.start('#firebaseui-auth', config);
  },

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const navStyle = document.getElementsByClassName('hidden-nav');
        for (let element of navStyle) {
          element.style.display = 'none';
        }
        document.getElementById('side-navigation').style.width = '0';
        window.location.href = '/#login';
      })
      .catch((erro) => {
        return erro;
      });
  },

  loginEmail() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = '/#';
      })
      .catch(() => {
        alert('Usuário ou Senha incorreta');
      });
  },

  createLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Usuário criado com sucesso!');
        window.location.href = '/#';
      })
      .catch(() => {
        alert('Email já cadastrado');
      });
  },
};
