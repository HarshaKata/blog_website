var mongoose=require("mongoose");
var Blog=require("./models/blog");
var Comment=require("./models/comment");
var data=[
	{
		title:"image1",
		image:"https://images.pexels.com/photos/1840421/pexels-photo-1840421.jpeg?auto=compress&cs=tinysrgb&h=350"
		
	},
	{
		title:"image2",
		image:"https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350"
	}
]
function blogfree(){	  
	Blog.deleteMany({},function(err){
		if(err) {
			console.log(err);
		}
		console.log("Data removed");
		data.forEach(function(seed){
			Blog.create(seed,function(err,blogs){
				if(err){
					console.log(err);
				}
				else {
					console.log("new data is added to database");
					Comment.create(
						{
							text:"this place is great",
							author:"homer"
						}, function(err,comment){
							if(err) {
								console.log(err);
							} else {
								blogs.comments.push(comment);
								blogs.save();
								console.log("comments created");
							}
						});
				}
			});
		});
		
	});
}
module.exports=blogfree;