<script>
    import { onMount } from 'svelte'
    import '../app.css'
    import { auth } from '$lib/firebase.client'
    import { authStore } from '$lib/stores/userStore'
    import Navbar from './Navbar.svelte'
    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                authStore.update(() => {
                    return {
                        user: null
                    }
                })
            } else {
                authStore.update(() => {
                    return {
                        user: user
                    }
                })
            }
        })
        return unsubscribe
    })
</script>

<Navbar></Navbar>
<main>
    <slot />
</main>
