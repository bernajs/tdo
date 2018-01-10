import firebase from './firebase'
import { CERRAR_SESION, INICIAR_SESION } from '../actions/types'

export const checkSession = () => dispatch => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user ? user : false
}

export const login = (correo, contrasena) => async dispatch => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(correo, contrasena)
    .then(function(user) {
      return firebase
        .database()
        .ref(`usuarios/${user.uid}`)
        .once('value')
        .then(function(snapShot) {
          // localStorage.setItem(
          //   'user',
          //   JSON.stringify({ ...snapShot.val(), uid: snapShot.key })
          // )
          dispatch({
            type: INICIAR_SESION,
            payload: { ...snapShot.val(), uid: snapShot.key }
          })
          return true
        })
    })
    .catch(function(error) {
      return false
    })
}

export const facebookLogin = () => async dispatch => {
  const provider = new firebase.auth.FacebookAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log(result)
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error)
    })
}

export const registro = usuario => async dispatch => {
  const usr = {
    nombre: usuario.nombre.value,
    celular: usuario.celular.value,
    correo: usuario.correo.value,
    contrasena: usuario.contrasena.value,
    direccion: null
  }
  return firebase
    .auth()
    .createUserWithEmailAndPassword(
      usuario.correo.value,
      usuario.contrasena.value
    )
    .then(function(user) {
      console.log(user)
      console.log(user.uid)
      firebase
        .database()
        .ref(`usuarios/${user.uid}`)
        .set(usr)
      user
        .updateProfile({
          displayName: usuario.nombre.value
        })
        .then(
          function() {
            // Update successful.
            console.log('se actualizó el nombre')
            dispatch({
              type: INICIAR_SESION,
              payload: { ...usr, uid: user.uid }
            })
            return true
          },
          function(error) {
            return false
            // An error happened.
          }
        )
      return user
    })
    .catch(function(error) {
      console.log(error)
      return error
    })
}

export const cerrarSesion = () => dispatch => {
  dispatch({ type: CERRAR_SESION })
}
