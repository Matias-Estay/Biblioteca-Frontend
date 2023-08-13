<template>
    <v-btn @click="logout">Logout</v-btn>
    Hola soy el dashboard
</template>
<script>
import axios from 'axios';
import { sessionStore } from '../../store/index.js';
import router from '@/router';

export default{
    setup(){
        const session = sessionStore()
        const logout = ()=>{
            axios.post('/api/logout').then(()=>{
                session.SetUser({})
                router.push('/')
            })
        }
        return{
            logout
        }
    }

}
</script>