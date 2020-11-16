var express=require("express");
var router=express.Router();
var Blog=require("../models/blog");
var User=require("../models/user");
router.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err) {
			console.log("something went wrong");
		}
		else {
			res.render("index",{blogs:blogs});
		}
	})
})
router.post("/blogs",function(req,res){
	Blog.create(req.body.blogs,function(err,newblog){
		if(err) {
			res.render("application");
		}
		else {
			res.redirect("/blogs");
		}
	})
})
router.get("/blogs/new",function(req,res){
	res.render("application");
})
router.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id).populate("comments").exec(function(err,FoundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			console.log(FoundBlog);
			res.render("show",{blog:FoundBlog});
		}
	})
})
router.post("/blogs/:id",function(req,res){
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedblog){
		if(err) {
		console.log(err);
		} else {
			res.redirect("/blogs/"+req.params.id);
		}				   
	})
})
router.get("/blogs/:id/edit",function(req,res){
	if(req.isAuthenticated()){
		Blog.findById(req.params.id,function(err,foundblog){
			if(err) {
				console.log(err);
			} else {
					res.render("edit",{blog:foundblog});
			}
		})
	} else {
		res.send("<h1>you need to login</h1>");
	}
	
})
router.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/blogs");
		}
	})
})
module.exports=router;