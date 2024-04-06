<script lang="ts">
    import type { PageData } from './$types'
    import CurrentMenteesTable from './CurrentMenteesTable.svelte'
    export let data: PageData
</script>

<div>
    <h1 class=" text-4xl">{data.mentor.email}</h1>
    <CurrentMenteesTable menteeArray={data.mentor.mentees}></CurrentMenteesTable>
</div>
