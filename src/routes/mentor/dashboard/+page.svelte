<script lang="ts">
    import type { PageData } from './$types'
    let taken: boolean = true
    export let data: PageData
    let time = new Date()

    $: hours = time.getHours()
    $: greet = hours > 18 || hours < 4 ? 'evening' : 'morning'

    let username: string = 'Bob'
</script>

<h1 lang="ts" class={'ml-20 font-serif font-bold text-6xl text-cyan-400'}>
    Good {greet}, {username}
</h1>

<div class="grid grid-cols-3 gap-4 m-12">
    <div class="p-8 bg-white rounded-l col-span-3">
        <h1
            class="font-bold font-serif text-5xl text-center underline decoration-cyan-400 text-blue-700"
        >
            Your Dashboard
        </h1>
        <div class="p-5 max-w-full bg-sky-200 rounded-lg"></div>
    </div>
    <div class="flex flex-row items-center">
        <div>
            {#if taken == false}
                <div>Pending</div>
            {:else}
                <div class="grid grid-cols-2 w-28 ml-28 mt-12"></div>
                <div class={'ml-24 mb-5 font-bold'}>Your Mentor</div>
                <div>
                    <img
                        src="/profilepicplaceholder.jpg"
                        alt="profile pic"
                        class={'ml-16 rounded-full border-double border-4 border-blue-700'}
                    />
                </div>
            {/if}
        </div>
        <div>
            <div class="text-blue-700 font-bold text-nowrap text-2xl ml-10 underline">
                Contact Information
            </div>
            <div class="text-black font-semibold text-xl underline ml-10 max-w-16">Email:</div>
            <div class="text-black font-semibold text-xl underline ml-10 max-w-16">Omnivox:</div>
        </div>
        <div>
            <div class="text-blue-700 font-bold text-nowrap text-2xl ml-96 underline">
                Weekly Quota
            </div>
            <div class="text-black text-nowrap font-semibold ml-96 text-xl underline">
                Hours needed:
            </div>
            <div class="text-black text-nowrap font-semibold ml-96 text-xl underline">
                Hours completed:
            </div>
        </div>
    </div>
</div>
