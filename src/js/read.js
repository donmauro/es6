/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as user    from './model.js';

/*
Body module
*/

// Module variables
const main_html = `
  <form id="formUserSearch">
    <div class="search__wrapper">
      <p>
        <label for="s" class="search__label">Cerca per nome: </label>
        <input type="search" id="name" class="search__input">
        <button type="submit" class="search__submit">Cerca</button>
      </p>
    </div>
  </form>
  <p>
    <input id="nuovo" type="button" value="Nuovo"></input><br>
  </p>
  <div class="read-sub"></div>
`;

const create_html = `
  <div class="create">
    <fieldset>
      <legend> Utente </legend>
      <form id="formUser">
        <p>
          <label for="nome">Nome</label><br>
          <input id="nome" type="text" name="nome">
        </p>
        <p>
          <label for="cognome">Cognome</label><br>
          <input type="text" name="cognome"><br>
        </p>
        <p>
          <label for="dataNascita">Data di nascita</label><br>
          <input type="date" name="dataNascita">
        <p>
        <p>Sesso</p>
        <p>
          <label for='male'>M</label>
          <input type='radio' name='sesso' value='M' id='male' checked/>
          <label for='female'>F</label>
          <input type='radio' name='sesso' value='F' id='female'/>
        </p>
        <p>
          <label for='citta'>Comune di nascita:
            <select name='citta' id='citta'>
              <option value='' selected>Scegli....</option>
              <option value='1'>Palermo</option>
              <option value='2'>Trapani</option>
              <option value='3'>Agrigento</option>

            </select>
          </label>
        </p>
        <p>
          <input type='submit'></input>
        </p>
      </form>
    </fieldset>
  </div>
`;
/*
 Event handlers
*/


document.addEventListener( 'searchByName', ( event ) => {

  showTable( event.data );
});

document.addEventListener( 'searchById', ( event ) => {

  showUser( event.data[0] );
});

document.addEventListener( 'create', () => {

  document.querySelector( '.read-sub' ).innerHTML = 'User inserted';
});

document.addEventListener( 'update', () => {

  alert( 'upd');
});

document.addEventListener( 'destroy', ( event ) => {


  if ( event.data.hasOwnProperty( 'error') ) {
    alert( event.data.message )
  }

  //refresh table
  //document.querySelector("button[id='search']").click()

});

const showUser = ( userData ) => {

  document.querySelector( '.read-sub' ).innerHTML = create_html;
  const form = document.forms[ 'formUser' ];

  dm.formLoad( form, userData );

  form.addEventListener( 'submit', ( event ) => {

    event.preventDefault();
    const data = dm.formToData( form );
    console.log ( data );
    user.update(  userData._id, dm.formToData( form ) );

  });

};

const showTable = ( rows ) => {
  const html = `
    <p>
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
    </p>
  `;

  document.querySelector( '.read-sub' ).innerHTML = html;

  const table  = document.getElementById( "userList" );
  const tableRows = table.querySelectorAll(".row");
  for( let row of tableRows ) {

    row.addEventListener('click', ( event ) => {

      if (event.target.tagName == 'SEL') {
        switch( event.target.id ) {
          case "del" : {
            user.destroy( row.id );
            const parent = row.parentNode;
            parent.removeChild(row);
            break;
          }
          case "upd" : {
            user.searchById( row.id );
            break;
          }
        }
      }
    });
  }
};

const search = ( event ) => {
  console.log('search');
  event.preventDefault();
  user.searchByName( event.target.name.value );

};


const serializeArray = ( fields ) => {
  const object = {};
  for( let field of fields ){
    object[ field.name ] = field.value;

  }

  return object;
};

const nuovo = () => {
  document.querySelector( '.read-sub' ).innerHTML = create_html;
  const form = document.forms[ 'formUser' ];
  form.addEventListener( 'submit', ( event ) => {
      event.preventDefault();

      user.create(  dm.formToData( form )  );

  });
};


// Export module initModule
const initModule = ( container ) => {

  container.innerHTML = main_html;
  const form = document.forms.formUserSearch;
  form.addEventListener ('submit', search, false);

  document.querySelector("input[id='nuovo']").addEventListener('click', nuovo );

};

export { initModule };
