<script lang="ts">
    import Button from '@/components/ui/button/button.svelte'
    import * as Table from '@/components/ui/table'
    export let menteeArray: string[]
</script>

<div>
    <Table.Root>
        <Table.Caption>List of current associated mentees.</Table.Caption>
        <Table.Header>
            <Table.Row>
                <Table.Head>Mentee Name</Table.Head>
                <Table.Head>Email</Table.Head>
                <Table.Head>Actions</Table.Head>
            </Table.Row>
        </Table.Header>
        {#if menteeArray}
            {#each menteeArray as mentee}
                <Table.Row>
                    <Table.Cell>{mentee}</Table.Cell>
                    <Table.Cell>Placeholder</Table.Cell>
                    <Table.Cell>
                        <Button class="bg-red-700 hover:bg-red-900">Delete</Button>
                    </Table.Cell>
                </Table.Row>
            {/each}
        {/if}

        <!-- Example -->
        <Table.Row>
            <Table.Cell>Example</Table.Cell>
            <Table.Cell>Placeholder</Table.Cell>
            <Table.Cell>
                <Button class="bg-red-700 hover:bg-red-900">Delete</Button>
            </Table.Cell>
        </Table.Row>
    </Table.Root>
</div>
