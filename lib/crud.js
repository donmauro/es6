//  ------------------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  constructObj,
  readObj,

  MongoClient = require( 'mongodb' ).MongoClient,
  url = 'mongodb://localhost:27017/es6',


  constructObj = function( obj_type, obj_map, callback ) {
    MongoClient.connect(url, function(err, db) {
      if (err)  { throw err; }
      db.collection( obj_type )
        .insertOne( obj_map, function( inner_error, result_map ) {
          console.log( 'crud checkSchema');
          console.log( result_map.insertedCount );
          callback( result_map.ops );
          db.close();
          });
    });
  },
  readObj      = function ( obj_type, find_map, fields_map, callback ) {
    console.log( ' crud read')
    console.log( ' obj_type:' + obj_type)
    console.log( ' find_map:' + find_map.nome.$regex)
    MongoClient.connect(url, function(err, db) {
      if (err) { throw err; }

      db.collection( obj_type )
        .find( find_map, fields_map )
        .toArray( function( inner_error, map_list ) {
          callback( map_list );
          db.close();
       });
    });
  };

module.exports = {

  construct   : constructObj,
  read        : readObj
};
