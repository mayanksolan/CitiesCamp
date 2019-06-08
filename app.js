var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser"); 
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var passportLocalMongoose = require("passport-local-mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var User = require("./models/user");


var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

var urlDatabase = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_13";
mongoose.connect(urlDatabase, {useNewUrlParser: true});
//mongoose.connect("mongodb+srv://devMays:devColdplay@cluster0-n0rgm.mongodb.net/test?retryWrites=true", {useNewUrlParser: true});
//console.log(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
	secret:"Coldplay is still the best",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

var urlPort = process.env.PORT || "3000";
app.listen(urlPort, process.env.IP, function() {
	console.log("YelpCamp server has started");
});
// app.listen(3000, process.env.IP, function() {
// 	console.log("YelpCamp server has started");
// });