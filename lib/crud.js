//  ------------------------ BEGIN MODULE SCOPE VARIABLES --------------
const MongoDb = require( 'mongodb');
const MongoClient = require( 'mongodb').MongoClient;

const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'es6';

const find = async ( obj_type, find_map, fields_map, callback ) => {

  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");

    const db = client.db( dbName );

    const col = db.collection( obj_type );
    const docs = await col.find( find_map ).toArray();

    callback( docs );

  } catch ( err ) {

    console.log( err.stack );

  }

  client.close();
};



const destroy = async ( obj_type, id , callback ) => {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");

    const db = client.db( dbName );

    const col = db.collection( rafa );
    let r;

    r = await col.deleteOne( { _id: new MongoDb.ObjectID( id ) } );
    assert.equal(1, r.deletedCount);

  } catch ( err ) {
    console.log('ERRORE');
    console.log( err );
    console.log(typeof( err));
    console.log(err.stack);
    callback( err );

  }

  client.close;

};



module.exports = {
  find,
  destroy,

};
