import firebase from './firebase'
import { ACTUALIZAR_PERFIL, GET_DIRECCION, ACTUALIZAR_DIRECCION } from './types'

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

export const actualizarDireccion = data => dispatch => {
  console.log(data)
  const address = {
    calle: data.calle.value,
    numero: data.numero.value,
    colonia: data.colonia.value,
    ciudad: data.ciudad.value,
    estado: data.estado.value,
    cp: data.cp.value
  }
  return firebase
    .database()
    .ref(`usuarios/${data.uid}`)
    .update({ direccion: address })
    .then(result => {
      // localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: ACTUALIZAR_DIRECCION, payload: address })
      return true
    })
    .catch(error => false)
}

export const getDireccion = uid => dispatch => {
  firebase
    .database()
    .ref(`usuarios/${uid}/direccion`)
    .once('value')
    .then(function(snapShot) {
      dispatch({
        type: GET_DIRECCION,
        payload: { ...snapShot.val() }
      })
    })
}
