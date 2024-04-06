import {
    deleteApp,
    getApps,
    initializeApp,
    type FirebaseApp,
    type FirebaseOptions
} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyDcmux2XBlyP0C6nUvFu2xBGEZB-7pt3rY',
    authDomain: 'marihacks-2024-msa.firebaseapp.com',
    projectId: 'marihacks-2024-msa',
    storageBucket: 'marihacks-2024-msa.appspot.com',
    messagingSenderId: '769665054478',
    appId: '1:769665054478:web:62e82021315264ee1cc95f'
}

let firebaseApp: FirebaseApp

if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig)
} else {
    firebaseApp = getApps()[0]
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(firebaseConfig)
}

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)
