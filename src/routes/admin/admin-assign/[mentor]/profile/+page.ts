import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
    return {
        mentorEmail: decodeURI(params.mentor),
        mentor: {
            name: 'Chris Yang',
            email: decodeURI(params.mentor),
            mentees: ['AA', 'BB', 'CC']
        }
    }
}
