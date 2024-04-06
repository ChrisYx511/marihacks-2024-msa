<script lang="ts">
    import { goto } from '$app/navigation'
    let status: string = 'employed'
</script>

<div class={'fixed flex'}>
    <img src="/students01.jpg" alt="students-bg" class={'-z-30 w-screen h-screen'} />
    <div
        class={'z-30 m-auto absolute w-40 bg-black text-center text-white pl-2 pr-2 pt-1 pb-1 text-2xl'}
    >
        Meet a mentor
    </div>
</div>
<div>
    <div class={'w-full h-44 bg-white mt-96 absolute flex'}>
        <div class={'grid grid-cols-2 gap-32 mt-10 m-auto'}>
            <button
                class=" bg-green-600 rounded-md p-5 hover:bg-green-600 hover:border-white hover:text-amber-300"
                on:click={() => goto('/mentee/submit')}>Sign up as a mentee</button
            >

            <button
                class={'border-solid border-2 border-green-600 rounded-md p-5 hover:bg-green-600 hover:border-white hover:text-amber-300'}
                on:click={() => goto('/mentor/submit')}
            >
                Sign up as a mentor
            </button>
        </div>
    </div>
</div>
