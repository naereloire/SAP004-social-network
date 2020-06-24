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

describe('createPost', () => {
  // let fakeFirestore = new FakeFirestore();
  beforeAll(() => {
    jest.mock('firebase');
    jest.spyOn(firebase, 'initializeApp').mockImplementation(initializeAppMock);
    jest.spyOn(firebase, 'auth').mockImplementation(auth);
    jest.spyOn(firebase, 'firestore').mockImplementation(() => {
      return new FakeFirestore();
    });
  });

  // it('Deveria adiconar o post no firestore collection', () => {
  //   async function call() {
  //     createPost('textPost', 'tagOption', true, '');
  //   }
  //   call().then(() => {
  //     expect(fakeFirestore.mockCollection).toBeCalledWith('posts');
  //   });
  // });

  it('Deveria receber post como parametro', (done) => {
    async function call() {
      createPost('text', 'tagOption', true, '');
      expect(fakeFirestore.mockAdd).toBeCalledWith(post);
      done();
    }
  });
});
