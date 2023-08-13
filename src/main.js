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
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Plugins
import axios from 'axios'

import { registerPlugins } from '@/plugins'

axios.defaults.withCredentials=true
axios.defaults.baseURL='http://localhost:8000'
axios.get('/sanctum/csrf-cookie')

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)

registerPlugins(app)

app.mount('#app')
