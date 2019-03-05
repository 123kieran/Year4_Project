//server.js (todo-ionic2-heroku/server.js)
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var mongodb = require('mongodb'),
mongoClient = mongodb.MongoClient,
ObjectID = mongodb.ObjectID, // Used in API endpoints
db; // We'll initialize connection below

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_lz2bt2wt:kabs1g4ubvtolmbjkvold9inkd@ds227185.mlab.com:27185/heroku_lz2bt2wt';


// Initialize database connection and then start the server.
mongoClient.connect(MONGODB_URI, function (err, database) {
if (err) {
process.exit(1);
}

db = database; // Our database object from mLab

console.log("Database connection ready");


// GET: retrieve all job
app.get("/api/job", function(req, res) {
    db.collection("job").find({}).toArray(function(err, docs) {
    if (err) {
    handleError(res, err.message, "Failed to get job");
    } else {
    res.status(200).json(docs);
    }
    });
    });
    
    // POST: create a new todo
    app.post("/api/job", function(req, res) {
    var newJob = {
    description: req.body.description,
    isComplete: false
    }
    
    db.collection("job").insertOne(newJob, function(err, doc) {
    if (err) {
    handleError(res, err.message, "Failed to add job");
    } else {
    res.status(201).json(doc.ops[0]);
    }
    });
    });
    
    /*
    * Endpoint "/api/job/:id"
    */
    
    // GET: retrieve a todo by id -- Note, not used on front-end
    app.get("/api/job/:id", function(req, res) {
    db.collection("job").findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
    handleError(res, err.message, "Failed to get job by _id");
    } else {
    res.status(200).json(doc);
    }
    });
    });
    
    // PUT: update a job by id
    app.put("/api/job/:id", function(req, res) {
    var updateTodo = req.body;
    delete updateTodo._id;
    
    db.collection("job").updateOne({_id: new ObjectID(req.params.id)}, updateTodo, function(err, doc) {
    if (err) {
    handleError(res, err.message, "Failed to update job");
    } else {
    res.status(204).end();
    }
    });
    });
    
    // DELETE: delete a todo by id
    app.delete("/api/job/:id", function(req, res) {
    db.collection("job").deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
    handleError(res, err.message, "Failed to delete job");
    } else {
    res.status(204).end();
    }
    });
    });
    
    // Error handler for the api
    function handleError(res, reason, message, code) {
    console.log("API Error: " + reason);
    res.status(code || 500).json({"Error": message});
    }

// Initialize the app.
app.listen(app.get('port'), function () {
console.log("Server now connected on port", app.get('port'));
});
});