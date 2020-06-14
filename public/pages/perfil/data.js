export const saveProfileUser = () => {
    const name = document.getElementById("name-profile").value;
    const lastName = document.getElementById("last-name-profile").value;
    const dateBirth = document.getElementById("date-of-birth-profile").value;
    const email = document.getElementById("email-profile").value;
    const password = document.getElementById("password-profile").value;
    const city = document.getElementById("city-profile").value;

    const userCollection = firebase.firestore().collection("users")
    firebase.auth().onAuthStateChanged((user) => {
        userCollection.doc(user.uid).set({
            name,
            lastName,
            dateBirth,
            email,
            password,
            city
        }).then(() => {}).catch(error => {
            console.log(error)
        })
    })
}

export const getProfileUSer = () => {
    const userName = document.getElementById("user-name");

    firebase.auth().onAuthStateChanged((user) => {

        const userCollection = firebase.firestore().collection("users")

        userCollection.doc(user.uid).get().then(result => {

            userName.innerText = `${
                result.data().name
            } ${
                result.data().lastName
            }`
        }).catch(error => {
            console.log(error)
        })
    })
}

export const getProfile = () => {
    firebase.auth().onAuthStateChanged((user) => {

        const userCollection = firebase.firestore().collection("users")

        userCollection.doc(user.uid).get()
            .then(result => {
                document.getElementById("name-profile").value = result.data().name;
                document.getElementById("last-name-profile").value = result.data().lastName;
                document.getElementById("date-of-birth-profile").value = result.data().dateBirth;
                document.getElementById("email-profile").value = result.data().email;
                document.getElementById("password-profile").value = result.data().password;
                document.getElementById("city-profile").value = result.data().city;
        }).catch(error => {
            console.log(error)
        })
    })
}
