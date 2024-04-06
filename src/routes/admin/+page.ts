import { Query, collection, getDocs, query, where } from 'firebase/firestore'
import type { PageLoad } from './$types'
import { db } from '@/firebase.client'

export const load: PageLoad = async () => {
    const mentorsData = await getDocs(collection(db, 'mentors'))
    mentorsData.forEach((doc) => {
        console.log(doc.data())
    })
    let dataObject: any = []
    mentorsData.forEach((doc) => {
        dataObject.push(doc.data())
    })
    console.log(dataObject)
    return {
        mentorsData: dataObject
    }
}
