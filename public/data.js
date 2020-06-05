
// export const greeting = name => `Oi ${name}! Que bom ver você aqui!`;


export function savePost(textPost) {
    const post = {
        text: textPost,
        user_id: "Diana"
    }
    const postsCollection = firebase.firestore().collection("posts")
    postsCollection.add(post)
}
