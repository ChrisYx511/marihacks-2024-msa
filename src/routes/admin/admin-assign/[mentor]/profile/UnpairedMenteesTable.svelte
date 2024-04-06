<script lang="ts">
    import Button from '@/components/ui/button/button.svelte'
    import * as Table from '@/components/ui/table'
    export let menteeArray: any[]
    console.log(menteeArray)
</script>

<div>
    <Table.Root>
        <Table.Caption>Available mentees.</Table.Caption>
        <Table.Header>
            <Table.Row>
                <Table.Head>Mentee Name</Table.Head>
                <Table.Head>Email</Table.Head>
                <Table.Head>Actions</Table.Head>
            </Table.Row>
        </Table.Header>
        {#each menteeArray as mentee}
            <Table.Row>
                <Table.Cell>{mentee.name}</Table.Cell>
                <Table.Cell>{mentee.email}</Table.Cell>
                <Table.Cell>
                    <Button class="bg-blue-700 hover:bg-blue-900">Add</Button>
                </Table.Cell>
            </Table.Row>
        {/each}
        <!-- Example -->
        <Table.Row>
            <Table.Cell>Example</Table.Cell>
            <Table.Cell>Placeholder</Table.Cell>
            <Table.Cell>
                <Button class="bg-blue-700 hover:bg-blue-900">Add</Button>
            </Table.Cell>
        </Table.Row>
    </Table.Root>
</div>
