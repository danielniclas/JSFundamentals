/**
 * Created by Daniel on 3/10/2016.
 */

//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  NODE HTTP Request:  AJAX JSON OBJECT from TREEHOUSE.COM:     AJAX TREEHOUSE    AJAX TREEHOUSE    AJAX TREEHOUSE

var https = require("https");
var os = require('os');

//  Print Function:
function printMessage(username, badgeCount, points) {
    var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
    console.log(message);
}

//  Asynch I/O call :  Connect to the API URL (https://teamtreehouse.com/username.json)
function getUser(username){

    //  Invoke https.get(1,2):      https OBJECT with exposed METHODS like get()
    var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){  // INVOCATION: get(1,2)   1. URL, 2.  CB

        var body = "";

        //Read the data
        response.on('data', function (chunk) {
            body += chunk;
        });

        //Parse the data
        //Print the data
        response.on('end', function(){
            var profile = JSON.parse(body);                                              //  Parse the Data
            printMessage(username, profile.badges.length, profile.points.JavaScript);    //  Invoke printMessage(1,2,3)
        });

    });   //  CallBack Ends here

    request.on("error", function(error){                //  on(1,2) Method called on request
        console.error("XXX ERROR XXX ", error.message);
    });

}   //  getUser Function ends here

getUser("chalkers");                                                              //  asynch
getUser("danielniclas");                                                          //  asynch



(function(){

    var gigaByte = 1 / (1024 * 1024 * 1024);
    console.log('Total Memory', os.totalmem() * gigaByte, 'GBs');
    console.log('Available Memory', os.freemem() * gigaByte, 'GBs');
    console.log('Percent consumed', 100 * (1 - os.freemem() / os.totalmem()));
    console.log('This machine has', os.cpus().length, 'CPUs');

})();
