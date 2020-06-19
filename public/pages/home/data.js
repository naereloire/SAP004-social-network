export const createPost = (textPost, tagOption, privacyOption) => {
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
        likes: 0

    }
    const postsCollection = firebase.firestore().collection("posts")
    postsCollection.add(post).then(() => {
    }
    )
}

export const loadPosts = (callbackPreProcess, callbackPosts, tagFilter, limit, privacy = false) => {
    let snapshot
    let postsCollection
    if (!tagFilter) {
        postsCollection = (firebase.firestore().collection("posts")
            .limit(limit).orderBy("timestamp", "desc"))
    }
    else {
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

export const saveImage = (nameFile, file) => {
    // debugger
    let storageRef = firebase.storage().ref()
    let postImage = storageRef.child(`postImage/${nameFile}`)
    postImage.put(file).then((snapshot) => {
        console.log("photo publicada" + snapshot)
    })
}

export function deletePost(postId) {
    const postCollection = firebase.firestore().collection("posts")
    postCollection.doc(postId).delete().then(doc => {
        console.log('apagou ' + postId)
    })
}

