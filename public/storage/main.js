let ref = firebase.storage().ref('users')

export const picture = () => {
    const userPicture = document.getElementById("profile-picture");
    userPicture.addEventListener("click", function(){
        userPicture.onchange = function (event) {
            let archive = event.target.files[0]

            ref.child('picture').put(archive)
            .then(snapshot => {
                console.log(snapshot)
            })
        }
    })
}