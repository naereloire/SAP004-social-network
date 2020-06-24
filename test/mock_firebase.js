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
    this.mockOnSnaptshot = jest.fn((success, error) => success(this.mockOnSnaptshotSuccess));
    // return values
    this.mockAddReturn = null;
    this.mockGetReturn = null;
    this.mockOnSnaptshotSuccess = null;
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

  onSnapshot(success, error) {
    return this.mockOnSnaptshot(success, error);
  }

  set mockAddReturn(val) {
    this.mockAddReturn = val;
  }

  set mockGetReturn(val) {
    this.mockGetReturn = val;
  }

  set mockOnSnaptshotSuccess(val) {
    this.mockOnSnaptshotSuccess = val;
  }

  reset() {
    // reset all the mocked returns
    this.mockAddReturn = null;
    this.mockGetReturn = null;
    this.mockOnSnaptshotSuccess = null;
    // reset all the mocked functions
    this.mockCollection.mockClear();
    this.mockWhere.mockClear();
    this.mockOrderBy.mockClear();
    this.mockLimit.mockClear();
    this.mockAdd.mockClear();
    this.mockGet.mockClear();
  }
}
