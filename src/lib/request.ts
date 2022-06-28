import axios from 'axios';




axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.baseURL = 'https://note-server.hunger-valley.com'

axios.defaults.withCredentials = true



type Options = {
  url: string, 
  method: string,
  validateStatus:(value: number) => boolean,
  data?: {}, 
  params?:{}, 
}

export default function request(url: string, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option: Options = {
      url,
      method: type,
      validateStatus: function (status: number) {
        return (status >= 200 && status < 300 || status === 400)
      }
    }
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }
    axios(option).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        console.error(res.data)
        reject(res.data)
      }
    }).catch(error => {
      console.error(error)
      reject('错误:' + error)
    })
  })
}

