/*
 * chat.js - module to provide chat messaging
*/


// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  chatObj,
  socket = require( 'socket.io' ),
  crud   = require( './crud'    ),


// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN UTILITY METHODS -----------------

// ----------------- END UTILITY METHODS ------------------

// ---------------- BEGIN PUBLIC METHODS ------------------
chatObj = {
  connect : function ( server ) {
    var io = socket.listen( server );

    // Begin io setup
    io
      .of( '/chat' )
      .on( 'connection', function ( socket ) {


        // BEgin /es6/ message handler

        socket.on('es6', function( user_map ) {
          console.log('server es6' + user_map)
          crud.construct(
            'user',
            user_map,
            function ( result_list ) {

              socket.emit('es6', result_list)

            }
          )

        })
        // End /es6/ message handler


      }
    );
    // End io setup

    return io;
  }
};

module.exports = chatObj;
// ----------------- END PUBLIC METHODS -------------------
