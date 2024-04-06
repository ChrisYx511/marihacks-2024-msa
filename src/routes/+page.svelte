<script lang="ts">
    let status: string = 'employed'
</script>

{#if status === 'unemployed'}
    <div class={'size-20 '}>you are unemployed</div>
{:else}
    <div class={'size-20 '}>you are employed</div>
{/if}
