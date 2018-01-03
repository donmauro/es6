/*
Import Section
*/
import { socket } from './socket.js'
/*
Body module
*/

const sio = socket('/chat')

sio.on( 'create', ( result ) => {
  const event = new CustomEvent('create', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})

sio.on( 'searchByName', ( result ) => {
  const event = new CustomEvent('searchByName', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})

sio.on( 'destroy', ( result ) => {
  const event = new CustomEvent('destroy', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})

const create = ( dataObject ) => {
   sio.emit( 'create', dataObject )
}


const searchByName = ( queryString ) => {
  console.log('model:searchByName')
   sio.emit( 'searchByName', queryString )
}

const destroy = ( id ) => {
  sio.emit( 'destroy', id )
}
export { create,
         destroy,
         searchByName
}
