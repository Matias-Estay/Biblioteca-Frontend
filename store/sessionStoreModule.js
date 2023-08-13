
const state = () => {
    return {
        user:{}
    }
}

const mutations = {
    ChangeUser (state) {
        user = state
    }
}

const actions = {
    SetUser(user){
        this.user=user  
    }
}

const getters = {
    GetUser: (state) => state.user,
}


export const sessionStoreModule = {
  state,
  mutations,
  actions,
  getters,
  persist: true
}
