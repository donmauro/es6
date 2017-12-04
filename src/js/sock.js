const socket = io.connect('/chat')

//const sio = () => {
//      return {
//      emit : ( event_name, data ) => {
//        socket.emit( event_name, data )
//      },
//      on   : ( event_name, callback ) => {
//        socket.on( event_name, () => {
//          callback( arguments )
//        });
//      }
//    };
//}

export { socket }
