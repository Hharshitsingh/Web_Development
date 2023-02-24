<template>
    <h1>About</h1>
    <p>Hi, {{name}}</p>
</template>

<script>

import {useRoute} from 'vue-router';

export default {
    name: 'AboutComponent',
    data() {
        return {
            name: '',
        }
    },
    mounted() {
        const route = useRoute();
        this.name = route.params.name;
    }
}
</script>