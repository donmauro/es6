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
    <form id="formUserSearch">
      <label for='name'>Nome:<input id="name" type="search" ></input></label>
      <button id="search" type="submit">Trova</button>
      <br>
    </form>
    <input id="nuovo" type="button" value="Nuovo"></input><br>
    <div class="read-sub"></div>
  </div>
`

const create_html = `
  <div class="create">
    <form id="formUserCreate">
      Nome:<br>
      <input type="text" name="nome"><br>
      Cognome:<br>
      <input type="text" name="cognome"><br>
      Data di nascita:<br>
      <input type="date" name="dataNascita"><br><br>
      <p>Sesso</p>
      <label for='male'>M:
          <input type='radio' name='sesso' value='M' id='male'>
      </label>
      <label for='female'>F:
          <input type='radio' name='sesso' value='F' id='female'>
      </label>
      <label for='citta'>Comune di nascita:
        <select name='citta' id='citta'>
          <option value='' selected>Scegli....</option>
          <option value='Metropolis'>Palermo</option>
          <option value='Gotham City'>Trapani</option>
          <option value='Keystone City'>Agrigento</option>

        </select>
      </label>
      <br>
      <input type='submit'></input>

    </form>

  </div>
`
/*
 Event handlers
*/


document.addEventListener( 'searchByName', ( event ) => {
  console.log('searchByName')
  showTable( event.data )
})

document.addEventListener( 'create', () => {

  document.querySelector( '.read-sub' ).innerHTML = 'User inserted'
})

document.addEventListener( 'destroy', () => {

  //refresh table
  document.querySelector("button[id='search']").click()

})
const showTable = ( rows ) => {
  const html = `
    <table id="userList">
      <tr><th>Nome</th><th>Cognome</th><th>Data di nascita</th><th colspan="2"></th><tr>
      ${rows.map(row => `
        <tr id=${row._id} class="row">
          <td ><p>${row.nome}</p></td>
            <td><p>${row.cognome}</p></td>
            <td><p>${row.dataNascita}</p></td>
            <td><p><sel id="del">Elimina</sel></p></td>
            <td><p><sel id="upd">Modifica</sel></p></td>
        </tr>`
      ).join('')}
    </table>
  `

  document.querySelector( '.read-sub' ).innerHTML = html

  const table  = document.getElementById( "userList" )
  const tableRows = table.querySelectorAll(".row")
  for( let row of tableRows ) {

    row.addEventListener('click', ( event ) => {
      console.log(event.target.tagName)
      console.log(event.target.id)
      if (event.target.tagName == 'SEL') {
        switch( event.target.id ) {
          case "del" : {
            user.destroy( row.id )
            const parent = row.parentNode;
            parent.removeChild(row);
          }
        }
      }



    })
  }

{

}}


const search = ( event ) => {
  console.log('search')
  event.preventDefault()
  user.searchByName( event.target.name.value )

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
  const form = document.forms[ 'formUserCreate' ]
  form.addEventListener( 'submit', ( event ) => {
      event.preventDefault()
      let jsonData = {}
      console.log( form.elements )
      for (const element  of form.elements) {


          jsonData[ element.name ] = element.value;
      }
      console.log( jsonData )
      user.create(  jsonData  )




//  document.querySelector("input[name='salva']")
//    .addEventListener('click', () => {
//
//      const elements = document.querySelectorAll('form input')
//      const dataObject = serializeArray( elements )
//      user.create( dataObject )
//
//  })
  })
}
// Export module initModule
const initModule = ( container ) => {

  container.innerHTML = main_html
  const form = document.forms.formUserSearch
  form.addEventListener ('submit', search, false);

  document.querySelector("input[id='nuovo']").addEventListener('click', nuovo )

}

export { initModule }
