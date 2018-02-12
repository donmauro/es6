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

      callback( { error: err.name, message: err.message } );

  }

  client.close();
};

const findById = async ( obj_type, id, fields_map, callback ) => {

  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");

    const db = client.db( dbName );

    const col = db.collection( obj_type );
    const docs = await col.find( { _id: new MongoDb.ObjectID( id ) }, fields_map).toArray();
    console.log( 'byID');
    console.log(docs);
    callback( docs );

  } catch ( err ) {

      callback( { error: err.name, message: err.message } );

  }

  client.close();
};

const insertOne = async ( obj_type, obj_map, callback ) => {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");

    const db = client.db( dbName );

    const r = await db.collection( obj_type ).insertOne( obj_map );
    assert.equal(1, r.insertedCount );

  } catch ( err ) {

      callback( { error: err.name, message: err.message } );

  }

  client.close;

};

const updateOne = async ( obj_type, id , obj_map,   callback ) => {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");
    console.log( obj_type)
    console.log( id)
    console.log(obj_map)
    const db = client.db( dbName );

    const r = await db.collection( obj_type ).updateOne(
      { _id: new MongoDb.ObjectID( id ) },
      { $set: obj_map }
    );
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    callback( r );

  } catch ( err ) {

      callback( { error: err.name, message: err.message } );

  }

  client.close;

};

const destroy = async ( obj_type, id , callback ) => {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");

    const db = client.db( dbName );

    const col = db.collection( obj_type );
    let r;

    r = await col.deleteOne( { _id: new MongoDb.ObjectID( id ) } );
    assert.equal(1, r.deletedCount);

  } catch ( err ) {
    console.log('ERRORE');
    console.log( err );
    console.log(typeof( err));
    console.log(err.stack);
    console.log(err.message);
    callback( { error: err.name, message: err.message } );

  }

  client.close;

};



module.exports = {
  find,
  destroy,
  findById,
  insertOne,
  updateOne,
};
