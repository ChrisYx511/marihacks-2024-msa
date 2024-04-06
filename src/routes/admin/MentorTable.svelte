<script lang="ts">
    import { goto } from '$app/navigation'
    import { Button } from '@/components/ui/button'
    import * as Table from '@/components/ui/table'
    let listOfMentors: {
        email: string
        mentees: string[]
        name: string
    }[] = [
        {
            email: 'chrisyx511@gmail.com',
            mentees: ['AA BB', 'CC DD', 'EE FF'],
            name: 'Chris Yang'
        },
        {
            email: 'justin.bax@icloud.com',
            mentees: [],
            name: 'Justin Bax'
        },
        {
            email: 'ahn517liu@gmail.com',
            mentees: ['AA BB'],
            name: 'Annie Liu'
        }
    ]
</script>

<div>
    <Table.Root>
        <Table.Caption>List of current mentors and their associated mentees.</Table.Caption>
        <Table.Header>
            <Table.Row>
                <Table.Head>Mentor Name</Table.Head>
                <Table.Head>Email</Table.Head>
                <Table.Head>Mentee(s)</Table.Head>
                <Table.Head>Action</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each listOfMentors as mentor}
                <Table.Row>
                    <Table.Cell>{mentor.name}</Table.Cell>
                    <Table.Cell>{mentor.email}</Table.Cell>
                    <Table.Cell>
                        {#if mentor.mentees.length > 1}
                            {mentor.mentees[0]}, ...
                        {:else if mentor.mentees.length === 1}
                            {mentor.mentees[0]}
                        {:else}
                            No Mentees
                        {/if}
                    </Table.Cell>
                    <Table.Cell>
                        <Button
                            on:click={() =>
                                goto(`/admin/admin-assign/${encodeURI(mentor.email)}/profile`)}
                            >View and Edit</Button
                        >
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>
