<template>
    
    <iframe src="https://documind.chat/dashboard/sharing/534d52a1702748c7d20a1b86a2c8c011" title="Test" height="500" width="900"></iframe>
    <v-textarea v-model="consulta"/>
    <v-textarea v-model="respuesta"/>
    <v-btn @click="Enviar">Enviar</v-btn>
</template>
<script>
import axios from 'axios';
import { ref } from 'vue'
export default{
    setup(){
        var consulta = ref("")
        const respuesta = ref("")
        const Enviar = () =>{
           axios.get('/api/quota').then(res=>{
                console.log(res)
           })
           axios.post('/api/careateCollection',{hola:'hola'},{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            }).then(res=>{
                console.log(res)
            })
        }
        return{
            consulta,
            respuesta,
            Enviar
        }
    }

}
</script>