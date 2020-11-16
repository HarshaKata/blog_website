var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");
var methodOverride=require("method-override");
var User=require("./models/user");
var Blog=require("./models/blog");
var blogfree=require("./seed");
var Comment=require("./models/comment");
var campgroundroutes=require("./routes/campground");
var commentroutes=require("./routes/comments");
var authroutes=require("./routes/auth");
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser:true,useUnifiedTopology:true});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
blogfree();
app.use(require("express-session")({
	secret:"once again rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(campgroundroutes);
app.use(commentroutes);
app.use(authroutes);
app.get("/",function(req,res){
	res.redirect("/blogs");
})
app.listen("3000",function(){
	console.log("here is the website");
})