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

btnLogout.addEventListener('click', function () {
  auth.logout();
  renderPage();
});

const init = () => window.addEventListener('hashchange', renderPage);

const renderPage = () => {
  main.innerHTML = ' ';
  const page = validateHash(window.location.hash);
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      if (page === 'register') {
        main.appendChild(routes['register']);
        const btnRegister = document.querySelector('#btn-register');
        btnRegister.addEventListener('click', userRegister);

        const backBtn = document.querySelector('#back-btn');
        backBtn.addEventListener('click', function (event) {
          event.preventDefault();
          window.location.href = '/#login';
        });
      } else {
        main.appendChild(routes['login']);
        auth.createBtnAuth();
        const btnLogIn = document.querySelector('#login-btn');
        btnLogIn.addEventListener('click', function (event) {
          event.preventDefault();
          auth.loginEmail();
        });
      }
    } else {
      if (page == 'login') {
        page = 'home';
      }

      const navStyle = document.getElementsByClassName('hidden-nav');
      for (let element of navStyle) {
        element.style.display = 'flex';
      }

      main.appendChild(routes[page]);
      addRenderEvents(page);
      document.getElementById('side-navigation').style.width = '0';

      if (page == 'profile') {
        getProfile();
        const sendBtn = document.getElementById('save-btn');
        sendBtn.addEventListener('click', saveProfileUser);

        const backBtnProfile = document.getElementById('back-btn-profile');
        backBtnProfile.addEventListener('click', function (event) {
          event.preventDefault();
          window.location.href = '/#';
        });
      }

      if (page == 'home') {
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

window.addEventListener('hashchange', renderPage);
const validateHash = (hash) => (hash === '' ? 'home' : hash.replace('#', ''));

window.addEventListener('load', () => {
  renderPage();
  init();
});

const sidebarAction = (event) => {
  event.currentTarget.id === 'open-sidebar'
    ? (document.getElementById('side-navigation').style.width = '250px')
    : (document.getElementById('side-navigation').style.width = '0');
};

document.getElementById('close-sidebar').addEventListener('click', sidebarAction);
document.getElementById('open-sidebar').addEventListener('click', sidebarAction);
