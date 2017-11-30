import * as message from './message.js'
// Module variables
const main_html = `
  <div>
    <form>
      Nome:<br>
      <input type="text" name="nome"><br>
      Cognome:<br>
      <input type="text" name="cognome"><br>
      Data:
      <input type="date" name="dataNascita"><br>
      <button type="button">Salva</button>
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

  document.querySelector('button')
    .addEventListener('click', () => {
      const elements = document.querySelectorAll('form input')

      const dataObject = serializeArray( elements );
      const jsonData = JSON.stringify(dataObject);
      console.log( dataObject )
      alert( jsonData )
      //message.show('Salvato')
    })
}

export { initModule }
