export const picture = () => {
    const profilePicture = document.getElementById("profile-picture");
    profilePicture.addEventListener("click", function(){
    let ref = firebase.storage().ref("pictures");
    let upload;

    profilePicture.onchange = function(event){
        console.log("Oi")
        let archive = event.target.files[0];
        let uid = firebase.firestore().ref().push().key
        upload = ref.child(uid).put(archive)
    }
})
} 

