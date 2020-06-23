// import { createPost } from '../public/pages/home/data.js';
// import FakeFirestore from './mock_firebase.js';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const date = new Date();
// const post = {
//   name: 'maria',
//   user_id: 'abcdefg',
//   text: 'textPost',
//   tag: 'tagOption',
//   date: date.toLocaleString(),
//   timestamp: date.getTime(),
//   privacy: true,
//   coments: [],
//   user_like: [],
//   urlImg: '',
// };

// const currentUserFake = {
//   displayName: 'maria',
//   uid: 'abcdefg',
// };

// describe('createPost', () => {
//   const FakeFirestore = new FakeFirestore();
//   beforeEach(() => {
//     firebase.firestore = firestoreMock;
//     firebase.auth().currentUser = currentUserFake;
//     firestoreMock.reset();
//   });

//   it('Deveria adiconar o post no firestore', () => {
//     createPost('textPost', 'tagOption', true, '').then(() => {
//       expect(firestoreMock.mockCollection).toBeCalledWith('posts');
//     });
//   });
// });

// // loadPosts, saveImage, deconstePost, savePostEdit, saveLike
