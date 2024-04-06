<script lang="ts">
    import { goto } from '$app/navigation'
    import { authHandlers, authStore } from '$lib/stores/userStore'
    import type { User } from 'firebase/auth'
    import IconAccountBox from 'virtual:icons/mdi/account-box'
    let currentUser: User | null
    authStore.subscribe((value) => {
        currentUser = value.user
    })
</script>

<nav class={'flex flex-row shadow-md min-h-12 p-4 px-2 gap-4 mb-2 items-center'}>
    <div class="flex-1 flex items-center">
        <h1><a href="/">Marianopolis Mentorship Program</a></h1>
    </div>
    <div class=" flex flex-row items-center">
        {#if currentUser}
            {#if currentUser?.photoURL}
                <img src={currentUser?.photoURL} alt="Profile" />
            {:else}
                <IconAccountBox class="h-10 w-10"></IconAccountBox>
            {/if}
            <div class="mx-2">
                <h2 class="">{currentUser?.displayName || ''}</h2>
                <h2>{currentUser?.email}</h2>
            </div>
        {/if}
    </div>
    <div>
        {#if currentUser !== null}
            <button
                on:click={authHandlers.logout}
                class=" hover:bg-blue-900 bg-blue-700 text-white text-bold border-black border-1 border-solid rounded-md p-2"
                >Sign Out</button
            >
        {:else}
            <button
                on:click={() => {
                    goto('/login')
                }}
                class=" hover:bg-blue-900 bg-blue-700 text-white text-bold border-black border-1 border-solid rounded-md p-2"
                >Sign In</button
            >
        {/if}
    </div>
</nav>
