import * as message from './message.js'
import { socket } from './sock.js'
// Module variables
const main_html = `
  <div class="read">
    Nome: <input id="nomeRead" type="text" >
    <input id="search" type="button" value="Cerca"></input>
  </div>

`
const search = () => {
  alert( 'search' )
   const queryString = document.getElementById("nomeRead").value

    socket.emit('read',{ nome: {$regex: '^' + queryString, $options: 'i' } })
    socket.on('read', ( result ) => {
      alert( result )
    } )
//    document.addEventListener( 'my', function( e ) {
//      console.log("MY");
//      var html   = String(),
//          cursor = e.data;
//      html += '<table>'
//      for (var i=0; i < cursor[0].length; i++ ) {
//
//        html += '<tr><td><p>' + cursor[0][i].name + '</p></td></tr>'
//      }
//      html += '</table>'
//      document.getElementsByClassName( 'spa-home-sub' )[0].innerHTML = html;
//    })

};

// Export module initModule
const initModule = ( container ) => {

  container.innerHTML = main_html

  document.querySelector("input[id='search']")
    .addEventListener('click', search )

}

export { initModule }
