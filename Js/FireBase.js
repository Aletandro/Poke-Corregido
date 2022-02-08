import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCN2kpoPew4BbjDQD0ZSP32a7Qms_Y2Mdw",
    authDomain: "pokedesk-9192b.firebaseapp.com",
    projectId: "pokedesk-9192b",
    storageBucket: "pokedesk-9192b.appspot.com",
    messagingSenderId: "647484512381",
    appId: "1:647484512381:web:3a017080bbe9681e4ff914",
    measurementId: "G-V2E6FMPFG0"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database= getDatabase(app);
const auth = getAuth();

signUp.addEventListener("click",(e) =>{
   e.preventDefault();
    const email = document.getElementById("login-form-email").value;
    const password = document.getElementById("login-form-pass").value;
    const username = document.getElementById("username").value;
    console.log( username, email, password,);
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, "users/"+ user.uid),{
                username:username,
                email:email
            })
            alert ("Usuario Creado Con Exito");
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage +" no autentica");
});

});