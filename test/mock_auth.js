/* eslint-disable no-undef */

const onAuthStateChanged = jest.fn();

const getRedirectResult = jest.fn(() => {
  return Promise.resolve({
    user: {
      email: 'redirectTest@test.com',
      emailVerified: true,
      displayName: 'maria',
      uid: 'abcdefg',
    },
  });
});

const sendEmailVerification = jest.fn(() => {
  return Promise.resolve('result of sendEmailVerification');
});

const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

const createUserWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of createUserWithEmailAndPassword');
});

const signInWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of signInWithEmailAndPassword');
});

const signInWithRedirect = jest.fn(() => {
  return Promise.resolve('result of signInWithRedirect');
});

// firebase.auth.FacebookAuthProvider = jest.fn(() => {});
// firebase.auth.GoogleAuthProvider = jest.fn(() => {});

export const initializeAppMock = () => {
  return {
    auth: () => {
      return {
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        currentUser: {
          sendEmailVerification,
        },
        signInWithRedirect,
      };
    },
    firestore: {
      collect: () => {
        return '';
      },
    },
  };
};

export const auth = () => {
  return {
    onAuthStateChanged,
    currentUser: {
      displayName: 'testDisplayName',
      email: 'test@test.com',
      emailVerified: true,
    },
    getRedirectResult,
    sendPasswordResetEmail,
  };
};
