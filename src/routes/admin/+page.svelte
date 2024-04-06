<script lang="ts">
    let time = new Date()

    $: hours = time.getHours()
    $: greet = hours > 18 || hours < 4 ? 'evening' : 'morning'

    let username: string = 'Bob'
</script>

<h1 lang="ts" class={'ml-20 font-serif font-bold text-6xl text-cyan-400'}>
    Good {greet}, {username}
</h1>

<div class="grid grid-cols-2 gap-4 m-12">
    <div class="p-8 bg-white rounded-l col-span-2">
        <h1 class="font-bold font-serif text-5xl text-center underline text-blue-700">
            Mentor progress
        </h1>
        <div class="p-5 max-w-full bg-blue-100 rounded-lg"></div>
    </div>
</div>
<div class="grid grid-cols-6 gap-4"></div>
<div class="test-black p-5 w-auto max-w-2xl font-serif font-bold text-3xl ml-20">{username}</div>
<div
    class="bg-gradient-to-r from-cyan-500 to-blue-700 p-5 w-auto max-w-2xl ml-20 rounded-lg text-white font-serif text-xl"
>
    an hour completed
</div>
