import type { Actions } from './$types'
import { db } from '$lib/firebase.client'
import {
    getDocs,
    collection,
    query,
    Query,
    where,
    QuerySnapshot,
    setDoc,
    doc,
    CollectionReference,
    DocumentReference,
    updateDoc
} from 'firebase/firestore'
import openai from '$lib/openai.server'

async function callAI(prompt: string) {
    return await openai.chat.completions.create({
        messages: [{ role: 'system', content: prompt }],
        model: 'gpt-3.5-turbo',
        response_format: { type: 'json_object' }
    })
}

async function callAIs(prompts: any, docName: string,) {
    let pairing: any = {}
    for (let p of prompts) {
        const result = await callAI(p[0])
        const score = JSON.parse(result.choices[0].message.content || '')
        pairing[p[1]] = score['c']
        //await setDoc(docRef, score)
    }
    
    // The following is test data returned by callAI.
    // Comment the above for loop and uncomment the following to test
    // without having tomake and wait for API calls to OpenAI every time
    /*
    pairing = {
        'johnsmith@domain.com:justin.bax@icloud.com': 5,
        'johnsmith@domain.com:bobby12@yahoo.com': 10,
        'johnsmith@domain.com:chrisyx511@gmail.com': 10,
        'bill.gates@gmail.com:justin.bax@icloud.com': 10,
        'bill.gates@gmail.com:bobby12@yahoo.com': 10,
        'bill.gates@gmail.com:chrisyx511@gmail.com': 10,
        'marianostudent@mari.com:justin.bax@icloud.com': 5,
        'marianostudent@mari.com:bobby12@yahoo.com': 10,
        'marianostudent@mari.com:chrisyx511@gmail.com': 6
    }
    */
    return pairing
}

async function getDbData() {
    const mentees: QuerySnapshot = await getDocs(collection(db, 'mentees'))
    const mentors: QuerySnapshot = await getDocs(collection(db, 'mentors'))
    const questions: QuerySnapshot = await getDocs(collection(db, 'questions'))

    return {
        mentees: mentees.docs.map((doc) => doc.data()),
        mentors: mentors.docs.map((doc) => doc.data()),
        questions: questions.docs.map((doc) => doc.data())
    }
}

async function getQueries(mentees: any, mentors: any, questions: any) {
    let pairing: { [key: string]: number } = {}
    let queries: any[] = []

    mentees.forEach((mentee) => {
        mentors.forEach((mentor) => {
            const docName: string = mentee['email'] + ':' + mentor['email']
            const docRef: DocumentReference = doc(db, 'scores', docName)
            let query: string =
                "\nEvaluate the following people's compatibility based on their answers to these questions. Give your answer on a scale of 1 to 20 in JSON in a field called 'c' (for example: {'c':7} )"
            questions.forEach((q) => {
                query += '\nQuestion:' + q['question']
                query += '\nPerson 1: ' + mentee[String(q['order'])]
                query += '\nPerson 2: ' + mentor[String(q['order'])]
            })
            queries.push([query, docName])
        })
    })

    return queries
}

async function heuristic(mentees: any, mentors: any, pairing: any) {
    // Horrible but low on time and idk javascript
    console.log('pairing', pairing)
    const mentorsSorted: any[] = []
    mentees.forEach((m) => {
        let toAdd: any[] = []
        mentors.forEach((r) => {
            toAdd.push([pairing[m['email'] + ':' + r['email']], r['email']])
        })
        toAdd.sort((a, b) => {
            return b[0] - a[0]
        })
        mentorsSorted.push(toAdd)
    })
    console.log("sorted: ", mentorsSorted)

    let bestPairing: any = { overwrite: true }
    let bestScore = 0
    for (let i: number = 0; i < 1; i++) {
        let currentScore = 0
        let currentPairing: { [key: string]: number } = {}
        for (let m: number = 0; m < mentees.length; m++) {
            console.log("trying mentee", m)
            for (let r: number = 0; r < mentors.length; r++) {
                console.log("   trying mentor", r)
                if (mentors[r]['email'] in currentPairing) {
                    console.log("   ... already taken.")
                    continue // Mentor is already taken
                }
                // Probability function: (x/20)^2
                // Dividing by 20 to normalize a score from [0, 20] to [0, 1]
                // Squaring so that higher scores are significantly better than lower scores, instead of just slightly better
                let prob = Math.pow(mentorsSorted[m][r][0] / 20, 2)
                let rand = Math.random()
                if (rand > prob || r == mentors.length - 1) {
                    console.log("   choosing this one")
                    // Choose this one
                    console.log("   currentScore after", currentScore)
                    currentScore += mentorsSorted[m][r][0]
                    console.log("   currentScore after", currentScore)
                    console.log("   mentor's email:", mentors[r]['email'])
                    console.log("   mentee's email:", mentees[m]['email'])
                    currentPairing[mentors[r]['email']] = mentees[m]['email']
                    break
                }
            }
        }
        if (currentScore > bestScore || bestPairing['overwrite'] == true) {
            bestPairing = currentPairing
            bestScore = currentScore
        }
    }
    console.log('bestPairing', bestPairing)
    return await bestPairing
}

export const actions = {
    default: async (event): Promise<void> => {
        getDbData().then((dbData) => {
            getQueries(dbData['mentees'], dbData['mentors'], dbData['questions']).then((queries) => {
                callAIs(
                    queries,
                    'TODO',
                ).then((pairing) => {
                    console.log('ai response:', pairing)
                    heuristic(dbData['mentees'], dbData['mentors'], pairing).then(async (best) => {
                        console.log('best', best)

                        const menteesCollection = await collection(db, 'mentees')
                        const mentorsCollection = await collection(db, 'mentors')

                        for (let key of Object.entries(best)) {
                            let mentorEmail = key[0]
                            let menteeEmail = key[1]

                            const menteeQuery: Query = query(
                                menteesCollection,
                                where('email', '==', menteeEmail)
                            )
                            let menteeId: any = 0
                            await getDocs(menteeQuery).then((docsFound) => {
                                menteeId = docsFound.docs[0].id
                            })
                            let menteeRef = doc(db, 'mentees', menteeId)

                            const mentorQuery: Query = query(
                                mentorsCollection,
                                where('email', '==', mentorEmail)
                            )
                            let mentorId: any = 0
                            await getDocs(mentorQuery).then((docsFound) => {
                                mentorId = docsFound.docs[0].id
                            })
                            let mentorRef = doc(db, 'mentors', mentorId)

                            updateDoc(menteeRef, {
                                mentor: mentorEmail
                            })

                            updateDoc(mentorRef, {
                                mentees: [menteeEmail]
                            })
                        }
                    })
                })
            })
        })
    }
} satisfies Actions
