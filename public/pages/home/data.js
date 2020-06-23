import { errorDictionary } from "./error.js"

export const createPost = (textPost, tagOption, privacyOption, url) => {
    let date = new Date()
    let user = firebase.auth().currentUser;
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
        urlImg: url
    }
    const postsCollection = firebase.firestore().collection("posts")
    postsCollection.add(post).catch(error => {
        let errorObject = new errorDictionary(error)
        console.log(errorObject.translate(false))

    }
    )

}

export const loadPosts = (callbackPreProcess, callbackPosts, tagFilter, limit, privacy = false) => {
    let snapshot
    let postsCollection
    if (!tagFilter) {
        postsCollection = (firebase.firestore().collection("posts")
            .limit(limit).orderBy("timestamp", "desc"))
    } else {
        postsCollection = (firebase.firestore().collection("posts")
            .where("tag", "==", tagFilter)
            .limit(limit).orderBy("timestamp", "desc"))
    }
    if (privacy) {
        postsCollection = (firebase.firestore().collection("posts")
            .where("privacy", "==", true)
            .limit(limit).orderBy("timestamp", "desc"))

    }
    snapshot = postsCollection.onSnapshot((snap) => {


        callbackPreProcess()
        snap.forEach((docs) => {
            callbackPosts(docs)
        })
    })

}

export const saveImage = (nameFile, file, getUrl) => {
    let urlPhoto
    let storageRef = firebase.storage().ref()
    let postImage = storageRef.child(`postImage/${nameFile}`)
    postImage.put(file).then((snapshot) => {
        console.log("photo publicada" + snapshot)
    }).catch(error => {
        let errorObject = new errorDictionary(error)
        console.log(errorObject.translate(true))

    }
    )
    return urlPhoto = postImage.getDownloadURL().catch(error => {
        let errorObject = new errorDictionary(error)
        console.log(errorObject.translate(true))

    }
    )
}

export function deletePost(postId) {
    const postCollection = firebase.firestore().collection("posts")
    postCollection.doc(postId).delete().then(doc => {
        console.log('apagou ' + postId)
    }).catch(error => {
        let errorObject = new errorDictionary(error)
        console.log(errorObject.translate(false))

    }
    )
}

export const savePostEdit = (postId, editedText) => {
    const postCollection = firebase.firestore().collection("posts")
    postCollection.doc(postId).update({
        text: editedText
    }).catch(error => {
        let errorObject = new errorDictionary(error)
        console.log(errorObject.translate(false))

    }
    )
}

export function saveLike(postId, user_id) {
    const postCollection = firebase.firestore().collection("posts")
    const arrayUserAdd = firebase.firestore.FieldValue.arrayUnion(user_id);
    const arrayUserDlt = firebase.firestore.FieldValue.arrayRemove(user_id)

    postCollection.doc(postId).get().then(function (doc) {
        console.log('clicou like, post Id: ' + postId)

        if (doc.data().user_like.includes(user_id)) {
            postCollection.doc(postId).update({

                user_like: arrayUserDlt

            }).catch(error => {
                let errorObject = new errorDictionary(error)
                console.log(errorObject.translate(false))

            }
            )
        } else {
            postCollection.doc(postId).update({

                user_like: arrayUserAdd

            }).catch(error => {
                let errorObject = new errorDictionary(error)
                console.log(errorObject.translate(false))

            }
            )

        }
    })
}

export const addCommentUser = (idPost, comment) => {
    return new Promise((resolve, reject) => {
        console.log("cheguei")
        const userComment = firebase.firestore().collection("comment").doc(idPost)
        
        firebase.auth().onAuthStateChanged((user) => {
            const userCollection = firebase.firestore().collection("users")
            userCollection.doc(user.uid).get().then(result => { 
                console.log(result.data().name)
                userComment.collection('userComment').add({
                    idUser: user.uid,
                    name: result.data().name,
                    comment: comment
                })
                .then(() => {
                    resolve()
                })
                .catch(error => {
                    reject(error)
                });
            })
            .catch(erro => reject(erro))
        });
    });
};

export const showComments = (idPost) => {
    return new Promise((resolve, reject) =>{
        const comments = firebase.firestore().collection("comment").doc(idPost)
        comments.collection("userComment").get()
        .then(querySnapshot => {
            resolve(querySnapshot)
        })
        .catch(erro => {
            reject(erro)
        })
    })
    
}

export const deleteComment = (id, idPost) => {
    const commentCollection = firebase.firestore().collection("comment").doc(idPost)
    commentCollection.collection('userComment').doc(id).delete().then(doc => {
        console.log('apagou ' + id)
    }).catch(error => {
        let errorObject = new errorDictionary(error)
        console.log(errorObject.translate(false))

    }
    )
}