<template>
    <v-app>
        <v-app-bar color="grey" flat>
            <v-app-bar-title>
                <v-icon icon="mdi-library" />
                Biblioteca Digital
            </v-app-bar-title>
            <template v-slot:prepend>
            <v-app-bar-nav-icon  @click.stop="drawer = !drawer"/>
            </template>
            <template v-slot:append>
                <v-btn @click="Logout"> 
                    <v-icon icon="mdi-exit-to-app"></v-icon>
                    <span>Logout</span>
                </v-btn>
            </template>
        </v-app-bar>
        <v-main>
            <v-card>
                <v-layout>
                <v-navigation-drawer
                    v-model="drawer"
                    temporary
                >
                    <v-list-item
                    prepend-icon="mdi-account-circle-outline"
                    :title="session.user.name"
                    />
                    <v-divider></v-divider>
                    <v-list density="compact" nav>
                        <v-list-item prepend-icon="mdi-home" title="Home" value="home" @click="RouterTo('/home')"/>
                        <v-list-item prepend-icon="mdi-folder" title="Collections" value="collections" @click="RouterTo('/collections')"/>
                        <v-list-item prepend-icon="mdi-forum" title="About" value="about"/>
                    </v-list>
                </v-navigation-drawer>
                <v-main class="h-screen">
                    <div class="justify-center align-center h-100">
                        <router-view/>
                    </div>
                </v-main>
                </v-layout>
            </v-card>
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';
import { sessionStore } from '../../../store/index.js';
import router from '@/router';
import {ref} from 'vue'
export default{
    setup(){
        const session = sessionStore()
        const drawer = ref(false)
        const Logout = ()=>{
            axios.post('/api/logout').then(()=>{
                session.SetUser({})
                router.push('/login')
            })
        }
        const RouterTo = (url)=>{
            router.push(url)
        }
        return{
            drawer,
            session,
            Logout,
            RouterTo,
        }
    }
}

</script>