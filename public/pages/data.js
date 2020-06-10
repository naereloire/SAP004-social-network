const currentDate = () => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let hour = today.getHours() + ':' + today.getMinutes();
    return date + " " + hour
}

export const createPost = (textPost) => {
    let user = firebase.auth().currentUser;
    const post = {
        name: user.displayName,
        user_id: user.uid,
        text: textPost,
        date: currentDate(),
        coments: [],
        likes: 0

    }
    const postsCollection = firebase.firestore().collection("posts")
    postsCollection.add(post).then(()=>{
            window.location.reload()
        }
    )
}

export const loadPosts = (callbackPosts) => {
    const postsCollection = firebase.firestore().collection("posts")
    postsCollection.get().then((snap) => { // snap é um parametro/lista de posts
        snap.forEach((docs) => {
            callbackPosts(docs)
        })
    })
} 
