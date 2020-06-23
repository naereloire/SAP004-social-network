/* global firebase, document */
import { ErrorDictionary } from '../pages/home/error.js';

export const openImageProfile = () => {
  const userPicture = document.getElementById('profile-picture');
  userPicture.addEventListener('click', function () {
    const input = document.getElementById('file-input');
    input.click();
  });
};

export const addImageProfile = () => {
  const input = document.getElementById('file-input');
  input.addEventListener('change', function (event) {
    const archive = event.target.files[0];
    firebase.auth().onAuthStateChanged((user) => {
      const ref = firebase.storage().ref('users/profilePicture');
      ref
        .child(user.uid)
        .put(archive)
        .then(() => {
          ref
            .child(user.uid)
            .getDownloadURL()
            .then((url) => {
              const img = document.getElementById('image-profile');
              img.src = url;
            });
        })
        .catch((error) => {
          const errorObject = new ErrorDictionary(error);
          console.log(errorObject.translate(true));
        });
    });
  });
};

export const putImageProfile = () => {
  firebase.auth().onAuthStateChanged((user) => {
    const ref = firebase.storage().ref('users/profilePicture');
    ref
      .child(user.uid)
      .getDownloadURL()
      .then((url) => {
        if (url) {
          const photo = document.getElementById('image-profile');
          photo.src = url;
        }
      })
      .catch((error) => {
        const errorObject = new ErrorDictionary(error);
        console.log(errorObject.translate(true));
      });
  });
};

export const openImageCover = () => {
  const userCoverPicture = document.getElementById('cover-picture');
  userCoverPicture.addEventListener('click', function () {
    const coverInput = document.getElementById('file-cover-input');
    coverInput.click();
  });
};

export const addCoverImage = () => {
  const coverInput = document.getElementById('file-cover-input');
  coverInput.addEventListener('change', function (event) {
    const archive = event.target.files[0];
    firebase.auth().onAuthStateChanged((user) => {
      const ref = firebase.storage().ref('users/coverPicture');
      ref
        .child(user.uid)
        .put(archive)
        .then(() => {
          ref
            .child(user.uid)
            .getDownloadURL()
            .then((url) => {
              const image = document.getElementById('cover-image');
              image.src = url;
            });
        })
        .catch((error) => {
          const errorObject = new ErrorDictionary(error);
          console.log(errorObject.translate(true));
        });
    });
  });
};

export const putCoverImage = () => {
  firebase.auth().onAuthStateChanged((user) => {
    const ref = firebase.storage().ref('users/coverPicture');
    ref
      .child(user.uid)
      .getDownloadURL()
      .then((url) => {
        if (url) {
          const image = document.getElementById('cover-image');
          image.src = url;
        }
      })
      .catch((error) => {
        const errorObject = new ErrorDictionary(error);
        console.log(errorObject.translate(true));
      });
  });
};
