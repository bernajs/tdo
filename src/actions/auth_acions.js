import firebase from './firebase'

export const checkSession = () => dispatch => {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
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
          localStorage.setItem(
            'user',
            JSON.stringify({ ...snapShot.val(), uid: snapShot.key })
          )
          return true
        })
    })
    .catch(function(error) {
      return false
    })
}

export const registro = usuario => async dispatch => {
  const response = firebase
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
        .set({
          nombre: usuario.nombre.value,
          celular: usuario.celular.value,
          correo: usuario.correo.value,
          contrasena: usuario.contrasena.value,
          direccion: null
        })
      user
        .updateProfile({
          displayName: usuario.nombre.value
        })
        .then(
          function() {
            // Update successful.
            console.log('se actualizó el nombre')
          },
          function(error) {
            console.log('ocurrio un error actualizando el nombre')
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
