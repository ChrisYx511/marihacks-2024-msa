import { auth } from '$lib/firebase.client'
import { writable, type Writable } from 'svelte/store'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    type User,
    type UserCredential
} from 'firebase/auth'
import { goto } from '$app/navigation'

class AuthStore {
    user: User | null
    role?: 'none' | 'mentee' | 'mentor' | 'admin'
    constructor() {
        this.user = null
        this.role = 'none'
    }
}

export const authStore: Writable<AuthStore> = writable(new AuthStore())

export const authHandlers = {
    createUserWithEmail: async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
        goto('/login')
    },
    loginWithEmail: async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
        goto('/')
    },
    logout: async () => {
        await auth.signOut()
        goto('/login')
    }
}
