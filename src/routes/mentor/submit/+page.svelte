<script lang="ts">
    import type { PageData } from './$types'

    export let data: PageData
</script>

<form method="POST">
    <form method="POST">
        <div class={'flex'}>
            <div class="m-auto grid grid-cols-1 gap-3 mt-7 bg-blue-200 p-7 rounded-lg mb-4">
                <div class={'p-5 bg-sky-100 rounded-t-xl max-w-100 mb-2 mt-2'}>
                    Please fill out the following form to complete your profile.
                </div>
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
                <button class={'bg-blue-400 w-40 m-auto text-white rounded-s-md mt-5'}
                    >Submit</button
                >
            </div>
        </div>
    </form>
</form>
