// Firebase initialization
var db = firebase.apps[0].firestore();
var auth = firebase.apps[0].auth();

// Selecting HTML elements by their IDs
const txtEmail = document.querySelector('#txtEmail');
const txtContra = document.querySelector('#txtContra');

const btnLogin = document.querySelector('#btnLogin');

// Event listener for the login button
btnLogin.addEventListener('click', function () {
    // Authenticate user with email and password
    auth.signInWithEmailAndPassword(txtEmail.value, txtContra.value)
        .then((userCredential) => {
            // User authentication successful
            const user = userCredential.user;
            const dt = new Date();

            // Update the 'ultAcceso' field in 'datosUsuarios' collection
            db.collection("datosUsuarios").where('idemp', '==', user.uid).get()
                .then(function (docRef) {
                    docRef.forEach(function (doc) {
                        doc.ref.update({ ultAcceso: dt }).then(function () {
                            // Redirect to index.html after updating 'ultAcceso'
                            document.location.href = 'index.html';
                        });
                    });
                })
                .catch(function (FirebaseError) {
                    var mensaje = "Error updating document: " + FirebaseError;
                    alert(mensaje);
                });
        })
        .catch((error) => {
            // Display an alert if there is an error during user authentication
            var mensaje = "Error user access: " + error.message;
            alert(mensaje);
        });
});

const btnGuest = document.querySelector('#btnGuest'); // Botón para invitados

btnGuest.addEventListener('click', function () {
    auth.signInAnonymously()
        .then(() => {
            console.log('Sesión iniciada como invitado');
            // Redirigir al área permitida para usuarios anónimos
            document.location.href = 'guest.html'; // Crea esta página para invitados
        })
        .catch((error) => {
            alert('Error al iniciar sesión como invitado: ' + error.message);
        });
});


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('User signed in:', user);
        // Redirigir o realizar otras acciones al iniciar sesión
        window.location.href = "dashboard.html"; // O la página que desees
    } else {
        console.log('No user signed in');
    }
});


const googleSignInButton = document.getElementById('googleSignInButton');

googleSignInButton.addEventListener('click', () => {
    // Crear una instancia del proveedor de Google
    const provider = new firebase.auth.GoogleAuthProvider();

    // Iniciar sesión con el proveedor de Google
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            // El usuario ha iniciado sesión con Google exitosamente
            const user = result.user;
            console.log('User signed in with Google:', user);
            // Redirigir a la página principal o dashboard
            window.location.href = "dashboard.html"; // O la página que desees
        })
        .catch((error) => {
            // Ocurrió un error durante el inicio de sesión
            console.error('Error during Google sign in:', error);
        });
});

