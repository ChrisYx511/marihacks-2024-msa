<script lang="ts">
    import { authHandlers } from '$lib/stores/userStore'
    import { authStore } from '$lib/stores/userStore'
    import type { User } from 'firebase/auth'
    let email: string = ''
    let password: string = ''
    let currentUser: User | null

    authStore.subscribe((value) => {
        currentUser = value.user
    })
</script>

<div class={'m-2'}>
    <form class="grid gap-2">
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
        </label><br />
        <button
            class=" border-black border-solid border-2 p-2 rounded-lg"
            on:click={() => authHandlers.loginWithEmail(email, password)}>Log in</button
        >
        <button
            class={'border-black border-solid border-2 p-2 rounded-lg'}
            on:click={() => {
                console.log(currentUser)
            }}
        >
            Test User Info</button
        >
    </form>
</div>

<style>
    .test {
        @apply bg-black;
    }
</style>
