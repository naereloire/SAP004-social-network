import FakeFirestore from './mock_firestore.js';
import firebase from 'firebase/app';
import { createPost } from '../public/pages/home/data.js';
import 'firebase/firestore';
import 'firebase/auth';

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

// describe('createPost', () => {
//   const firestoreMock = new FirestoreMock()
//   beforeEach(() => {
//       firebase.firestore = firestoreMock
//       firestoreMock.reset()
//   })

describe('createPost', () => {
  let fakeFirestore = new FakeFirestore();
  beforeEach(() => {
    firebase.firestore = fakeFirestore;
    firebase.auth = function () {
      currentUser = currentUserFake;
    };
    fakeFirestore.reset();
  });

  it('Deveria adiconar o post no firestore', () => {
    createPost('textPost', 'tagOption', true, '').then(() => {
      expect(fakeFirestore.mockCollection).toBeCalledWith('posts');
    });
  });
});

// loadPosts, saveImage, deletePost, savePostEdit, saveLike
