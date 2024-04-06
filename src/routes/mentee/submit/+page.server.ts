import type { Actions } from './$types'
import { db } from '$lib/firebase.client'
import { addDoc, collection } from 'firebase/firestore'

export const actions = {
    default: async (event): Promise<void> => {
        const data: FormData = await event.request.formData()
        await addDoc(collection(db, 'mentees'), Object.fromEntries(data))
    }
} satisfies Actions
