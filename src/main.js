/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import $ from 'jquery';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Plugins
import axios from 'axios'

import { registerPlugins } from '@/plugins'

axios.defaults.withCredentials=true
axios.defaults.baseURL='https://docapi.localto.net'
axios.get('/sanctum/csrf-cookie')
window.$ = $;

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)

registerPlugins(app)

app.mount('#app')
