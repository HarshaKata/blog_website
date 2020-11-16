;var express=require("express");
var router=express.Router();
var Blog=require("../models/blog");
var Comment=require("../models/comment");
router.post("/blogs/:id/comments",function(req,res){
	Blog.findById(req.params.id,function(err,blog){
		if(err) {
			console.log(err);
		}
		else {
			Comment.create(req.body.comment,function(err,comment){
				if(err) {
					console.log(err);
				}
				else {
					//comment.author.id=req.user._id;
					//comment.author.username=req.user.username;
					//comment.save();
					blog.comments.push(comment);
					blog.save();
					res.redirect('/blogs/'+blog._id);
				}
			})
		}
	})
})
router.get("/blogs/:id/comments/new",function(req,res){
	Blog.findById(req.params.id,function(err,campground){
		if(err) {
			console.log(err);
		}
		else {
			res.render("addcomment",{blog:campground});
		}
	})
})
router.put("/blogs/:id/comments/:comment_id",function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
		if(err) {
		console.log(err);
		} else {
			res.redirect("/blogs/"+req.params.id);
		}				   
	})
})
router.get("/blogs/:id/comments/:comment_id/edit",function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err) {
			console.log(err);
		} else {
			res.render("editcomment",{blog_id:req.params.id,comment:foundcomment});
		}
	})
})
router.delete("/blogs/:id/comments/:comment_id",function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,deletecomment){
		if(err) {
		console.log(err);
		} else {
			res.redirect("/blogs/"+req.params.id);
		}				   
	})
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports=router;