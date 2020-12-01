import axios from 'axios'
export function home(){
    return axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/book/home`
    })
}
export function flatList(book) {
    return axios({
      method: 'get',
      url: `${process.env.VUE_APP_BASE_URL}/book/flatList`,
      params:{
        fileName:book.fileName
      }
    })
  }

export function list() {
    return axios({
      method: 'get',
      url: `${process.env.VUE_APP_BASE_URL}/book/list`
    })
  }
export function shelf(){
    return axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/book/shelf`
    })
}