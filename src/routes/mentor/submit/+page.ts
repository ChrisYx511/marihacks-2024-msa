import type { PageLoad } from './$types';
import { db } from '$lib/firebase.client'
import { collection, Query, getDocs, query, where, QuerySnapshot } from "firebase/firestore"

export const load: PageLoad = async ({ url }) => {
	// TODO types
	const questionsQuery: Query = query(collection(db, "questions"), where("audience", "!=", "mentee"))
	const questions: QuerySnapshot = await getDocs(questionsQuery)

	return {
		"questions": questions.docs
	}
};