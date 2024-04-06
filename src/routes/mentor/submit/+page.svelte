<script lang="ts">
    import type { User } from 'firebase/auth'
    import type { PageData } from './$types'
    import { authStore } from '@/stores/userStore'
    import { addDoc, collection } from 'firebase/firestore'
    import { db } from '@/firebase.client'

    export let data: PageData

    let currentUser: User | null

    authStore.subscribe((value) => {
        currentUser = value.user
    })

    let emailDisabled = true
</script>

{#if currentUser}
    <form method="POST">
        <div class={'flex'}>
            <div class="m-auto grid grid-cols-1 gap-3 mt-7 bg-blue-200 p-7 rounded-lg mb-4">
                <div class={'p-5 bg-sky-100 rounded-t-xl max-w-100 mb-2 mt-2'}>
                    Please fill out the following form to complete your profile.
                </div>
                <label>
                    Name
                    <input
                        class={'border-solid border-2 rounded-md w-96'}
                        type="text"
                        name="name"
                    />
                </label>
                <label>
                    E-Mail
                    <input
                        class={'border-solid border-2 rounded-md w-96'}
                        type="text"
                        name="email"
                        disabled={emailDisabled}
                        value={currentUser.email}
                    />
                </label>
                {#each data.questions as question}
                    <label>
                        <div class={'p-5 bg-sky-100'}>
                            <div>
                                {question.get('question')}
                            </div>
                            <input
                                name={question.get('order')}
                                type="text"
                                class={'border-solid border-2 rounded-md w-96'}
                            />
                        </div>
                    </label>
                {/each}
                <button
                    class={'bg-blue-400 w-40 m-auto text-white rounded-md mt-5'}
                    on:mousedown={() => (emailDisabled = false)}>Submit</button
                >
            </div>
        </div>
    </form>
{/if}
