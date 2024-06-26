import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css'
import router from './router/router';

createApp(App).use(router).mount('#app')