<script lang="ts">
    import { authHandlers } from '$lib/stores/userStore'
    import { authStore } from '$lib/stores/userStore'
    import type { User } from 'firebase/auth'
    let email: string = ''
    let password: string = ''
</script>

<form class={'m-2'}>
    <label>
        Email <br />
        <input
            class={'border-2 border-solid border-black rounded-lg'}
            name="email"
            type="email"
            bind:value={email}
        />
    </label><br />
    <label>
        Password <br />
        <input
            class={'border-2 border-solid border-black rounded-lg'}
            name="password"
            type="password"
            bind:value={password}
        />
    </label> <br />
    <button
        class="border-black border-solid border-2 p-4 rounded-lg"
        on:click={() => authHandlers.createUserWithEmail(email, password)}>Create Account</button
    >
</form>
