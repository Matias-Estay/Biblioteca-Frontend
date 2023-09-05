<template>
<v-app>
    <v-app-bar flat>
        <v-app-bar-title>
            <v-icon icon="mdi-circle-slice-4" />
            Base Preset
        </v-app-bar-title>
        <template v-slot:append>
            <v-btn @click="logout"> 
                <v-icon icon="mdi-exit-to-app"></v-icon>
                <span>Logout</span>
            </v-btn>
        </template>
    </v-app-bar>
    <v-main>
        <v-card>
            <v-layout>
            <v-navigation-drawer
                v-model="drawer"
                temporary
            >
                <v-list-item
                prepend-icon="mdi-account-circle-outline"
                title="User"
                />

                <v-divider></v-divider>

                <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
                <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main class="h-screen">
                <div class="d-flex justify-center align-center h-100">
                <v-btn
                    color="primary"
                    @click.stop="drawer = !drawer"
                >
                    Toggle
                </v-btn>
                </div>
            </v-main>
            </v-layout>
        </v-card>
    </v-main>
</v-app>
    <!-- <v-app>
        <v-main>
            <v-app-bar flat>
                <v-app-bar-title>
                    <v-icon icon="mdi-circle-slice-4" />
                    Base Preset
                </v-app-bar-title>
                <template v-slot:append>
                    <v-btn @click="logout"> 
                        <v-icon icon="mdi-exit-to-app"></v-icon>
                        <span>Logout</span>
                    </v-btn>
                </template>
            </v-app-bar>
            <router-view />
        </v-main>
    </v-app> -->
</template>

<script>
import {ref} from 'vue'
export default{
    setup(){
        const drawer = ref(false)
        return{
            drawer
        }
    }
}

</script>