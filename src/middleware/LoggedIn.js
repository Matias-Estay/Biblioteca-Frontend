import axios from 'axios'

async function Logged (to, from, next) {
    //Logged IN
    return axios.get('/api/loggedIn').then((res)=>{
        if(res.data==''){
            return false
        }else{
            return true
        }
    }).catch(error=>{
        console.log(error)
    })
}

export {Logged}