<template>
    <div class="container">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>Maybe you have typed the URL incorrectly?</p>
        <p>Or maybe the page has been moved or deleted?</p>
        <p>Or maybe you are just lost?</p>
        <p>Whatever the case, you can always go back to the <router-link to="/">home page</router-link>.</p>
    </div>
</template>
<script>
export default {
    name: "NotFound"
}
</script>