import type { PageLoad } from './$types'
import { db } from '$lib/firebase.client'
import {
    collection,
    Query,
    getDocs,
    query,
    where,
    QuerySnapshot,
    QueryDocumentSnapshot
} from 'firebase/firestore'

export const load: PageLoad = async ({ url }) => {
    // TODO types
    const questionsQuery: Query = query(
        collection(db, 'questions'),
        where('audience', '!=', 'mentor')
    )
    const questionsSnapshot: QuerySnapshot = await getDocs(questionsQuery)
    const questions: QueryDocumentSnapshot[] = questionsSnapshot.docs
    questions.sort((a, b) => a.get('order') - b.get('order'))

    return {
        questions: questions
    }
}
