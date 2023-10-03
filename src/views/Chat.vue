<template>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        temporary
      >
        <v-list-subheader compact nav inset class="mx-4">
            <v-container fluid>
                <v-row>
                    Edit your Files
                </v-row>
            </v-container>
        </v-list-subheader>
        <v-list-item>
            <v-dialog
            class="dialog" 
            v-model="documents_modal"
            persistent
            scrollable
            >
            <template v-slot:activator="{ props }">
                <v-btn
                variant="outlined"
                color="primary"
                v-bind="props"
                >
                <v-icon icon="mdi-file-upload" class="mr-1"/>
                New Document
                </v-btn>
            </template>
            <v-container>
                <v-row no-gutters justify="center">
                    <v-col xl="6" xxl="6" lg="8" md="12" sm="12" align-self="center">
                        <v-sheet>
                            <v-card>
                                <v-card-title>
                                    Add Documents
                                </v-card-title>
                                <v-divider/>
                                <v-card-text>
                                    <v-file-input
                                    accept=".doc,.docx,.pdf"
                                    label="Drag the files for the collection"
                                    v-model="new_files"
                                    multiple
                                    />
                                </v-card-text>
                                <v-divider/>
                                <v-card-actions>
                                    <v-btn
                                        color="blue-darken-1"
                                        variant="text"
                                        @click="documents_modal = false"
                                    >
                                        Close
                                    </v-btn>
                                    <v-btn
                                        :loading="loading"
                                        color="info"
                                        variant="elevated"
                                        @click="Upload_Documents"
                                    >
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
            </v-dialog>
        </v-list-item>
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
            @click="Eliminar_documento(file.id_api)"
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
        </v-container>
        <chat-box/>
      </v-main>
    </v-layout>
</template>
<script>
import axios from 'axios';
import { ref } from 'vue';
import Chatbox from '../components/Chatbox.vue'
import { useRoute } from 'vue-router';
export default{
    components:{
        'chat-box':Chatbox
    },
    mounted(){
        this.Actualizar_files()
    },
    setup(){
        var files = ref([])
        const route = useRoute()
        const loading = ref(false)
        const new_files = ref([])
        const drawer = ref(false)
        const documents_modal = ref(false)
        const Eliminar_documento = (id_doc)=>{
            axios.post('/api/DeleteDocument',{id_doc}).then(res=>{
                Actualizar_files()
            })
        }
        const Actualizar_files = () =>{
            files.value=[]
            axios.get('/api/collectionDocuments',{params:{id_api:route.query.id_api}}).then(res=>{
                files.value=res.data
            })
        }
        const Upload_Documents = () =>{
            loading.value=true
            var form_collection = new FormData();
            form_collection.append('id_api', route.query.id_api);
            for(let i=0;i<new_files.value.length;i++){
                form_collection.append('files['+i+']', new_files.value[i]);
            }
            form_collection.getAll('files',"id_api");
            axios.post('/api/UploadDocumentsCollection',form_collection).then(res=>{
                Actualizar_files()
                loading.value=false
            }).catch(error=>{
                console.log(error)
                loading.value=false
            })
        }
        return{
            drawer,
            loading,
            documents_modal,
            files,
            new_files,
            Actualizar_files,
            Upload_Documents,
            Eliminar_documento
        }
    }
}
</script>