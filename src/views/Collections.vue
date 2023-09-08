<template>
    <v-container class="h-100">
        <v-row justify="end">
            <v-dialog
            class="dialog" 
            v-model="collection_modal"
            persistent
            scrollable
            >
            <template v-slot:activator="{ props }">
                <v-btn
                color="primary"
                v-bind="props"
                >
                <v-icon icon="mdi-folder-plus"/>
                New collection
                </v-btn>
            </template>
            <v-container>
                <v-row no-gutters justify="center">
                    <v-col xl="6" xxl="6" lg="8" md="12" sm="12" align-self="center">
                        <v-sheet>
                            <v-card>
                                <v-card-title>
                                    Create Collection
                                </v-card-title>
                                <v-divider/>
                                <v-card-text>
                                    <v-text-field
                                    label="Collection name:"
                                    v-model="collection_name"
                                    :rules="nameRules"
                                    hide-details="auto"
                                    />
                                    <br/>
                                    <v-file-input
                                    accept=".doc,.docx,.pdf"
                                    label="Drag the files for the collection"
                                    v-model="files"
                                    multiple
                                    />
                                </v-card-text>
                                <v-divider/>
                                <v-card-actions>
                                    <v-btn
                                        color="blue-darken-1"
                                        variant="text"
                                        @click="collection_modal = false"
                                    >
                                        Close
                                    </v-btn>
                                    <v-btn
                                        color="info"
                                        variant="elevated"
                                        @click="Create_Collection"
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
        </v-row>
        <v-row justify="center">
            <v-col lg="4" v-for="(item, index) in collections" :key="index">
                <v-card
                    color="#01579B"
                    variant="outlined"
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-card-title class="text-h5">
                            {{item.name}}
                        </v-card-title>

                        <v-card-subtitle>
                            Total Files:
                        </v-card-subtitle>

                        <v-card-actions>
                        <v-btn
                            class="ms-2"
                            variant="outlined"
                            size="small"
                            @click="$router.push('/chat?id='+item.id+'&id_api='+item.id_api)"
                        >
                            Chat
                        </v-btn>
                        </v-card-actions>
                    </div>

                    <v-avatar
                        class="ma-3"
                        size="125"
                        rounded="0"
                    >
                        <v-icon icon="mdi-folder-file-outline" size="90"/>
                    </v-avatar>
                    </div>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios'
import {ref} from 'vue'
export default{
    mounted(){
        this.Load_Collections()
        console.log("hola2")
    },
    setup(){
        const collection_modal = ref(false)
        const collection_name = ref("")
        const files = ref(null)
        const collections = ref([])
        const nameRules = [
            value => {
            if (value) return true
            return 'Name for the collection is required.'
            },
        ]
        const Create_Collection = () => {
            var form_collection = new FormData();
            form_collection.append('name', JSON.stringify(collection_name.value));
            for(let i=0;i<files.value.length;i++){
                form_collection.append('files['+i+']', files.value[i]);
            }
            form_collection.getAll('files',"name");
            axios.post('/api/careateCollection',form_collection,{
                headers:{
                    "Access-Control-Allow-Origin": "https://miec-library.store/collections",
                    Vary: 'Origin'
                }
            }).then((res)=>{
                console.log(res.data)
            })
        }
        const Load_Collections = () =>{
            axios.get('/api/collections',{},{
                headers:{
                    "Access-Control-Allow-Origin": "https://miec-library.store/collections",
                    Vary: 'Origin'
                }
            }).then((res)=>{
                collections.value=res.data
            })
        }
        return{
            collection_modal,
            collection_name,
            collections,
            files,
            nameRules,
            Create_Collection,
            Load_Collections
        }
    }
}
</script>