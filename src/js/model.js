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

sio.on( 'searchById', ( result ) => {
  const event = new CustomEvent('searchById', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})

sio.on( 'destroy', ( result ) => {
  console.log( 'SIO');
  console.log( result );
  const event = new CustomEvent('destroy', {bubbles: true, cancelable: true})
  event.data = result
  document.dispatchEvent( event )
})

sio.on( 'update', ( result ) => {
  const event = new CustomEvent('update', {bubbles: true, cancelable: true})
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

const searchById = ( id ) => {
  console.log('model:searchById')
   sio.emit( 'searchById', id )
}

const destroy = ( id ) => {
  sio.emit( 'destroy', id )
}

const update = ( id, obj_map ) => {
  sio.emit( 'update', id, obj_map )
}

export { create,
         destroy,
         searchByName,
         searchById,
         update,
}
