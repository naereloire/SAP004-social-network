export const createPost = (textPost, tagOption) => {
    let date = new Date()
    let user = firebase.auth().currentUser;
    const post = {
        name: user.displayName,
        user_id: user.uid,
        text: textPost,
        tag: tagOption,
        date: date.toLocaleString(),
        timestamp: date.getTime(),
        coments: [],
        likes: 0

    }
    const postsCollection = firebase.firestore().collection("posts")
    postsCollection.add(post).then(() => {
    }
    )
}

export const loadPosts = (callbackPreProcess, callbackPosts, tagFilter) => {
    let postsCollection
    if (!tagFilter) {
        postsCollection = firebase.firestore().collection("posts").orderBy("timestamp", "desc")
    }
    else {
        postsCollection = firebase.firestore().collection("posts").where("tag", "==", tagFilter).orderBy("timestamp", "desc")
    }
    postsCollection.onSnapshot((snap) => {
        callbackPreProcess()
        snap.forEach((docs) => {
            callbackPosts(docs)
        })
    })

} 
