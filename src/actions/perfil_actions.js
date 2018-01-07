import firebase from './firebase'

export const actualizarPerfil = usuario => dispatch => {
  console.log('actualizando perfil')
  console.log(usuario)
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
      localStorage.setItem('user', JSON.stringify(user))
      return true
    })
    .catch(error => false)
}
