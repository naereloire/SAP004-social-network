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

export const loadPosts = (callbackPreProcess, callbackPosts, tagFilter, limit) => {
    let postsCollection
    if (!tagFilter) {
        postsCollection = firebase.firestore().collection("posts").limit(limit).orderBy("timestamp", "desc")
    }
    else {
        postsCollection = firebase.firestore().collection("posts").where("tag", "==", tagFilter).limit(limit).orderBy("timestamp", "desc")
    }
    postsCollection.onSnapshot((snap) => {
        callbackPreProcess()
        snap.forEach((docs) => {
            callbackPosts(docs)
        })
    })
     

} 

export function deletePost(postId) {
    const postCollection = firebase.firestore().collection("posts")
    postCollection.doc(postId).delete().then(doc => {
        console.log('apagou ' + postId )
   })
}