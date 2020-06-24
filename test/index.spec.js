import firebase from 'firebase';
import FakeFirestore from './mock_firestore.js';
import { initializeAppMock, auth } from './mock_auth.js';
import { createPost } from '../public/pages/home/data.js';

const date = new Date();
const post = {
  name: 'maria',
  user_id: 'abcdefg',
  text: 'textPost',
  tag: 'tagOption',
  date: date.toLocaleString(),
  timestamp: date.getTime(),
  privacy: true,
  coments: [],
  user_like: [],
  urlImg: '',
};

const currentUserFake = {
  displayName: 'maria',
  uid: 'abcdefg',
};

describe('createPost', () => {
  // let fakeFirestore = new FakeFirestore();
  beforeAll(() => {
    jest.mock('firebase');
    jest.spyOn(firebase, 'initializeApp').mockImplementation(initializeAppMock);
    jest.spyOn(firebase, 'auth').mockImplementation(auth);
    jest.spyOn(firebase, 'firestore').mockImplementation(() => {
      return new FakeFirestore();
    });
    firebase = require('firebase/app');
    return firebase;
  });

  it('Deveria adiconar o post no firestore collection', () => {
    createPost('textPost', 'tagOption', true, '').then(() => {
      expect(fakeFirestore.mockCollection).toBeCalledWith('posts');
    });
  });
});

// loadPosts, saveImage, deletePost, savePostEdit, saveLike
