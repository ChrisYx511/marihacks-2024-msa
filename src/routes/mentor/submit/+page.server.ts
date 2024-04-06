import type { Actions } from './$types'
import { db } from '$lib/firebase.client'
import { addDoc, collection } from 'firebase/firestore'

export const actions = {
    default: async (event): Promise<void> => {
        const data: FormData = await event.request.formData()
        const dataObject: any = {}
        data.forEach((v, i) => {
            dataObject[i] = v
        })
        await addDoc(collection(db, 'mentors'), dataObject)
    }
} satisfies Actions
