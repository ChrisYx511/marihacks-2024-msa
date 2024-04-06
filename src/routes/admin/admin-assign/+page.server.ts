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
    DocumentReference
} from 'firebase/firestore'
import openai from '$lib/openai.server'

async function callAI(prompt: string) {
    return await openai.chat.completions.create({
        messages: [{ role: 'system', content: prompt }],
        model: 'gpt-3.5-turbo',
        response_format: { type: 'json_object' }
    })
}

async function callAIs(prompts: any, pairing: any, docName: string, mentees: any, mentors: any) {
    for (let p of prompts) {
        const result = await callAI(p[0])
        const score = JSON.parse(result.choices[0].message.content || '')
        pairing[p[1]] = score['c']
        //await setDoc(docRef, score)
    }
    return { pairing: pairing, mentees: mentees, mentors: mentors }
}

async function getdbs() {
    const mentees: QuerySnapshot = await getDocs(collection(db, 'mentees'))
    const mentors: QuerySnapshot = await getDocs(collection(db, 'mentors'))
    const questions: QuerySnapshot = await getDocs(collection(db, 'questions'))
    return { mentees: mentees, mentors: mentors, questions: questions }
}

async function evalAI(mentees: any, mentors: any, questions: any) {
    let pairing: { [key: string]: number } = {}
    let queries: any[] = []

    mentees.forEach((mentee) => {
        mentors.forEach((mentor) => {
            const docName: string = mentee.get('email') + ':' + mentor.get('email')
            const docRef: DocumentReference = doc(db, 'scores', docName)
            let query: string =
                "\nEvaluate the following people's compatibility based on their answers to these questions. Give your answer on a scale of 1 to 20 in JSON in a field called 'c' (for example: {'c':7} )"
            questions.forEach((q) => {
                query += '\nQuestion:' + q.get('question')
                query += '\nPerson 1: ' + mentee.get(String(q.get('order')))
                query += '\nPerson 2: ' + mentor.get(String(q.get('order')))
            })
            queries.push([query, docName])
        })
    })

    return { queries: queries, mentees: mentees, mentors: mentors, pairing: pairing }
}

function heuristic(mentees: any, mentors: any, pairing: any) {
    // Horrible but low on time and idk javascript
    const menteesArr: any[] = []
    mentees.forEach((m) => {
        menteesArr.push(m)
    })
    const mentorsArr: any[] = []
    mentors.forEach((m) => {
        mentorsArr.push(m)
    })

    const mentorsSorted: any[] = []
    menteesArr.forEach((m) => {
        let toAdd: any[] = []
        mentorsArr.forEach((r) => {
            toAdd.push([pairing[m['email'] + ':' + r['email']], r['email']])
        })
        toAdd.sort((a, b) => {
            return a[0] - b[0]
        })
        mentorsSorted.push(toAdd)
    })

    let bestPairing: any = { overwrite: true }
    let bestScore = 0
    for (let i: number = 0; i < 100; i++) {
        let currentScore = 0
        let currentPairing: { [key: string]: number } = {}
        for (let m: number = 0; m < menteesArr.length; m++) {
            for (let r: number = 0; r < mentorsArr.length; r++) {
                if (r in currentPairing) {
                    continue // Mentor is already taken
                }
                let prob = Math.exp(mentorsSorted[m][r][0] / 20)
                //console.log(m + ' ' + r + ' ==> ' + mentorsSorted[m][r][0])
                if (Math.random() > prob || r == mentorsArr.length - 1) {
                    // Choose this one
                    currentScore += mentorsSorted[m][r][0]
                    console.log('mentorsSorted ', mentorsSorted[m][r][0])
                    currentPairing[r] = m
                    break
                }
            }
        }
        if (currentScore > bestScore || bestPairing['overwrite'] == true) {
            bestPairing = currentPairing
            bestScore = currentScore
            console.log('bestScore ', bestScore)
        }
    }
    console.log(bestPairing)
}

export const actions = {
    default: async (event): Promise<void> => {
        getdbs().then((result) => {
            evalAI(result['mentees'], result['mentors'], result['questions']).then((result) => {
                callAIs(
                    result['queries'],
                    result['pairing'],
                    'TODO',
                    result['mentees'],
                    result['mentors']
                ).then((result) => {
                    heuristic(result['mentees'], result['mentors'], result['pairing'])
                })
            })
        })
    }
} satisfies Actions
