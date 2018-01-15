//  ------------------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  constructObj,
  readObj,
  destroy,
  mongodb     = require( 'mongodb'),
  MongoClient = mongodb.MongoClient,
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

    MongoClient.connect(url, function(err, db) {
      if (err) { throw err; }

      db.collection( obj_type )
        .find( find_map, fields_map )
        .toArray( function( inner_error, map_list ) {
          callback( map_list );
          db.close();
       });
    });
  },
  searchById      = function ( obj_type, id, fields_map, callback ) {
    console.log( ' crud read')
    console.log( ' obj_type:' + obj_type)

    MongoClient.connect(url, function(err, db) {
      if (err) { throw err; }

      db.collection( obj_type )
        .find( { _id: new mongodb.ObjectID( id ) }, fields_map )
        .toArray( function( inner_error, map_list ) {
          console.log( 'chat map_list:' + map_list)
          callback( map_list );
          db.close();
       });
    });
  },
  destroy = function( obj_type, id , callback ) {
    console.log( id )
    MongoClient.connect( url, function(err, db) {
    if (err) { throw err; }

    db.collection( obj_type )
      .deleteOne( { _id: new mongodb.ObjectID( id ) },
        function( inner_error, delete_count ) {
          callback( { delete_count: delete_count } );
          db.close();
        });
    })
  },
  update = function( obj_type, id , obj_map,   callback ) {
    console.log( 'crud:' + id )
    console.log( obj_map )
    MongoClient.connect( url, function(err, db) {
    if (err) { throw err; }

    db.collection( obj_type )
      .update( { _id: new mongodb.ObjectID( id ) },
                  { $set: obj_map },
        function( inner_error, update_count ) {
          console.log( inner_error)
          console.log( update_count)
          callback( { update_count: update_count } );
          db.close();
        });
    })
  }

module.exports = {

  construct   : constructObj,
  searchById  : searchById,
  read        : readObj,
  destroy     : destroy,
  update      : update
};
