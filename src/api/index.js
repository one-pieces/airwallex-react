// import axios from 'axios'

export const sendInvitation = ({ name, email }, token) => {
  // return axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
  //   name,
  //   email
  // })
  return send({
    method: 'post',
    url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
    params: { name, email }
  }, token)
}

export const send = ({ url, method, params }, token) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    // xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => {
      const response = JSON.parse(xhr.response)
      if (xhr.status === 400) {
        reject(response)
        return
      }
      resolve(response)
    }
    xhr.timeout = 8000
    xhr.onerror= (e) => {
      reject(e)
    }
    xhr.send(JSON.stringify(params))
    token.cancel = () => {
      xhr.abort()
      reject(new Error('Cancelled'))
    }
  })
}