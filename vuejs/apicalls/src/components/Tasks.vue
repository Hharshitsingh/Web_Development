<template>
    <h2>GET API Call</h2>
    <div v-if='isData'>
        <table class="table">
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Is Complete</th>
                <th>Delete</th>
            </tr>
            <tr v-for="task in apiData.data" :key="task.id">
                <DisplayTask :task="task" :markComplet="markComplet" :deleteTask="deleteTask"></DisplayTask>
            </tr>
        </table>
    </div>
    <div v-else class="error">
        <h1>No Data Found</h1>
    </div>
</template>

<script>
import axios from 'axios'
import DisplayTask from './DisplayTask.vue'
import qs from 'qs';
import {API} from '../service/api'

export default {
    name: "GetTasks",
    components: {
        DisplayTask
    },
    data() {
        return {
            apiData: {},
            isData: false,
            errors: ''
        }
    },

    methods: {

        async getData() {
            console.log(`Bearer ${localStorage.getItem('token')}`)
            // var config = {

            //     method: 'get',
            //     maxBodyLength: Infinity,
            //     url: 'http://localhost:8000/api/tasks',
            //     headers: {
            //         'Accept': 'application/vnd.api+json',
            //         'Content-Type': 'application/vnd.api+json',
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`
            //     }
            // };
            // await axios(config).then((response) => {
            //     if (response.data.status == 'success') {
            //         this.isData = true
            //         this.apiData = response.data
            //     }
            //     else {
            //         this.isData = false
            //     }
            // }).catch((error) => {
            //     console.log(error.response)
            // })

            await API.getTaks()
                .then((response) => {
                    if (response.data.status == 'success') {
                        this.isData = true
                        this.apiData = response.data
                    }
                    else {
                        this.isData = false
                    }
                }).catch((error) => {
                    console.log(error.response)
                })
        },

        async markComplet(task) {
            var data = qs.stringify({
                'completed': task.completed == 1 ? 0 : 1
            });
            await axios({
                method: 'patch',
                maxBodyLength: Infinity,
                url: 'http://localhost:8000/api/tasks/' + task.id,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                data: data
            })
                .then((response) => {
                    if (response.data.status == 'success') {
                        var msg = response.data.data.completed == 1 ? 'Task Marked as Completed' : 'Task Marked as Incomplete'
                        this.$toast.success(msg)
                        this.getData();
                    } else {
                        this.error = response.data.message || 'Something Went Wrong'
                        this.$toast.error(this.error)
                    }
                }).catch((error) => {
                    this.error = error.response.data.message || 'Something Went Wrong'
                    this.$toast.error(this.error)
                })
        },

        async deleteTask(task) {
            if (confirm('Are you sure you want to delete this task?') != true) {
                return
            }

            var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: 'http://localhost:8000/api/tasks/'  + task.id, 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };

            axios(config).then((response) => {
                if (response.data.status == 'success') {
                    this.$toast.success('Task Deleted Successfully')
                    this.getData();
                } else {
                    this.error = response.data.message || 'Something Went Wrong'
                    this.$toast.error(this.error)
                }
            }).catch((error) => {
                this.error = error.response.data.message || 'Something Went Wrong'
                this.$toast.error(this.error)
            })
        }

    },


    async mounted() {
        this.getData();
    },

}
</script>

<style>
.error {
    color: red;
}

.table {
    border: 1px solid black;
    width: 100%;
}
</style>