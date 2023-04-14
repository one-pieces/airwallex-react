import axios from 'axios'

export const sendInvitation = ({ name, email }) => {
  // return axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
  //   name,
  //   email
  // })
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 5000)
  })
}