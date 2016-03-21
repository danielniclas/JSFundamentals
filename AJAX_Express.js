/**
 * Created by Daniel on 3/10/2016.
 */


//  WARNING:  Experiment, Does not work

var express = require('express');
var bodyParser = require('body-parser');

var expressApp = express();
expressApp.use(bodyParser.json());                  //  app is using this bodyParser.json()



//  Print Function:
function printMessage(username, badgeCount, points) {
    var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
    console.log(message);
}

function getUser(username) {

    console.log("getUser invoked");

    expressApp.get("https://teamtreehouse.com/" + username + ".json", function (req, res, next) {

        console.log("inside");

        //Read the data
        res.on('data', function (chunk) {
            body += chunk;
        });

        //Parse the data
        //Print the data
        res.on('end', function () {
            //var profile = JSON.parse(body);                                              //  Parse the Data
            printMessage(username, profile.badges.length, profile.points.JavaScript);    //  Invoke printMessage(1,2,3)
        });

    });   //  CallBack Ends here

}

getUser("chalkers");                                                              //  asynch
getUser("danielniclas");                                                          //  asynch



