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


        // Begin /create/ message handler

        socket.on('create', function( user_map ) {
          console.log('server es6' + user_map)
          crud.construct(
            'user',
            user_map,
            function( result_list ) {

              socket.emit('create', result_list)

            }
          )

        })
        // End /create/ message handler

        // Begin /read/ message handler
        socket.on('read', function( queryString ) {
          console.log('socket.on read')
          crud.read(
            'user',
            queryString,
            {},
            function( result ) {
              socket.emit( 'read', result )
            }
          )
        })
        // End /read/ message handler

        // Begin /destroy/ message handler
        socket.on('destroy', function( queryString ) {
          console.log('socket.on destroy')
          crud.destroy(
            'user',
            queryString,
            function( result ) {
              socket.emit( 'destroy', result )
            }
          )
        })
        // End /destroy/ message handler
      }
    );
    // End io setup

    return io;
  }
};

module.exports = chatObj;
// ----------------- END PUBLIC METHODS -------------------
