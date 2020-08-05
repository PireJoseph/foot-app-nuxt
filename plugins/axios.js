import { ToastProgrammatic as Toast } from 'buefy'

export default function (app) {
  app.$axios.onError((error) => {
    if (error.response.status === 500) {
      Toast.open({
        message: 'there is a problem with the server, we are sorry :c',
        type: 'is-danger',
      })
    }
  })
}
