<script lang="ts">
    import * as Table from '$lib/components/ui/table'
    import MentorTable from './MentorTable.svelte'
</script>

<div class="grid grid-cols-2 gap-4 m-12">
    <div class="p-8 bg-white rounded-l col-span-2">
        <h1 class="font-bold font-serif text-5xl text-blue-700">Mentor progress</h1>
        <div class="p-5 max-w-full bg-blue-100 rounded-lg"></div>
    </div>
    <div
        class="bg-gradient-to-r from-cyan-500 to-blue-700 p-5 px-1 max-w-2xl ml-20 rounded-lg text-white font-serif text-xl"
    >
        2 hours completed
    </div>
</div>
<div class="grid grid-cols-6 gap-4"></div>
<MentorTable></MentorTable>
