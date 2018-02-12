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
          crud.insertOne(
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

        // Begin /searchByName/ message handler
        socket.on('searchByName', function( queryString ) {
          console.log('socket.on read')
          crud.find(
            'user',
            { nome: {$regex: '^' + queryString, $options: 'i' } },
            {},
            function( result ) {
              socket.emit( 'searchByName', result )
            }
          )
        })
        // End /searchByName/ message handler

        // Begin /searchById/ message handler
        socket.on('searchById', function( id ) {
          console.log('socket.on searchById')
          crud.findById(
            'user',
            id,
            {},
            function( result ) {
              socket.emit( 'searchById', result )
            }
          )
        })
        // End /searchById/ message handler

        // Begin /destroy/ message handler
        socket.on('destroy', function( queryString ) {
          console.log('socket.on destroy')
          crud.destroy(
            'user',
            queryString,
            function( result ) {
              console.log('SOCKET');
              console.log( result.error );
              console.log( result.message );

              socket.emit( 'destroy', result )
            }
          )
        })
        // End /destroy/ message handler

        // Begin /update/ message handler
        socket.on('update', function( id, data ) {
          console.log('socket.on update')
          crud.updateOne(
            'user',
            id,
            data,
            function( result ) {
              socket.emit( 'update', result )
            }
          )
        })
        // End /update/ message handler
      }
    );
    // End io setup

    return io;
  }
};

module.exports = chatObj;
// ----------------- END PUBLIC METHODS -------------------
