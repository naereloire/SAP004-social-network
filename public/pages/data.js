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
        window.location.reload()
    }
    )
}

export const loadPosts = (callbackPosts, tagFilter) => {
    let postsCollection
    if (!tagFilter) {
        postsCollection = firebase.firestore().collection("posts").orderBy("timestamp", "desc")
    }
    else {
        postsCollection = firebase.firestore().collection("posts").where("tag", "==", tagFilter).orderBy("timestamp", "desc")
    }
    postsCollection.get().then((snap) => {
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