/*
Import Section
*/
import { socket } from './socket.js'
/*
Body module
*/

const sio = socket('/chat')

sio.on( 'searchByName', ( result ) => {
  const event = new CustomEvent('searchByName', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})

const searchByName = ( queryString ) => {
   sio.emit( 'searchByName', queryString )
}

export { searchByName }
