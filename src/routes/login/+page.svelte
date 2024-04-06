<script lang="ts">
    import { auth } from '$lib/firebase.client'
    import { authHandlers } from '$lib/stores/userStore'
    import { authStore } from '$lib/stores/userStore'
    import type { User } from 'firebase/auth'
    import { onMount } from 'svelte'
    let email: string = ''
    let password: string = ''
    let currentUser: User | null

    authStore.subscribe((value) => {
        currentUser = value.user
    })
</script>

<div class={'m-2'}>
    <form>
        <label>
            Email <br />
            <input
                class={'border-2 border-solid border-black'}
                name="email"
                type="email"
                bind:value={email}
            />
        </label> <br />
        <label>
            Password <br />
            <input
                class={'border-2 border-solid border-black'}
                name="password"
                type="password"
                bind:value={password}
            />
        </label>
        <button
            class=" border-black border-solid border-2 p-4 rounded-lg"
            on:click={() => authHandlers.loginWithEmail(email, password)}>Log in</button
        >
    </form>
</div>

<style>
    .test {
        @apply bg-black;
    }
</style>
