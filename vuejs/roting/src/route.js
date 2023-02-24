import { createWebHistory, createRouter } from "vue-router";
import HomeComponent from "./components/HomeComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
import AboutComponent from "./components/AboutComponent.vue";
import NotFound from "./components/404page.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeComponent,
    },
    {
        path: "/login",
        name: "Login",
        component: LoginComponent,
    },
    {
        path: "/about/:name",
        name: "About",
        component: AboutComponent,
    },
    {
        path: "/:catchAll(.*)",
        name: "404",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
