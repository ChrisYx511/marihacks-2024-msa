<script lang="ts">
    import { authHandlers } from '$lib/stores/userStore'
    import { authStore } from '$lib/stores/userStore'
    import type { User } from 'firebase/auth'
    let email: string = ''
    let password: string = ''
</script>

<form>
    <label>
        Email <br />
        <input
            class={'border-2 border-solid border-black'}
            name="email"
            type="email"
            bind:value={email}
        />
    </label>
    <label>
        Password <br />
        <input
            class={'border-2 border-solid border-black'}
            name="password"
            type="password"
            bind:value={password}
        />
    </label>
    <button on:click={() => authHandlers.createUserWithEmail(email, password)}
        >Create Account</button
    >
</form>
