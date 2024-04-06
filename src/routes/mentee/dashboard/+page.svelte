<script lang="ts">
    import type { PageData } from './$types'

    export let data: PageData

    let taken: boolean = true
    let mentorEmail: string = ''
</script>

<div class="grid grid-cols-3 gap-4 m-12">
    <div class="p-8 bg-white rounded-l col-span-3">
        <h1 class="font-bold font-serif text-5xl text-center underline text-blue-700">
            Your Dashboard
        </h1>
        <div class="p-5 max-w-full bg-blue-100 rounded-lg"></div>
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
                        class={'ml-16 rounded-full'}
                    />
                </div>
            {/if}
        </div>
        <div>
            <div class="text-blue-700 text-2xl ml-8 underline">Contact Information</div>
            <div class="text-black font-semibold text-xl underline ml-10 max-w-16">
                Email: {mentorEmail}
            </div>
        </div>
    </div>
</div>
