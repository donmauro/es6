(function () {
'use strict';

const onClickClosebtn = () => {

  document.querySelector('.message-modal').style.display = "none";
};

const show = ( msg ) => {

  const message_html = `
    <div id="id01" class="message-modal">
      <div class="message-modal-content">
        <span class="message-modal-closebtn">&times;</span>
        <p id="message-modal-text">${ msg }</p>
      </div>
    </div>
  `;
  document.querySelector('.shell-modal').innerHTML = message_html;
  document.querySelector('.message-modal').style.display = "block";
  document.querySelector('.message-modal-closebtn').addEventListener('click', onClickClosebtn );
};

const socket = io.connect('/chat');

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
];
const main_html$1 = `
  <div class="create">
    <form>
      <select id="xselect"></select>
      <select id="yselect"></select>
    </form>
  </div>
`;


// Export module initModule
const initModule$1 = ( container ) => {

  container.innerHTML = main_html$1;

  socket.emit('read',{ nome: {$regex: '^' , $options: 'i' } });
  socket.on('read', ( result ) => {
    const x = document.querySelector( '#xselect' );
    // azzero le options per evitare l'accodamento asincrono
    x.options.length = 0;
    for ( let row of result ) {
      const option = document.createElement( 'option' );
      option.text = row.nome + ' ' + row.cognome;
      option.value = row._id;
      x.add( option );
    }
    x.addEventListener( 'change', ( event ) => {
        alert( event.currentTarget.value );
      }
    );
  });

  const x = document.querySelector( '#yselect' );
  for ( let row of list ) {
    const option = document.createElement( 'option' );
    option.text = row.val;
    option.value = row.k;
    x.add( option );
  }
  x.addEventListener( 'change', ( event ) => {
      alert( event.currentTarget.value );
    }
  );
};

// Module variables
const main_html$2 = `
  <div class="read">
    Nome: <input id="nomeRead" type="text" >
    <input id="search" type="button" value="Cerca"></input><br>
    <br>
    <input id="nuovo" type="button" value="Nuovo"></input><br>
    <div class="read-sub"></div>

  </div>

`;

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
`;
const search = () => {

  const queryString = document.querySelector('#nomeRead').value;

  socket.emit('read',{ nome: {$regex: '^' + queryString, $options: 'i' } });
  socket.on('read', ( result ) => {
    let html = String();
    html += '<table>';
    html += '<tr><th>Nome</th><th>Cognome</th><th>Data di nascita</th></tr>';
    for ( let row of result ) {
      html += '<tr><td><p>' + row.nome + '</p></td><td><p>' + row.cognome + '</p></td><td><p>' + row.dataNascita + '</p></td><td><p id="' + row._id + '" class="elimina">Elimina</p></td></tr>';
    }
    html += '</table>';

    document.querySelector( '.read-sub' ).innerHTML = html;

    const dels = document.querySelectorAll( ".elimina" );

    for ( let del of dels ) {
      del.addEventListener('click', ( event ) => {
        elimina( event.currentTarget.id );

      } );
    }

  } );

};

const elimina = ( id ) => {
  socket.emit('destroy', id );
  socket.on('destroy', ( result ) => {
    console.log( result );
    document.querySelector("input[id='search']").click();

  });
};

const serializeArray$1 = ( fields ) => {
  const object = {};
  for( let field of fields ){
    object[ field.name ] = field.value;

  }

  return object
};

const nuovo = () => {
  document.querySelector( '.read-sub' ).innerHTML = create_html;
    document.querySelector("input[name='salva']")
    .addEventListener('click', () => {
      const elements = document.querySelectorAll('form input');

      const dataObject = serializeArray$1( elements );

      socket.emit('create', dataObject );
      socket.on('create', ( result ) => {
        console.log( result );
        document.querySelector( '.read-sub' ).innerHTML = '';
      });
      //message.show('Salvato')
    });
};

// Export module initModule
const initModule$2 = ( container ) => {

  container.innerHTML = main_html$2;

  document.querySelector("input[id='search']")
    .addEventListener('click', search );
  document.querySelector("input[id='nuovo']")
    .addEventListener('click', nuovo );

};

// Module variables
const main_html = `
  <div class="shell-head">
    <div class="shell-head-logo">
      <h1>ES6</h1>
      <p>no framework</p>
    </div>
    <div class="shell-head-acct"></div>
  </div>
  <div class="shell-main">
    <div class="shell-main-nav"></div>
    <div class="shell-main-content">
      <div class="shell-main-content-message"></div>
      <div class="shell-main-content-body"></div>
    </div>
  </div>
  <div class="shell-foot"></div>
  <div class="shell-modal"></div>
`;
const nav_html = `
  <ul>
    <li id="create" class="shell-nav-li"><a href="#create">Create</a></li>
    <li id="read" class="shell-nav-li"><a href="#read">Read</a></li>
    <li id="message" class="shell-nav-li"><a href="#message">Message</a></li>
    <li shell-nav-li><a href="#contact">Contact</a></li>
    <li shell-nav-li><a href="#about">About</a></li>
  </ul>
`;
const onClickMenuitem = ( id ) => {
    switch (id) {
      case "create": {

        initModule$1( document.querySelector('.shell-main-content') );
        break;
      }
      case "read": {
        initModule$2( document.querySelector('.shell-main-content') );
        break;
      }
      case "message": {
        show( 'Messaggio modale');
        break;
      }
    }
};
// Export module initModule
const initModule = ( container ) => {


  container.innerHTML = main_html;
  document.querySelector('.shell-main-nav').innerHTML = nav_html;

  const li = document.getElementsByClassName( 'shell-nav-li' );

  for (let _li of li) {
        _li.addEventListener(
          "click", ( event ) => {
          onClickMenuitem( event.currentTarget.id );
          }
      );
  }




};

document.addEventListener('DOMContentLoaded', () => {

    initModule( document.getElementById('spa') );

  }, false);

}());
