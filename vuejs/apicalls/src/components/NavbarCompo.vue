<template>
    <nav>
        <div class="nav-wrapper">
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href="/">Home</a></li>
                <li><a href="/get-tasks">Get Tasks</a></li>
                <li><a href="/create-task">Add Task</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li v-if="token"><a v-on:click="logout" class="logout">Logout</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavbarCompo",
    data() {
        return {
            token: localStorage.getItem("token") || null,
        };
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$toast.success("You have been logged out");
            this.$router.push("/login");
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    background-color: #3f51b5;
}

nav a {
    color: #fff;
}

nav a:hover {
    color: rgb(197, 22, 22);
}

ul {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    list-style: none;
    padding: 0;
}

li {
    padding: 0 10px;
}

li a {
    text-decoration: none;
    color: #fff;
    font-size: 1.2rem;
}

li a:hover {
    color: rgb(197, 22, 22);
}

.logout {
    cursor: pointer;
}

/* make nav bar reaponsive */
@media (max-width: 600px) {
    nav {
        flex-direction: column;
        height: 100%;
    }

    .nav-wrapper {
        padding: 0 10px;
        margin: 0 10;
    }

    ul {
        flex-direction: column;
        align-items: center;
    }

    li {
        padding: 10px 0;
    }
}
</style>