<script lang="ts">
    import { onMount } from 'svelte'
    import '../app.css'
    import { auth } from '$lib/firebase.client'
    import { authStore } from '$lib/stores/userStore'
    import Navbar from './Navbar.svelte'
    import { redirect } from '@sveltejs/kit'
    import { goto } from '$app/navigation'
    import { browser } from '$app/environment'
    import type { User } from 'firebase/auth'
    import { page } from '$app/stores'
    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                authStore.update(() => {
                    return {
                        user: null,
                        role: 'none'
                    }
                })
            } else {
                authStore.update(() => {
                    return {
                        user: user,
                        role: 'none'
                    }
                })
            }
        })
        return unsubscribe
    })
    let currentUser: User | null

    authStore.subscribe((value) => {
        currentUser = value.user
    })
    /* TODO: Fix This
    $: if (browser && !currentUser && $page.url.pathname !== '/login') {
        goto('/login')
        console.log(
            'we are running in the browser, not signed in, and not on the sign in page, we are going to the sign in page'
        )
    }
*/
</script>

<Navbar></Navbar>
<main>
    <slot />
</main>
