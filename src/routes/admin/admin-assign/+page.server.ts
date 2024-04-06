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

    return {
        mentees: mentees.docs.map((doc) => doc.data()),
        mentors: mentors.docs.map((doc) => doc.data()),
        questions: questions.docs.map((doc) => doc.data())
    }
}

async function evalAI(mentees: any, mentors: any, questions: any) {
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
    for (let i: number = 0; i < 1; i++) {
        let currentScore = 0
        let currentPairing: { [key: string]: number } = {}
        for (let r: number = 0; r < mentorsArr.length; r++) {
            for (let m: number = 0; m < menteesArr.length; m++) {
                if (r in currentPairing) {
                    console.log('continue', r, currentPairing)
                    continue // Mentor is already taken
                }
                let prob = Math.exp(mentorsSorted[m][r][0] / 20 - 1)
                //console.log(m + ' ' + r + ' ==> ' + mentorsSorted[m][r][0])
                let rand = Math.random()
                console.log('rand', rand, 'prob', prob)
                if (rand > prob || r == mentorsArr.length - 1) {
                    // Choose this one
                    currentScore += mentorsSorted[m][r][0]
                    //console.log('mentorsSorted ', mentorsSorted[m][r])
                    currentPairing[r] = m
                    break
                }
            }
        }
        if (currentScore > bestScore || bestPairing['overwrite'] == true) {
            bestPairing = currentPairing
            bestScore = currentScore
            //console.log('bestScore ', bestScore)
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
                }) /*
                let json = {
                    'chrisyx511@gmail.com:chrisyx511@gmail.com': 2,
                    '123@example.com:chrisyx511@gmail.com': 19,
                    '456@example.com:chrisyx511@gmail.com': 6,
                    'chrisyx511@gmail.com:justin.bax@icloud.com': 15,
                    '123@example.com:justin.bax@icloud.com': 12,
                    '456@example.com:justin.bax@icloud.com': 13
                }
                */
                //heuristic(result['mentees'], result['mentors'], json)
            })
        })
    }
} satisfies Actions
