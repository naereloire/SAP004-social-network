import FakeFirestore from './mock_firestore.js';
import { auth } from './mock_auth.js';
import { createPost } from '../public/pages/home/data.js';

let fakeFirestore = new FakeFirestore();

global.firebase = {
  firestore: () => {
    return fakeFirestore;
  },
  auth,
};

const mockDate = new Date(1466424490000);
const post = {
  name: 'maria',
  user_id: 'abcdefg',
  text: 'textPost',
  tag: 'tagOption',
  date: mockDate.toLocaleString(),
  timestamp: mockDate.getTime(),
  privacy: true,
  coments: [],
  user_like: [],
  urlImg: '',
};

describe('createPost', () => {
  beforeAll(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  it('Deveria adiconar o post no firestore collection `posts`', (done) => {
    async function testCollection() {
      createPost('textPost', 'tagOption', true, '');
    }
    testCollection().then(() => {
      expect(fakeFirestore.mockCollection).toBeCalledWith('posts');
      done();
    });
  });

  it('Deveria receber post como parametro', (done) => {
    async function testAddParam() {
      createPost('textPost', 'tagOption', true, '');
    }
    testAddParam().then(() => {
      expect(fakeFirestore.mockAdd).toBeCalledWith(post);
      done();
    });
  });

  it('should throw TypeError when invoked with wrong argument types', () => {
    expect(() => createPost()).toThrow(TypeError);
    expect(() => createPost(true, true, 'string', true)).toThrow(TypeError);
    expect(() => createPost('string', [], [], {})).toThrow(TypeError);
    expect(() => createPost('string', 'string', 0, {})).toThrow(TypeError);
  });
});
