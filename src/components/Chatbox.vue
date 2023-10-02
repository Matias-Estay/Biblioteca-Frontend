<template>
    <v-container>
        <v-row>
            <v-textarea
            rows="1"
            readonly
            auto-grow
            label="Your Question:"
            prepend-icon="mdi-account-box"
            class="my-4"
            v-model="question_aux"
            />
        </v-row>
        <v-row>
            <v-textarea
            rows="1"
            readonly
            auto-grow
            label="Answer:"
            append-icon="mdi-robot"
            v-model="answer"
            />
        </v-row>
        <v-row>
            <v-textarea
            :loading="loading"
            v-model="question"
            label="Ask a question"
            >
            <template v-slot:append>
                <v-btn color="primary" :loading="loading" @click="Ask_Question" class="my-10">
                    <v-icon icon="mdi-send-circle"/>
                    <v-progress-linear indeterminate></v-progress-linear>
                </v-btn>
            </template>
            </v-textarea>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
export default{
    setup(){
        const route = useRoute()
        const question = ref('')
        const question_aux = ref('')
        const answer = ref('')
        const loading = ref(false)
        const Ask_Question = () => {
            loading.value=true
            question_aux.value=question.value
            axios.post('/api/askQuestion',{question:question.value,id:route.query.id,id_api:route.query.id_api}).then((res)=>{
                answer.value = ''
                question.value=''
                var aux = res.data.replace(/[\r]/gm, '')
                var rescue = aux.split("\n")
                for(let i = 0;i<rescue.length;i++){
                    if(rescue[i]){
                        try{
                            var aux2 = JSON.parse('{'+(rescue[i].replace('data','"data"')).replaceAll("'","\"")+'}')
                            answer.value = answer.value + aux2.data.answer
                            loading.value=false
                        }catch{
                            loading.value=false
                            console.log("error")    
                        }
                    }
                }
                })
        }
        return{
            loading,
            question,
            question_aux,
            answer,
            Ask_Question,
        }
    }
}
</script>