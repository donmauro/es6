//  ------------------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  http     = require( 'http' ),
  express  = require( 'express' ),
  routes   = require( './lib/routes'),
  app      = express(),
  server   = http.createServer( app );

//  ------------------------ END MODULE SCOPE VARIABLES --------------

//  ------------------------ BEGIN SERVER CONFIGURATION --------------
app.configure( function () {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( express.static( __dirname + '/src'));
  app.use( app.router );
});

app.configure( 'development', function () {
  app.use( express.logger() );
  app.use( express.errorHandler({
    dumpExceptions : true,
    showStack      : true
  }) );
});

app.configure( 'production', function () {
  app.use( express.errorHandler() );
});

routes.configRoutes( app, server );
//  ------------------------ END SERVER CONFIGURATION -----------------

//  ------------------------ BEGIN START SERVER -----------------------
server.listen( 3000 );
console.log( 'Exp Listen on port %d in %s mode', server.address().port, app.settings.env );
//  ------------------------ END START SERVER   -----------------------
