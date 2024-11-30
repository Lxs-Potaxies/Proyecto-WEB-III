// Validate that the user is logged in
var auth = firebase.apps[0].auth();
var inactivityTimeout;

// Function to check if the user is logged in, redirect to login page if not
function validar() {
    return new Promise((resolve, reject) => {
        // Check for changes in the authentication state
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is logged in, resolve the promise with the user's UID
                resetInactivityTimer(); // Reset the inactivity timer on user activity
                resolve(user.uid);
            } else {
                // User is not logged in, reject the promise
                reject(new Error('User not authenticated'));
            }
        });
    });
}

// Function to sign out the user
function salir() {
    // Clear the inactivity timer before signing out
    clearTimeout(inactivityTimeout);

    // Sign out the user
    auth.signOut().then(() => {
        // Redirect to index page after successful sign-out
        alert('Log out success');
        document.location.href = 'login.html';
    }).catch((error) => {
        // Display an alert if there is an error during sign-out
        alert('Error logging out: ' + error.message);
    });
}

// Function to reset the inactivity timer
function resetInactivityTimer() {
    // Clear the previous timer
    clearTimeout(inactivityTimeout);

    // Set a new timer for 1 minute (60,000 milliseconds)
    inactivityTimeout = setTimeout(() => {
        // Log out the user after 1 minute of inactivity
        salir();
    }, 60000); // 1 minute
}

// Attach event listeners for user activity
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keydown', resetInactivityTimer);

// Lista de páginas permitidas para usuarios anónimos
const allowedPagesForGuests = ['researchwork.html', 'about.html', 'researchDetails.html', 'index.html'];

// Validar el estado de autenticación y acceso
validar()
    .then((uid) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const currentPage = window.location.pathname.split('/').pop(); // Obtén el archivo actual
                if (user.isAnonymous) {
                    console.log('Usuario anónimo autenticado');
                    // Verificar si la página actual está permitida para usuarios anónimos
                    if (!allowedPagesForGuests.includes(currentPage)) {
                        alert('Acceso restringido. Redirigiendo a una página permitida.');
                        document.location.href = 'researchwork.html'; // Redirigir a una página permitida
                    }
                } else {
                    console.log('Usuario registrado autenticado');
                    // Usuarios registrados no tienen restricciones
                }
            }
        });
    })
    .catch((error) => {
        console.error(error.message);
        const currentPage = window.location.pathname.split('/').pop(); // Obtén el archivo actual
        // Si no está autenticado y la página actual no es para invitados
        if (!allowedPagesForGuests.includes(currentPage)) {
            document.location.href = 'login.html'; // Redirigir al login
        }
    });


   
