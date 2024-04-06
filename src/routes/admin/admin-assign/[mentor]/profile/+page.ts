import { collection, getDoc, getDocs, query, where, type Query } from 'firebase/firestore'
import type { PageLoad } from './$types'
import { db } from '@/firebase.client'

export const load: PageLoad = async ({ params }) => {
    const profileQuery: Query = query(
        collection(db, 'mentors'),
        where('email', '==', decodeURI(params.mentor))
    )
    const profiles = await getDocs(profileQuery)

    return {
        mentorEmail: decodeURI(params.mentor),
        mentor: profiles.docs[0]
    }
}
