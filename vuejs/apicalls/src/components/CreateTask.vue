<template>
    <h1>CreateTask</h1>


    <div class="create-task">
        <input type="text" name="title" id="title" v-model="title" placeholder="title" />
        <input type="text" name="description" id="description" v-model="description" placeholder="description" />
        <label for="priority">Priority</label>
        <select v-model="priority" name="priority">
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
        </select>
        <label for="completed">Completed</label>
        <select v-model="completed" name="completed">
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select>
        <span v-if="errors" class="error">{{ errors }}</span>
        <button type="submit" v-on:click="createTask">Submit</button>
    </div>

</template>

<script>

import axios from 'axios'


export default {


    name: 'CreateTask',

    data() {
        return {
            title: '',
            description: '',
            priority: 1,
            completed: 0,
            errors: '',
        }
    },

    methods: {
        createTask() {

            var data = new FormData();
            data.append('title', this.title);
            data.append('description', this.description);
            data.append('priority', this.priority);
            data.append('completed', this.completed);

            //validate filled in fields
            if (this.title == '' || this.description == '') {
                this.errors = 'All fields are required'
                this.$toast.error(this.errors);
                return
            }


            var config = {
                method: 'post',
                // maxBodyLength: Infinity,
                url: 'http://localhost:8000/api/tasks',
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                data: data

            };

            axios(config)
                .then(() => {
                    this.$toast.success('Task created successfully');
                    this.$router.push({ name: 'Tasks' })
                })
                .catch(error => {
                    this.errors = error.response.data.message || 'Something went wrong'
                    this.$toast.error(this.errors);

                })
        }
    }

}

</script>

<style scoped>
.create-task {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 0 auto;
}

.create-task input {
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.create-task label {
    margin-top: 5px;
    text-align: left;
}

.create-task select {
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.create-task button {
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    background-color: green;
    color: white;
    cursor: pointer;
}

.create-task button:hover {
    background-color: #00b300;
}

.create-task button:active {
    background-color: #008000;
}

.error {
    color: red;
}
</style>