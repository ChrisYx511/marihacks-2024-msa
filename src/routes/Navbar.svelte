<script lang="ts">
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
        <h1>Marianopolis Mentorship Program</h1>
    </div>
    <div class="flex-1"></div>
    <div class=" flex flex-row items-center">
        {#if currentUser?.photoURL}
            <img src={currentUser?.photoURL} alt="Profile" />
        {:else}
            <IconAccountBox class="h-10 w-10"></IconAccountBox>
        {/if}
        <div class="mx-2">
            <h2 class="">{currentUser?.displayName || ''}</h2>
            <h2>{currentUser?.email}</h2>
        </div>
    </div>
    <div>
        <button
            on:click={authHandlers.logout}
            class=" bg-blue-700 text-white text-bold border-black border-1 border-solid rounded-md p-2"
            >Sign Out</button
        >
    </div>
</nav>
