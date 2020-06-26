import FakeFirestore from './mock_firestore.js';
import { auth } from './mock_auth.js';
import { createPost, loadPosts } from '../public/pages/home/data.js';

const fakeFirestore = new FakeFirestore();

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

  it('is a function', () => {
    expect(typeof createPost).toBe('function');
  });

  it('Should receive as a collection parameter `posts`', (done) => {
    async function testCollection() {
      createPost('textPost', 'tagOption', true, '');
    }
    testCollection().then(() => {
      expect(fakeFirestore.mockCollection).toBeCalledWith('posts');
      done();
    });
  });

  it('Should receive as a parameter for add to collection `object with data posts`', (done) => {
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

describe('loadPosts', () => {
  it('is a function', () => {
    expect(typeof loadPosts).toBe('function');
  });

  it('should throw TypeError when invoked with wrong argument types', () => {
    expect(() => createPost()).toThrow(TypeError);
  });
});
