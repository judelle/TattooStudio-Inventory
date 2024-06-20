import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css'
import router from './router/router'; // Путь к вашему файлу с маршрутизатором

createApp(App).use(router).mount('#app')