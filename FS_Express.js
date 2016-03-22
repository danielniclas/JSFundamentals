/**
 * Created by Daniel on 3/22/2016.
 */

var express = require('express');
var fs = require('fs');
var app = express();


//  SET PORT

app.set('port',3000);      //  This allows us to override the port by setting an environment value before you start the server

//  End


//  DECLARE ROUTES:

app.get('/', function(req, res){        //  app.get(1,2)  is the METHOD to add ROUTES   (get and post)
    //  1.  The path is what defines the ROUTE
    //  DO NOT have to worry about the case or the trailing slash, and does not consider the query string!!!
    //  2.  The anonymous function is INVOKED when the route is matched!

    fs.readFile('mytutorials.txt', function(err, data){         //  Access and deliver static content:  myTutorials.txt

        if(err){
            res.writeHead(500,{'Content-Type': 'text/plain'});
            res.end('500 - Internal Error');
        }else{

            var dataObject = JSON.parse(data);
            console.log("data: "+ dataObject);

            var currentObject = {};
            var message = " ";
            for (var i = 0; i < dataObject.length; i++){        //  Iterate Array of Objects
                currentObject = dataObject[i];
                message += '<a href ="' + currentObject.url + '">' + currentObject.display + '</a><br>';  //  Display object.url and object.display
            }

            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(message);
        }
    });

    //res.type('text/plain');
    //res.send('Hello From Home Page');

});

app.get('/about', function(req, res){
    res.type('text/plain');
    res.send('About Your Great WebSite')

});


//  ROUTES End

// custom 404 page - 404 HANDLER
app.use(function(req, res){     //  app.use(1)  Method Express uses to add middleware - Catch all handler for anything that didn't get matched by a route
    //  The order in which routes and middleware are added is significant
    //  If we put the 404 handler above the routes, the home page and about page would stop working - instead get 404
    //  Express can distinguish between the 404 and 500 handlers by the numbers of arguments their functions take
    res.type('text/plain');
    res.status(404);
    res.send('XXX 404 - Not Found');

});

// custom 500 page - 500 HANDLER
app.use(function(err, req, res, next){
    res.type('text/plain');
    res.status(500);
    res.send('XXX 500 - Server Error');

});

app.listen(app.get('port'), function(){

    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');

});



