import FakeFirestore from './mock_firestore.js';
import { auth } from './mock_auth.js';
import { createPost, loadPosts, deletePost } from '../public/pages/home/data.js';

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

const callBackLoadOne = jest.fn(() => {
  return 'fake return pre process';
});

const callBackLoadTwo = jest.fn((docs) => {
  return docs.data;
});

describe('loadPosts', () => {
  beforeEach(() => {
    fakeFirestore.reset();
  });

  it('is a function', () => {
    expect(typeof loadPosts).toBe('function');
  });

  it('Deveria acessar o firestore e retornar toda a coleção ´posts´', (done) => {
    fakeFirestore.mockOnSnaptshotSuccess = [
      { id: 'test-id', data: { name: 'maria', user_id: 'abcdefg' } },
    ];
    async function testLoadAll() {
      loadPosts(callBackLoadOne, callBackLoadTwo, '', 5, false);
    }
    testLoadAll().then(() => {
      expect(fakeFirestore.mockCollection).toBeCalledWith('posts');
      expect(fakeFirestore.mockWhere).toHaveBeenCalledTimes(0);
      expect(fakeFirestore.mockLimit).toBeCalledWith(5);
      expect(fakeFirestore.mockOrderBy).toBeCalledWith('timestamp', 'desc');
      done();
    });
  });

  it('Deveria acessar o firestore e retornar a coleção filtrada por ´tags´', (done) => {
    fakeFirestore.mockOnSnaptshotSuccess = [
      { id: 'test-id', data: { name: 'maria', user_id: 'abcdefg' } },
    ];
    async function testLoadFilterTag() {
      loadPosts(callBackLoadOne, callBackLoadTwo, 'geek', 5, false);
    }
    testLoadFilterTag().then(() => {
      expect(fakeFirestore.mockCollection).toBeCalledWith('posts');
      expect(fakeFirestore.mockWhere).toBeCalledWith('tag', '==', 'geek');
      expect(fakeFirestore.mockLimit).toBeCalledWith(5);
      expect(fakeFirestore.mockOrderBy).toBeCalledWith('timestamp', 'desc');
      done();
    });
  });

  it('Deveria acessar o firestore e retornar a coleção filtrada por ´privacy´', (done) => {
    fakeFirestore.mockOnSnaptshotSuccess = [
      { id: 'test-id', data: { name: 'maria', user_id: 'abcdefg' } },
    ];
    async function testLoadFilterPrivacy() {
      loadPosts(callBackLoadOne, callBackLoadTwo, 'geek', 5, true);
    }
    testLoadFilterPrivacy().then(() => {
      expect(fakeFirestore.mockCollection).toBeCalledWith('posts');
      expect(fakeFirestore.mockWhere).toBeCalledWith('privacy', '==', true);
      expect(fakeFirestore.mockLimit).toBeCalledWith(5);
      expect(fakeFirestore.mockOrderBy).toBeCalledWith('timestamp', 'desc');
      done();
    });
  });

  it('Deveria utilizar função callbackLoadTwo para tratar docs', (done) => {
    fakeFirestore.reset();
    callBackLoadTwo.mockClear();
    fakeFirestore.mockOnSnaptshotSuccess = [
      { id: 'test-id', data: { name: 'joão', user_id: 'abcdefg' } },
      { id: 'test-id', data: { name: 'Luciano', user_id: 'abcdefg' } },
    ];
    async function testLoadForEach() {
      loadPosts(callBackLoadOne, callBackLoadTwo, 'geek', 5, true);
    }
    testLoadForEach().then(() => {
      expect(callBackLoadTwo).toHaveBeenCalledTimes(2);
      expect(callBackLoadTwo).toHaveBeenNthCalledWith(1, {
        id: 'test-id',
        data: { name: 'joão', user_id: 'abcdefg' },
      });
      expect(callBackLoadTwo).toHaveBeenNthCalledWith(2, {
        id: 'test-id',
        data: { name: 'Luciano', user_id: 'abcdefg' },
      });

      done();
    });
  });

  it('should throw TypeError when invoked with wrong argument types', () => {
    expect(() => createPost()).toThrow(TypeError);
  });
});
