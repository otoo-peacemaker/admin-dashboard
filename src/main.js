import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router';
import { loadFonts } from './plugins/webfontloader'
import './styles/global.scss'
// import startTokenMonitor from '@/utils/TokenMonitor'; // Import your token monitor function

loadFonts().then(r => console.log(r))

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');

// startTokenMonitor();