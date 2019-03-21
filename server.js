var express  = require('express');
var app      = express(); // This creates our app with express, this helps it get hosted online
var morgan = require('morgan'); // This imports morgan to our server which logs requests to the console.
var bodyParser = require('body-parser');    //This imports body-parser which pulls information from HTML POST 
var methodOverride = require('method-override'); //This importes method-override into our project to  simulate DELETE and PUT
var cors = require('cors'); // This imports cors into our project

// Our MongoDB dabase is imported to our node serve here.
var mongoose = require('mongoose'),
    mongoClient = mongoose.mongoClient,
    ObjectID = mongoose.ObjectID,
    db;
 
// Configuration
//Below i connect my mLabs database to our node server

mongoose.connect('mongodb://heroku_lz2bt2wt:kabs1g4ubvtolmbjkvold9inkd@ds227185.mlab.com:27185/heroku_lz2bt2wt',{ useNewUrlParser: true }, function (error) {
    if (error) console.error(error);
    else console.log('Mongo Connected');
}); 

app.use(morgan('dev')); // This log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));  // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json for sending between the app and the database
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json for sending and retrieving data from the app
app.use(methodOverride());
//app.set('port', process.env.PORT || 8080); // This is for connecting the app to heroku
app.use(cors());
app.use(express.static("www")); // Our Ionic app build is in the www folder and is got by the server so it can run on heroku.

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Tells the app which port to listen on. 
//app.listen(8080);
//console.log("App listening on port 8080");

app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

// Model for the reviews in our app
var Job = mongoose.model('Job', {
    title: String,
    description: String,
    location:String,
    price: Number
});
 
// Routes
 
// Get jobs
app.get('/api/jobs', function(req, res) {

    console.log("fetching jobs");

    // use mongoose to get all reviews in the database
    Job.find(function(err, jobs) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(jobs); // return all reviews in JSON format
    });
});

// create job and send back all jobss after creation
app.post('/api/jobs', function(req, res) {

    console.log("creating job");

    // create a job, information comes from request from Ionic
    Job.create({
        title : req.body.title,
        description : req.body.description,
        rating: req.body.rating,
        done : false
    }, function(err, job) {
        if (err)
            res.send(err);

        // get and return all the jobs after another is created
        Job.find(function(err, jobs) {
            if (err)
                res.send(err)
            res.json(jobs);
        });
    });
});

// delete a job
app.delete('/api/jobs/:job_id', function(req, res) {
    Job.remove({
        _id : req.params.job_id
    }, function(err, job) {
    });
});
