<template>
    <td class="ID">{{ task.id }}</td>
    <td class="title">{{ task.title }}</td>
    <td class="description">{{ task.description }}</td>
    <td><button v-on:click="markComplet(task)" class="update-button">{{
        task.completed === 1 ? 'Complete' : 'Not Com'
    }}</button> </td>
    <td><button v-on:click="deleteTask(task)" class="delete-button">Delete</button></td>
</template>

<script>
export default {
    name: 'DisplayTask',
    props: {
        task: {
            type: Object,
            default: () => ({})
        },
        markComplet: {
            type: Function,
            default: () => { }
        },
        deleteTask: {
            type: Function,
            default: () => { }
        }
    },


}

</script>

<style scoped>
.title {
    font-weight: bold;
}

.description {
    font-style: italic;

}

.update-button {
    background-color: green;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.delete-button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>