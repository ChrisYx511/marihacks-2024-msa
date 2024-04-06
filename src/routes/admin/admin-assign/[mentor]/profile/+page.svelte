<script lang="ts">
    import type { PageData } from './$types'
    import CurrentMenteesTable from './CurrentMenteesTable.svelte'
    export let data: PageData
</script>

<div>
    <h1 class=" text-4xl">{data.mentor.data().email}</h1>
    {#if data.mentor.data().mentees}
        <CurrentMenteesTable menteeArray={data.mentor.data().mentees}></CurrentMenteesTable>
    {/if}
</div>
