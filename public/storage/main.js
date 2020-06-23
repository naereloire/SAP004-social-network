import { errorDictionary } from '../pages/home/error.js';

export const openImageProfile = () => {
  const userPicture = document.getElementById('profile-picture');
  userPicture.addEventListener('click', function () {
    let input = document.getElementById('file-input');
    input.click();
  });
};

export const addImageProfile = () => {
  let input = document.getElementById('file-input');
  input.addEventListener('change', function (event) {
    let archive = event.target.files[0];
    firebase.auth().onAuthStateChanged((user) => {
      let ref = firebase.storage().ref('users/profilePicture');
      ref
        .child(user.uid)
        .put(archive)
        .then((snapshot) => {
          ref
            .child(user.uid)
            .getDownloadURL()
            .then((url) => {
              let img = document.getElementById('image-profile');
              img.src = url;
            });
        })
        .catch((error) => {
          let errorObject = new errorDictionary(error);
          console.log(errorObject.translate(true));
        });
    });
  });
};

export const putImageProfile = () => {
  firebase.auth().onAuthStateChanged((user) => {
    let ref = firebase.storage().ref('users/profilePicture');
    ref
      .child(user.uid)
      .getDownloadURL()
      .then((url) => {
        if (url) {
          let photo = document.getElementById('image-profile');
          photo.src = url;
        }
      })
      .catch((error) => {
        let errorObject = new errorDictionary(error);
        console.log(errorObject.translate(true));
      });
  });
};

export const openImageCover = () => {
  const userCoverPicture = document.getElementById('cover-picture');
  userCoverPicture.addEventListener('click', function () {
    let coverInput = document.getElementById('file-cover-input');
    coverInput.click();
  });
};

export const addCoverImage = () => {
  let coverInput = document.getElementById('file-cover-input');
  coverInput.addEventListener('change', function (event) {
    let archive = event.target.files[0];
    firebase.auth().onAuthStateChanged((user) => {
      let ref = firebase.storage().ref('users/coverPicture');
      ref
        .child(user.uid)
        .put(archive)
        .then((snapshot) => {
          ref
            .child(user.uid)
            .getDownloadURL()
            .then((url) => {
              let image = document.getElementById('cover-image');
              image.src = url;
            });
        })
        .catch((error) => {
          let errorObject = new errorDictionary(error);
          console.log(errorObject.translate(true));
        });
    });
  });
};

export const putCoverImage = () => {
  firebase.auth().onAuthStateChanged((user) => {
    let ref = firebase.storage().ref('users/coverPicture');
    ref
      .child(user.uid)
      .getDownloadURL()
      .then((url) => {
        if (url) {
          let image = document.getElementById('cover-image');
          image.src = url;
        }
      })
      .catch((error) => {
        let errorObject = new errorDictionary(error);
        console.log(errorObject.translate(true));
      });
  });
};
