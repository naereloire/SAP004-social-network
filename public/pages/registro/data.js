/* global firebase, document, window, alert */
export default () => {};

export const userRegister = (event) => {
  event.preventDefault();
  const name = document.getElementById('name-register').value;
  const lastName = document.getElementById('last-name-register').value;
  const dateBirth = document.getElementById('date-of-birth-register').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const city = document.getElementById('city-register').value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      const userCollectionRegister = firebase.firestore().collection('users');
      firebase.auth().onAuthStateChanged((user) => {
        userCollectionRegister
          .doc(user.uid)
          .set({
            name,
            lastName,
            dateBirth,
            city,
          })
          .then(() => {
            window.location.href = '/#';
          })
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch(() => {
      alert('Email já cadastrado');
    });
};
