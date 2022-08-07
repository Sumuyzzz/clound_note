import axios from 'axios'


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.baseURL = 'https://note-server.hunger-valley.com'

axios.defaults.withCredentials = true

interface Options<T = {}> {
  url?: string
  method?: string
  validateStatus: (value: number) => boolean
  data?: T
  params?: T
}

export const request = (url: string, type = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {
    const option: Options = {
      url,
      method: type,
      validateStatus(status: number) {
        return (status === 400 || (status >= 200 && status < 300))
      },
    }
    if (type === 'GET')
      option.params = data
    else
      option.data = data
    axios(option).then((res) => {
      if (res.status === 200) {
        resolve(res.data)
      }
      else {
        reject(res.data)
      }
    })
      .catch((error: unknown) => {
        reject(error)
      })
  })
}






