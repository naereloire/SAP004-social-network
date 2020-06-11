export const createPost = (textPost) => {
    let date = new Date()
    let user = firebase.auth().currentUser;
    const post = {
        name: user.displayName,
        user_id: user.uid,
        text: textPost,
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

export const loadPosts = (callbackPosts) => {
    const postsCollection = firebase.firestore().collection("posts").orderBy("timestamp","desc")
    postsCollection.get().then((snap) => {
        snap.forEach((docs) => {
            callbackPosts(docs)
        })
    })

} 
