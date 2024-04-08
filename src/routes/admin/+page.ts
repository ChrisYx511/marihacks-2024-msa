import { collection, getDocs } from 'firebase/firestore'
import type { PageLoad } from './$types'
import { db } from '@/firebase.client'

export const load: PageLoad = async () => {
    const mentorsData = await getDocs(collection(db, 'mentors'))
    let dataObject: any = []
    mentorsData.forEach((doc) => {
        dataObject.push(doc.data())
    })
    return {
        mentorsData: dataObject
    }
}
