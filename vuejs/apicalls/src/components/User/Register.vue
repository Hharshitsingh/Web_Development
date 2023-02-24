<template>
    <h2>Register</h2>
    <div class="register">
        <input type="text" name="name" v-model="name" placeholder="Name">
        <input type="text" name="email" v-model="email" placeholder="Email">
        <input type="password" name="password" v-model="password" placeholder="Password">
        <input type="password" name="password_confirmation" v-model="password_confirmation"
            placeholder="Password Confirmation">
        <span v-if="errors" class="error">{{ errors }}</span>
        <button v-on:click="register">Register</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "RegisterCompoenet",
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: ''
        }
    },
    methods: {
        async register() {
            if (this.name === '' || this.email === '' || this.password === '' || this.password_confirmation === '') {
                this.errors = 'All fields are required'
                this.$toast.error(this.errors);
                return
            }
            else if (this.password !== this.password_confirmation) {
                this.errors = 'Passwords do not match'
                this.$toast.error(this.errors);
                return
            }
            else {
                this.errors = ''
            }
            await axios.post('http://localhost:8000/api/register', {
                name: this.name,
                email: this.email,
                password: this.password,
            })
                .then(response => {
                    if (response.data.status != 'success') {
                        this.errors = response.data.message || 'Something went wrong'
                        this.$toast.error(this.errors);
                        return
                    }
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('user', JSON.stringify(response.data.data.user))
                    this.$toast.success('Registration successful');
                    this.$router.push('/get-tasks')
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
.register {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 0 auto;
}

.register label {
    margin-top: 10px;
}

.register input {
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.register button {
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    background-color: green;
    color: white;
    cursor: pointer;
}

.register button:hover {
    background-color: #00b300;
}

.register button:active {
    background-color: #008000;
}

.register button:focus {
    outline: none;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>