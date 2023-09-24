import { createApp } from 'vue';
import './style.css';

import App from './App.vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import TheSidebar from './components/TheSidebar.vue';

const app = createApp(App);

app.component('TheHeader', TheHeader);
app.component('TheFooter', TheFooter);
app.component('TheSidebar', TheSidebar);

app.mount('#app');
