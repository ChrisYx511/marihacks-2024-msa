<script lang="ts">
    import MentorTable from './MentorTable.svelte'
    import type { PageData } from './$types'
    import { onMount } from 'svelte'
    import { Button } from '@/components/ui/button'
    export let data: PageData
</script>

<div class="grid grid-cols-2 gap-4 m-12">
    <div class="p-8 bg-white rounded-l col-span-2">
        <h1 class="font-bold font-serif text-5xl text-center underline text-blue-700">
            Mentor progress
        </h1>
        <div class="p-5 max-w-full bg-blue-100 rounded-lg"></div>
        <!-- </div> -->
    </div>
    <div class="grid grid-cols-6 gap-4"></div>
</div>
{#if data.mentorsData}
    <MentorTable mentorsData={data.mentorsData}></MentorTable>
{/if}
<form method="POST">
    <Button type="submit">Auto-Pair</Button>
</form>
