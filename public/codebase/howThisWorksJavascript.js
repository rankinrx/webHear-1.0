// app.js -  
var express = require('express'); 
var path = require('path');

//connect to the mongoDB
var db = require('mongoskin').db("localhost/testdb", { w: 0}); //makes it easier/faster to setup express app 
    db.bind('event'); //mongoskin thing

//create express app, use public folder for static files
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

//is necessary for parsing POST request
app.use(express.bodyParser());

app.listen(3000);

// if user requrests, send some data over to DB to play with
app.get('/init', function(req, res){
    db.event.insert({ 
        text:"My test event A", 
        start_date: new Date(2013,8,1),
        end_date:   new Date(2013,8,5)
    });
    db.event.insert({ 
        text:"One more test event", 
        start_date: new Date(2013,8,3),
        end_date:   new Date(2013,8,8),
        color: "#DD8616"
    });

    res.send("Test events were added to the database")
});

// loads our database into calender (on load of calendar page)
app.get('/data', function(req, res){
    // - db.event setup with mongoskin
    // - find(): find documents in a the 'event' collection
    // - .toArray: returns array of all docs in cursor
    // 
    db.event.find().toArray(function(err, data){
        //set id property for all records
        for (var i = 0; i < data.length; i++)
            data[i].id = data[i]._id;

        //output response
        res.send(data);
    });
});