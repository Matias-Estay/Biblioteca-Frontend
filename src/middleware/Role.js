import axios from 'axios'

async function Role () {
    return axios.get('/api/user').then(res => {
        if(res.data.type=='admin'){
            return true
        }else{
            return false
        }
    })
}

export {Role}