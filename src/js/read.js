import * as message from './message.js'
import { socket } from './sock.js'
// Module variables
const main_html = `
  <div class="read">
    Nome: <input id="nomeRead" type="text" >
    <input id="search" type="button" value="Cerca"></input><br>
    <br>
    <div class="read-sub"></div>

  </div>

`
const search = () => {

  const queryString = document.querySelector('#nomeRead').value

  socket.emit('read',{ nome: {$regex: '^' + queryString, $options: 'i' } })
  socket.on('read', ( result ) => {
    let html = String()
    html += '<table>'
    html += '<tr><th>Nome</th><th>Cognome</th><th>Data di nascita</th></tr>'
    for ( let row of result ) {
      html += '<tr><td><p>' + row.nome + '</p></td><td><p>' + row.cognome + '</p></td><td><p>' + row.dataNascita + '</p></td></tr>'
    }
    html += '</table>'
    document.querySelector( '.read-sub' ).innerHTML = html;
  } )


};

// Export module initModule
const initModule = ( container ) => {

  container.innerHTML = main_html

  document.querySelector("input[id='search']")
    .addEventListener('click', search )

}

export { initModule }
