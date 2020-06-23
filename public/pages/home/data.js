/* global firebase */

import { ErrorDictionary } from './error.js';

export const createPost = (textPost, tagOption, privacyOption, url) => {
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
  postsCollection.add(post).catch((error) => {
    const ErrorObject = new ErrorDictionary(error);
    console.log(ErrorObject.translate(false));
  });
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
  postImage
    .put(file)
    .then((snapshot) => {
      console.log('photo publicada' + snapshot);
    })
    .catch((error) => {
      const errorObject = new ErrorDictionary(error);
      console.log(errorObject.translate(true));
    });
  return postImage.getDownloadURL().catch((error) => {
    const errorObject = new ErrorDictionary(error);
    console.log(errorObject.translate(true));
  });
};

export function deletePost(postId) {
  const postCollection = firebase.firestore().collection('posts');
  postCollection
    .doc(postId)
    .delete()
    .then(() => {
      console.log('apagou ' + postId);
    })
    .catch((error) => {
      const errorObject = new ErrorDictionary(error);
      console.log(errorObject.translate(false));
    });
}

export const savePostEdit = (postId, editedText) => {
  const postCollection = firebase.firestore().collection('posts');
  postCollection
    .doc(postId)
    .update({
      text: editedText,
    })
    .catch((error) => {
      const errorObject = new ErrorDictionary(error);
      console.log(errorObject.translate(false));
    });
};

export function saveLike(postId, user_id) {
  const postCollection = firebase.firestore().collection('posts');
  const arrayUserAdd = firebase.firestore.FieldValue.arrayUnion(user_id);
  const arrayUserDlt = firebase.firestore.FieldValue.arrayRemove(user_id);

  postCollection
    .doc(postId)
    .get()
    .then(function (doc) {
      console.log('clicou like, post Id: ' + postId);

      if (doc.data().user_like.includes(user_id)) {
        postCollection
          .doc(postId)
          .update({
            user_like: arrayUserDlt,
          })
          .catch((error) => {
            const errorObject = new ErrorDictionary(error);
            console.log(errorObject.translate(false));
          });
      } else {
        postCollection
          .doc(postId)
          .update({
            user_like: arrayUserAdd,
          })
          .catch((error) => {
            const errorObject = new ErrorDictionary(error);
            console.log(errorObject.translate(false));
          });
      }
    });
}
