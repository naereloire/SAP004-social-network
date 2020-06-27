/* eslint-disable no-undef */
export default class FakeFirestore {
  constructor() {
    // retunr class
    this.mockCollection = jest.fn(() => this);
    this.mockWhere = jest.fn(() => this);
    this.mockOrderBy = jest.fn(() => this);
    this.mockLimit = jest.fn(() => this);
    // return Promise
    this.mockAdd = jest.fn(() => Promise.resolve(this.mockAddReturn));
    this.mockGet = jest.fn(() => Promise.resolve(this.mockGetReturn));

    // listener
    // eslint-disable-next-line no-unused-vars
    // this.mockOnSnaptshot = jest.fn(() => Promise.resolve(this.mockOnSnaptshotSuccess));
    this.mockOnSnaptshot = jest.fn((success) => success(this.intMockOnSnaptshotSuccess));

    // return values
    this.intMockAddReturn = null;
    this.intMockGetReturn = null;
    this.intMockOnSnaptshotSuccess = null;
  }

  collection(collectionName) {
    return this.mockCollection(collectionName);
  }

  where(...args) {
    return this.mockWhere(...args);
  }

  orderBy(...args) {
    return this.mockOrderBy(...args);
  }

  limit(...args) {
    return this.mockLimit(...args);
  }

  add(docToAdd) {
    return this.mockAdd(docToAdd);
  }

  get() {
    return this.mockGet();
  }

  onSnapshot(...args) {
    return this.mockOnSnaptshot(...args);
  }

  set mockAddReturn(val) {
    this.intMockAddReturn = val;
  }

  set mockGetReturn(val) {
    this.intMockGetReturn = val;
  }

  set mockOnSnaptshotSuccess(val) {
    this.intMockOnSnaptshotSuccess = val;
  }

  reset() {
    // reset all the mocked returns
    this.intMockAddReturn = null;
    this.intMockGetReturn = null;
    this.intMockOnSnaptshotSuccess = null;
    // reset all the mocked functions
    this.mockCollection.mockClear();
    this.mockWhere.mockClear();
    this.mockOrderBy.mockClear();
    this.mockLimit.mockClear();
    this.mockAdd.mockClear();
    this.mockGet.mockClear();
  }
}
