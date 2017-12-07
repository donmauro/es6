import * as message from './message.js'
import { socket } from './sock.js'
// Module variables
const main_html = `
  <div class="create">
    <form>
      Nome:<br>
      <input type="text" name="nome"><br>
      Cognome:<br>
      <input type="text" name="cognome"><br>
      Data di nascita:<br>
      <input type="date" name="dataNascita"><br><br>

    </form>
    <input name="salva" type="button" value="Salva"></input>
  </div>
`


const serializeArray = ( fields ) => {
  const object = {}
  for( let field of fields ){
    object[ field.name ] = field.value

  }

  return object
}
// Export module initModule
const initModule = ( container ) => {

  container.innerHTML = main_html

  document.querySelector("input[name='salva']")
    .addEventListener('click', () => {
      const elements = document.querySelectorAll('form input')

      const dataObject = serializeArray( elements );
      const jsonData = JSON.stringify(dataObject);
      console.log( dataObject )
      alert( jsonData )
      socket.emit('create', dataObject )
      socket.on('create', ( result ) => {
        console.log( result )
      })
      //message.show('Salvato')
    })

}

export { initModule }

