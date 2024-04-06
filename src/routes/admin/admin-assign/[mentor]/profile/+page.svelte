<script lang="ts">
    import type { PageData } from './$types'
    import UnpairedMenteesTable from './UnpairedMenteesTable.svelte'
    import CurrentMenteesTable from './CurrentMenteesTable.svelte'

    export let data: PageData
</script>

<div class=" grid grid-cols-1 gap-4 p-4">
    <h1 class=" text-4xl">{data.mentor.data().email}</h1>
    <CurrentMenteesTable menteeArray={data.mentor.data().mentees}></CurrentMenteesTable>
    {#if data.unpairedMentees}
        <UnpairedMenteesTable menteeArray={data.unpairedMentees}></UnpairedMenteesTable>
    {/if}
</div>
