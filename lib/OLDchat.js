/*
 * chat.js - module to provide chat messaging
*/


// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  emitUserList, signIn, signOut, chatObj,
  socket = require( 'socket.io' ),
  crud   = require( './crud'    ),

  makeMongoId = crud.makeMongoId,
  chatterMap  = {};
// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN UTILITY METHODS -----------------
// emitUserList - broadcast user list to all connected clients
//
emitUserList = function ( io ) {
  crud.read(
    'user',
    { is_online : true },
    {},
    function ( result_list ) {
      io
        .of( '/chat' )
        .emit( 'listchange', result_list );
    }
  );
};

// signIn - update is_online property and chatterMap
//
signIn = function ( io, user_map, socket ) {
  crud.update(
    'user',
    { '_id'     : user_map._id },
    { is_online : true         },
    function ( result_map ) {
      emitUserList( io );
      user_map.is_online = true;
      socket.emit( 'userupdate', user_map );
    }
  );

  chatterMap[ user_map._id ] = socket;
  socket.user_id = user_map._id;
};

// signOut - update is_online property and chatterMap
//
signOut = function ( io, user_id ) {
  crud.update(
    'user',
    { '_id'     : user_id },
    { is_online : false   },
    function ( result_list ) { emitUserList( io ); }
  );
  delete chatterMap[ user_id ];
};
// ----------------- END UTILITY METHODS ------------------

// ---------------- BEGIN PUBLIC METHODS ------------------
chatObj = {
  connect : function ( server ) {
    var io = socket.listen( server );

    // Begin io setup
    io
      .set( 'blacklist' , [] )
      .of( '/chat' )
      .on( 'connection', function ( socket ) {

        // Begin /adduser/ message handler
        // Summary   : Provides sign in capability.
        // Arguments : A single user_map object.
        //   user_map should have the following properties:
        //     name    = the name of the user
        //     cid     = the client id
        // Action    :
        //   If a user with the provided username already exists
        //     in Mongo, use the existing user object and ignore
        //     other input.
        //   If a user with the provided username does not exist
        //     in Mongo, create one and use it.
        //   Send a 'userupdate' message to the sender so that
        //     a login cycle can complete.  Ensure the client id
        //     is passed back so the client can correlate the user,
        //     but do not store it in MongoDB.
        //   Mark the user as online and send the updated online
        //     user list to all clients, including the client that
        //     originated the 'adduser' message.
        //
        socket.on( 'adduser', function ( user_map ) {
          crud.read(
            'user',
            { name : user_map.name },
            {},
            function ( result_list ) {
              var
                result_map,
                cid = user_map.cid;

              delete user_map.cid;

              // use existing user with provided name
              if ( result_list.length > 0 ) {
                result_map     = result_list[ 0 ];
                result_map.cid = cid;
                signIn( io, result_map, socket );
              }

              // create user with new name
              else {
                user_map.is_online = true;
                crud.construct(
                  'user',
                  user_map,
                  function ( result_list ) {
                    result_map     = result_list[ 0 ];
                    result_map.cid = cid;
                    chatterMap[ result_map._id ] = socket;
                    socket.user_id = result_map._id;
                    socket.emit( 'userupdate', result_map );
                    emitUserList( io );
                  }
                );
              }
            }
          );
        });
        // End /adduser/ message handler
        // BEgin /es6/ message handler
        socket.on('es6', function() {
          console.warn('es6 rec');
          socket.emit('es6', 'es6 from server');
        })
        // End /es6/ message handler
        // Begin /userFind/ message handler
        socket.on('userFind', function( find_map ) {
          console.log("userFind SERVER")
          crud.read(
            'user',
            find_map,
            {},
            function ( result_list ) {

              socket.emit( 'userFound',result_list );
            }
          )
        })
        // End /userFind/ message handler


        // Begin /updatechat/ message handler
        // Summary   : Handles messages for chat.
        // Arguments : A single chat_map object.
        //  chat_map should have the following properties:
        //    dest_id   = id of recipient
        //    dest_name = name of recipient
        //    sender_id = id of sender
        //    msg_text  = message text
        // Action    :
        //   If the recipient is online, the chat_map is sent to her.
        //   If not, a 'user has gone offline' message is
        //     sent to the sender.
        //
        socket.on( 'updatechat', function ( chat_map ) {
          if ( chatterMap.hasOwnProperty( chat_map.dest_id ) ) {
            chatterMap[ chat_map.dest_id ]
              .emit( 'updatechat', chat_map );
          }
          else {
            socket.emit( 'updatechat', {
              sender_id : chat_map.sender_id,
              msg_text  : chat_map.dest_name + ' has gone offline.'
            });
          }
        });
        // End /updatechat/ message handler

        // Begin disconnect methods
        socket.on( 'leavechat', function () {
          console.log(
            '** user %s logged out **', socket.user_id
          );
          signOut( io, socket.user_id );
        });

        socket.on( 'disconnect', function () {
          console.log(
            '** user %s closed browser window or tab **',
            socket.user_id
          );
          signOut( io, socket.user_id );
        });
        // End disconnect methods

        socket.on( 'updateavatar', function () {} );
      }
    );
    // End io setup

    return io;
  }
};

module.exports = chatObj;
// ----------------- END PUBLIC METHODS -------------------
