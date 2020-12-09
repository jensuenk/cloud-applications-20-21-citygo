import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB55cL5zUswEM5oZj_2Y-fDfqxCsNTAa_M",
    authDomain: "citygo-6ca36.firebaseapp.com",
    databaseURL: "https://citygo-6ca36.firebaseio.com",
    projectId: "citygo-6ca36",
    storageBucket: "",
    messagingSenderId: "996768732060",
    appId: "1:996768732060:web:e47e95a81e25b306fd6e59"
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase