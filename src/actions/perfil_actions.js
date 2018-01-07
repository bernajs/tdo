import firebase from './firebase'

export const actualizarPerfil = usuario => dispatch => {
  firebase
    .database()
    .ref(`usuarios/${usuario.uid}`)
    .update({
      nombre: usuario.nombre,
      celular: usuario.celular,
      correo: usuario.correo,
      direccion: null
    })
    .then(result => true)
    .catch(error => false)
}
