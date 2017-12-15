import * as message from './message.js'
import { socket } from './socket.js'
// Module variables

const list = [

  {
    k: 1, val: 'A'
  },
  {
    k: 2, val: 'B'
  },
  {
    k: 3, val: 'C'
  }
]
const main_html = `
  <div class="create">
    <form>
      <select id="xselect"></select>
      <select id="yselect"></select>
    </form>
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

  socket.emit('read',{ nome: {$regex: '^' , $options: 'i' } })
  socket.on('read', ( result ) => {
    const x = document.querySelector( '#xselect' )
    // azzero le options per evitare l'accodamento asincrono
    x.options.length = 0
    for ( let row of result ) {
      const option = document.createElement( 'option' )
      option.text = row.nome + ' ' + row.cognome
      option.value = row._id
      x.add( option )
    }
    x.addEventListener( 'change', ( event ) => {
        alert( event.currentTarget.value )
      }
    )
  })

  const x = document.querySelector( '#yselect' )
  for ( let row of list ) {
    const option = document.createElement( 'option' )
    option.text = row.val
    option.value = row.k
    x.add( option )
  }
  x.addEventListener( 'change', ( event ) => {
      alert( event.currentTarget.value )
    }
  )
}


export { initModule }

