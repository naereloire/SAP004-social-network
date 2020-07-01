/* global firebase */

export const createPost = (textPost, tagOption, privacyOption, url) => {
  if (
    (typeof textPost !== 'string' || textPost.length === 0,
    typeof tagOption !== 'string' || tagOption === 0,
    typeof privacyOption !== 'boolean' || privacyOption.length === 0,
    typeof url !== 'string')
  ) {
    throw new TypeError('parâmetro invalido');
  }
  const date = new Date();
  const user = firebase.auth().currentUser;
  const post = {
    name: user.displayName,
    user_id: user.uid,
    text: textPost,
    tag: tagOption,
    date: date.toLocaleString(),
    timestamp: date.getTime(),
    privacy: privacyOption,
    coments: [],
    user_like: [],
    urlImg: url,
  };
  const postsCollection = firebase.firestore().collection('posts');
  postsCollection.add(post);
};

export const loadPosts = (callbackPreProcess, callbackPosts, tagFilter, limit, privacy = false) => {
  let postsCollection;
  if (!tagFilter) {
    postsCollection = firebase
      .firestore()
      .collection('posts')
      .limit(limit)
      .orderBy('timestamp', 'desc');
  } else {
    postsCollection = firebase
      .firestore()
      .collection('posts')
      .where('tag', '==', tagFilter)
      .limit(limit)
      .orderBy('timestamp', 'desc');
  }
  if (privacy) {
    postsCollection = firebase
      .firestore()
      .collection('posts')
      .where('privacy', '==', true)
      .limit(limit)
      .orderBy('timestamp', 'desc');
  }
  postsCollection.onSnapshot((snap) => {
    callbackPreProcess();
    snap.forEach((docs) => {
      callbackPosts(docs);
    });
  });
};

export const saveImage = (nameFile, file) => {
  const storageRef = firebase.storage().ref();
  const postImage = storageRef.child(`postImage/${nameFile}`);
  postImage.put(file);

  return postImage.getDownloadURL();
};

export function deletePost(postId) {
  const postCollection = firebase.firestore().collection('posts');
  postCollection.doc(postId).delete();
}

export const savePostEdit = (postId, editedText) => {
  const postCollection = firebase.firestore().collection('posts');
  postCollection.doc(postId).update({
    text: editedText,
  });
};

export function saveLike(postId, userId) {
  const postCollection = firebase.firestore().collection('posts');
  const arrayUserAdd = firebase.firestore.FieldValue.arrayUnion(userId);
  const arrayUserDlt = firebase.firestore.FieldValue.arrayRemove(userId);

  postCollection
    .doc(postId)
    .get()
    .then(function callBackCompareUser(doc) {
      if (doc.data().user_like.includes(userId)) {
        postCollection.doc(postId).update({
          user_like: arrayUserDlt,
        });
      } else {
        postCollection.doc(postId).update({
          user_like: arrayUserAdd,
        });
      }
    });
}

export const addCommentUser = (idPost, comment) => {
  return new Promise(() => {
    const userComment = firebase.firestore().collection('comment').doc(idPost);

    firebase.auth().onAuthStateChanged((user) => {
      const userCollection = firebase.firestore().collection('users');
      userCollection
        .doc(user.uid)
        .get()
        .then((result) => {
          userComment.collection('userComment').add({
            idUser: user.uid,
            name: result.data().name,
            comment,
          });
        });
    });
  });
};

export const showComments = (idPost) => {
  return new Promise((resolve, reject) => {
    const comments = firebase.firestore().collection('comment').doc(idPost);
    comments
      .collection('userComment')
      .get()
      .then((querySnapshot) => {
        resolve(querySnapshot);
      })
      .catch((erro) => {
        reject(erro);
      });
  });
};

export const deleteComment = (id, idPost) => {
  const commentCollection = firebase.firestore().collection('comment').doc(idPost);
  commentCollection.collection('userComment').doc(id).delete();
};
