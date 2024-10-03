import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router';
import { loadFonts } from './plugins/webfontloader'
import './styles/global.scss'

loadFonts().then(r => console.log(r))

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');

