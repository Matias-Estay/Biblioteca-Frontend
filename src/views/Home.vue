<template>
    <v-container fluid>
        <v-row justify="center">
            <h3>
                Share your collections
            </h3>
            <v-divider/>
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
                            Total Files: {{ 1 }}
                        </v-card-subtitle>

                        <v-card-actions>
                            <v-switch  
                            v-model="item.description" 
                            :loading="sharing"
                            :value="1"
                            :label="item.description==1?'Public':'Private'" @change="Share(item)"/>
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
import { ref } from 'vue'
import axios from 'axios'
export default{
    mounted(){
        this.Load_Collections()
    },
    setup(){
        const collections = ref([])
        const sharing = ref(false)
        const Load_Collections = () =>{
            collections.value=[]
            axios.get('/api/collections',{}).then((res)=>{
                collections.value=res.data
            })
        }
        const Share = (item) =>{
            sharing.value=true
            axios.post('/api/ShareCollection',{item}).then(res=>{
                sharing.value=false
            })
        }
        return{
            collections,
            sharing,
            Load_Collections,
            Share
        }
    }

}
</script>