<template>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        temporary
      >
      <v-list-subheader compact nav inset class="mx-4">Edit your Files</v-list-subheader>
        <v-list-item
        v-for="file in files"
        :key="file.title"
        :title="file.title"
        :subtitle="file.subtitle"
        >
        <template v-slot:prepend>
            <v-avatar color="grey-darken-2">
            <v-icon color="white">mdi-file-{{ file.extention }}</v-icon>
            </v-avatar>
        </template>

        <template v-slot:append>
            <v-btn
            color="red"
            icon="mdi-delete"
            variant="text"
            ></v-btn>
        </template>
        </v-list-item>
      </v-navigation-drawer>
      <v-main class="h-screen">
        <v-container>
            <v-row class="my-2" justify="end">
                <v-chip 
                variant="outlined"
                color="primary"
                @click.stop="drawer = !drawer"
                prepend-icon="mdi-file">
                    Documents
                </v-chip>
            </v-row>
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
      </v-main>
    </v-layout>
</template>
<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default{
    setup(){
        const loading = ref(false)
        const question = ref('')
        const question_aux = ref('')
        const answer = ref('')
        const drawer = ref(false)
        const files = ref([
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
          extention: 'pdf-box'
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
          extention: 'pdf-box'
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
          extention: 'word'
        },
        ])
        const route = useRoute()
        const Test = () => {
            console.log("test")
        }
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
            drawer,
            question,
            question_aux,
            answer,
            files,
            Test,
            Ask_Question
        }
    }
}
</script>