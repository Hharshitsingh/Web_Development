<template>
    <h1>Login</h1>
    <div class="login">
        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <span v-if="error" class="error">{{ error }}</span>
        <button v-on:click="login">Login</button>
    </div>

</template>

<script>
import axios from 'axios'


export default {
    name: "LoginComponent",
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async login() {
            if (this.email === '' || this.password === '') {
                this.error = 'All fields are required'
                this.$toast.error(this.error);
                return
            }
            else {
                this.error = ''
            }
            await axios.post('http://localhost:8000/api/login', {
                email: this.email,
                password: this.password,
            })
                .then(response => {
                    if (response.data.status != 'success') {
                        this.error = response.data.data.message || 'Something went wrong'
                        this.$toast.error(this.error);
                        return
                    }
                    this.$toast.success('Welcome ' + response.data.data.user.name);
                    localStorage.setItem('token', response.data.data.token)
                    localStorage.setItem('user', JSON.stringify(response.data.data.user))
                    this.$router.push('/get-tasks')
                })
                .catch(error => {
                    this.error = error.response.data.data.message || 'Something went wrong'
                    this.$toast.error(this.error);
                })
        }
    }
}
</script>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 0 auto;
}

.login label {
    margin-top: 10px;
}

.login input {
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.login button {
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    background-color: green;
    color: white;
    cursor: pointer;
}

.login button:hover {
    background-color: #00b300;
}

.login button:active {
    background-color: #008000;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>