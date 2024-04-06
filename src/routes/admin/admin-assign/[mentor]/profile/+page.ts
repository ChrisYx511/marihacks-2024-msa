import { collection, getDocs, query, where, type Query } from 'firebase/firestore'
import type { PageLoad } from './$types'
import { db } from '@/firebase.client'

export const load: PageLoad = async ({ params }) => {
    const profileQuery: Query = query(
        collection(db, 'mentors'),
        where('email', '==', decodeURI(params.mentor))
    )
    const profiles = await getDocs(profileQuery)

    const unPairedMenteesQuery: Query = query(
        collection(db, 'mentors'),
        where('mentor', '!=', decodeURI(params.mentor))
    )
    const unpairedMentees = await getDocs(unPairedMenteesQuery)
    let unpairedData: any = []
    unpairedMentees.forEach((obj) => {
        unpairedData.push(obj.data())
    })
    console.log(unpairedMentees)

    return {
        mentorEmail: decodeURI(params.mentor),
        mentor: profiles.docs[0],
        unpairedMentees: unpairedData
    }
}
