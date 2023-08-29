<template>
    <v-app-bar Title="Bienvenido" :elevation="2" rounded>
        <template v-slot:append>
            <v-btn icon="mdi-heart"></v-btn>

            <v-btn icon="mdi-magnify"></v-btn>
            
            <v-btn @click="logout">Logout</v-btn>
        </template>
    </v-app-bar>
    <iframe src="https://documind.chat/dashboard/sharing/534d52a1702748c7d20a1b86a2c8c011" title="Test" height="500" width="900"></iframe>
    <v-textarea v-model="consulta"/>
    <v-textarea v-model="respuesta"/>
    <v-btn @click="Enviar">Enviar</v-btn>
    <p>abc</p>
</template>
<script>
import axios from 'axios';
import { sessionStore } from '../../store/index.js';
import { ref } from 'vue'
import router from '@/router';
export default{
    setup(){
        const key = ref("ak-oaDwyJFpHfkcB-df6vQ16aZbqxeu-hUOqVo-bN_UTqM")
        const session = sessionStore()
        var consulta = ref("")
        const respuesta = ref("")
        const logout = ()=>{
            axios.post('/api/logout').then(()=>{
                session.SetUser({})
                router.push('/')
            })
        }
        const Enviar = () =>{
           axios.get('/api/quota').then(res=>{
                console.log(res)
           })
            
            // axios.post('https://api.chatdoc.com/api/v1/questions',
            // // 4bd1bddf-1d9f-4b3c-90f6-a29b34c74047
            // // 49b6095b-4297-4183-9843-4b5f7a01d71f
            //     { upload_id: "4bd1bddf-1d9f-4b3c-90f6-a29b34c74047", question:consulta.value},
            //     {
            //         headers: {
            //             'Access-Control-Allow-Origin': '*',
            //             'Content-Type': 'application/json',
            //             'Authorization': "bearer "+key.value
            //         },
            //     }
            // ).then( (resultado) =>{
            //     respuesta = resultado.data
            // })  
        }
        return{
            consulta,
            respuesta,
            Enviar,
            logout
        }
    }

}
</script>