<script lang="ts">
    import type { PageData } from './$types'

    export let data: PageData
</script>

<img src="/school_img.png" alt="school-bg" class={'blur-sm'} />
<form method="POST">
    <div class={'flex'}>
        <div class="m-auto">
            {#each data.questions as question}
                <label>
                    <div>
                        <div>
                            {question.get('question')}
                        </div>
                        <input
                            name={question.get('order')}
                            type="text"
                            class={'border-solid border-2 rounded-md'}
                        />
                    </div>
                </label>
            {/each}
            <button>Submit</button>
        </div>
    </div>
</form>
