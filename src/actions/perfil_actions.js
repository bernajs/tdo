import firebase from './firebase'
import { ACTUALIZAR_PERFIL } from './types'

export const actualizarPerfil = usuario => dispatch => {
  const user = {
    uid: usuario.uid,
    nombre: usuario.nombre.value,
    celular: usuario.celular.value,
    correo: usuario.correo.value,
    contrasena: usuario.contrasena.value
  }
  return firebase
    .database()
    .ref(`usuarios/${usuario.uid}`)
    .update(user)
    .then(result => {
      // localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: ACTUALIZAR_PERFIL, payload: user })
      return true
    })
    .catch(error => false)
}
