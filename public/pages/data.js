const currentDate = () =>{
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let hour = today.getHours()+':'+today.getMinutes();
    return date +" "+ hour 
}


export function savePost(textPost) {
    let user = firebase.auth().currentUser;
    const post = {
        user_id:user.uid,
        text: textPost,
        date:currentDate(),
        coments:[],
        likes:0
        
    }
    const postsCollection = firebase.firestore().collection("posts")
    postsCollection.add(post)
}
