<template>
    <v-container fluid>
        <v-row justify="center" class="mb-2">
            <h3>
                Cuota
            </h3>
            <v-divider/>
            <v-col :cols="12">
                <v-container fluid>
                    <v-row>
                        <h4>PDF</h4>
                    </v-row>
                    <v-row>
                        <h4>Total:</h4>{{ cuota.page.max_count }} /<h4>Used:</h4> {{ cuota.page.used_count }}
                    </v-row>
                </v-container>
                <v-progress-linear color="red" height="16" :model-value="(Number(cuota.page.used_count)*100)/Number(cuota.page.max_count)">
                    <template v-slot:default="{ value }">
                        <strong>{{ Math.ceil(value) }}%</strong>
                    </template>
                </v-progress-linear>
            </v-col>
            <v-col :cols="12">
                <v-container fluid>
                    <v-row>
                        <h4>Questions</h4>
                    </v-row>
                    <v-row>
                        <h4>Total:</h4>{{ cuota.question.max_count }} /<h4>Used:</h4> {{ cuota.question.used_count }}
                    </v-row>
                </v-container>
                <v-progress-linear color="green" height="16" :model-value="(Number(cuota.question.used_count)*100)/Number(cuota.question.max_count)">
                    <template v-slot:default="{ value }">
                        <strong>{{ Math.ceil(value) }}%</strong>
                    </template>
                </v-progress-linear>
            </v-col>
        </v-row>
        <home/>
    </v-container>
</template>
<script>
import Home from './Home'
import { ref } from 'vue'
import axios from 'axios'
export default{
    components:{
        'home':Home
    },
    mounted(){
        axios.get('/api/quota').then(res=>{
            this.cuota = res.data.data.package
        })
    },
    setup(){
        const cuota = ref({page:{used_count:0,max_count:1},question:{used_count:0,max_count:1}})
        return{
            cuota
        }
    }
}

</script>