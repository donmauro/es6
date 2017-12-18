/*
Import Section
*/
import * as message from './message.js'
import * as user    from './model.js'

/*
Body module
*/

// Module variables
const main_html = `
  <div class="read">
    Nome: <input id="nomeRead" type="text" >
    <input id="search" type="button" value="Cerca"></input><br>
    <br>
    <input id="nuovo" type="button" value="Nuovo"></input><br>
    <div class="read-sub"></div>

  </div>

`

const create_html = `
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
/*
 Event handlers
*/


document.addEventListener( 'searchByName', ( event ) => {
  showTable( event.data )
})

document.addEventListener( 'create', () => {

  document.querySelector( '.read-sub' ).innerHTML = 'User inserted'
})

document.addEventListener( 'destroy', () => {

  //refresh table
  document.querySelector("input[id='search']").click()

})
const showTable = ( rows ) => {
  const html = `
    <table>
      <tr><th>Nome</th><th>Cognome</th><th>Data di nascita</th><th colspan="2"></th><tr>
      ${rows.map(row => `
        <tr id=${row._id} class="row">
          <td ><p>${row.nome}</p></td>
            <td><p>${row.cognome}</p></td>
            <td><p>${row.dataNascita}</p></td>
            <td><p class="elimina">Elimina</p></td>
            <td><p class="modifica">Modifica</p></td>
        </tr>`
      ).join('')}
    </table>
`

document.querySelector( '.read-sub' ).innerHTML = html

    const dels = document.querySelectorAll( ".row" )

    for ( let del of dels ) {

      del.addEventListener('click', ( event ) => {
        //elimina( event.currentTarget.id )

        console.log( event.currentTarget.id )
        console.log( event.target.className )

      } )
    }
}

const NOshowTable = ( rows ) => {
    let html = String()
    html += '<table>'
    html += '<tr><th>Nome</th><th>Cognome</th><th>Data di nascita</th></tr>'
    for ( let row of rows ) {
      html += '<tr><td><p>' + row.nome + '</p></td><td><p>' + row.cognome + '</p></td><td><p>' + row.dataNascita + '</p></td><td><p id="' + row._id + '" class="elimina">Elimina</p></td></tr>'
    }
    html += '</table>'

    document.querySelector( '.read-sub' ).innerHTML = html

    const dels = document.querySelectorAll( ".elimina" )

    for ( let del of dels ) {
      del.addEventListener('click', ( event ) => {
        elimina( event.currentTarget.id )

      } )
    }
}
const search = () => {

  const queryString = document.querySelector('#nomeRead').value

  user.searchByName( queryString )


}

const elimina = ( id ) => {

  user.destroy( id )


}

const serializeArray = ( fields ) => {
  const object = {}
  for( let field of fields ){
    object[ field.name ] = field.value

  }

  return object
}

const nuovo = () => {
  document.querySelector( '.read-sub' ).innerHTML = create_html
  document.querySelector("input[name='salva']")
    .addEventListener('click', () => {

      const elements = document.querySelectorAll('form input')
      const dataObject = serializeArray( elements )
      user.create( dataObject )

  })
}

// Export module initModule
const initModule = ( container ) => {

  container.innerHTML = main_html

  document.querySelector("input[id='search']")
  .addEventListener('click', search )

  document.querySelector("input[id='nuovo']")
  .addEventListener('click', nuovo )

}

export { initModule }
