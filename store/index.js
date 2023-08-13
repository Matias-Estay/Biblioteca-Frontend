import { sessionStoreModule } from './sessionStoreModule.js'
import { defineStore } from 'pinia'

export const sessionStore = defineStore('sessionStore', sessionStoreModule)
