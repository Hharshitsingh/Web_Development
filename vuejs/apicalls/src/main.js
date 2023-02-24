import { createApp } from 'vue'
import App from './App.vue'
import router from './route.js'
import Toaster from "@meforma/vue-toaster";



createApp(App).use(router).use(Toaster, {
    position: "top-right",
    duration: 3000
    
}).mount('#app')
