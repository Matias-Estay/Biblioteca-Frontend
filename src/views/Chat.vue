<template>
    <v-container>
        <v-textarea v-model="answer">

        </v-textarea>
        <v-row>
            <v-textarea
            v-model="question"
            v-on:keyup.enter="Ask_Question"
            append-inner-icon="mdi-comment"
            class="mx-2"
            label="Ask a question"
            rows="1"
            ></v-textarea>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default{
    setup(){
        const question = ref('')
        const answer = ref('')
        const route = useRoute()
        const Ask_Question = () => {
            
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
                        }catch{
                            console.log("error")    
                        }
                    }
                }
                })
        }
        return{
            question,
            answer,
            Ask_Question
        }
    }
}
</script>