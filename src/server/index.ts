import axios from 'axios'

export function qqSearch(query: string){
    return axios.get(`https://api.uomg.com/api/qq.info?qq=${query}`)
}
