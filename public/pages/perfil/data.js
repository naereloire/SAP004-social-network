/* global firebase, document, window, alert */
export const saveProfileUser = () => {
  const name = document.getElementById('name-profile').value;
  const lastName = document.getElementById('last-name-profile').value;
  const dateBirth = document.getElementById('date-of-birth-profile').value;
  const city = document.getElementById('city-profile').value;

  const userCollection = firebase.firestore().collection('users');
  firebase.auth().onAuthStateChanged((user) => {
    userCollection
      .doc(user.uid)
      .set({
        name,
        lastName,
        dateBirth,
        city,
      })
      .then(() => {
        alert('Informações salvas');
        window.location.href = '/#';
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const getInformationUser = () => {
  const userName = document.getElementById('user-name');

  firebase.auth().onAuthStateChanged((user) => {
    const userCollection = firebase.firestore().collection('users');

    userCollection
      .doc(user.uid)
      .get()
      .then((result) => {
        userName.innerText = `${result.data().name ? result.data().name : ''} ${
          result.data().lastName ? result.data().lastName : ''
        }`;
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const getProfile = () => {
  firebase.auth().onAuthStateChanged((user) => {
    const userCollection = firebase.firestore().collection('users');

    userCollection
      .doc(user.uid)
      .get()
      .then((result) => {
        if (result.data().name) {
          document.getElementById('name-profile').value = result.data().name;
        }

        if (result.data().lastName) {
          document.getElementById('last-name-profile').value = result.data().lastName;
        }

        if (result.data().dateBirth) {
          document.getElementById('date-of-birth-profile').value = result.data().dateBirth;
        }

        if (result.data().city) {
          document.getElementById('city-profile').value = result.data().city;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const saveProviderUser = (uid, name) => {
  const userCollection = firebase.firestore().collection('users');
  userCollection
    .doc(uid)
    .set({
      name,
    })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
