import axios from 'axios'

async function Shared (id_col) {
    try{
        return axios.get('/api/IsShared',{params:{id_col}}).then(res => {
            if(res.data){
                return true
            }else{
                return false
            }
        })
    }catch{
        return false
    }
}

export {Shared}