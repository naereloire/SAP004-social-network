/* eslint-disable no-restricted-syntax */
/* global window, document, firebase */
import routes from './routes.js';
import { addRenderEvents } from './pages/home/main.js';
import auth from './authentication/auth.js';
import { saveProfileUser, getInformationUser, getProfile } from './pages/perfil/data.js';
import { userRegister } from './pages/registro/data.js';
import {
  openImageProfile,
  addImageProfile,
  putImageProfile,
  openImageCover,
  addCoverImage,
  putCoverImage,
} from './storage/main.js';

const btnLogout = document.querySelector('#logout');
const main = document.querySelector('#root');
const validateHash = (hash) => (hash === '' ? 'home' : hash.replace('#', ''));

const renderPage = () => {
  main.innerHTML = ' ';
  let page = validateHash(window.location.hash);
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      if (page === 'register') {
        main.appendChild(routes.register);
        const btnRegister = document.querySelector('#btn-register');
        btnRegister.addEventListener('click', userRegister);

        const backBtn = document.querySelector('#back-btn');
        backBtn.addEventListener('click', function callBackFunc(event) {
          event.preventDefault();
          window.location.href = '/#login';
        });
      } else {
        main.appendChild(routes.login);
        auth.createBtnAuth();
        const btnLogIn = document.querySelector('#login-btn');
        btnLogIn.addEventListener('click', function callBackF(event) {
          event.preventDefault();
          auth.loginEmail();
        });
      }
    } else {
      const navStyle = document.getElementsByClassName('hidden-nav');
      if (page === 'policy') {
        for (const element of navStyle) {
          element.style.display = 'none';
        }
      } else {
        for (const element of navStyle) {
          element.style.display = 'flex';
        }
      }
      if (page === 'login') {
        page = 'home';
      }

      main.appendChild(routes[page]);
      addRenderEvents(page);
      document.getElementById('side-navigation').style.width = '0';

      if (page === 'profile') {
        getProfile();
        const sendBtn = document.getElementById('save-btn');
        sendBtn.addEventListener('click', saveProfileUser);

        const backBtnProfile = document.getElementById('back-btn-profile');
        backBtnProfile.addEventListener('click', function callBackFunction(event) {
          event.preventDefault();
          window.location.href = '/#';
        });
      }

      if (page === 'home') {
        getInformationUser();
        openImageProfile();
        addImageProfile();
        putImageProfile();
        openImageCover();
        addCoverImage();
        putCoverImage();
      }
    }
  });
};

btnLogout.addEventListener('click', function callBackAuthLogout() {
  auth.logout();
  renderPage();
});

const init = () => window.addEventListener('hashchange', renderPage);

window.addEventListener('hashchange', renderPage);

window.addEventListener('load', () => {
  renderPage();
  init();
});

const sidebarAction = (event) => {
  if (event.currentTarget.id === 'open-sidebar') {
    document.getElementById('side-navigation').style.width = '250px';
  } else {
    document.getElementById('side-navigation').style.width = '0';
  }
};

document.getElementById('close-sidebar').addEventListener('click', sidebarAction);
document.getElementById('open-sidebar').addEventListener('click', sidebarAction);
