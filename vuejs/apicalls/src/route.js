import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import GetTasks from './components/Tasks.vue';
import CreateTask from './components/CreateTask.vue';
import RegisterCompoenet from './components/User/Register.vue';
import LoginComponent from './components/User/Login.vue';
import NotFound from './components/NotFound.vue';
const routes = [
    {
        path: "/",
        name: "HelloWorld",
        component: HelloWorld,
    },
    {
        path: "/get-tasks",
        name: "Tasks",
        component: GetTasks,
    },
    {
        path: "/create-task",
        name: "CreateTask",
        component: CreateTask,
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterCompoenet,
    },
    {
        path: "/login",
        name: "Login",
        component: LoginComponent,
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;